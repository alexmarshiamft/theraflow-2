'use client';

import { useState } from 'react';
import { useStore, EmailMessage } from '@/lib/store';
import { 
  Mail, 
  Inbox, 
  Send, 
  FileEdit, 
  Trash2, 
  Search, 
  Star, 
  Paperclip, 
  MoreVertical, 
  CornerUpLeft, 
  CornerUpRight, 
  Archive, 
  X, 
  PenSquare,
  UserCircle,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type FolderType = 'inbox' | 'sent' | 'draft' | 'trash';

export default function MailPage() {
  const emails = useStore(state => state.emails);
  const sendEmail = useStore(state => state.sendEmail);
  const markEmailRead = useStore(state => state.markEmailRead);
  const deleteEmail = useStore(state => state.deleteEmail);

  const [activeFolder, setActiveFolder] = useState<FolderType>('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  
  const [composeForm, setComposeForm] = useState({ to: '', subject: '', body: '' });

  const filteredEmails = emails.filter(e => e.folder === activeFolder);
  const selectedEmail = emails.find(e => e.id === selectedEmailId);

  const handleSelectEmail = (email: EmailMessage) => {
    setSelectedEmailId(email.id);
    if (!email.isRead && activeFolder === 'inbox') {
      markEmailRead(email.id);
    }
  };

  const handleSend = () => {
    if (!composeForm.to || !composeForm.subject) return;
    
    sendEmail({
      sender: 'associate@theraflow.com',
      recipient: composeForm.to,
      subject: composeForm.subject,
      body: composeForm.body,
      isRead: true,
      folder: 'sent'
    });
    
    setIsComposing(false);
    setComposeForm({ to: '', subject: '', body: '' });
    setActiveFolder('sent');
  };

  const handleDelete = () => {
    if (selectedEmailId) {
      deleteEmail(selectedEmailId);
      setSelectedEmailId(null);
    }
  };

  const handleGenerateAIDraft = async () => {
    if (!selectedEmail) return;
    
    setIsComposing(true);
    setComposeForm({ 
      to: activeFolder === 'sent' ? selectedEmail.recipient : selectedEmail.sender, 
      subject: `Re: ${selectedEmail.subject}`, 
      body: '' 
    });
    setIsGeneratingResponse(true);

    const draftText = `Dear ${selectedEmail.sender.split('@')[0]},\n\nThank you for reaching out. I have reviewed your message regarding "${selectedEmail.subject}". \n\nOur team is currently looking into this matter and will provide a comprehensive update shortly. Rest assured, all your data is being handled securely in compliance with HIPAA guidelines.\n\nBest regards,\nTheraflow Team`;

    // Simulate typing effect
    let currentText = '';
    for (let i = 0; i < draftText.length; i++) {
      currentText += draftText[i];
      setComposeForm(prev => ({ ...prev, body: currentText }));
      await new Promise(r => setTimeout(r, 10)); // Fast typing effect
    }
    
    setIsGeneratingResponse(false);
  };

  const folders: { id: FolderType; label: string; icon: any; count?: number }[] = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: emails.filter(e => e.folder === 'inbox' && !e.isRead).length },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'draft', label: 'Drafts', icon: FileEdit },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Mail className="h-8 w-8 text-primary" />
            Theraflow Mail
          </h1>
          <p className="text-muted-foreground mt-1">
            Secure, integrated communication for your practice.
          </p>
        </div>
      </div>

      {/* Main Mail Client UI */}
      <div className="flex-1 rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden flex relative">
        
        {/* Left Sidebar - Folders */}
        <div className="w-64 border-r border-border/50 bg-muted/10 flex flex-col hidden md:flex">
          <div className="p-4">
            <Button 
              className="w-full gap-2 shadow-primary/20 shadow-lg" 
              onClick={() => setIsComposing(true)}
            >
              <PenSquare className="h-4 w-4" />
              Compose
            </Button>
          </div>
          <div className="flex-1 py-2">
            <div className="px-3 space-y-1">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => { setActiveFolder(folder.id); setSelectedEmailId(null); }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    activeFolder === folder.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <folder.icon className="h-4 w-4" />
                    {folder.label}
                  </div>
                  {folder.count ? (
                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-bold">
                      {folder.count}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Pane - Email List */}
        <div className={cn(
          "flex-1 md:w-1/3 md:max-w-[400px] md:flex-none border-r border-border/50 flex flex-col bg-background/50",
          (selectedEmailId || isComposing) && "hidden md:flex"
        )}>
          <div className="p-4 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search emails..." 
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border-none rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredEmails.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                <Inbox className="h-12 w-12 mb-4" />
                <p>No emails found</p>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {filteredEmails.map(email => (
                  <button
                    key={email.id}
                    onClick={() => handleSelectEmail(email)}
                    className={cn(
                      "w-full text-left p-4 hover:bg-muted/30 transition-colors relative animate-in fade-in slide-in-from-left-4 duration-300",
                      selectedEmailId === email.id && "bg-muted/50",
                      !email.isRead && activeFolder === 'inbox' && "bg-primary/5"
                    )}
                  >
                    {!email.isRead && activeFolder === 'inbox' && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                    )}
                    <div className="flex justify-between items-baseline mb-1">
                      <span className={cn(
                        "text-sm truncate pr-2",
                        !email.isRead && activeFolder === 'inbox' ? "font-bold text-foreground" : "font-medium text-foreground/80"
                      )}>
                        {activeFolder === 'sent' ? email.recipient : email.sender.split('@')[0]}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(email.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className={cn(
                      "text-sm truncate mb-1",
                      !email.isRead && activeFolder === 'inbox' ? "font-semibold text-foreground" : "text-foreground/70"
                    )}>
                      {email.subject}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {email.body}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane - Reading / Composing */}
        <div className={cn(
          "flex-1 flex flex-col bg-card",
          (!selectedEmailId && !isComposing) && "hidden md:flex items-center justify-center text-muted-foreground"
        )}>
          {isComposing ? (
            <div className="flex-1 flex flex-col h-full animate-in slide-in-from-right-8 duration-300">
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <h3 className="text-lg font-semibold">New Message</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setIsComposing(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4 border-b border-border/50 space-y-4">
                <div className="flex items-center">
                  <span className="w-16 text-sm text-muted-foreground">To:</span>
                  <input 
                    type="email" 
                    value={composeForm.to}
                    onChange={e => setComposeForm({...composeForm, to: e.target.value})}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm" 
                    placeholder="recipient@example.com"
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-16 text-sm text-muted-foreground">Subject:</span>
                  <input 
                    type="text" 
                    value={composeForm.subject}
                    onChange={e => setComposeForm({...composeForm, subject: e.target.value})}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm font-medium" 
                    placeholder="Enter subject"
                  />
                </div>
              </div>
              <div className="flex-1 p-4 relative">
                <textarea 
                  value={composeForm.body}
                  onChange={e => setComposeForm({...composeForm, body: e.target.value})}
                  className="w-full h-full bg-transparent border-none focus:outline-none resize-none text-sm leading-relaxed"
                  placeholder="Write your message here..."
                  disabled={isGeneratingResponse}
                />
                {isGeneratingResponse && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 text-primary/70 text-sm animate-pulse">
                    <Sparkles className="h-4 w-4" />
                    AI Generating...
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-border/50 flex items-center justify-between bg-muted/5">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                </div>
                <Button onClick={handleSend} className="gap-2 shadow-primary/20 shadow-lg" disabled={!composeForm.to || !composeForm.subject}>
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          ) : selectedEmail ? (
            <div className="flex-1 flex flex-col h-full animate-in fade-in duration-300">
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-2 md:hidden">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedEmailId(null)}>
                    <CornerUpLeft className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-1 ml-auto text-muted-foreground">
                  <Button variant="ghost" size="icon"><Archive className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={handleDelete}><Trash2 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{selectedEmail.subject}</h2>
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <UserCircle className="h-10 w-10 text-muted-foreground/50" />
                    <div>
                      <div className="font-medium">
                        {activeFolder === 'sent' ? 'You' : selectedEmail.sender}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        to {activeFolder === 'sent' ? selectedEmail.recipient : 'me'}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    {new Date(selectedEmail.timestamp).toLocaleString(undefined, { 
                      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' 
                    })}
                    <Star className="h-4 w-4 cursor-pointer hover:text-yellow-500 transition-colors" />
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {selectedEmail.body.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 text-foreground/90 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-border/50 mt-auto bg-muted/5 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2" onClick={() => {
                    setIsComposing(true);
                    setComposeForm({ 
                      to: activeFolder === 'sent' ? selectedEmail.recipient : selectedEmail.sender, 
                      subject: `Re: ${selectedEmail.subject}`, 
                      body: `\n\n--- Original Message ---\n${selectedEmail.body}` 
                    });
                  }}>
                    <CornerUpLeft className="h-4 w-4" />
                    Reply
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <CornerUpRight className="h-4 w-4" />
                    Forward
                  </Button>
                </div>
                <Button 
                  onClick={handleGenerateAIDraft}
                  className="gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 shadow-lg shadow-purple-500/20"
                >
                  <Sparkles className="h-4 w-4" />
                  Draft with AI
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
              <Mail className="h-16 w-16 mb-4" />
              <p>Select an email to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
