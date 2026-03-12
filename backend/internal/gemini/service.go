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

func (s *Service) AnalyzeText(ctx context.Context, text string, personaId string) (string, error) {
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

	// Default Persona
	personaInstruction := "You are a standard, balanced speech coach. Provide constructive feedback on clarity, pacing, and confidence."

	switch personaId {
	case "executive":
		personaInstruction = "You are 'The Executive', a very direct, concise, and tough professional. Focus heavily on eliminating filler words, getting straight to the point, and maintaining a commanding presence. Be brutally honest if the pacing is slow or clarity is poor."
	case "encourager":
		personaInstruction = "You are 'The Encourager', a highly supportive and positive speech coach. Always highlight the speaker's strengths first. Be gentle when suggesting areas for improvement. Your goal is to build their confidence."
	case "interviewer":
		personaInstruction = "You are 'The Interviewer', a tough and probing evaluator. You are looking for structure, logical flow, and extreme confidence under pressure. Be critical of disorganized thoughts."
	}

	prompt := fmt.Sprintf("%s\n\nAnalyze this speech transcript. Return ONLY valid JSON matching this schema: %s. \n\nTranscript: %s", personaInstruction, respSchema, text)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return "", err
	}

	if len(resp.Candidates) > 0 && len(resp.Candidates[0].Content.Parts) > 0 {
		return fmt.Sprintf("%s", resp.Candidates[0].Content.Parts[0]), nil
	}

	return "No feedback generated.", nil
}
