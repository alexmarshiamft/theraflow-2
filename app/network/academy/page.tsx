'use client';

import { useState } from 'react';
import { 
  GraduationCap, 
  PlayCircle, 
  Star, 
  Clock, 
  Users, 
  Lock, 
  CheckCircle2,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const COURSES = [
  {
    id: 1,
    title: "6-Figure Private Practice Blueprint",
    instructor: "Dr. Sarah Chen",
    category: "Business & Scaling",
    rating: 4.9,
    reviews: 128,
    duration: "4.5 hours",
    students: "1.2k",
    price: "$299",
    imageGrad: "from-blue-600 to-indigo-900",
    featured: true,
    progress: 0
  },
  {
    id: 2,
    title: "SEO Mastery for Mental Health Clinics",
    instructor: "Elena Rodriguez, LCSW",
    category: "Marketing",
    rating: 4.8,
    reviews: 84,
    duration: "3 hours",
    students: "850",
    price: "$149",
    imageGrad: "from-emerald-600 to-teal-900",
    featured: false,
    progress: 100
  },
  {
    id: 3,
    title: "Navigating Insurance Audits Safely",
    instructor: "Marcus Webb, Compliance Officer",
    category: "Operations",
    rating: 5.0,
    reviews: 312,
    duration: "2 hours",
    students: "3.4k",
    price: "Free with Theraflow Pro",
    imageGrad: "from-rose-600 to-orange-900",
    featured: false,
    progress: 45
  }
];

export default function Academy() {
  const [activeTab, setActiveTab] = useState<'discover' | 'my-learning'>('discover');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-indigo-400" />
            Theraflow Academy
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Premium, unofficial training products created by top practice owners. Master the business of therapy, scaling, and marketing.
          </p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-900/50 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('discover')}
            className={cn(
              "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
              activeTab === 'discover' ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-300"
            )}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab('my-learning')}
            className={cn(
              "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
              activeTab === 'my-learning' ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-300"
            )}
          >
            My Learning
          </button>
        </div>
      </div>

      {activeTab === 'discover' && (
        <>
          {/* Featured Hero Course */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 min-h-[400px] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-br from-indigo-600 to-purple-900 opacity-40" />
            
            <div className="relative z-20 p-10 md:p-16 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-500/30">
                <Trophy className="h-4 w-4" /> Bestseller
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                The Group Practice Scaling Masterclass
              </h2>
              <p className="text-lg text-slate-300">
                Learn how to transition from a solo practitioner to managing a 20+ clinician group practice with integrated liquid payroll and AI automation.
              </p>
              
              <div className="flex items-center gap-6 text-sm text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9 (2.1k reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" /> 8.5 hours
                </span>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Button size="lg" className="h-14 bg-white text-slate-950 hover:bg-slate-100 rounded-2xl px-8 font-bold text-lg">
                  Enroll for $499
                </Button>
                <Button size="lg" variant="outline" className="h-14 border-slate-700 hover:bg-slate-800 text-white rounded-2xl px-8">
                  Preview Course
                </Button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {['All Topics', 'Marketing & SEO', 'Business & Operations', 'Insurance & Compliance', 'Clinical Leadership'].map((cat, i) => (
              <button key={i} className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                i === 0 ? "bg-slate-100 text-slate-900" : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
              )}>
                {cat}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map(course => (
              <div key={course.id} className="group bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-600 transition-colors cursor-pointer flex flex-col">
                {/* Course Thumbnail */}
                <div className={cn("h-48 w-full bg-gradient-to-br relative flex items-center justify-center", course.imageGrad)}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <PlayCircle className="h-16 w-16 text-white/70 group-hover:text-white group-hover:scale-110 transition-all z-10" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">{course.category}</div>
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-brand-400 transition-colors">{course.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{course.instructor}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {course.students}
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between">
                    <span className="font-bold text-white">{course.price}</span>
                    <Button variant="ghost" className="text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 rounded-xl px-4">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'my-learning' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">In Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.filter(c => c.progress > 0 && c.progress < 100).map(course => (
              <div key={course.id} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                   <div className={cn("w-20 h-20 rounded-xl shrink-0 bg-gradient-to-br", course.imageGrad)} />
                   <div>
                     <h3 className="font-bold text-white leading-tight mb-1">{course.title}</h3>
                     <p className="text-xs text-slate-400">{course.instructor}</p>
                   </div>
                </div>
                
                <div className="mt-auto space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">{course.progress}% Complete</span>
                    <span className="text-brand-400">Continue</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-white mt-12 pt-8 border-t border-slate-800/50">Completed</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.filter(c => c.progress === 100).map(course => (
              <div key={course.id} className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6 flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity">
                 <div>
                   <h3 className="font-bold text-white line-clamp-1">{course.title}</h3>
                   <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400 font-medium">
                     <CheckCircle2 className="h-4 w-4" /> Completed
                   </div>
                 </div>
                 <Button variant="outline" className="border-slate-700 rounded-xl text-slate-300">
                   Certificate
                 </Button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
