package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Locuta Backend Service Starting...")
	
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Locuta Backend API")
	})

	// Start server on port 8080
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Printf("Server failed: %s\n", err)
	}
}
