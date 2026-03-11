package server

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	// "github.com/shubhambadola/moxie/backend/internal/auth" // Original line, now effectively moved
	// "github.com/shubhambadola/moxie/backend/internal/deepgram" // Not used explicitly

	// Deepgram interfaces
	msginterfaces "github.com/deepgram/deepgram-go-sdk/pkg/api/listen/v1/websocket/interfaces"
	interfaces "github.com/deepgram/deepgram-go-sdk/pkg/client/interfaces"
	"github.com/shubhambadola/moxie/backend/internal/auth"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all for dev
	},
}

// DeepgramCallbackHandler implements msginterfaces.LiveMessageCallback
type DeepgramCallbackHandler struct {
	conn *websocket.Conn
}

func (h *DeepgramCallbackHandler) Message(mr *msginterfaces.MessageResponse) error {
	// Forward transcription to frontend
	if err := h.conn.WriteJSON(mr); err != nil {
		log.Printf("Websocket write failed: %v", err)
		return err
	}
	return nil
}

func (h *DeepgramCallbackHandler) Open(or *msginterfaces.OpenResponse) error {
	log.Println("Deepgram Connection Opened")
	return nil
}
func (h *DeepgramCallbackHandler) Metadata(md *msginterfaces.MetadataResponse) error { return nil }
func (h *DeepgramCallbackHandler) SpeechStarted(ssr *msginterfaces.SpeechStartedResponse) error {
	return nil
}
func (h *DeepgramCallbackHandler) UtteranceEnd(ur *msginterfaces.UtteranceEndResponse) error {
	return nil
}
func (h *DeepgramCallbackHandler) Close(cr *msginterfaces.CloseResponse) error {
	log.Println("Deepgram Connection Closed")
	return nil
}
func (h *DeepgramCallbackHandler) Error(er *msginterfaces.ErrorResponse) error {
	log.Printf("Deepgram Error: %v", er)
	return nil
}
func (h *DeepgramCallbackHandler) UnhandledEvent(byData []byte) error { return nil }

func (s *Server) handleWebSocket(w http.ResponseWriter, r *http.Request) {
	// 0. Extract and validate JWT from query parameters
	token := r.URL.Query().Get("token")
	if token == "" {
		http.Error(w, "Missing token query parameter", http.StatusUnauthorized)
		return
	}

	_, err := auth.ValidateJWT(token)
	if err != nil {
		log.Printf("WebSocket Auth failed: %v", err)
		http.Error(w, "Unauthorized: "+err.Error(), http.StatusUnauthorized)
		return
	}

	// 1. Upgrade connection
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Upgrade failed: %v", err)
		return
	}
	defer conn.Close()

	// 2. Prepare Deepgram Connection

	// Create callback handler
	callback := &DeepgramCallbackHandler{conn: conn}

	// Options for transcription
	opts := &interfaces.LiveTranscriptionOptions{
		Model:          "nova-2",
		Language:       "en-US",
		SmartFormat:    true,
		Punctuate:      true,
		InterimResults: true, // Important for live feedback
	}

	// Create Deepgram Session
	dgClient, err := s.DeepgramService.CreateLiveSession(r.Context(), opts, callback)
	if err != nil {
		log.Printf("Deepgram session creation failed: %v", err)
		return
	}

	// Defer closing handled by SDK or connection.
	// Usually we want to close the DG client when this handler exits.
	// Assuming dgClient has a Stop or Close method. Checked previously it might not behave as expected or is just connection.
	// With Callback client, the connection is managed. We assume context cancellation closes it, OR we call Stop().
	// dgClient is *listenv1ws.WSCallback
	// Let's defer a Stop/Close if available, or rely on context.

	// 3. Read Loop: Frontend Audio -> Deepgram
	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			log.Printf("Websocket read failed: %v", err)
			break
		}

		// Only handle Binary messages as Audio
		if mt == websocket.BinaryMessage {
			// Write to Deepgram
			n, err := dgClient.Write(message)
			if err != nil {
				log.Printf("Deepgram write failed: %v", err)
				break
			}
			_ = n
		}
	}
}
