'use client';

import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
} | null>(null);

export function Tabs({
  defaultValue,
  children,
  className = '',
}: {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`flex ${className}`}>{children}</div>;
}

export function TabsTrigger({
  value,
  children,
  className = '',
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');
  
  const isActive = context.activeTab === value;
  
  return (
    <button
      className={`${className} ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
      onClick={() => context.setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className = '',
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');
  
  if (context.activeTab !== value) return null;
  
  return <div className={className}>{children}</div>;
}
