package server

import (
	"encoding/json"
    "fmt"
    "log"
	"net/http"
)

type AnalyzeRequest struct {
	Transcript string `json:"transcript"`
}

type AnalyzeResponse struct {
	Feedback string `json:"feedback"`
}

func (s *Server) handleAnalyze(w http.ResponseWriter, r *http.Request) {
    // Debug Log
    fmt.Printf("Analyze endpoint hit. Method: %s\n", r.Method)

    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    var req AnalyzeRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    if req.Transcript == "" {
        // Handle empty case
        json.NewEncoder(w).Encode(AnalyzeResponse{Feedback: "No speech detected."})
        return
    }

    feedback, err := s.GeminiService.AnalyzeText(r.Context(), req.Transcript)
    if err != nil {
        log.Printf("Gemini Analysis Error: %v", err)
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusInternalServerError)
        json.NewEncoder(w).Encode(map[string]string{"error": "Analysis failed: " + err.Error()})
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(AnalyzeResponse{Feedback: feedback})
}
