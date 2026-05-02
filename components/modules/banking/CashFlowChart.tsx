'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useStore } from '@/lib/store';
import { useMemo } from 'react';

export function CashFlowChart() {
  const { transactions } = useStore();

  // Create mock historical data based on current transactions volume for the visual
  const data = useMemo(() => {
    return [
      { name: 'Dec', revenue: 18400, expenses: 4200 },
      { name: 'Jan', revenue: 21200, expenses: 5100 },
      { name: 'Feb', revenue: 19800, expenses: 4800 },
      { name: 'Mar', revenue: 24500, expenses: 5600 },
      { name: 'Apr', revenue: 23100, expenses: 4900 },
      { name: 'May', revenue: 27800, expenses: 6200 },
    ];
  }, []);

  return (
    <div className="section-card p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Cash Flow (Last 6 Months)</h3>
        <p className="text-sm text-gray-500">Revenue vs operating expenses</p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, undefined]}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              name="Revenue"
              stroke="#10b981" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              name="Expenses"
              stroke="#ef4444" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorExpenses)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
