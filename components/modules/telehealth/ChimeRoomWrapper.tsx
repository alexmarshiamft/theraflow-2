'use client';

import React, { useEffect, useState } from 'react';
import { 
  MeetingProvider, 
  useMeetingManager,
  lightTheme
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from 'styled-components';
import { MeetingSessionConfiguration, ConsoleLogger, LogLevel } from 'amazon-chime-sdk-js';
import ChimeCallUI from './ChimeCallUI';

interface ChimeRoomWrapperProps {
  appointmentId: string;
}

const ChimeInitializer = ({ appointmentId, onError }: { appointmentId: string, onError: (e: any) => void }) => {
  const meetingManager = useMeetingManager();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const initChime = async () => {
      try {
        const response = await fetch('/api/chime/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: appointmentId,
            userId: `user-${Math.floor(Math.random() * 10000)}`
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to join Chime meeting');
        }

        const { meeting, attendee } = await response.json();
        
        const meetingSessionConfiguration = new MeetingSessionConfiguration(meeting, attendee);
        
        // This relies on amazon-chime-sdk-component-library-react's MeetingManager
        await meetingManager.join(meetingSessionConfiguration);
        
        // At this point, we start the session
        await meetingManager.start();

        if (isMounted) setIsInitializing(false);
      } catch (err) {
        console.error('Error initializing Chime:', err);
        if (isMounted) {
          onError(err);
          setIsInitializing(false);
        }
      }
    };

    initChime();

    return () => {
      isMounted = false;
      meetingManager.leave();
    };
  }, [appointmentId, meetingManager, onError]);

  if (isInitializing) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <p className="text-emerald-400 font-medium">Securing connection to AWS Chime...</p>
      </div>
    );
  }

  return <ChimeCallUI />;
};

export default function ChimeRoomWrapper({ appointmentId }: ChimeRoomWrapperProps) {
  const [error, setError] = useState<any>(null);

  // We override the default Chime theme to match our dark/cinematic Apple-standard look
  const theme = {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      background: 'transparent',
    }
  };

  if (error) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white z-50">
        <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl max-w-md text-center backdrop-blur-xl">
          <h3 className="text-red-400 font-medium text-lg mb-2">Connection Failed</h3>
          <p className="text-white/70 text-sm">{error.message || 'Could not connect to the telehealth server.'}</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <MeetingProvider>
        <ChimeInitializer appointmentId={appointmentId} onError={setError} />
      </MeetingProvider>
    </ThemeProvider>
  );
}
