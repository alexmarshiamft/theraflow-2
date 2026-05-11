import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Shield, FileText, Download, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function TermsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Platform Terms & Privacy</h1>
            <p className="text-slate-500 dark:text-slate-400">Legal agreements governing the use of the Theraflow platform.</p>
          </div>
          <Button variant="outline" className="dark:border-slate-700 dark:text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-8 md:p-12 prose dark:prose-invert max-w-none">
          <div className="flex items-center gap-2 mb-8 text-brand-600 dark:text-brand-500 font-semibold border-b border-slate-100 dark:border-slate-800 pb-4">
            <Lock className="w-5 h-5" />
            Theraflow Health Master Subscription Agreement
          </div>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Theraflow Health platform ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service. These terms apply to all visitors, users, and others who access or use the Service, including healthcare providers, administrative staff, and patients.
          </p>

          <h2>2. Healthcare Disclaimer</h2>
          <p>
            Theraflow Health is a technology provider, not a healthcare provider. The Service is designed to assist clinicians in their practice management. Information generated or provided by the Service is not a substitute for professional medical advice, diagnosis, or treatment. Clinicians retain sole responsibility for patient care and medical decision-making.
          </p>

          <h2>3. Data Privacy and Security (SOC2 & HIPAA)</h2>
          <p>
            We take data security seriously. Theraflow Health complies with the Health Insurance Portability and Accountability Act (HIPAA) and maintains SOC2 Type II compliance. 
          </p>
          <ul>
            <li>All Protected Health Information (PHI) is encrypted at rest using AES-256 and in transit using TLS 1.3.</li>
            <li>Role-Based Access Control (RBAC) ensures data is only accessible to authorized personnel.</li>
            <li>Immutable audit logs are maintained for all clinical and financial data access and modifications.</li>
          </ul>
          <p>
            A separate Business Associate Agreement (BAA) must be executed before you may upload or process PHI on the platform.
          </p>

          <h2>4. Financial and Payroll Processing</h2>
          <p>
            Theraflow integrates with third-party financial services (e.g., Stripe, Plaid) to process payments and payroll. By using these features, you agree to the respective terms of service of our financial partners. Theraflow is not a bank and does not hold funds directly.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any local, state, national, or international law, including HIPAA and HITECH acts.</li>
            <li>Attempt to bypass or break any security mechanism on the Platform.</li>
            <li>Upload malicious code, viruses, or disruptive software.</li>
            <li>Sell, resell, or lease the Service without explicit written permission from Theraflow Health.</li>
          </ul>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 text-center">
            Last Updated: May 2026 • Document Version 2.1.0
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
