'use client';

import { Download, Eye, FileText, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

import { useStore, Filing } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { useState } from 'react';

const statusConfig = {
  filed: { variant: 'success' as const, label: 'Filed' },
  pending: { variant: 'warning' as const, label: 'Pending' },
  overdue: { variant: 'danger' as const, label: 'Overdue' },
  upcoming: { variant: 'info' as const, label: 'Upcoming' },
};

export function FilingsList() {
  const { filings, addFiling } = useStore();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newForm, setNewForm] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAddFiling = () => {
    if (!newForm || !newDesc) return;
    addFiling({
      id: `F${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      form: newForm,
      description: newDesc,
      period: 'Q3 2024',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      filedDate: null,
      status: 'upcoming',
      preparer: 'Self-filed',
    });
    setNewForm('');
    setNewDesc('');
    setIsModalOpen(false);
    showToast('Tax filing created successfully!', 'success');
  };

  return (
    <div className="section-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Tax Filings & Documents</h3>
          <p className="text-sm text-gray-500">{filings.filter((f) => f.status === 'filed').length} filed · {filings.filter((f) => f.status !== 'filed').length} pending</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => showToast('Opening file upload dialog...', 'info')}>
            <Upload className="h-3.5 w-3.5" /> Upload
          </Button>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <FileText className="h-3.5 w-3.5" /> New Filing
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Form</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden md:table-cell">Period</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden lg:table-cell">Due Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden lg:table-cell">Filed</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filings.map((filing) => (
              <tr key={filing.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50">
                      <FileText className="h-4 w-4 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{filing.form}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[180px]">{filing.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-gray-600 hidden md:table-cell">{filing.period}</td>
                <td className="px-4 py-3.5 text-gray-600 hidden lg:table-cell">{formatDate(filing.dueDate)}</td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  {filing.filedDate ? (
                    <span className="text-emerald-600 font-medium">{formatDate(filing.filedDate)}</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant={statusConfig[filing.status].variant}>
                    {statusConfig[filing.status].label}
                  </Badge>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button 
                      onClick={() => showToast(`Opening document viewer for ${filing.form}...`, 'info')}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    {filing.filedDate && (
                      <button 
                        onClick={() => showToast(`Downloading ${filing.form} as PDF...`, 'success')}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Tax Filing</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Form Type</label>
                <input 
                  type="text" 
                  value={newForm} 
                  onChange={e => setNewForm(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. Form 941" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <input 
                  type="text" 
                  value={newDesc} 
                  onChange={e => setNewDesc(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. Employer Quarterly Tax" 
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700" onClick={handleAddFiling}>Save Filing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
