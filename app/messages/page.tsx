'use client';

import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore, Message } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Hash, 
  Users, 
  ShieldCheck, 
  MoreVertical,
  Paperclip,
  Image as ImageIcon
} from 'lucide-react';

const CHANNELS = [
  { id: 'general', name: 'General Practice', icon: Hash, unread: 0 },
  { id: 'clinical', name: 'Clinical Updates', icon: Hash, unread: 2 },
  { id: 'billing', name: 'Billing & Compliance', icon: Hash, unread: 0 },
];

const DIRECT_MESSAGES = [
  { id: 'E001', name: 'David Foster, ASW', avatar: 'DF', online: true },
  { id: 'E002', name: 'Alexander Marshi, AMFT', avatar: 'AM', online: false },
  { id: 'E003', name: 'Sarah Jenkins, LMFT', avatar: 'SJ', online: true },
];

export default function MessagesPage() {
  const { messages, sendMessage, markMessageRead } = useStore();
  const [activeChannel, setActiveChannel] = useState('general');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeMessages = messages.filter(m => m.channelId === activeChannel);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    // Mark as read when viewing
    activeMessages.forEach(m => {
      if (!m.isRead) markMessageRead(m.id);
    });
  }, [messages, activeChannel, activeMessages, markMessageRead]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    sendMessage({
      id: `MSG-${Date.now()}`,
      channelId: activeChannel,
      senderId: 'currentUser', // Mock current user
      senderName: 'Clinical Director (You)',
      content: inputText,
      timestamp: new Date().toISOString(),
      isRead: true
    });
    
    setInputText('');
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-6rem)] overflow-hidden rounded-3xl border border-border bg-card shadow-xl relative animate-in fade-in zoom-in-95">
        
        {/* Sidebar */}
        <div className="w-64 border-r border-border/50 bg-muted/50 flex flex-col h-full">
          <div className="p-4 border-b border-border/50">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-600" />
              Team Chat
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-6">
            <div>
              <div className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-2 px-3">Channels</div>
              <div className="space-y-1">
                {CHANNELS.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      activeChannel === channel.id 
                        ? 'bg-brand-100 text-brand-700' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <channel.icon className="w-4 h-4 opacity-70" />
                      {channel.name}
                    </div>
                    {channel.unread > 0 && (
                      <span className="bg-brand-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-2 px-3 flex items-center justify-between">
                Direct Messages
              </div>
              <div className="space-y-1">
                {DIRECT_MESSAGES.map(dm => (
                  <button
                    key={dm.id}
                    onClick={() => setActiveChannel(dm.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      activeChannel === dm.id 
                        ? 'bg-brand-100 text-brand-700' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                        {dm.avatar}
                      </div>
                      {dm.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-50" />
                      )}
                    </div>
                    <span className="truncate">{dm.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border/50 bg-muted/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              HIPAA Compliant E2E Encryption
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full bg-card relative">
          {/* Header */}
          <div className="h-16 border-b border-border/50 px-6 flex items-center justify-between bg-card/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                <Hash className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground capitalize">
                  {CHANNELS.find(c => c.id === activeChannel)?.name || DIRECT_MESSAGES.find(c => c.id === activeChannel)?.name}
                </h3>
                <p className="text-xs text-muted-foreground">Secure Practice Communication</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full text-muted-foreground/80 hover:text-muted-foreground">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full text-muted-foreground/80 hover:text-muted-foreground">
                <Users className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full text-muted-foreground/80 hover:text-muted-foreground">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/50/50">
            {activeMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground/80 space-y-3">
                <MessageSquare className="w-12 h-12 opacity-20" />
                <p>This is the beginning of the secure chat history.</p>
              </div>
            ) : (
              activeMessages.map((msg, index) => {
                const isMe = msg.senderId === 'currentUser';
                const showAvatar = index === 0 || activeMessages[index - 1].senderId !== msg.senderId;
                
                return (
                  <div key={msg.id} className={`flex gap-4 max-w-3xl ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                    {showAvatar ? (
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm shadow-sm ${isMe ? 'bg-brand-600 text-white' : 'bg-slate-200 text-foreground/80'}`}>
                        {msg.senderName.charAt(0)}
                      </div>
                    ) : (
                      <div className="w-10 shrink-0" />
                    )}
                    
                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      {showAvatar && (
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-foreground text-sm">{msg.senderName}</span>
                          <span className="text-xs text-muted-foreground/80">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}
                      <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm ${isMe ? 'bg-brand-600 text-white rounded-tr-sm' : 'bg-card border border-border text-foreground/90 rounded-tl-sm'}`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-card border-t border-border/50">
            <div className="flex items-end gap-2 bg-muted/50 border border-border rounded-2xl p-2 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition-all shadow-sm">
              <div className="flex pb-1 px-1 gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-muted-foreground/80 hover:text-muted-foreground hover:bg-slate-200/50">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-muted-foreground/80 hover:text-muted-foreground hover:bg-slate-200/50">
                  <ImageIcon className="w-4 h-4" />
                </Button>
              </div>
              <input 
                className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 min-h-[44px] text-foreground/80 outline-none"
                placeholder="Message securely..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className={`h-10 px-4 rounded-xl shadow-md transition-all ${inputText.trim() ? 'bg-brand-600 hover:bg-brand-700 text-white' : 'bg-slate-200 text-muted-foreground/80 cursor-not-allowed'}`}
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
