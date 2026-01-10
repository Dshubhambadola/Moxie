package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/shubhambadola/moxie/backend/internal/livekit"
)

type Server struct {
	Port          string
	LiveKitService *livekit.Service
}

func NewServer(port string) *http.Server {
	// Initialize LiveKit Service
	// TODO: Load from env vars properly
	lkService := livekit.NewService(
		os.Getenv("LIVEKIT_API_KEY"),
		os.Getenv("LIVEKIT_API_SECRET"),
	)

	s := &Server{
		Port:           port,
		LiveKitService: lkService,
	}

	mux := http.NewServeMux()

	// Health Check
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(map[string]string{"status": "ok", "service": "moxie-backend"})
	})

	// Token Endpoint
	mux.HandleFunc("/api/livekit/token", s.handleToken)

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
