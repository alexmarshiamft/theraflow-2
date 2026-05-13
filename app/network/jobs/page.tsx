'use client';

import { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  ShieldCheck,
  Search,
  Filter,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const JOBS = [
  {
    id: 1,
    title: "Associate MFT / LCSW",
    practice: "Serenity Wellness Group",
    location: "Los Angeles, CA (Hybrid)",
    type: "Full-time",
    compensation: "$85k - $105k / year",
    posted: "2d ago",
    tags: ["Supervision Included", "Health Benefits"],
    featured: true,
    instantApply: true
  },
  {
    id: 2,
    title: "Telehealth Therapist (Fully Remote)",
    practice: "Mindful Paths Collective",
    location: "California (Remote)",
    type: "Contract (1099)",
    compensation: "60/40 Split",
    posted: "5h ago",
    tags: ["Flexible Hours", "Liquid Payroll Ready"],
    featured: false,
    instantApply: true
  },
  {
    id: 3,
    title: "Clinical Director",
    practice: "Oceanside Therapy Center",
    location: "San Diego, CA",
    type: "Full-time",
    compensation: "$120k+ / year",
    posted: "1w ago",
    tags: ["Leadership", "Profit Sharing"],
    featured: false,
    instantApply: false
  }
];

export default function JobBoard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-gradient-to-br from-brand-900/40 to-slate-900/40 p-8 rounded-3xl border border-brand-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex-1">
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3 mb-2">
            <Briefcase className="h-8 w-8 text-brand-400" />
            Theraflow Job Board
          </h1>
          <p className="text-slate-300 max-w-xl mb-8">
            Find your next clinical role. Theraflow connects practice owners with top-tier talent, featuring seamless 1-click applications.
          </p>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Search by title, specialty, or location..."
                className="w-full h-14 pl-12 pr-4 bg-slate-950 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="lg" className="h-14 bg-white text-slate-950 hover:bg-slate-100 rounded-2xl px-8 hidden md:flex">
              Search Roles
            </Button>
            <Button size="lg" variant="outline" className="h-14 border-slate-700 hover:bg-slate-800 text-slate-300 rounded-2xl px-4">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative z-10 shrink-0">
           <Button size="lg" className="h-14 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-2xl px-8 shadow-lg shadow-brand-500/20 border-0 w-full md:w-auto">
             Post a Job
           </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Role Type</h3>
            <div className="space-y-3">
              {['Associate (Pre-Licensed)', 'Licensed Clinician', 'Clinical Director', 'Administrative'].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-slate-700 bg-slate-900 group-hover:border-slate-500 flex items-center justify-center transition-colors" />
                  <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="h-px bg-slate-800 w-full" />
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Location</h3>
            <div className="space-y-3">
              {['Fully Remote', 'Hybrid', 'In-Person'].map((loc) => (
                <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-slate-700 bg-slate-900 group-hover:border-slate-500 flex items-center justify-center transition-colors" />
                  <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{loc}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">Recommended for You</h2>
            <span className="text-sm text-slate-400">124 Roles Found</span>
          </div>

          {JOBS.map((job) => (
            <div 
              key={job.id} 
              className={cn(
                "group relative bg-slate-900/40 border rounded-3xl p-6 transition-all hover:bg-slate-900/80 cursor-pointer overflow-hidden",
                job.featured ? "border-brand-500/50 shadow-[0_0_30px_rgba(14,165,233,0.1)]" : "border-slate-800 hover:border-slate-700"
              )}
            >
              {job.featured && (
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-400 to-indigo-500" />
              )}
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    <Building2 className="h-8 w-8 text-slate-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors">{job.title}</h3>
                      {job.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20">Featured</span>
                      )}
                    </div>
                    <div className="text-slate-400 font-medium mb-3">{job.practice}</div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-500" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-slate-500" /> {job.type}</span>
                      <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-slate-500" /> {job.compensation}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between min-h-[5rem] border-t border-slate-800 md:border-t-0 pt-4 md:pt-0">
                  <div className="flex gap-2 mb-4 md:mb-0">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <span className="text-xs text-slate-500 hidden md:inline-block">{job.posted}</span>
                    {job.instantApply ? (
                      <Button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/20">
                        <Zap className="mr-1.5 h-4 w-4" />
                        1-Click Apply
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full md:w-auto border-slate-700 hover:bg-slate-800 text-white rounded-xl">
                        View Role
                        <ChevronRight className="ml-1.5 h-4 w-4 text-slate-400" />
                      </Button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full h-14 border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300 rounded-2xl mt-4">
            Load More Roles
          </Button>

        </div>
      </div>
    </div>
  );
}
