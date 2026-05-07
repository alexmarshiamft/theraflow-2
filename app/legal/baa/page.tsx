'use client';

import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function BusinessAssociateAgreement() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Associate Agreement (BAA)</h1>
          <p className="text-gray-500">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-brand max-w-none text-gray-700 space-y-6">
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex gap-3">
            <ShieldAlert className="h-6 w-6 text-amber-600 flex-shrink-0" />
            <div className="text-sm text-amber-900">
              <strong className="block mb-1">DISCLAIMER: TEMPLATE DOCUMENT</strong>
              This is a standard boilerplate Business Associate Agreement. Theraflow platform operators must consult with legal counsel to adapt this document for their specific jurisdiction prior to commercial use.
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-900">1. Definitions</h2>
            <p>
              Terms used, but not otherwise defined, in this Agreement shall have the same meaning as those terms in the HIPAA Rules. 
              <br />
              <strong>"Covered Entity"</strong> refers to you, the healthcare provider utilizing the Service.
              <br />
              <strong>"Business Associate"</strong> refers to Theraflow.
              <br />
              <strong>"Protected Health Information" (PHI)</strong> shall have the same meaning as the term "protected health information" in 45 CFR § 160.103.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">2. Obligations and Activities of Business Associate</h2>
            <p>Business Associate agrees to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Not use or disclose protected health information other than as permitted or required by the Agreement or as required by law.</li>
              <li>Use appropriate safeguards, and comply with Subpart C of 45 CFR Part 164 with respect to electronic protected health information, to prevent use or disclosure of protected health information other than as provided for by the Agreement.</li>
              <li>Report to covered entity any use or disclosure of protected health information not provided for by the Agreement of which it becomes aware, including breaches of unsecured protected health information as required at 45 CFR 164.410, and any security incident of which it becomes aware.</li>
              <li>Ensure that any subcontractors that create, receive, maintain, or transmit protected health information on behalf of the business associate agree to the same restrictions, conditions, and requirements that apply to the business associate with respect to such information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">3. Permitted Uses and Disclosures</h2>
            <p>
              Business Associate may only use or disclose protected health information to perform functions, activities, or services for, or on behalf of, Covered Entity as specified in the Terms of Service.
              <br />
              Business Associate may use or disclose protected health information as required by law.
              <br />
              Business associate may not use or disclose protected health information in a manner that would violate Subpart E of 45 CFR Part 164 if done by covered entity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">4. Provisions for Covered Entity to Inform Business Associate</h2>
            <p>
              Covered entity shall notify business associate of any limitation(s) in the notice of privacy practices of covered entity under 45 CFR 164.520, to the extent that such limitation may affect business associate’s use or disclosure of protected health information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">5. Term and Termination</h2>
            <p>
              <strong>Term.</strong> The Term of this Agreement shall be effective as of the date of electronic acceptance during account registration, and shall terminate on the date covered entity terminates for cause as authorized in paragraph (b) of this Section, or when all of the protected health information provided by covered entity to business associate, or created, received, or maintained by business associate on behalf of covered entity, is destroyed or returned to covered entity.
              <br /><br />
              <strong>Termination for Cause.</strong> Business associate authorizes termination of this Agreement by covered entity, if covered entity determines business associate has violated a material term of the Agreement.
            </p>
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
