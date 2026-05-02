import { Shield, BookOpen, AlertTriangle, FileCheck, ExternalLink } from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
          <Shield className="h-6 w-6 text-brand-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Compliance & Legal Hub</h1>
          <p className="text-sm text-gray-500">Quick references for HIPAA, CA BBS, and federal guidelines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BBS Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-blue-50 p-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">California BBS Guidelines</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900 block mb-1">Telehealth Consent</strong>
              <p>Prior to the delivery of health care via telehealth, the provider initiating the use of telehealth shall inform the patient about the use of telehealth and obtain verbal or written consent.</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Record Retention</strong>
              <p>Patient records shall be retained for a minimum of 7 years from the date therapy is terminated. If the client is a minor, records must be retained for at least 7 years past the age of majority (25 years old).</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Supervision Requirements</strong>
              <p>Associates must receive 1 unit of supervision for the first 10 clients, and an additional unit for any clients over 10 in a given week. Video supervision requires explicit consent.</p>
            </div>
            <a href="https://www.bbs.ca.gov/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium mt-2">
              Visit BBS Website <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* HIPAA Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-emerald-50 p-2">
              <Shield className="h-5 w-5 text-emerald-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">HIPAA Privacy & Security</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900 block mb-1">Minimum Necessary Rule</strong>
              <p>Covered entities must make reasonable efforts to limit protected health information (PHI) to the minimum necessary to accomplish the intended purpose.</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Breach Notification Rule</strong>
              <p>Breaches affecting 500 or more individuals must be reported to the HHS Secretary without unreasonable delay and in no case later than 60 days following the discovery of the breach.</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Psychotherapy Notes</strong>
              <p>Requires specific written authorization by the patient for any use or disclosure of psychotherapy notes, except for treatment, payment, or health care operations.</p>
            </div>
            <a href="https://www.hhs.gov/hipaa/index.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium mt-2">
              View HHS Guidelines <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* No Surprises Act Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-amber-50 p-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">No Surprises Act</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900 block mb-1">Good Faith Estimate (GFE)</strong>
              <p>Providers must give uninsured and self-pay clients a "Good Faith Estimate" of expected charges. This applies to both current and prospective patients.</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Timeline</strong>
              <p>GFE must be provided within 1 business day if scheduling at least 3 business days ahead, or within 3 business days if scheduling at least 10 days ahead.</p>
            </div>
          </div>
        </div>

        {/* 42 CFR Part 2 Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-purple-50 p-2">
              <FileCheck className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">42 CFR Part 2 (SUD)</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900 block mb-1">Substance Use Disorder Privacy</strong>
              <p>Stricter than HIPAA. Requires explicit, specific written consent to disclose patient identifying information related to substance use disorder treatment.</p>
            </div>
            <div>
              <strong className="text-gray-900 block mb-1">Prohibition on Redisclosure</strong>
              <p>Any disclosure made with patient consent must be accompanied by a written statement prohibiting further disclosure unless expressly permitted by the written consent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
