package server

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/shubhambadola/moxie/backend/internal/auth"
)

type Server struct {
	Port string
}

func NewServer(port string) *http.Server {
	mux := http.NewServeMux()

	// Health Check
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(map[string]string{"status": "ok", "service": "moxie-backend"})
	})

	// Protected Routes Group
	// mux.Handle("/api/session", auth.AuthMiddleware(http.HandlerFunc(handleSession)))

	return &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: mux,
	}
}
