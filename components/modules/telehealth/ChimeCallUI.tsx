'use client';

import React, { useState } from 'react';
import { 
  VideoTileGrid, 
  useLocalVideo,
  useToggleLocalMute,
  useMeetingManager
} from 'amazon-chime-sdk-component-library-react';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChimeCallUI() {
  const router = useRouter();
  const meetingManager = useMeetingManager();
  
  const { toggleVideo, isVideoEnabled } = useLocalVideo();
  const { muted, toggleMute } = useToggleLocalMute();

  const [isLeaving, setIsLeaving] = useState(false);

  const handleLeave = async () => {
    setIsLeaving(true);
    await meetingManager.leave();
    router.push('/ehr');
  };

  return (
    <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      {/* Video Grid using Chime Component Library */}
      <div className="w-full h-full p-4 relative">
        <VideoTileGrid 
          noRemoteVideoView={
            <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-white/10">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <Video className="w-10 h-10 text-emerald-400 opacity-50" />
              </div>
              <p className="text-white/60 font-medium text-lg">Waiting for others to join...</p>
            </div>
          }
        />
      </div>

      {/* Cinematic Floating Control Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-2xl border border-white/10 px-6 py-4 rounded-full shadow-2xl transition-all duration-500 hover:bg-black/50 z-50">
        <button
          onClick={toggleMute}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            muted ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {muted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <button
          onClick={toggleVideo}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            !isVideoEnabled ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {!isVideoEnabled ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </button>

        <div className="w-px h-8 bg-white/10 mx-2" />

        <button
          onClick={handleLeave}
          disabled={isLeaving}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-all shadow-lg shadow-red-500/25 flex items-center gap-2 disabled:opacity-50"
        >
          <PhoneOff className="w-5 h-5" />
          {isLeaving ? 'Ending...' : 'End Session'}
        </button>
      </div>
    </div>
  );
}
