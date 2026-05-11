'use client';

import { useState, useEffect } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Grid3X3, 
  X, 
  Clock, 
  User, 
  History,
  PhoneCall
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Device, Call } from '@/lib/twilio/mockVoiceSdk';
// Note: When deploying to production with actual Twilio installed, swap this import:
// import { Device, Call } from '@twilio/voice-sdk';

interface VoipDialerProps {
  onClose: () => void;
}

export function VoipDialer({ onClose }: VoipDialerProps) {
  const { activeCall, setActiveCall, updateActiveCall } = useStore();
  const [number, setNumber] = useState('');
  const [isKeypadOpen, setIsKeypadOpen] = useState(true);
  const [device, setDevice] = useState<Device | null>(null);
  const [twilioCall, setTwilioCall] = useState<Call | null>(null);

  // Initialize Twilio Device
  useEffect(() => {
    let mounted = true;
    const initDevice = async () => {
      try {
        const res = await fetch('/api/twilio/token');
        const data = await res.json();
        if (data.token && mounted) {
          const newDevice = new Device(data.token);
          newDevice.on('registered', () => console.log('Twilio Device registered'));
          setDevice(newDevice);
        }
      } catch (err) {
        console.error('Failed to init Twilio device', err);
      }
    };
    initDevice();
    
    return () => {
      mounted = false;
      // In a real app we might destroy the device here, but for hot-reloading 
      // stability we'll let it be garbage collected
    };
  }, []);

  // Simulated active call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeCall?.status === 'connected') {
      interval = setInterval(() => {
        updateActiveCall({ duration: activeCall.duration + 1 });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCall?.status, activeCall?.duration, updateActiveCall]);

  const handleDial = async () => {
    if (!number) return;
    
    // Set up UI for active call
    const newCall = {
      id: Math.random().toString(36).substr(2, 9),
      number,
      status: 'ringing' as const,
      duration: 0,
      startTime: new Date().toISOString(),
      isMuted: false,
    };
    
    setActiveCall(newCall);

    // If we have a Twilio device, route the call through it
    if (device) {
      try {
        const call = await device.connect({ params: { To: number } });
        setTwilioCall(call);

        call.on('accept', () => {
          updateActiveCall({ status: 'connected' });
        });

        call.on('disconnect', () => {
          updateActiveCall({ status: 'ended' });
          setTimeout(() => {
            setActiveCall(null);
            setNumber('');
            setTwilioCall(null);
          }, 2000);
        });

        call.on('mute', (isMuted: boolean) => {
          updateActiveCall({ isMuted });
        });
      } catch (err) {
        console.error('Call failed', err);
        updateActiveCall({ status: 'ended' });
        setTimeout(() => {
          setActiveCall(null);
          setNumber('');
        }, 2000);
      }
    } else {
      // Fallback if no device available
      setTimeout(() => {
        updateActiveCall({ status: 'connected' });
      }, 2000);
    }
  };

  const handleEndCall = () => {
    if (twilioCall) {
      twilioCall.disconnect();
    } else {
      updateActiveCall({ status: 'ended' });
      setTimeout(() => {
        setActiveCall(null);
        setNumber('');
      }, 2000);
    }
  };

  const handleMuteToggle = () => {
    if (twilioCall && activeCall) {
      twilioCall.mute(!activeCall.isMuted);
    } else if (activeCall) {
      updateActiveCall({ isMuted: !activeCall.isMuted });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDigit = (digit: string) => {
    setNumber(prev => prev + digit);
  };

  const deleteDigit = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 w-80 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-8">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
            <Phone className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Marshi Family Therapy</h3>
            <p className="text-[10px] text-slate-400">Business Line: (555) 123-4567</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-[380px] p-6 flex flex-col items-center overflow-hidden">
        {activeCall ? (
          // Active Call View
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-4 relative">
              <User className="w-8 h-8 text-slate-400" />
              {activeCall.status === 'connected' && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
              )}
            </div>
            
            <h2 className="text-xl font-bold text-slate-100 mb-1">{activeCall.number}</h2>
            <p className={cn(
              "text-sm font-medium mb-8",
              activeCall.status === 'ringing' ? "text-amber-400" :
              activeCall.status === 'ended' ? "text-rose-400" : "text-emerald-400"
            )}>
              {activeCall.status === 'ringing' && 'Ringing...'}
              {activeCall.status === 'connected' && formatTime(activeCall.duration)}
              {activeCall.status === 'ended' && 'Call Ended'}
            </p>

            <div className="flex items-center gap-6">
              <button 
                onClick={handleMuteToggle}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                  activeCall.isMuted 
                    ? "bg-rose-500/20 text-rose-400" 
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                )}
                disabled={activeCall.status === 'ended'}
              >
                {activeCall.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button 
                onClick={handleEndCall}
                className="w-16 h-16 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 transition-transform active:scale-95"
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              <button 
                className="w-12 h-12 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition-colors"
                disabled={activeCall.status === 'ended'}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          // Dialer View
          <div className="w-full h-full flex flex-col animate-in fade-in zoom-in-95">
            {isKeypadOpen ? (
              <div className="flex flex-col flex-1">
                <div className="w-full text-center mb-6 h-12 flex items-center justify-center relative shrink-0">
                  <span className="text-3xl font-light text-slate-100 tracking-wider">
                    {number || 'Enter number'}
                  </span>
                  {number && (
                    <button 
                      onClick={deleteDigit}
                      className="absolute right-0 p-2 text-slate-400 hover:text-slate-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 shrink-0">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                    <button
                      key={digit}
                      onClick={() => handleDigit(digit)}
                      className="w-16 h-16 mx-auto rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-200 text-2xl font-light flex items-center justify-center transition-all active:scale-95"
                    >
                      {digit}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center mt-auto shrink-0 pb-2">
                  <button 
                    onClick={handleDial}
                    disabled={!number}
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95",
                      number ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20" : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    )}
                  >
                    <Phone className="w-7 h-7" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 w-full overflow-y-auto pr-1 -mr-1 pb-4">
                <h4 className="text-xs font-semibold text-slate-400 mb-3 px-1 uppercase tracking-wider">Recent Calls</h4>
                <div className="space-y-1">
                  {[
                    { name: 'Alexander Marshi', number: '(555) 019-8234', time: '10:42 AM', type: 'incoming', missed: true },
                    { name: 'Sarah Jenkins', number: '(555) 012-9931', time: 'Yesterday', type: 'outgoing', missed: false },
                    { name: 'Client: Doe, J.', number: '(555) 018-7722', time: 'Tuesday', type: 'incoming', missed: false },
                    { name: 'Unknown', number: '(555) 019-0012', time: 'Monday', type: 'incoming', missed: true },
                    { name: 'Pharmacy (CVS)', number: '(555) 882-9912', time: 'Monday', type: 'outgoing', missed: false },
                  ].map((call, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        setNumber(call.number.replace(/\D/g, ''));
                        setIsKeypadOpen(true);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="overflow-hidden">
                          <p className={cn("text-sm font-medium truncate", call.missed ? "text-rose-400" : "text-slate-200")}>{call.name}</p>
                          <p className="text-xs text-slate-500 truncate">{call.number}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] text-slate-500">{call.time}</span>
                        <PhoneCall className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Tabs */}
      {!activeCall && (
        <div className="flex border-t border-slate-700/50 bg-slate-800/50 p-2">
          <button 
            onClick={() => setIsKeypadOpen(true)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-2 rounded-lg text-xs font-medium transition-colors",
              isKeypadOpen ? "text-brand-400 bg-slate-700/50" : "text-slate-400 hover:text-slate-300"
            )}
          >
            <Grid3X3 className="w-4 h-4 mb-1" />
            Keypad
          </button>
          <button 
            onClick={() => setIsKeypadOpen(false)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-2 rounded-lg text-xs font-medium transition-colors",
              !isKeypadOpen ? "text-brand-400 bg-slate-700/50" : "text-slate-400 hover:text-slate-300"
            )}
          >
            <History className="w-4 h-4 mb-1" />
            Recents
          </button>
        </div>
      )}
    </div>
  );
}
