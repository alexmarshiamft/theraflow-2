'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Shield, FileSignature, Download, Info, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ComplianceHub } from '@/components/modules/compliance/ComplianceHub';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function BAAPage() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Zero-Touch Compliance</h1>
            <p className="text-muted-foreground">Manage HIPAA readiness, BAA generation, and audit logs</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)] border border-emerald-500/50">
              <Activity className="w-4 h-4 mr-2" />
              Generate Audit Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="hub" className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800 p-1">
            <TabsTrigger value="hub" className="data-[state=active]:bg-brand-600 data-[state=active]:text-white">Compliance Hub</TabsTrigger>
            <TabsTrigger value="baa" className="data-[state=active]:bg-brand-600 data-[state=active]:text-white">BAA Template</TabsTrigger>
          </TabsList>

          <TabsContent value="hub" className="focus:outline-none">
            <ComplianceHub />
          </TabsContent>

          <TabsContent value="baa" className="focus:outline-none">
            <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 mb-8 flex items-start gap-3">
              <Info className="w-5 h-5 text-brand-500 mt-0.5" />
              <p className="text-sm text-foreground/90">
                This Business Associate Agreement (BAA) establishes the legally binding relationship between your practice (Covered Entity) and Theraflow Health (Business Associate) regarding the safeguarding of Protected Health Information (PHI).
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl shadow-xl p-8 md:p-12 prose dark:prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
                <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                  <Shield className="w-5 h-5" />
                  HIPAA/HITECH Compliant Document
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" /> Download
                  </Button>
                </div>
              </div>

              <h2>1. Definitions</h2>
              <p>
                Catch-all definition: The following terms used in this Agreement shall have the same meaning as those terms in the HIPAA Rules: Breach, Data Aggregation, Designated Record Set, Disclosure, Health Care Operations, Individual, Minimum Necessary, Notice of Privacy Practices, Protected Health Information, Required By Law, Secretary, Security Incident, Subcontractor, Unsecured Protected Health Information, and Use.
              </p>

              <h2>2. Obligations and Activities of Business Associate</h2>
              <p>Business Associate agrees to:</p>
              <ul>
                <li>Not use or disclose protected health information other than as permitted or required by the Agreement or as required by law;</li>
                <li>Use appropriate safeguards, and comply with Subpart C of 45 CFR Part 164 with respect to electronic protected health information, to prevent use or disclosure of protected health information other than as provided for by the Agreement;</li>
                <li>Report to covered entity any use or disclosure of protected health information not provided for by the Agreement of which it becomes aware, including breaches of unsecured protected health information as required at 45 CFR 164.410, and any security incident of which it becomes aware;</li>
                <li>In accordance with 45 CFR 164.502(e)(1)(ii) and 164.308(b)(2), if applicable, ensure that any subcontractors that create, receive, maintain, or transmit protected health information on behalf of the business associate agree to the same restrictions, conditions, and requirements that apply to the business associate with respect to such information;</li>
              </ul>

              <h2>3. Permitted Uses and Disclosures by Business Associate</h2>
              <p>
                Business associate may only use or disclose protected health information as necessary to perform the services set forth in the Service Agreement between the Parties. In addition, the business associate may use or disclose protected health information as required by law.
              </p>
              
              <h2>4. Term and Termination</h2>
              <p>
                The Term of this Agreement shall be effective as of the date of electronic signature, and shall terminate on the date covered entity terminates for cause as authorized in paragraph (b) of this Section, or when all of the protected health information provided by covered entity to business associate, or created or received by business associate on behalf of covered entity, is destroyed or returned to covered entity.
              </p>
              
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="mb-4">Electronic Signature Log</h3>
                <div className="bg-muted/50 rounded-xl p-4 text-sm font-mono">
                  <div className="flex justify-between border-b border-border pb-2 mb-2">
                    <span className="text-muted-foreground">Document ID:</span>
                    <span className="text-foreground font-bold">BAA-2026-TRX-812</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2 mb-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-amber-500 font-bold">Awaiting Counter-Signature</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span className="text-foreground font-bold">—</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
