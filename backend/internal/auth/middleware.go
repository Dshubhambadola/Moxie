package auth

import (
	"net/http"
)

// Middleware checks for a valid session.
// For now, it's a pass-through. In production, this validates Supabase JWTs.
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// TODO: Validate Bearer token from Supabase
		// authHeader := r.Header.Get("Authorization")
		// if authHeader == "" { ... }
		
		next.ServeHTTP(w, r)
	})
}
