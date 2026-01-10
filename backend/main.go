package main

import (
	"fmt"
	"os"

	"github.com/shubhambadola/moxie/backend/internal/server"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := server.NewServer(port)
	fmt.Printf("Moxie Backend Service Starting on port %s...\n", port)
	
	if err := srv.ListenAndServe(); err != nil {
		fmt.Printf("Server failed: %s\n", err)
	}
}
