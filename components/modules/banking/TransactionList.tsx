'use client';

import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Download, Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn, formatCurrency, formatDate } from '@/lib/utils';

import { useStore, Transaction } from '@/lib/store';
import { useToast } from '@/lib/toast';

const statusVariants = {
  posted: 'success' as const,
  pending: 'warning' as const,
  failed: 'danger' as const,
};

const categoryColors: Record<string, string> = {
  'Insurance Reimbursement': 'bg-emerald-100 text-emerald-700',
  Supplies: 'bg-blue-100 text-blue-700',
  Payroll: 'bg-purple-100 text-purple-700',
  Tax: 'bg-amber-100 text-amber-700',
  Software: 'bg-indigo-100 text-indigo-700',
  Facilities: 'bg-orange-100 text-orange-700',
  Operations: 'bg-gray-100 text-gray-700',
};

export interface TransactionListProps {
  transactions?: Transaction[];
  hideAdd?: boolean;
  title?: string;
  subtitle?: string;
}

export function TransactionList({
  transactions: propTransactions,
  hideAdd = false,
  title = "Recent Transactions",
  subtitle = "All accounts · Last 30 days"
}: TransactionListProps = {}) {
  const { transactions: storeTransactions, addTransaction } = useStore();
  const displayTransactions = propTransactions || storeTransactions;
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'credit' | 'debit'>('debit');

  const handleAddTransaction = () => {
    if (!newDesc || !newAmount) return;
    addTransaction({
      id: `T${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      description: newDesc,
      category: 'Operations',
      account: 'Practice Operating',
      amount: parseFloat(newAmount),
      type: newType,
      status: 'pending',
    });
    setNewDesc('');
    setNewAmount('');
    setIsModalOpen(false);
    showToast('Transaction added successfully!', 'success');
  };

  const filtered = displayTransactions.filter(
    (t) =>
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section-card overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm focus:border-brand-400 focus:bg-white focus:outline-none sm:w-52"
            />
          </div>
          {!hideAdd && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-700 hover:bg-brand-100 font-medium">
              <ArrowDownLeft className="h-3.5 w-3.5" /> Add Manual
            </button>
          )}
          <button 
            onClick={() => showToast('Opening filters panel...', 'info')}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <button 
            onClick={() => showToast('Exporting transaction history to CSV...', 'success')}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Description</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden sm:table-cell">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden md:table-cell">Account</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden lg:table-cell">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{formatDate(tx.date)}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full',
                        tx.type === 'credit' ? 'bg-emerald-100' : 'bg-red-50'
                      )}
                    >
                      {tx.type === 'credit' ? (
                        <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
                      )}
                    </div>
                    <span className="font-medium text-gray-800">{tx.description}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden sm:table-cell">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs font-medium',
                      categoryColors[tx.category] ?? 'bg-gray-100 text-gray-700'
                    )}
                  >
                    {tx.category}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-xs text-gray-500 hidden md:table-cell">{tx.account}</td>
                <td
                  className={cn(
                    'px-4 py-3.5 text-right font-semibold tabular-nums',
                    tx.type === 'credit' ? 'text-emerald-600' : 'text-gray-800'
                  )}
                >
                  {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <Badge variant={statusVariants[tx.status]}>{tx.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 px-5 py-3">
        <p className="text-xs text-gray-500">Showing {filtered.length} of {displayTransactions.length} transactions</p>
      </div>

      {/* Add Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Manual Transaction</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <input 
                  type="text" 
                  value={newDesc} 
                  onChange={e => setNewDesc(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. Office Supplies" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Amount</label>
                <input 
                  type="number" 
                  value={newAmount} 
                  onChange={e => setNewAmount(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="0.00" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select 
                  value={newType} 
                  onChange={e => setNewType(e.target.value as 'credit' | 'debit')}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none"
                >
                  <option value="debit">Debit (Expense)</option>
                  <option value="credit">Credit (Income)</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700" onClick={handleAddTransaction}>Save Transaction</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
