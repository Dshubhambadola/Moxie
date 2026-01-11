package gemini

import (
	"context"
	"fmt"
    
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type Service struct {
	ApiKey string
	Client *genai.Client
}

func NewService(ctx context.Context, apiKey string) (*Service, error) {
	if apiKey == "" {
		return &Service{ApiKey: ""}, nil // Return empty service if no key yet
	}
    
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, err
	}

	return &Service{
		ApiKey: apiKey,
		Client: client,
	}, nil
}

func (s *Service) AnalyzeText(ctx context.Context, text string) (string, error) {
	if s.Client == nil {
		return "", fmt.Errorf("gemini client not initialized")
	}
	// TODO: Implement analysis logic
	return "Mock Analysis", nil
}
