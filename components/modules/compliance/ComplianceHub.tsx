'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Shield, FileSignature, CheckCircle, AlertTriangle, FileText, Lock, Users, Activity } from 'lucide-react';

export function ComplianceHub() {
  const [baaSigned, setBaaSigned] = useState(false);

  return (
    <div className="space-y-6">
      {/* Overview Status */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-emerald-500" />
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Compliant</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">HIPAA</h3>
            <p className="text-sm text-slate-400">Overall Status</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-brand-500/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-brand-500" />
              </div>
              <Badge variant="outline" className="bg-brand-500/10 text-brand-500 border-brand-500/20">Active</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">AES-256</h3>
            <p className="text-sm text-slate-400">Encryption Level</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-amber-500" />
              </div>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Action Needed</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">85%</h3>
            <p className="text-sm text-slate-400">Team Training Completion</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-indigo-500" />
              </div>
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20">Protected</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white">1.2M</h3>
            <p className="text-sm text-slate-400">Events Logged (30d)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* BAA Management */}
        <Card className="bg-slate-900 border-slate-800 flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-brand-500" />
              Business Associate Agreements
            </CardTitle>
            <CardDescription className="text-slate-400">
              Manage BAAs with third-party vendors and software providers.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-brand-500/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-brand-500" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">Theraflow Platform BAA</p>
                    <p className="text-xs text-slate-400">Last updated: Jan 15, 2026</p>
                  </div>
                </div>
                {baaSigned ? (
                  <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">
                    <CheckCircle className="mr-1 h-3 w-3" /> Executed
                  </Badge>
                ) : (
                  <Button size="sm" onClick={() => setBaaSigned(true)} className="bg-brand-600 hover:bg-brand-500 text-white">
                    Sign BAA
                  </Button>
                )}
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-indigo-500/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">Google Workspace BAA</p>
                    <p className="text-xs text-slate-400">Executed: Mar 10, 2025</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">
                  <CheckCircle className="mr-1 h-3 w-3" /> Executed
                </Badge>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-slate-700 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">Zoom Video Communications</p>
                    <p className="text-xs text-slate-400">Action Required</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit & Compliance Readiness */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-500" />
              Audit Readiness Checklist
            </CardTitle>
            <CardDescription className="text-slate-400">
              Automated compliance checks and remediation recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">Data Encryption at Rest</h4>
                  <p className="text-xs text-slate-400">All databases and object storage buckets are encrypted using AES-256.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">Data Encryption in Transit</h4>
                  <p className="text-xs text-slate-400">TLS 1.3 enforced for all inbound and outbound traffic.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">Access Controls</h4>
                  <p className="text-xs text-slate-400">Role-based access control (RBAC) and MFA enforced for all clinical staff.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="mt-0.5">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-amber-500">Annual HIPAA Training</h4>
                  <p className="text-xs text-amber-400/80 mb-2">2 associates have not completed their 2026 HIPAA recertification.</p>
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-amber-950 h-8">
                    Send Reminder
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
