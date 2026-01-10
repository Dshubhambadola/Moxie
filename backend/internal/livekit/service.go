package livekit

import (
	"time"

	lksdk "github.com/livekit/server-sdk-go/v2"
	"github.com/livekit/protocol/auth"
)

type Service struct {
	ApiKey    string
	ApiSecret string
}

func NewService(apiKey, apiSecret string) *Service {
	return &Service{
		ApiKey:    apiKey,
		ApiSecret: apiSecret,
	}
}

func (s *Service) CreateToken(roomName, participantName string) (string, error) {
	at := auth.NewAccessToken(s.ApiKey, s.ApiSecret)
	grant := &auth.VideoGrant{
		RoomJoin: true,
		Room:     roomName,
	}
	at.AddGrant(grant).
		SetIdentity(participantName).
		SetValidFor(time.Hour)

	return at.ToJWT()
}
