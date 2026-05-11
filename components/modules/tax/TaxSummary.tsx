'use client';

import { Sparkles, ShieldCheck } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';

export function TaxSummary() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="space-y-4">
      {/* AI Guidance Card */}
      <div className="section-card bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-5 border-0 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-indigo-300" />
            <h3 className="text-base font-semibold text-white">AI Tax Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
              <p className="text-sm text-indigo-100">
                <strong className="text-white">W-2 Status:</strong> As a W-2 employee, your employer automatically withholds federal and state taxes. You do not need to make quarterly estimated tax payments.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
              <p className="text-sm text-indigo-100 leading-relaxed">
                <strong className="text-white">California Deductions:</strong> While federal tax law no longer allows W-2 employees to deduct unreimbursed business expenses, <strong>California still allows it.</strong> You can deduct qualifying expenses (like BBS licensing fees, liability insurance, and mandatory CEUs) on your CA state return (Form 540) to the extent they exceed 2% of your Adjusted Gross Income.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-indigo-200 mt-2">
              <ShieldCheck className="h-3 w-3" />
              <span>Guidance is informational, not financial advice.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Breakdown */}
      <div className="section-card p-5">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-gray-900">YTD Tax Withholdings</h3>
            <p className="text-sm text-gray-500">Breakdown for {currentYear}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Withheld</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(524.06)}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm font-medium text-gray-700">Federal Income Tax</span>
            </div>
            <span className="font-semibold text-gray-900">{formatCurrency(152.68)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-teal-500" />
              <span className="text-sm font-medium text-gray-700">CA State Income Tax & SDI</span>
            </div>
            <span className="font-semibold text-gray-900">{formatCurrency(82.90)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="text-sm font-medium text-gray-700">FICA (Social Security & Medicare)</span>
            </div>
            <span className="font-semibold text-gray-900">{formatCurrency(288.48)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
