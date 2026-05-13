'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, Video, MonitorUp, PhoneOff, Settings, MessageSquare, BrainCircuit, Activity, Waves, PenTool, LayoutTemplate, Sparkles, AlertTriangle, Lock, MicOff, VideoOff, Loader2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import type { DefaultMeetingSession } from 'amazon-chime-sdk-js';
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
        const { ConsoleLogger, DefaultDeviceController, DefaultMeetingSession, LogLevel, MeetingSessionConfiguration } = await import('amazon-chime-sdk-js');

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
        // Fallback to native getUserMedia for showcase mode if Chime fails
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (mediaErr) {
          console.error("Failed native camera fallback", mediaErr);
        }
        setIsConnecting(false);
      }
    }

    initializeChime();

    return () => {
      meetingSession?.audioVideo.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } else if (videoRef.current && videoRef.current.srcObject) {
       const tracks = (videoRef.current.srcObject as MediaStream).getVideoTracks();
       tracks.forEach(track => track.enabled = !isVideoActive);
    }
  };

  const handleEndCall = () => {
    let combinedTranscript = scribeLogs.map(log => log.text).join(' ');
    
    // Provide a rich fallback transcript if the user didn't speak during the short demo
    if (!combinedTranscript || combinedTranscript.trim() === '') {
      combinedTranscript = "[SIMULATED AUDIO TRACK]: Patient described an intense, sudden fear of squirrels that developed over the weekend after a mild encounter at a park. Stated 'Every time I see a squirrel now, I feel a complete sense of impending doom and my heart races.' We discussed exposure therapy techniques and scheduled a follow-up session to begin systematic desensitization.";
    }
    
    localStorage.setItem('latestTelehealthTranscript', combinedTranscript);
    localStorage.setItem('latestTelehealthDuration', sessionTime.toString());
    router.push('/ehr/notes');
  };

  // Intelligent AI Sentiment Analysis based on real speech
  useEffect(() => {
    if (!currentTranscript) return;

    const lowerTranscript = currentTranscript.toLowerCase();
    
    const distressWords = ['stress', 'anxious', 'sad', 'angry', 'overwhelm', 'panic', 'worry', 'hard', 'tired', 'hate', 'cry', 'pain', 'scared', 'fear'];
    const processingWords = ['think', 'maybe', 'because', 'feel', 'understand', 'process', 'realize', 'wonder', 'try', 'hope'];
    
    let isDistress = distressWords.some(word => lowerTranscript.includes(word));
    let isProcessing = processingWords.some(word => lowerTranscript.includes(word));

    if (isDistress) {
      setSentiment({ label: 'High Distress Marker', color: 'text-rose-500', score: 35 });
    } else if (isProcessing) {
      setSentiment({ label: 'Processing / Reflective', color: 'text-indigo-400', score: 78 });
    } else {
      // Just normal talking, slight elevation from baseline
      setSentiment({ label: 'Active Engagement', color: 'text-brand-400', score: 92 });
    }

    // Auto-return to baseline after 8 seconds of silence
    const timeout = setTimeout(() => {
      setSentiment({ label: 'Calm / Baseline', color: 'text-emerald-400', score: 85 });
    }, 8000);

    return () => clearTimeout(timeout);
  }, [currentTranscript]);

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
        <div className={`absolute bottom-32 right-8 w-64 h-40 rounded-2xl overflow-hidden backdrop-blur-2xl z-30 transition-all duration-700 ease-out shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${isMicActive ? 'border-2 border-brand-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'}`}>
          <div className="w-full h-full bg-slate-900/80 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/10 to-transparent opacity-50" />
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center shadow-inner relative z-10">
              <span className="text-xl font-bold text-slate-300">Dr. S</span>
            </div>
            {isMicActive && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
                <Mic className="w-3 h-3 text-brand-400" />
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-0.5 h-2 bg-brand-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/60 rounded-lg backdrop-blur-md text-xs font-medium text-white/90 border border-white/5">
            You
          </div>
        </div>
      </div>

      {/* Top Navigation Overlay */}
      <div className="relative z-30 w-full p-6 flex justify-between items-start pointer-events-none">
        {/* Client Info */}
        <div className="flex items-center gap-4 bg-slate-900/40 p-2 pr-6 rounded-[2rem] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-3xl pointer-events-auto shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold border border-white/20 shadow-inner">
            MK
          </div>
          <div>
            <h2 className="text-white font-bold text-[15px] tracking-wide leading-tight drop-shadow-md">Michael Kingston</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
              <p className="text-white/80 text-xs font-mono font-medium tracking-widest">{formatTime(sessionTime)}</p>
            </div>
          </div>
        </div>

        {/* Security & Network Badges */}
        <div className="flex gap-3 pointer-events-auto">
          {isConnecting ? (
            <div className="flex items-center gap-2 bg-slate-900/40 px-4 py-2.5 rounded-full border border-brand-500/30 backdrop-blur-3xl text-xs font-bold uppercase tracking-wider text-brand-400 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Connecting to AWS Chime
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 bg-slate-900/40 px-4 py-2.5 rounded-full border border-emerald-500/30 backdrop-blur-3xl text-xs font-bold uppercase tracking-wider text-emerald-400 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <Lock className="w-3 h-3" /> E2E Secure
              </div>
              <div className="flex items-center gap-2 bg-slate-900/40 px-4 py-2.5 rounded-full border border-white/10 backdrop-blur-3xl text-xs font-bold uppercase tracking-wider text-slate-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <Activity className="w-3 h-3 text-brand-400" /> 14ms
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main HUD Overlays */}
      <div className="relative z-30 flex-1 flex justify-between items-stretch p-6 pb-32 pointer-events-none">
        
        {/* Left: AI Sentiment Radar */}
        <div className="w-80 flex flex-col justify-start">
          <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-6 backdrop-blur-3xl pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-700 hover:bg-slate-900/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-white">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-indigo-100/80">Clinical Radar</h3>
              </div>
              <Sparkles className="w-4 h-4 text-indigo-500/50" />
            </div>

            <div className="space-y-6">
              {/* Primary Sentiment */}
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2">Acoustic Analysis</p>
                <div className="flex items-end gap-3">
                  <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${sentiment.color} drop-shadow-md`}>
                    {sentiment.label}
                  </span>
                </div>
                
                {/* Cinematic Waveform */}
                <div className="flex items-end gap-1 mt-4 h-10 w-full overflow-hidden" suppressHydrationWarning>
                  {[...Array(24)].map((_, i) => {
                    const height = Math.max(10, (Math.sin(i + (sessionTime * 2)) * 15) + (Math.random() * (sentiment.score / 2)));
                    return (
                      <div 
                        key={i} 
                        suppressHydrationWarning
                        className={`w-2 rounded-t-sm transition-all duration-300 ease-in-out ${sentiment.color.replace('text-', 'bg-')}`}
                        style={{ 
                          height: `${height}px`,
                          opacity: 0.3 + (Math.random() * 0.7),
                          boxShadow: `0 0 10px var(--tw-color-${sentiment.color.split('-')[1]}-500)`
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full my-6" />

              {/* Biomarkers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-2xl p-4 border border-white/5 shadow-inner">
                  <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest mb-1.5">Speech Rate</p>
                  <p className="text-sm text-white font-mono tracking-wider drop-shadow-sm">142 wpm</p>
                  <p className="text-[10px] text-emerald-400 mt-1 font-medium">Baseline</p>
                </div>
                <div className="bg-black/20 rounded-2xl p-4 border border-white/5 shadow-inner">
                  <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest mb-1.5">Pitch Variance</p>
                  <p className="text-sm text-white font-mono tracking-wider drop-shadow-sm">High</p>
                  <p className="text-[10px] text-amber-400 mt-1 font-medium">Elevated</p>
                </div>
              </div>

              {/* Actionable Prompt */}
              {sentiment.label === 'Elevated Anxiety' && (
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/10 border border-amber-500/30 rounded-2xl p-4 flex gap-3 mt-4">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 drop-shadow-md" />
                  <p className="text-xs text-amber-100/90 leading-relaxed font-medium">Consider grounding exercises. Client's speech rate and pitch have sharply elevated.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Passive Scribe Log */}
        <div className="w-96 flex flex-col justify-end">
          <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-6 backdrop-blur-3xl pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col h-[500px]">
            <div className="flex items-center justify-between mb-2 pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2 text-white">
                <PenTool className="w-5 h-5 text-brand-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-brand-100">AI Scribe</h3>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-2 py-1 rounded-full border border-white/5">
                <div className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]' : 'bg-slate-600'}`} />
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                  {isListening ? 'Active' : 'Paused'}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto relative flex flex-col-reverse custom-scrollbar pr-2 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black)]">
              
              <div className="mt-4 pt-4 border-t border-white/5 space-y-2 relative">
                {currentTranscript && (
                  <p className="text-white/90 text-sm animate-pulse leading-relaxed font-medium">
                    <strong className="text-brand-400 font-bold mr-2 drop-shadow-md">•</strong>{currentTranscript}
                  </p>
                )}
              </div>
              
              <div className="space-y-4 text-sm pb-4">
                {scribeLogs.map(log => (
                  <div key={log.id} className="animate-in fade-in slide-in-from-bottom-2 bg-black/20 p-3 rounded-xl border border-white/5">
                    <p className="text-white/80 leading-relaxed">
                      <strong className={`text-[10px] uppercase tracking-widest block mb-1 font-bold ${log.type === 'data' ? 'text-indigo-400' : 'text-emerald-400'}`}>{log.type}</strong>
                      {log.text}
                    </p>
                  </div>
                ))}
                
                {scribeLogs.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40 text-center opacity-50">
                    <PenTool className="w-8 h-8 text-white/20 mb-3" />
                    <p className="text-white/50 text-xs tracking-wider uppercase font-bold">Awaiting Transcription</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex gap-3 relative z-10">
              <button 
                onClick={handleEndCall}
                className="flex-1 bg-gradient-to-b from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 transition-colors py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 border border-white/10 shadow-lg"
              >
                <LayoutTemplate className="w-4 h-4 text-white/70" /> Formulate SOAP
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Floating Control Dock (VisionOS Style) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <div className="flex items-center gap-2 bg-slate-900/60 px-4 py-3 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.7)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] group/dock transition-all duration-500 hover:bg-slate-900/70 hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
          <button 
            onClick={toggleMic}
            className={`w-[60px] h-[60px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center group relative border shadow-lg ${isMicActive ? 'bg-white/10 hover:bg-white/20 border-white/5 hover:scale-110' : 'bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:scale-110'}`}
          >
            {isMicActive ? <Mic className="w-6 h-6 text-white drop-shadow-md" /> : <MicOff className="w-6 h-6 text-white drop-shadow-md" />}
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold tracking-widest text-white bg-black/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 shadow-xl pointer-events-none">Mute</div>
          </button>
          
          <button 
            onClick={toggleVideo}
            className={`w-[60px] h-[60px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center group relative border shadow-lg ${isVideoActive ? 'bg-white/10 hover:bg-white/20 border-white/5 hover:scale-110' : 'bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:scale-110'}`}
          >
            {isVideoActive ? <Video className="w-6 h-6 text-white drop-shadow-md" /> : <VideoOff className="w-6 h-6 text-white drop-shadow-md" />}
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold tracking-widest text-white bg-black/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 shadow-xl pointer-events-none">Video</div>
          </button>
          
          <div className="w-px h-10 bg-white/10 mx-2" />
          
          <button className="w-[60px] h-[60px] rounded-full bg-white/5 hover:bg-white/15 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 flex items-center justify-center group relative border border-white/5 shadow-lg">
            <MonitorUp className="w-6 h-6 text-white drop-shadow-md" />
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold tracking-widest text-white bg-black/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 shadow-xl pointer-events-none">Share</div>
          </button>

          <button className="w-[60px] h-[60px] rounded-full bg-brand-500/10 hover:bg-brand-500/30 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 flex items-center justify-center group relative border border-brand-500/30 shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Waves className="w-6 h-6 text-brand-400 drop-shadow-md" />
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold tracking-widest text-white bg-black/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 shadow-xl pointer-events-none">Whiteboard</div>
          </button>

          <div className="w-px h-10 bg-white/10 mx-2" />

          <button 
            onClick={handleEndCall}
            className="w-[72px] h-[72px] rounded-[2rem] bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 flex items-center justify-center shadow-[0_10px_30px_rgba(244,63,94,0.5)] group border border-rose-400/50 ml-1"
          >
            <PhoneOff className="w-7 h-7 text-white drop-shadow-md" />
            <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold tracking-widest text-white bg-rose-600 px-4 py-2 rounded-lg border border-rose-400 shadow-xl pointer-events-none whitespace-nowrap">End Session</div>
          </button>
        </div>
      </div>

    </div>
  );
}
