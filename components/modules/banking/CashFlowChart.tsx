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

  const data = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize last 6 months
    const today = new Date();
    const result = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      result.push({
        name: months[d.getMonth()],
        monthKey: `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`,
        revenue: 0,
        expenses: 0
      });
    }

    transactions.forEach(t => {
      const tMonthKey = t.date.substring(0, 7);
      const targetMonth = result.find(r => r.monthKey === tMonthKey);
      if (targetMonth) {
        if (t.type === 'credit') {
          targetMonth.revenue += t.amount;
        } else if (t.type === 'debit') {
          targetMonth.expenses += t.amount;
        }
      }
    });

    return result.map(({ name, revenue, expenses }) => ({ name, revenue, expenses }));
  }, [transactions]);

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
