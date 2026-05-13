'use client';

import { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Award, 
  Briefcase,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Image as ImageIcon,
  Link as LinkIcon,
  Smile
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const POSTS = [
  {
    id: 1,
    author: "Dr. Sarah Chen",
    role: "Practice Owner",
    avatar: "SC",
    type: "Insight",
    content: "Just transitioned my entire practice to a hybrid model. Seeing a 30% reduction in no-shows and associates are reporting higher job satisfaction. Has anyone else experimented with mandatory 1-day remote blocks?",
    likes: 42,
    comments: 12,
    time: "2h ago",
    badges: ["Top Contributor", "Verified Owner"]
  },
  {
    id: 2,
    author: "Michael Ross",
    role: "MFT Graduate Student",
    avatar: "MR",
    type: "Question",
    content: "Looking for advice on accruing hours for licensure in California. Should I prioritize a group practice that offers supervision but lower pay, or a non-profit clinic? Any California AMFTs have thoughts?",
    likes: 18,
    comments: 24,
    time: "4h ago",
    badges: ["Future Founder"]
  },
  {
    id: 3,
    author: "Elena Rodriguez, LCSW",
    role: "Clinical Director",
    avatar: "ER",
    type: "Resource",
    content: "Just published a new guide in the Academy on 'Building a Waitlist Without Spending on Ads'. Offering a 20% discount for the Theraflow community this week!",
    likes: 89,
    comments: 31,
    time: "1d ago",
    badges: ["Verified Owner", "Academy Creator"]
  }
];

export default function CommunityFeed() {
  const [activeTab, setActiveTab] = useState<'for-you' | 'clinical' | 'business' | 'students'>('for-you');

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8 text-indigo-400" />
            Theraflow Network
          </h1>
          <p className="text-slate-400 mt-1">Connect with professionals, students, and practice owners.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Create Post */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/20">
                <span className="text-white font-bold">AM</span>
              </div>
              <div className="flex-1 space-y-4">
                <textarea 
                  placeholder="Share an insight, ask a clinical question, or post a resource..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white rounded-full">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white rounded-full">
                      <LinkIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white rounded-full">
                      <Smile className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button className="bg-brand-600 hover:bg-brand-500 text-white rounded-full px-6">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Filter */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-px">
            {[
              { id: 'for-you', label: 'For You' },
              { id: 'clinical', label: 'Clinical Consult' },
              { id: 'business', label: 'Practice Business' },
              { id: 'students', label: 'Student Lounge' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors relative",
                  activeTab === tab.id ? "text-brand-400" : "text-slate-400 hover:text-white"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-400 rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {POSTS.map(post => (
              <div key={post.id} className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6 hover:bg-slate-900/50 transition-colors">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <span className="text-slate-300 font-bold">{post.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white">{post.author}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{post.role}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">{post.time}</span>
                          <span className="text-slate-700">•</span>
                          <span className="text-xs text-indigo-400 font-medium">{post.type}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {post.badges.map(badge => (
                          <span key={badge} className="inline-flex items-center text-[10px] uppercase tracking-wider font-bold text-brand-300 bg-brand-500/10 px-2 py-1 rounded border border-brand-500/20">
                            {badge === 'Verified Owner' && <Briefcase className="h-3 w-3 mr-1" />}
                            {badge === 'Future Founder' && <GraduationCap className="h-3 w-3 mr-1" />}
                            {badge === 'Academy Creator' && <Award className="h-3 w-3 mr-1" />}
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-slate-300 mt-4 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex items-center gap-6 mt-6 pt-4 border-t border-slate-800/50">
                      <button className="flex items-center gap-2 text-slate-400 hover:text-rose-400 transition-colors group">
                        <Heart className="h-5 w-5 group-hover:fill-rose-400/20" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors">
                        <MessageSquare className="h-5 w-5" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors ml-auto">
                        <Share2 className="h-5 w-5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          
          <div className="bg-gradient-to-br from-indigo-900/50 to-brand-900/50 border border-indigo-500/30 rounded-3xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/20 mb-4">
               <Sparkles className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-white font-bold mb-2">Build Your Authority</h3>
            <p className="text-sm text-slate-300 mb-4">Create your own business training materials and sell them to the network via the Academy.</p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl">
              Become a Creator
            </Button>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              Trending Topics
            </h3>
            <div className="space-y-4">
              {['#InsuranceAudits', '#GroupPracticeScaling', '#StudentPracticum', '#CaliforniaBBS'].map((tag, i) => (
                <div key={i} className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm text-slate-300 group-hover:text-brand-400 transition-colors">{tag}</span>
                  <span className="text-xs text-slate-500 font-medium">+{Math.floor(Math.random() * 50) + 10} posts</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
