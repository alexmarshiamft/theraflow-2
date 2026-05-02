'use client';

import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Phone, Mail, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getInitials, formatDate } from '@/lib/utils';

import { useStore, Client } from '@/lib/store';
import { useToast } from '@/lib/toast';

const statusConfig = {
  active: { variant: 'success' as const, label: 'Active' },
  inactive: { variant: 'default' as const, label: 'Inactive' },
  critical: { variant: 'danger' as const, label: 'Critical' },
};

export function ClientList() {
  const { clients, addClient, deleteClient } = useStore();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newClientId, setNewClientId] = useState('');

  const handleAddClient = () => {
    if (!newName || !newClientId) return;
    addClient({
      id: `C${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: newName,
      dob: '1990-01-01', // placeholder
      clientId: newClientId,
      phone: '(555) 000-0000',
      email: `${newName.split(' ')[0].toLowerCase()}@email.com`,
      lastVisit: new Date().toISOString().split('T')[0],
      nextAppt: null,
      status: 'active',
      provider: 'Sarah Jenkins, LMFT',
      insurance: 'TBD',
      alerts: [],
    });
    setNewName('');
    setNewClientId('');
    setIsModalOpen(false);
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.clientId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section-card overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Client Registry</h3>
          <p className="text-sm text-gray-500">{clients.length} clients on record</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm focus:border-brand-400 focus:bg-white focus:outline-none"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => showToast('Opening advanced filters...', 'info')}>
            <Filter className="h-3.5 w-3.5" /> Filter
          </Button>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-3.5 w-3.5" /> New Client
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Client
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Client ID
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden md:table-cell">
                Insurance
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden lg:table-cell">
                Last Visit
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden lg:table-cell">
                Next Appt
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((client) => (
              <tr key={client.id} className="group hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      {getInitials(client.name)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-xs text-gray-500">DOB: {formatDate(client.dob)}</p>
                    </div>
                    {client.alerts.length > 0 && (
                      <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" aria-label={client.alerts.join(', ')} />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-gray-600 font-mono text-xs">{client.clientId}</td>
                <td className="px-4 py-3.5 text-gray-600 hidden md:table-cell">{client.insurance}</td>
                <td className="px-4 py-3.5 text-gray-600 hidden lg:table-cell">{formatDate(client.lastVisit)}</td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  {client.nextAppt ? (
                    <span className="text-brand-600 font-medium">{formatDate(client.nextAppt)}</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant={statusConfig[client.status].variant}>
                    {statusConfig[client.status].label}
                  </Badge>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={`tel:${client.phone}`}
                      className="rounded p-1 text-gray-400 hover:text-brand-600 hover:bg-brand-50 block"
                      aria-label="Call Client"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                    <a 
                      href={`mailto:${client.email}`}
                      className="rounded p-1 text-gray-400 hover:text-brand-600 hover:bg-brand-50 block"
                      aria-label="Email Client"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                    <button 
                      onClick={() => {
                        deleteClient(client.id);
                        showToast(`Deleted ${client.name}`, 'warning');
                      }}
                      className="rounded p-1 text-gray-400 hover:text-red-600 hover:bg-red-50"
                      aria-label="Delete Client"
                    >
                      <AlertCircle className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
        <p className="text-xs text-gray-500">
          Showing {filtered.length} of {clients.length} clients
        </p>
        <div className="flex gap-1">
          <button 
            onClick={() => showToast('Already on first page', 'warning')}
            className="rounded-lg border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-40"
          >
            Previous
          </button>
          <button 
            onClick={() => showToast('Loading next page...', 'info')}
            className="rounded-lg border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Client</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Client Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. John Smith" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Client ID</label>
                <input 
                  type="text" 
                  value={newClientId} 
                  onChange={e => setNewClientId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. CID-12345" 
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAddClient}>Save Client</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
