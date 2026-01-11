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

    // Gemini response is a JSON string. We need to parse it (and clean markdown if present)
    responseStr, err := s.GeminiService.AnalyzeText(r.Context(), req.Transcript)
    if err != nil {
        log.Printf("Gemini Analysis Error: %v", err)
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusInternalServerError)
        json.NewEncoder(w).Encode(map[string]string{"error": "Analysis failed: " + err.Error()})
        return
    }

    // Clean markdown code blocks if present ( ```json ... ``` )
    // A simple approach is just to attempt unmarshal directly.
    // If we want detailed scores, let's treat the incoming string as raw JSON.
    // However, Gemini often wraps it.
    
    // For MVP, enable "Raw" pass-through effectively, but we should validate it's JSON.
    // Let's rely on frontend to display `feedback` text, but wait, frontend expects { feedback: "..." }.
    // If Gemini now returns { feedback: "...", scores: {...} }, we can just pass that through.
    
    // Attempt to decode the Gemini response string into a map
    var geminiData map[string]interface{}
    
    // Naive cleaning of markdown
    cleanJSON := responseStr
    if len(cleanJSON) > 7 && cleanJSON[:7] == "```json" {
        cleanJSON = cleanJSON[7:]
    }
    if len(cleanJSON) > 3 && cleanJSON[len(cleanJSON)-3:] == "```" {
        cleanJSON = cleanJSON[:len(cleanJSON)-3]
    }
    
    fmt.Printf("Raw Gemini Response: %s\n", responseStr)
    fmt.Printf("Cleaned JSON: %s\n", cleanJSON)
    
    if err := json.Unmarshal([]byte(cleanJSON), &geminiData); err != nil {
        log.Printf("Failed to parse Gemini JSON: %v. Raw: %s", err, responseStr)
        // Fallback: treat entire string as feedback text
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]interface{}{
            "feedback": responseStr,
            "scores": map[string]int{
                "clarity": 50, // Default fallback
            },
        })
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(geminiData)
}
