'use client';

import { useState } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import '@livekit/components-styles';

export default function SessionPage() {
    const [token, setToken] = useState('');

    const getToken = async () => {
        try {
            const resp = await fetch('/api/livekit/token?room=practice-room&participant=user-1');
            const data = await resp.json();
            setToken(data.token);
        } catch (e) {
            console.error(e);
            alert("Failed to connect to backend");
        }
    };

    if (token === '') {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Practice Session</h1>
                    <p className="text-zinc-400 mb-8">Click to start your session.</p>
                    <button
                        onClick={getToken}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
                    >
                        Start Session
                    </button>
                </div>
            </div>
        );
    }

    return (
        <LiveKitRoom
            video={false}
            audio={true}
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            data-lk-theme="default"
            style={{ height: '100vh' }}
        >
            {/* Session Controls will go here */}
            <div className="flex items-center justify-center h-full text-white">
                Starting Room...
            </div>
        </LiveKitRoom>
    );
}
