package server

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/shubhambadola/moxie/backend/internal/deepgram"
	"github.com/shubhambadola/moxie/backend/internal/gemini"
	"github.com/shubhambadola/moxie/backend/internal/livekit"
)

type Server struct {
	Port            string
	LiveKitService  *livekit.Service
	DeepgramService *deepgram.Service
	GeminiService   *gemini.Service
}

func NewServer(port string) *http.Server {
	ctx := context.Background()

	// Initialize LiveKit Service
	lkService := livekit.NewService(
		os.Getenv("LIVEKIT_API_KEY"),
		os.Getenv("LIVEKIT_API_SECRET"),
	)

	// Initialize Deepgram Service
	dgService := deepgram.NewService(
		os.Getenv("DEEPGRAM_API_KEY"),
	)

	// Initialize Gemini Service
	geminiService, err := gemini.NewService(ctx, os.Getenv("GEMINI_API_KEY"))
	if err != nil {
		log.Printf("Warning: Failed to initialize Gemini service: %v", err)
	}

	s := &Server{
		Port:            port,
		LiveKitService:  lkService,
		DeepgramService: dgService,
		GeminiService:   geminiService,
	}

	mux := http.NewServeMux()

	// Health Check
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(map[string]string{"status": "ok", "service": "moxie-backend"})
	})

	// Token Endpoint
	mux.HandleFunc("/api/livekit/token", s.handleToken)
    
    // Audio Stream Endpoint
    mux.HandleFunc("/api/ws", s.handleWebSocket)
    
    // Analysis Endpoint
    mux.HandleFunc("/api/analyze", s.handleAnalyze)

	return &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: mux,
	}
}

func (s *Server) handleToken(w http.ResponseWriter, r *http.Request) {
	// TODO: Get participant name from Auth/Query
	token, err := s.LiveKitService.CreateToken("practice-room", "user-identity")
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"token": token})
}
