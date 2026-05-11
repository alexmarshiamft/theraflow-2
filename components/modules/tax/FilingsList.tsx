'use client';

import { Download, Eye, FileText, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/lib/toast';

const mockDocuments = [
  { id: '1', name: '2023 W-2 Form', type: 'Tax Form', date: 'Jan 31, 2024', status: 'available' },
  { id: '2', name: 'Pay Stub - Dec 2023', type: 'Pay Stub', date: 'Dec 31, 2023', status: 'available' },
  { id: '3', name: 'Pay Stub - Nov 2023', type: 'Pay Stub', date: 'Nov 30, 2023', status: 'available' },
  { id: '4', name: '1095-C Health Coverage', type: 'Tax Form', date: 'Feb 15, 2024', status: 'available' },
  { id: '5', name: '2024 W-2 Form', type: 'Tax Form', date: 'Jan 31, 2025', status: 'upcoming' },
];

const typeConfig = {
  'Tax Form': { variant: 'info' as const, bg: 'bg-indigo-50', text: 'text-indigo-600' },
  'Pay Stub': { variant: 'default' as const, bg: 'bg-emerald-50', text: 'text-emerald-600' },
};

export function FilingsList() {
  const { showToast } = useToast();

  return (
    <div className="section-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Documents & Pay Stubs</h3>
          <p className="text-sm text-gray-500">Access your tax forms and payment history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => showToast('Opening secure document vault...', 'info')}>
            <FileText className="h-3.5 w-3.5 mr-2" /> Vault
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Document</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden md:table-cell">Date / Period</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${typeConfig[doc.type as keyof typeof typeConfig].bg}`}>
                      <FileText className={`h-4 w-4 ${typeConfig[doc.type as keyof typeof typeConfig].text}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-gray-600 hidden md:table-cell">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    {doc.date}
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  {doc.status === 'available' ? (
                    <Badge variant="success">Available</Badge>
                  ) : (
                    <Badge variant="warning">Upcoming</Badge>
                  )}
                </td>
                <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {doc.status === 'available' ? (
                      <>
                        <button 
                          onClick={() => showToast(`Opening ${doc.name}...`, 'info')}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => showToast(`Downloading ${doc.name} as PDF...`, 'success')}
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Not yet available</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
