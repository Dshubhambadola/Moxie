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
	
	model := s.Client.GenerativeModel("gemini-flash-latest")
	respSchema := `
	{
		"feedback": "Two sentence summary of the speech.",
		"scores": {
			"clarity": 85,
			"pacing": 70,
			"confidence": 90,
			"energy": 80
		}
	}
	`
	prompt := fmt.Sprintf("Analyze this speech transcript. Return ONLY valid JSON matching this schema: %s. \n\nTranscript: %s", respSchema, text)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return "", err
	}

	if len(resp.Candidates) > 0 && len(resp.Candidates[0].Content.Parts) > 0 {
		return fmt.Sprintf("%s", resp.Candidates[0].Content.Parts[0]), nil
	}

	return "No feedback generated.", nil
}
