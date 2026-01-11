import { useState, useRef, useEffect, useCallback } from 'react';

interface AudioRecorderState {
    isRecording: boolean;
    transcript: string;
    error: string | null;
}

export function useAudioRecorder() {
    const [state, setState] = useState<AudioRecorderState>({
        isRecording: false,
        transcript: '',
        error: null,
    });

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const socket = useRef<WebSocket | null>(null);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Connect to Backend WebSocket
            // Note: In production, use wss and proper host
            const ws = new WebSocket('ws://localhost:8080/api/ws');
            socket.current = ws;

            ws.onopen = () => {
                console.log('Connected to backend');

                // Initialize MediaRecorder
                // sending audio/webm;codecs=opus
                const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
                mediaRecorder.current = recorder;

                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
                        ws.send(event.data);
                    }
                };

                recorder.start(250); // Send chunk every 250ms
                setState(prev => ({ ...prev, isRecording: true, error: null }));
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    // Deepgram transcripts are usually deeply nested
                    // Assuming backend sends the raw message or a simplified one.
                    // If raw: data.channel.alternatives[0].transcript
                    // Let's accumulate for now.

                    const newTranscript = data?.channel?.alternatives?.[0]?.transcript;
                    if (newTranscript) {
                        setState(prev => ({
                            ...prev,
                            transcript: prev.transcript + ' ' + newTranscript
                        }));
                    }
                } catch (e) {
                    console.error('Error parsing message', e);
                }
            };

            ws.onerror = (e) => {
                console.error('WebSocket Error', e);
                setState(prev => ({ ...prev, error: 'Connection error' }));
            };

        } catch (err: any) {
            console.error('Failed to start recording', err);
            setState(prev => ({ ...prev, error: err.message }));
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorder.current && state.isRecording) {
            mediaRecorder.current.stop();
            mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
            mediaRecorder.current = null;
        }
        if (socket.current) {
            socket.current.close();
            socket.current = null;
        }
        setState(prev => ({ ...prev, isRecording: false }));
    }, [state.isRecording]);

    return {
        ...state,
        startRecording,
        stopRecording
    };
}
