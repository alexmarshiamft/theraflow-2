'use client';

import { useState } from 'react';
import { Mail, MoreHorizontal, Phone, Plus, Search, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, getInitials } from '@/lib/utils';

import { useStore, Employee } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { AlertCircle } from 'lucide-react';

const deptColors: Record<string, string> = {
  Clinical: 'bg-brand-50 text-brand-700',
  Administration: 'bg-purple-50 text-purple-700',
  Finance: 'bg-amber-50 text-amber-700',
};

const statusConfig = {
  active: { variant: 'success' as const, label: 'Active' },
  'on-leave': { variant: 'warning' as const, label: 'On Leave' },
  terminated: { variant: 'danger' as const, label: 'Terminated' },
};

export function EmployeeList() {
  const { employees, addEmployee, deleteEmployee } = useStore();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleAddEmployee = () => {
    if (!newName || !newTitle) return;
    addEmployee({
      id: `E${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: newName,
      title: newTitle,
      department: 'Clinical',
      email: `${newName.split(' ')[0].toLowerCase()}@theraflow.health`,
      phone: '(555) 000-0000',
      salary: 60_000,
      payType: 'salary',
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
    });
    setNewName('');
    setNewTitle('');
    setIsModalOpen(false);
  };


  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section-card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Employees</h3>
          <p className="text-sm text-gray-500">{employees.filter((e) => e.status === 'active').length} active · {employees.length} total</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm focus:border-brand-400 focus:bg-white focus:outline-none sm:w-48"
            />
          </div>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-3.5 w-3.5" /> Add Employee
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Employee</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden sm:table-cell">Department</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 hidden md:table-cell">Compensation</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((emp) => (
              <tr key={emp.id} className="group hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                      {getInitials(emp.name)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{emp.name}</p>
                      <p className="text-xs text-gray-500">{emp.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden sm:table-cell">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${deptColors[emp.department] ?? 'bg-gray-100 text-gray-700'}`}>
                    {emp.department}
                  </span>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <p className="font-semibold text-gray-800">
                    {emp.payType === 'salary'
                      ? `${formatCurrency(emp.salary as number)}/yr`
                      : `${formatCurrency(emp.salary as number)}/hr`}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">{emp.payType}</p>
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant={statusConfig[emp.status].variant}>{statusConfig[emp.status].label}</Badge>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => showToast(`Calling ${emp.phone}...`, 'success')}
                      className="rounded p-1 text-gray-400 hover:text-brand-600 hover:bg-brand-50"
                      aria-label="Call Employee"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => showToast(`Drafting email to ${emp.email}...`, 'info')}
                      className="rounded p-1 text-gray-400 hover:text-brand-600 hover:bg-brand-50"
                      aria-label="Email Employee"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => showToast(`Viewing profile for ${emp.name}`, 'info')}
                      className="rounded p-1 text-gray-400 hover:text-brand-600 hover:bg-brand-50"
                      aria-label="View Profile"
                    >
                      <UserCheck className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => {
                        deleteEmployee(emp.id);
                        showToast(`Deleted employee ${emp.name}`, 'warning');
                      }}
                      className="rounded p-1 text-gray-400 hover:text-red-600 hover:bg-red-50"
                      aria-label="Delete Employee"
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

      {/* Add Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Employee</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. Jane Smith" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-brand-500 focus:outline-none" 
                  placeholder="e.g. Medical Assistant" 
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleAddEmployee}>Save Employee</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
