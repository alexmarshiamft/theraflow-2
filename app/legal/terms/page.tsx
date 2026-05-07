'use client';

import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-brand max-w-none text-gray-700 space-y-6">
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex gap-3">
            <ShieldAlert className="h-6 w-6 text-amber-600 flex-shrink-0" />
            <div className="text-sm text-amber-900">
              <strong className="block mb-1">DISCLAIMER: TEMPLATE DOCUMENT</strong>
              This is a standard boilerplate Terms of Service. Theraflow platform operators must consult with legal counsel to adapt this document for their specific jurisdiction prior to commercial use.
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Theraflow platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">2. Description of Service</h2>
            <p>
              Theraflow provides electronic health record (EHR), practice management, and related administrative tools for healthcare professionals. The Service is provided solely as a tool to assist you in the administration of your practice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">3. Medical Disclaimer</h2>
            <p className="uppercase font-semibold">
              Theraflow is not a healthcare provider and does not provide medical advice. The Service is an administrative tool only. You are solely responsible for the medical care and treatment of your patients, and you agree that Theraflow assumes no responsibility for any patient outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">4. User Responsibilities</h2>
            <p>
              You agree to use the Service in compliance with all applicable laws, including but not limited to the Health Insurance Portability and Accountability Act (HIPAA) and applicable state telehealth and privacy laws. You are responsible for obtaining all necessary patient consents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">5. Limitation of Liability</h2>
            <div className="bg-gray-100 p-4 border-l-4 border-gray-400 font-mono text-sm uppercase">
              To the maximum extent permitted by applicable law, in no event shall Theraflow, its affiliates, agents, directors, employees, or suppliers be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, this service. 
              <br /><br />
              Under no circumstances will Theraflow be responsible for any damage, loss, or injury resulting from hacking, tampering, or other unauthorized access or use of the service.
              <br /><br />
              To the maximum extent permitted by applicable law, Theraflow's total liability to you for any claims arising out of or relating to these terms or your use of the service will be limited to the total amount you paid to Theraflow in the twelve (12) months immediately preceding the event giving rise to the liability.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">6. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Theraflow and its licensees and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of: 
              a) your use and access of the Service, by you or any person using your account and password; 
              b) a breach of these Terms; or 
              c) any claim of medical malpractice or professional negligence associated with your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">7. Warranty Disclaimer</h2>
            <div className="bg-gray-100 p-4 border-l-4 border-gray-400 font-mono text-sm uppercase">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Theraflow makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content or materials included therein. You expressly agree that your use of these services, their content, and any services or items obtained from us is at your sole risk.
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link href="/auth/signup" className="text-brand-600 hover:text-brand-700 font-medium">
              &larr; Return to Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
