import NervousSystemGraph from '@/components/modules/intelligence/NervousSystemGraph';

export const metadata = {
  title: 'Practice Nervous System | Theraflow Intelligence',
  description: 'Interactive 3D visualization of practice operations',
};

export default function NervousSystemPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Intelligence Overview</h1>
        <p className="text-white/60">
          Visualize your entire practice ecosystem in real-time.
        </p>
      </div>
      
      <div className="flex-1 w-full min-h-[600px]">
        <NervousSystemGraph />
      </div>
    </div>
  );
}
