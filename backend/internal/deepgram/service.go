package deepgram

import (
	"context"
	"fmt"
	// "log"

	// Correct SDK imports for v1.9.0
	listen "github.com/deepgram/deepgram-go-sdk/pkg/client/listen"
	interfaces "github.com/deepgram/deepgram-go-sdk/pkg/client/interfaces"
	msginterfaces "github.com/deepgram/deepgram-go-sdk/pkg/api/listen/v1/websocket/interfaces"
	listenv1ws "github.com/deepgram/deepgram-go-sdk/pkg/client/listen/v1/websocket"
)

type Service struct {
	ApiKey string
}

func NewService(apiKey string) *Service {
	return &Service{
		ApiKey: apiKey,
	}
}

// CreateLiveSession initializes a connection to Deepgram's Live API using Callback
// Returns a managed WSCallback and error.
func (s *Service) CreateLiveSession(ctx context.Context, options *interfaces.LiveTranscriptionOptions, callback msginterfaces.LiveMessageCallback) (*listenv1ws.WSCallback, error) {
	if s.ApiKey == "" {
		return nil, fmt.Errorf("deepgram api key not set")
	}

	// ClientOptions - default or custom
	clientOptions := &interfaces.ClientOptions{
		EnableKeepAlive: true,
	}

	// Create and connect the WebSocket client
	dgClient, err := listen.NewWebSocketUsingCallback(ctx, s.ApiKey, clientOptions, options, callback)
	if err != nil {
		return nil, fmt.Errorf("failed to create deepgram client: %w", err)
	}

    // Attempt to connect
    // According to SDK patterns for callback clients, Start/Connect is usually needed.
    // Based on previous chan logic, we'll try Connect()
    
	boolRet := dgClient.Connect()
	if !boolRet {
		return nil, fmt.Errorf("failed to connect to deepgram (Connect returned false)")
	}

	return dgClient, nil
}
