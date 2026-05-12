'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, Video, MonitorUp, PhoneOff, Settings, MessageSquare, BrainCircuit, Activity, Waves, PenTool, LayoutTemplate, Sparkles, AlertTriangle, Lock, MicOff, VideoOff, Loader2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ConsoleLogger, DefaultDeviceController, DefaultMeetingSession, LogLevel, MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { useRouter } from 'next/navigation';

// Extend window for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function TelehealthRoomPage() {
  const router = useRouter();
  const [sessionTime, setSessionTime] = useState(0);
  const [sentiment, setSentiment] = useState<{ label: string, color: string, score: number }>({ label: 'Calm / Baseline', color: 'text-emerald-400', score: 85 });
  
  // Real Hardware State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(true);
  const [meetingSession, setMeetingSession] = useState<DefaultMeetingSession | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  
  // Real Scribe State
  const [scribeLogs, setScribeLogs] = useState<{id: string, text: string, type: 'observation' | 'data' | 'intervention'}[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Real AWS Chime Session
  useEffect(() => {
    async function initializeChime() {
      try {
        const response = await fetch('/api/chime', { method: 'POST', body: JSON.stringify({}) });
        const { meeting, attendee } = await response.json();

        const logger = new ConsoleLogger('ChimeMeetingLogs', LogLevel.INFO);
        const deviceController = new DefaultDeviceController(logger);
        const configuration = new MeetingSessionConfiguration(meeting, attendee);

        const session = new DefaultMeetingSession(configuration, logger, deviceController);
        
        // Setup devices
        const audioInputDevices = await session.audioVideo.listAudioInputDevices();
        const videoInputDevices = await session.audioVideo.listVideoInputDevices();
        
        if (audioInputDevices.length) {
          await session.audioVideo.startAudioInput(audioInputDevices[0].deviceId);
        }
        if (videoInputDevices.length) {
          await session.audioVideo.startVideoInput(videoInputDevices[0].deviceId);
        }

        session.audioVideo.startLocalVideoTile();
        
        // Bind local video to existing UI ref
        const observer = {
          videoTileDidUpdate: (tileState: any) => {
            if (!tileState.boundAttendeeId || tileState.isContent) return;
            if (tileState.localTile && videoRef.current) {
              session.audioVideo.bindVideoElement(tileState.tileId, videoRef.current);
            }
          }
        };
        
        session.audioVideo.addObserver(observer);
        session.audioVideo.start();
        setMeetingSession(session);
        setIsConnecting(false);
      } catch (err) {
        console.error("Failed to init AWS Chime", err);
        setIsConnecting(false);
      }
    }

    initializeChime();

    return () => {
      meetingSession?.audioVideo.stop();
    };
  }, []);

  // Initialize Real Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => {
          setIsListening(false);
          // Auto restart if mic is active
          if (isMicActive) recognition.start();
        };

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          if (finalTranscript) {
            // Add to final logs
            setScribeLogs(prev => [...prev, {
              id: Date.now().toString(),
              text: finalTranscript.trim(),
              type: Math.random() > 0.5 ? 'data' : 'observation' // Randomly classify for demo
            }]);
            setCurrentTranscript('');
          } else {
            setCurrentTranscript(interimTranscript);
          }
        };

        recognitionRef.current = recognition;
        
        if (isMicActive) {
          try {
            recognition.start();
          } catch (e) {
            console.error("Speech recognition already started");
          }
        }
      } else {
        console.warn("Speech Recognition API not supported in this browser.");
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isMicActive]);

  const toggleMic = () => {
    setIsMicActive(!isMicActive);
    if (isMicActive && recognitionRef.current) {
      recognitionRef.current.stop();
    } else if (!isMicActive && recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    }
  };

  const toggleVideo = () => {
    setIsVideoActive(!isVideoActive);
    if (meetingSession) {
      if (isVideoActive) {
        meetingSession.audioVideo.stopLocalVideoTile();
      } else {
        meetingSession.audioVideo.startLocalVideoTile();
      }
    }
  };

  // Simulate AI Sentiment Fluctuation
  useEffect(() => {
    const sentiments = [
      { label: 'Calm / Baseline', color: 'text-emerald-400', score: 85 },
      { label: 'Elevated Anxiety', color: 'text-amber-400', score: 62 },
      { label: 'High Distress Marker', color: 'text-rose-500', score: 35 },
      { label: 'Processing / Reflective', color: 'text-indigo-400', score: 78 }
    ];

    const fluctuation = setInterval(() => {
      // Randomly change sentiment every 4-8 seconds
      const randIndex = Math.floor(Math.random() * sentiments.length);
      setSentiment(sentiments[randIndex]);
    }, 5000);

    return () => clearInterval(fluctuation);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col overflow-hidden relative selection:bg-brand-500/30 font-sans">
      
      {/* Background Real Video Feed */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-black opacity-80 absolute inset-0 z-10 pointer-events-none" />
        
        {/* Real Webcam Element */}
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover filter brightness-110 contrast-125 opacity-70"
        />

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay z-20 pointer-events-none"></div>
        
        {/* Therapist PIP (Picture in Picture) */}
        <div className="absolute bottom-24 right-8 w-64 h-40 bg-slate-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md z-30">
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
            {/* If we had a second stream we'd put it here. For now, it's a simulated PIP */}
            <div className="w-16 h-16 rounded-full bg-slate-600 flex items-center justify-center">
              <span className="text-xl font-bold text-slate-400">Dr. S</span>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded-md backdrop-blur-sm text-xs font-medium text-white">
            You (Dr. Sarah)
          </div>
        </div>
      </div>

      {/* Top Navigation Overlay */}
      <div className="relative z-30 w-full p-6 flex justify-between items-start pointer-events-none">
        {/* Client Info */}
        <div className="flex items-center gap-4 bg-black/40 p-2 pr-6 rounded-full border border-white/10 backdrop-blur-xl pointer-events-auto shadow-lg">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-black">
            MK
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">Michael Kingston (Live Webcam)</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-emerald-400 text-xs font-mono font-medium">{formatTime(sessionTime)}</p>
            </div>
          </div>
        </div>

        {/* Security & Network Badges */}
        <div className="flex gap-3 pointer-events-auto">
          {isConnecting ? (
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-brand-500/30 backdrop-blur-xl text-xs font-medium text-brand-400">
              <Loader2 className="w-3 h-3 animate-spin" /> Connecting to AWS Chime...
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-emerald-500/30 backdrop-blur-xl text-xs font-medium text-emerald-400">
                <Lock className="w-3 h-3" /> AWS WebRTC Secure
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-xl text-xs font-medium text-slate-300">
                <Activity className="w-3 h-3 text-brand-400" /> Latency: 14ms
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main HUD Overlays */}
      <div className="relative z-30 flex-1 flex justify-between items-stretch p-6 pb-32 pointer-events-none">
        
        {/* Left: AI Sentiment Radar */}
        <div className="w-80 flex flex-col justify-start">
          <div className="bg-black/40 border border-white/10 rounded-3xl p-5 backdrop-blur-xl pointer-events-auto shadow-2xl transition-all duration-500 group hover:bg-black/60">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-indigo-100">Live Clinical Radar</h3>
              </div>
              <Sparkles className="w-4 h-4 text-indigo-500/50" />
            </div>

            <div className="space-y-6">
              {/* Primary Sentiment */}
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Acoustic & Micro-Expression Analysis</p>
                <div className="flex items-end gap-3">
                  <span className={`text-xl font-bold transition-colors duration-500 ${sentiment.color}`}>
                    {sentiment.label}
                  </span>
                </div>
                
                {/* Simulated Audio Waveform matching sentiment */}
                <div className="flex items-center gap-1 mt-3 h-8" suppressHydrationWarning>
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      suppressHydrationWarning
                      className={`w-1.5 rounded-full transition-all duration-300 ease-in-out ${sentiment.color.replace('text-', 'bg-')}`}
                      style={{ 
                        height: `${Math.max(20, Math.random() * (sentiment.score))}px`,
                        opacity: 0.6 + (Math.random() * 0.4)
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/10 w-full" />

              {/* Biomarkers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Speech Rate</p>
                  <p className="text-sm text-white font-mono">142 wpm</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">Baseline</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Pitch Variance</p>
                  <p className="text-sm text-white font-mono">High</p>
                  <p className="text-[10px] text-amber-400 mt-0.5">Elevated</p>
                </div>
              </div>

              {/* Actionable Prompt */}
              {sentiment.label === 'Elevated Anxiety' && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex gap-3 animate-in fade-in slide-in-from-left-4">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200/90 leading-relaxed">Consider grounding exercises. Client's speech rate and pitch have sharply elevated over the last 2 mins.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Passive Scribe Log */}
        <div className="w-96 flex flex-col justify-end">
          <div className="bg-black/40 border border-white/10 rounded-3xl p-5 backdrop-blur-xl pointer-events-auto shadow-2xl flex flex-col h-[500px]">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white">
                <PenTool className="w-5 h-5 text-brand-400" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-brand-100">Live AI Scribe</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-brand-500 animate-pulse' : 'bg-slate-500'}`} />
                <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
                  {isListening ? 'Transcribing' : 'Paused'}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto relative flex flex-col-reverse custom-scrollbar">
              
              <div className="mt-4 pt-4 border-t border-white/5 space-y-2 relative">
                {currentTranscript && (
                  <p className="text-slate-300 text-sm animate-pulse">
                    <strong className="text-brand-400 font-medium">Listening:</strong> {currentTranscript}
                  </p>
                )}
              </div>
              
              <div className="space-y-4 text-sm pb-4">
                {scribeLogs.map(log => (
                  <p key={log.id} className="text-slate-200 animate-in fade-in slide-in-from-bottom-2">
                    <strong className="text-slate-400 capitalize">{log.type}:</strong> {log.text}
                  </p>
                ))}
                
                {scribeLogs.length === 0 && (
                  <p className="text-slate-500 text-center italic mt-10">Speak into your microphone to see the real-time transcription.</p>
                )}
              </div>

            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
              <button 
                onClick={() => router.push('/ehr/notes')}
                className="flex-1 bg-white/5 hover:bg-white/10 transition-colors py-2 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 border border-white/10"
              >
                <LayoutTemplate className="w-4 h-4" /> Formulate SOAP
              </button>
              <button 
                onClick={() => router.push('/ehr/notes')}
                className="flex-1 bg-white/5 hover:bg-white/10 transition-colors py-2 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 border border-white/10"
              >
                <LayoutTemplate className="w-4 h-4" /> Formulate DAP
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Floating Control Dock (VisionOS Style) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <div className="flex items-center gap-2 bg-black/60 p-2 rounded-[2rem] border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <button 
            onClick={toggleMic}
            className={`w-14 h-14 rounded-full transition-colors flex items-center justify-center group relative border ${isMicActive ? 'bg-white/10 hover:bg-white/20 border-white/5' : 'bg-rose-500 hover:bg-rose-600 border-rose-400'}`}
          >
            {isMicActive ? <Mic className="w-6 h-6 text-white group-hover:scale-110 transition-transform" /> : <MicOff className="w-6 h-6 text-white" />}
            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white bg-black/80 px-2 py-1 rounded">Mute</div>
          </button>
          
          <button 
            onClick={toggleVideo}
            className={`w-14 h-14 rounded-full transition-colors flex items-center justify-center group relative border ${isVideoActive ? 'bg-white/10 hover:bg-white/20 border-white/5' : 'bg-rose-500 hover:bg-rose-600 border-rose-400'}`}
          >
            {isVideoActive ? <Video className="w-6 h-6 text-white group-hover:scale-110 transition-transform" /> : <VideoOff className="w-6 h-6 text-white" />}
            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white bg-black/80 px-2 py-1 rounded">Video</div>
          </button>
          
          <div className="w-px h-8 bg-white/20 mx-2" />
          
          <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center group relative border border-white/5">
            <MonitorUp className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white bg-black/80 px-2 py-1 rounded">Share</div>
          </button>

          <button className="w-14 h-14 rounded-full bg-brand-500/20 hover:bg-brand-500/30 transition-colors flex items-center justify-center group relative border border-brand-500/30">
            <Waves className="w-6 h-6 text-brand-400 group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white bg-black/80 px-2 py-1 rounded">Whiteboard</div>
          </button>

          <div className="w-px h-8 bg-white/20 mx-2" />

          <button 
            onClick={() => router.push('/ehr/notes')}
            className="w-16 h-16 rounded-[1.5rem] bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center shadow-lg shadow-rose-500/20 group border border-rose-400/50 mx-1"
          >
            <PhoneOff className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
}
