package deepgram

import (
	"context"
	"fmt"

	// "github.com/deepgram/deepgram-go-sdk/pkg/client/prerecorded" // Example import, will likely use live
	interfaces "github.com/deepgram/deepgram-go-sdk/pkg/client/interfaces"
	client "github.com/deepgram/deepgram-go-sdk/pkg/client/live" 
)

type Service struct {
	ApiKey string
	Client *client.Client
}

func NewService(apiKey string) *Service {
	// TODO: Initialize real client when key is available
	return &Service{
		ApiKey: apiKey,
	}
}

func (s *Service) CreateLiveSession(ctx context.Context, options interfaces.LiveTranscriptionOptions) error {
	if s.ApiKey == "" {
		return fmt.Errorf("deepgram api key not set")
	}
	// TODO: Implement live transcription logic
	return nil
}
