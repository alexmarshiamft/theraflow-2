'use client';

import { useState } from 'react';
import { useStore, TrackedHour } from '@/lib/store';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Settings2, 
  User, 
  Calendar, 
  Activity, 
  Bot,
  BrainCircuit,
  Filter,
  Loader2,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function HoursTrackerPage() {
  const trackedHours = useStore(state => state.trackedHours);
  const verifyHour = useStore(state => state.verifyHour);
  const addTrackedHours = useStore(state => state.addTrackedHours);
  
  const [filter, setFilter] = useState<'all' | 'pending_verification' | 'verified' | 'adjusted'>('pending_verification');
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [editingHourId, setEditingHourId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TrackedHour>>({});

  const handleSyncEHR = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  const filteredHours = trackedHours.filter(h => filter === 'all' ? true : h.status === filter);
  
  const totalVerified = trackedHours.filter(h => h.status === 'verified' || h.status === 'adjusted').reduce((acc, h) => acc + h.durationMinutes, 0) / 60;
  const targetHours = 3000;
  const progressPercentage = Math.min((totalVerified / targetHours) * 100, 100);

  const handleVerify = (id: string) => {
    verifyHour(id);
  };

  const handleAdjustClick = (hour: TrackedHour) => {
    setEditingHourId(hour.id);
    setEditForm({
      durationMinutes: hour.durationMinutes,
      type: hour.type,
      notes: hour.notes || ''
    });
  };

  const handleSaveAdjustment = (id: string) => {
    verifyHour(id, editForm);
    setEditingHourId(null);
  };

  return (
    <div className="flex h-full flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            AI Hours Tracker
          </h1>
          <p className="text-muted-foreground mt-1">
            Automatically logged clinical hours. Verify or adjust for licensure compliance.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2" onClick={handleSyncEHR} disabled={isSyncing}>
            {isSyncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
            {isSyncing ? 'Syncing...' : 'Sync with EHR'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="rounded-xl border border-border/50 bg-card p-6 shadow-sm relative overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Verified Progress</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold">{totalVerified.toFixed(1)}</h3>
                <span className="text-sm text-muted-foreground">/ {targetHours} hrs</span>
              </div>
            </div>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div
          className="rounded-xl border border-border/50 bg-card p-6 shadow-sm relative overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-100"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-orange-500/10 p-3">
              <AlertCircle className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Action Required</p>
              <h3 className="text-2xl font-bold">
                {trackedHours.filter(h => h.status === 'pending_verification').length}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Pending Verification</p>
            </div>
          </div>
        </div>

        <div
          className="rounded-xl border border-border/50 bg-card p-6 shadow-sm relative overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-200"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">AI Tracking Status</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-emerald-500">Active & Syncing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {(['pending_verification', 'verified', 'adjusted', 'all'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              filter === f 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {f === 'pending_verification' ? 'Pending' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-12 gap-4 border-b border-border/50 bg-muted/50 p-4 text-sm font-medium text-muted-foreground">
          <div className="col-span-3">Date / Time</div>
          <div className="col-span-3">Client / Subject</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Duration</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          <>
            {filteredHours.length === 0 && (
              <div 
                className="flex flex-col items-center justify-center h-48 text-muted-foreground animate-in fade-in"
              >
                <CheckCircle2 className="h-12 w-12 text-primary/20 mb-4" />
                <p>All caught up! No hours matching this filter.</p>
              </div>
            )}

            {filteredHours.map((hour) => (
              <div
                key={hour.id}
                className={cn(
                  "group mb-2 grid grid-cols-12 gap-4 rounded-lg border p-4 items-center transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
                  hour.status === 'pending_verification' 
                    ? "border-orange-500/30 bg-orange-500/5 hover:border-orange-500/50" 
                    : "border-border/50 bg-card hover:border-primary/50"
                )}
              >
                {editingHourId === hour.id ? (
                  // Edit Mode
                  <div className="col-span-12 grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{new Date(hour.date).toLocaleDateString()}</span>
                    </div>
                    <div className="col-span-3">
                      <span className="text-sm font-medium">{hour.client}</span>
                    </div>
                    <div className="col-span-2">
                      <select 
                        value={editForm.type}
                        onChange={e => setEditForm({ ...editForm, type: e.target.value as TrackedHour['type'] })}
                        className="w-full bg-background border border-input rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Direct Counseling">Direct Counseling</option>
                        <option value="Diagnosis and Treatment">Diagnosis and Treatment</option>
                        <option value="Non-Clinical">Non-Clinical</option>
                        <option value="Individual/Triadic Supervision">Individual/Triadic Supervision</option>
                        <option value="Group Supervision">Group Supervision</option>
                      </select>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <input 
                        type="number" 
                        value={editForm.durationMinutes}
                        onChange={e => setEditForm({ ...editForm, durationMinutes: parseInt(e.target.value) || 0 })}
                        className="w-20 bg-background border border-input rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-xs text-muted-foreground">mins</span>
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setEditingHourId(null)}>Cancel</Button>
                      <Button size="sm" onClick={() => handleSaveAdjustment(hour.id)}>Save</Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="col-span-3 flex items-center gap-3">
                      <div className={cn(
                        "rounded-full p-2",
                        hour.status === 'pending_verification' ? "bg-orange-500/20 text-orange-500" : "bg-emerald-500/20 text-emerald-500"
                      )}>
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{new Date(hour.date).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">{new Date(hour.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{hour.client}</span>
                    </div>
                    <div className="col-span-2">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        hour.type === 'Direct Counseling' || hour.type === 'Diagnosis and Treatment' ? "bg-blue-500/10 text-blue-500" :
                        hour.type.includes('Supervision') ? "bg-purple-500/10 text-purple-500" :
                        "bg-emerald-500/10 text-emerald-500"
                      )}>
                        {hour.type}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm font-bold">{hour.durationMinutes}</span>
                      <span className="text-xs text-muted-foreground ml-1">mins</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2 opacity-100 md:opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {hour.status === 'pending_verification' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
                            onClick={() => handleAdjustClick(hour)}
                          >
                            <Settings2 className="h-4 w-4 mr-1" />
                            Adjust
                          </Button>
                          <Button 
                            size="sm" 
                            className="h-8 bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20 shadow-lg"
                            onClick={() => handleVerify(hour.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                        </>
                      )}
                      {hour.status !== 'pending_verification' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-muted-foreground"
                          onClick={() => handleAdjustClick(hour)}
                        >
                          <Settings2 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}
