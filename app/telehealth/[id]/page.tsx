'use client';

import { useParams, useRouter } from 'next/navigation';
import { PhoneOff, Mic, Video, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function TelehealthRoom() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div>
          <h1 className="text-lg font-semibold">Secure Telehealth Session</h1>
          <p className="text-sm text-slate-400">Appointment ID: {params.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-500">Encrypted</span>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 p-6 flex flex-col md:flex-row gap-6">
        {/* Remote Video (Client) */}
        <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10 pointer-events-none"></div>
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-slate-700 flex items-center justify-center mb-4 border-4 border-slate-600">
              <User className="h-10 w-10 text-slate-400" />
            </div>
            <p className="text-lg font-medium text-slate-300">Waiting for client to join...</p>
          </div>
          <div className="absolute bottom-4 left-4 z-20">
            <span className="bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium">
              Client
            </span>
          </div>
        </div>

        {/* Local Video (Provider) */}
        <div className="w-full md:w-80 h-64 md:h-auto bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center relative shadow-xl">
          <User className="h-16 w-16 text-slate-600" />
          <div className="absolute bottom-4 left-4">
            <span className="bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium">
              You (Provider)
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="h-24 bg-slate-900 flex items-center justify-center gap-4 px-6 pb-6 pt-2">
        <Button variant="outline" size="lg" className="rounded-full h-14 w-14 p-0 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white">
          <Mic className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="lg" className="rounded-full h-14 w-14 p-0 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white">
          <Video className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="lg" className="rounded-full h-14 w-14 p-0 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white hidden sm:flex">
          <Settings className="h-6 w-6" />
        </Button>
        <Button 
          size="lg" 
          className="rounded-full px-8 h-14 bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-900/20 ml-4 transition-all"
          onClick={() => router.push('/dashboard')}
        >
          <PhoneOff className="h-5 w-5 mr-2" />
          Leave Session
        </Button>
      </div>
    </div>
  );
}
