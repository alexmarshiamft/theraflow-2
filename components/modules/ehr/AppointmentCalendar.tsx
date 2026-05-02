'use client';

import { ChevronLeft, ChevronRight, Clock, User, Video } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

import { useStore, Appointment } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const statusConfig = {
  scheduled: { variant: 'default' as const, label: 'Scheduled' },
  confirmed: { variant: 'info' as const, label: 'Confirmed' },
  'in-progress': { variant: 'warning' as const, label: 'In Progress' },
  completed: { variant: 'success' as const, label: 'Completed' },
  cancelled: { variant: 'danger' as const, label: 'Cancelled' },
};

const typeIcons = {
  'in-person': User,
  telehealth: Video,
  'follow-up': Clock,
};

const typeColors = {
  'in-person': 'border-l-brand-500 bg-brand-50',
  telehealth: 'border-l-teal-500 bg-teal-50',
  'follow-up': 'border-l-purple-500 bg-purple-50',
};

export function AppointmentCalendar() {
  const { appointments, addAppointment } = useStore();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState('');
  const [newReason, setNewReason] = useState('');
  const [generatingAppt, setGeneratingAppt] = useState<string | null>(null);
  
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [draftedNote, setDraftedNote] = useState('');
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  const [viewingAppt, setViewingAppt] = useState<Appointment | null>(null);
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(new Date('2024-05-24T12:00:00'));
  
  const dateString = currentDate.toISOString().split('T')[0];
  const filteredAppointments = appointments.filter(appt => appt.time.startsWith(dateString)).sort((a, b) => a.time.localeCompare(b.time));

  const formattedDateFull = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(currentDate);
  const formattedDateShort = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(currentDate);

  const handlePrevDay = () => setCurrentDate(prev => new Date(prev.getTime() - 86400000));
  const handleNextDay = () => setCurrentDate(prev => new Date(prev.getTime() + 86400000));

  const handleGenerateNote = async (appt: Appointment) => {
    setGeneratingAppt(appt.id);
    setSelectedAppt(appt);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Write a professional clinical SOAP note (Subjective, Objective, Assessment, Plan) for a client named ${appt.client} who came in for ${appt.reason}. Make it professional, objective, and format with SOAP headings.` })
      });
      const data = await res.json();
      if (res.ok) {
        setDraftedNote(data.text);
        setNoteModalOpen(true);
      } else {
        showToast('AI Error: ' + data.error, 'error');
      }
    } catch (err) {
      showToast('AI failed to generate note', 'error');
    } finally {
      setGeneratingAppt(null);
    }
  };

  const handleApproveNote = () => {
    // In a real app, we'd update the appointment in the store with the saved note.
    showToast('Clinical note approved and saved securely.', 'success');
    setNoteModalOpen(false);
    setDraftedNote('');
    setSelectedAppt(null);
  };

  const handleAddAppointment = () => {
    if (!newClient || !newReason) return;
    addAppointment({
      id: `A${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      client: newClient,
      time: `${dateString}T16:00:00`,
      duration: 30,
      type: 'in-person',
      provider: 'Dr. John Doe',
      status: 'scheduled',
      reason: newReason,
    });
    setNewClient('');
    setNewReason('');
    setIsModalOpen(false);
    showToast('Appointment scheduled successfully!', 'success');
  };

  return (
    <div className="section-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Schedule</h3>
          <p className="text-sm text-gray-500">{formattedDateFull}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setIsModalOpen(true)} className="mr-2 hidden sm:flex">
            <Plus className="h-3.5 w-3.5 mr-1" /> New
          </Button>
          <div className="flex items-center gap-1">
            <button 
              onClick={handlePrevDay}
              className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline-block px-1 w-16 text-center">{formattedDateShort}</span>
            <button 
              onClick={handleNextDay}
              className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50">
        {(['in-person', 'telehealth', 'follow-up'] as const).map((type) => {
          const Icon = typeIcons[type];
          return (
            <div key={type} className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-xs text-gray-600 capitalize">{type.replace('-', ' ')}</span>
            </div>
          );
        })}
      </div>

      {/* Appointments */}
      <div className="divide-y divide-gray-100">
        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Clock className="h-8 w-8 mx-auto text-gray-300 mb-3" />
            <p className="text-sm font-medium">No appointments scheduled for {formattedDateShort}</p>
          </div>
        ) : filteredAppointments.map((appt) => {
          const Icon = typeIcons[appt.type];
          return (
            <div
              key={appt.id}
              onClick={() => setViewingAppt(appt)}
              className={cn(
                'flex items-start gap-4 border-l-4 px-5 py-4 transition-colors hover:bg-gray-50 cursor-pointer',
                typeColors[appt.type]
              )}
            >
              <div className="w-16 flex-shrink-0 text-center">
                <p className="text-sm font-semibold text-gray-800">{formatTime(appt.time)}</p>
                <p className="text-xs text-gray-400">{appt.duration}m</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-gray-900">{appt.client}</p>
                  <Badge variant={statusConfig[appt.status].variant}>
                    {statusConfig[appt.status].label}
                  </Badge>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 truncate">{appt.reason}</p>
                <p className="mt-0.5 text-xs text-gray-400">{appt.provider}</p>
                {appt.type === 'telehealth' && (
                  <div className="mt-2 flex items-center gap-2">
                    <Button 
                      size="sm" 
                      className="bg-brand-600 hover:bg-brand-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/telehealth/${appt.id}`);
                      }}
                    >
                      <Video className="h-3.5 w-3.5 mr-1.5" /> Join Secure Video
                    </Button>
                  </div>
                )}
                {appt.status === 'completed' && (
                  <div className="mt-2 flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-brand-200 text-brand-700 hover:bg-brand-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerateNote(appt);
                      }}
                      disabled={generatingAppt === appt.id}
                    >
                      {generatingAppt === appt.id ? (
                        <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      )}
                      {generatingAppt === appt.id ? 'Generating...' : 'AI Generate Note'}
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 mt-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-gray-200">
                  <Icon className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 bg-gray-50 px-5 py-3">
        <p className="text-xs text-gray-500">{filteredAppointments.length} appointments on {formattedDateShort}</p>
      </div>

      {/* Add Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Client Name</label>
                <input 
                  type="text" 
                  value={newClient} 
                  onChange={e => setNewClient(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. John Doe" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Appointment Type</label>
                <select 
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none"
                  onChange={(e) => showToast(`Selected ${e.target.value}`, 'info')}
                >
                  <option value="in-person">In-Person</option>
                  <option value="telehealth">Telehealth</option>
                  <option value="follow-up">Follow-up</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Reason for Visit</label>
                <input 
                  type="text" 
                  value={newReason} 
                  onChange={e => setNewReason(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. Annual Checkup" 
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAddAppointment}>Schedule</Button>
            </div>
          </div>
        </div>
      )}

      {/* Note Review Modal */}
      {noteModalOpen && selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl flex flex-col max-h-[90vh]">
            <div className="flex items-center gap-2 mb-4 text-brand-700">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-gray-900">Review Clinical Note</h3>
            </div>
            
            <div className="mb-4 text-sm text-gray-500 border-b border-gray-100 pb-3">
              <p><strong>Client:</strong> {selectedAppt.client}</p>
              <p><strong>Reason:</strong> {selectedAppt.reason}</p>
            </div>

            <div className="flex-1 overflow-y-auto min-h-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Draft (Editable)</label>
              <textarea
                value={draftedNote}
                onChange={(e) => setDraftedNote(e.target.value)}
                className="w-full h-32 rounded-lg border border-gray-200 p-3 text-sm focus:border-brand-500 focus:outline-none resize-y"
                placeholder="Clinical note content..."
              />
            </div>
            
            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button variant="outline" onClick={() => setNoteModalOpen(false)}>Cancel</Button>
              <Button onClick={handleApproveNote} className="bg-brand-600 hover:bg-brand-700">Approve & Save</Button>
            </div>
          </div>
        </div>
      )}

      {/* View Appointment Modal overlay */}
      {viewingAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewingAppt(null)}>
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{viewingAppt.client}</h3>
                <p className="text-sm text-gray-500">{formatTime(viewingAppt.time)} ({viewingAppt.duration}m)</p>
              </div>
              <Badge variant={statusConfig[viewingAppt.status].variant}>
                {statusConfig[viewingAppt.status].label}
              </Badge>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="font-semibold block mb-1 text-gray-700">Reason for Visit:</span>
                <span className="text-gray-600">{viewingAppt.reason}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Provider</span>
                <span className="text-gray-600">{viewingAppt.provider}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Type</span>
                <span className="text-gray-600 capitalize">{viewingAppt.type.replace('-', ' ')}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setViewingAppt(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
