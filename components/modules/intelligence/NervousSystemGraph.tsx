'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import dynamic from 'next/dynamic';

// Dynamically import ForceGraph3D to prevent SSR issues
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false });

export default function NervousSystemGraph() {
  const store = useStore();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    // Initial size
    handleResize();
    
    // Setup listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const graphData = useMemo(() => {
    const nodes: any[] = [];
    const links: any[] = [];

    // Root node
    nodes.push({ id: 'practice', name: 'Theraflow Clinic', group: 'practice', val: 60 });

    // Associates (Employees)
    store.employees.forEach(emp => {
      nodes.push({ id: `emp_${emp.id}`, name: emp.name, group: 'associate', val: 20 });
      links.push({ source: 'practice', target: `emp_${emp.id}`, type: 'employment' });
    });

    // Patients (Clients)
    store.clients.forEach(client => {
      nodes.push({ id: `client_${client.id}`, name: client.name, group: 'client', val: 8 });
      // Find the employee assigned
      const assignedEmp = store.employees.find(e => e.name === client.provider);
      if (assignedEmp) {
        links.push({ source: `emp_${assignedEmp.id}`, target: `client_${client.id}`, type: 'treatment' });
      } else {
        // Fallback connect directly to practice if no specific provider assigned
        links.push({ source: 'practice', target: `client_${client.id}`, type: 'treatment' });
      }
    });

    return { nodes, links };
  }, [store.employees, store.clients]);

  return (
    <div ref={containerRef} className="relative w-full h-[calc(100vh-12rem)] min-h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#030303] shadow-[0_0_80px_rgba(20,184,166,0.15)]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 to-black/80 pointer-events-none z-10" />
      
      {/* Overlay UI */}
      <div className="absolute top-8 left-8 z-20">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-500"></span>
          </span>
          Practice Nervous System
        </h2>
        <p className="text-sm text-white/50 mt-2 max-w-sm">
          A real-time, interactive 3D visualization of your clinic's operational and clinical flow. Drag to rotate, scroll to zoom.
        </p>
      </div>

      <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
        <div className="flex items-center gap-3 text-sm font-medium text-white/80">
          <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" /> Theraflow HQ
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-white/80">
          <div className="w-4 h-4 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" /> Associates
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-white/80">
          <div className="w-4 h-4 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" /> Active Patients
        </div>
      </div>

      {/* 3D Canvas */}
      {typeof window !== 'undefined' && (
        <ForceGraph3D
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeLabel="name"
          nodeColor={(node: any) => {
            if (node.group === 'practice') return '#6366f1'; // indigo-500
            if (node.group === 'associate') return '#14b8a6'; // teal-500
            if (node.group === 'client') return '#0ea5e9'; // brand-500
            return '#ffffff';
          }}
          nodeRelSize={2}
          nodeResolution={32}
          linkColor={() => 'rgba(255, 255, 255, 0.15)'}
          linkWidth={1.5}
          linkDirectionalParticles={3}
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleSpeed={(d: any) => d.type === 'treatment' ? 0.006 : 0.003}
          linkDirectionalParticleColor={(link: any) => link.type === 'treatment' ? '#0ea5e9' : '#14b8a6'}
          backgroundColor="#000000"
          showNavInfo={false}
          enableNodeDrag={true}
        />
      )}
    </div>
  );
}
