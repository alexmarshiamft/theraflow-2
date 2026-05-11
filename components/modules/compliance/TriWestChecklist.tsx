import { CheckCircle2, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function TriWestChecklist() {
  const requirements = [
    {
      id: 'caqh',
      label: 'CAQH ProView Profile Active',
      description: 'Required for credentialing and directory updates.',
      status: 'passed',
    },
    {
      id: 'training',
      label: 'VA Mandatory Training Completed',
      description: 'Community Care Network (CCN) provider orientation.',
      status: 'passed',
    },
    {
      id: 'baa_google',
      label: 'BAA Signed: Google Cloud',
      description: 'Covers EHR data storage and Firebase Auth.',
      status: 'passed',
    },
    {
      id: 'baa_chime',
      label: 'BAA Signed: AWS / Amazon Chime',
      description: 'Covers HIPAA-compliant telehealth video streaming.',
      status: 'passed',
    },
    {
      id: 'npi',
      label: 'NPI Registry Match',
      description: 'Taxonomy matches licensed clinical social worker / MFT.',
      status: 'passed',
    }
  ];

  const pendingCount = requirements.filter(r => r.status !== 'passed').length;

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            VA/TriWest Compliance
          </CardTitle>
          {pendingCount === 0 ? (
            <Badge variant="success" className="bg-emerald-100 text-emerald-700">100% Compliant</Badge>
          ) : (
            <Badge variant="warning" className="bg-amber-100 text-amber-700">{pendingCount} Action Required</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {requirements.map(req => (
            <div key={req.id} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {req.status === 'passed' ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{req.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{req.description}</p>
              </div>
              {req.status !== 'passed' && (
                <button className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0 bg-brand-50 px-2 py-1 rounded-md">
                  Resolve <ExternalLink className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
