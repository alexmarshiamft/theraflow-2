'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore, TrackedHour } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  FileText, 
  Upload, 
  BrainCircuit, 
  X,
  Target,
  Award,
  CheckCircle2,
  TrendingUp,
  Clock,
  History,
  Activity,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCard } from '@/components/ui/StatCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

export default function LicensureProgressPage() {
  const { trackedHours, addTrackedHours, addVaultDocument, vaultDocuments, clearLicensureData } = useStore();
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusMessage, setUploadStatusMessage] = useState('');

  // Calculate totals
  const totalVerified = trackedHours
    .filter(h => h.status === 'verified' || h.status === 'adjusted')
    .reduce((acc, h) => acc + h.durationMinutes, 0) / 60;
  
  // Only use verified uploaded hours
  const totalHours = totalVerified;
  const targetHours = 3000;
  const remainingHours = Math.max(0, targetHours - totalHours);
  const progressPercentage = Math.min((totalHours / targetHours) * 100, 100);

  // Current Pace Settings (Mocked from user input)
  const currentPace = {
    direct: 24,
    cfc: 3,
    nonClinical: 10,
    triadic: 1,
    group: 2,
    total: 40
  };
  const weeksRemaining = remainingHours / currentPace.total;
  const estimatedCompletionDate = new Date();
  estimatedCompletionDate.setDate(estimatedCompletionDate.getDate() + (weeksRemaining * 7));

  const handleUploadDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      
      setIsUploadModalOpen(true);
      setIsUploading(true);
      setUploadProgress(10);
      setUploadStatusMessage(`Reading ${files.length} file(s) securely...`);

      try {
        let allHours: TrackedHour[] = [];
        let savedToVaultCount = 0;
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setUploadProgress(10 + Math.floor((i / files.length) * 70));
          setUploadStatusMessage(`Analyzing document ${i + 1} of ${files.length}...`);

          // Convert file to Base64
          const fileBase64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const result = reader.result as string;
              // Remove the data:mime/type;base64, prefix for the Gemini API
              const base64Data = result.split(',')[1];
              resolve(base64Data);
            };
            reader.onerror = error => reject(error);
          });

          let parsedHoursFromDoc = false;

          try {
            const response = await fetch('/api/licensure/parse', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fileData: fileBase64,
                mimeType: file.type,
              })
            });

            if (response.ok) {
              const data = await response.json();
              if (data.hours && data.hours.length > 0) {
                const uniqueHours = data.hours.map((hour: any) => ({
                  ...hour,
                  id: `EXTRACT-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
                }));
                allHours = [...allHours, ...uniqueHours];
                parsedHoursFromDoc = true;
              }
            } else {
              console.warn(`Document ${i + 1} could not be parsed for hours.`);
            }
          } catch (docError) {
            console.error(`Error processing document ${i + 1}:`, docError);
          }

          // Save ALL documents to vault
          addVaultDocument({
            id: `VAULT-${Date.now()}-${i}`,
            name: file.name,
            type: file.type,
            size: file.size,
            uploadDate: new Date().toISOString(),
            category: parsedHoursFromDoc ? 'licensure' : 'general'
            // Omit data to prevent QuotaExceededError in localStorage
          });
          
          if (!parsedHoursFromDoc) {
            savedToVaultCount++;
          }
        }

        setUploadProgress(90);
        setUploadStatusMessage('Finalizing documents...');

        if (allHours.length > 0) {
          addTrackedHours(allHours);
          setUploadProgress(100);
          setUploadStatusMessage(`Complete. ${allHours.length} hours entries added. ${savedToVaultCount > 0 ? `${savedToVaultCount} docs saved to Vault.` : ''}`);
        } else {
          setUploadProgress(100);
          setUploadStatusMessage(`No clinical hours detected. ${savedToVaultCount} document(s) saved securely to Vault.`);
        }

        setTimeout(() => {
          setIsUploading(false);
          setIsUploadModalOpen(false);
          // Reset file input
          if (e.target) e.target.value = '';
        }, 3000);

      } catch (error) {
        console.error('Error processing documents:', error);
        setUploadStatusMessage('Error processing documents. Please try again.');
        setTimeout(() => {
          setIsUploading(false);
          setIsUploadModalOpen(false);
          if (e.target) e.target.value = '';
        }, 3000);
      }
    }
  };
  // Calculate specific breakdowns
  const directCounseling = trackedHours
    .filter(h => h.type === 'Direct Counseling')
    .reduce((acc, h) => acc + h.durationMinutes, 0) / 60;
    
  const cfcDirect = trackedHours
    .filter(h => h.type === 'Couples, Families, Children')
    .reduce((acc, h) => acc + h.durationMinutes, 0) / 60;
    
  const individualTriadicSupervision = trackedHours
    .filter(h => h.type === 'Individual/Triadic Supervision')
    .reduce((acc, h) => acc + h.durationMinutes, 0) / 60;
    
  const groupSupervision = trackedHours
    .filter(h => h.type === 'Group Supervision')
    .reduce((acc, h) => acc + h.durationMinutes, 0) / 60;
    
  const supervision = individualTriadicSupervision + groupSupervision;
    
  const nonClinical = trackedHours
    .filter(h => h.type === 'Non-Clinical' || h.type === 'Diagnosis and Treatment')
    .reduce((acc, h) => acc + h.durationMinutes, 0) / 60;

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="page-title flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Licensure Progress
            </h1>
            <p className="page-subtitle">Track your path to licensure and manage historical logs.</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                if(window.confirm('Are you sure you want to clear all imported hours and vault documents? This action cannot be undone.')) {
                  clearLicensureData();
                }
              }}
              variant="outline"
              className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <span>
                <X className="h-4 w-4 inline-block mr-2" />
                Clear Data
              </span>
            </Button>
            <input 
              type="file" 
              id="document-upload" 
              className="hidden" 
              accept=".pdf,.csv,.xlsx,.jpg,.png"
              multiple
              onChange={handleUploadDocument} 
            />
            <label htmlFor="document-upload">
              <Button 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('document-upload')?.click();
                }}
                className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 text-white shadow-lg shadow-indigo-500/25"
              >
                <span>
                  <Upload className="h-4 w-4 inline-block mr-2" />
                  Import Past Hours
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* Hero Progress Card */}
      <div className="mb-8">
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 overflow-hidden relative shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-indigo-900 opacity-20 blur-3xl"></div>
          
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-white flex items-center justify-between">
              <span className="text-xl">BBS Licensure Progress</span>
              <Badge variant="info" className="bg-white/20 text-white hover:bg-white/30 border-0 font-medium">AMFT Track</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-4">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-5xl font-bold tracking-tight">
                  {Math.floor(totalHours).toLocaleString()} 
                  <span className="text-xl font-medium text-purple-200 ml-2">/ {targetHours.toLocaleString()} hrs</span>
                </p>
                <p className="text-purple-100 mt-2 font-medium">{Math.floor(remainingHours).toLocaleString()} hours remaining to LMFT</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white mb-1">{progressPercentage.toFixed(1)}% Complete</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium bg-white/10 px-2 py-1 rounded text-purple-100">
                  <TrendingUp className="h-3 w-3" />
                  On track
                </span>
              </div>
            </div>
            <div className="h-4 w-full bg-black/20 rounded-full overflow-hidden mt-6 backdrop-blur-sm shadow-inner relative">
              <div 
                className="h-full bg-gradient-to-r from-blue-300 via-white to-white rounded-full relative transition-all duration-1000 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/50 animate-pulse rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Breakdowns */}
      <div className="grid gap-6 sm:grid-cols-3 mb-8">
        <StatCard
          title="Direct Counseling"
          value={Math.floor(directCounseling).toLocaleString()}
          change="Max 1,750 hrs"
          changeType="neutral"
          icon={Activity}
          iconColor="text-blue-500"
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Supervision"
          value={Math.floor(supervision).toLocaleString()}
          change="Min 104 weeks"
          changeType="neutral"
          icon={Award}
          iconColor="text-purple-500"
          iconBg="bg-purple-500/10"
        />
        <StatCard
          title="Non-Clinical"
          value={Math.floor(nonClinical).toLocaleString()}
          change="Max 1,250 hrs"
          changeType="neutral"
          icon={FileText}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-500/10"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              Document History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vaultDocuments.length > 0 ? (
                vaultDocuments.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-start justify-between p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0 h-10 w-10 flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Imported on {new Date(doc.uploadDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge variant="success" className="bg-emerald-500/10 text-emerald-600 border-0">
                      {doc.category === 'licensure' ? 'Hours Parsed' : 'Vaulted'}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-lg bg-muted/20">
                  <FileText className="h-8 w-8 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">No documents imported yet</p>
                  <p className="text-xs mt-1 opacity-70">Upload past logs to begin tracking</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trackedHours.length > 0 ? (
              <>
                <div className="flex gap-3 text-sm">
                  <div className="mt-0.5 rounded-full bg-emerald-500/20 p-1 text-emerald-600 shrink-0 h-5 w-5 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground leading-relaxed">
                      You are currently tracking <span className="font-semibold text-primary">{totalHours.toFixed(2)} total hours</span>. 
                      You need <span className="font-semibold text-primary">{Math.max(0, 3000 - totalHours).toFixed(2)} more hours</span> to reach your 3,000 hour requirement.
                    </p>
                    <div className="mt-3 bg-muted/40 p-3 rounded-md border border-border/50">
                      <p className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-2">Total Hours Breakdown</p>
                      <ul className="space-y-1.5 text-xs">
                        <li className="flex justify-between items-center">
                          <span className="text-foreground"><strong>A.</strong> Direct Counseling</span>
                          <span className="font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">{(directCounseling + cfcDirect).toFixed(2)} hrs</span>
                        </li>
                        <li className="flex justify-between items-center pl-4 text-muted-foreground">
                          <span>↳ A1. Couples, Families, Children</span>
                          <span>{cfcDirect.toFixed(2)} hrs</span>
                        </li>
                        <li className="flex justify-between items-center pt-1 mt-1 border-t border-border/50">
                          <span className="text-foreground"><strong>B.</strong> Non-Clinical Experience</span>
                          <span className="font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">{(nonClinical + supervision).toFixed(2)} hrs</span>
                        </li>
                        <li className="flex justify-between items-center pl-4 text-muted-foreground">
                          <span>↳ B1. Individual/Triadic Supervision</span>
                          <span>{individualTriadicSupervision.toFixed(2)} hrs</span>
                        </li>
                        <li className="flex justify-between items-center pl-4 text-muted-foreground">
                          <span>↳ B2. Group Supervision</span>
                          <span>{groupSupervision.toFixed(2)} hrs</span>
                        </li>
                        <li className="flex justify-between items-center pl-4 text-muted-foreground">
                          <span>↳ Admin / Paperwork</span>
                          <span>{nonClinical.toFixed(2)} hrs</span>
                        </li>
                        <li className="flex justify-between items-center pt-2 mt-2 border-t border-border/50 font-semibold text-primary">
                          <span><strong>C.</strong> Total Logged Hours (A + B)</span>
                          <span>{totalHours.toFixed(2)} hrs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <div className="mt-0.5 rounded-full bg-purple-500/20 p-1 text-purple-600 shrink-0 h-5 w-5 flex items-center justify-center">
                    <Clock className="h-3 w-3" />
                  </div>
                  <p className="text-foreground leading-relaxed">
                    You have logged <span className="font-semibold text-purple-600 dark:text-purple-400">{supervision.toFixed(2)} hours</span> of supervision. Ensure you maintain a ratio of 1 supervision unit per 10 client hours.
                  </p>
                </div>
                <div className="flex gap-3 text-sm mt-4 pt-4 border-t border-border/50">
                  <div className="mt-0.5 rounded-full bg-blue-500/20 p-1 text-blue-600 shrink-0 h-5 w-5 flex items-center justify-center">
                    <TrendingUp className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground leading-relaxed">
                      Based on your current pace of <span className="font-semibold text-blue-600 dark:text-blue-400">{currentPace.total} hours/week</span>, you are projected to reach your 3,000 hour requirement in <strong>{Math.ceil(weeksRemaining)} weeks</strong>.
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Estimated Completion: <span className="font-medium text-foreground">{estimatedCompletionDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </p>
                    <div className="mt-3 bg-muted/40 p-3 rounded-md border border-border/50">
                      <p className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-2">Pacing Analysis</p>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        <li className="flex justify-between items-center">
                          <span>Direct Counseling Pace</span>
                          <span className="font-medium text-foreground">{(currentPace.direct + currentPace.cfc)} hrs/wk</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Supervision Pace</span>
                          <span className="font-medium text-foreground">{(currentPace.triadic + currentPace.group)} hrs/wk</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Non-Clinical Pace</span>
                          <span className="font-medium text-foreground">{currentPace.nonClinical} hrs/wk</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-lg bg-muted/20">
                <BrainCircuit className="h-8 w-8 mx-auto mb-3 opacity-20" />
                <p className="text-sm">No data available for insights</p>
                <p className="text-xs mt-1 opacity-70">Import past hours to unlock AI pacing and breakdowns</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Explorer Tabs */}
      <div className="mt-8 mb-8">
        <Tabs defaultValue="hours" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="hours" className="gap-2">
              <Activity className="h-4 w-4" />
              Recent Imported Hours
            </TabsTrigger>
            <TabsTrigger value="vault" className="gap-2">
              <FileText className="h-4 w-4" />
              Document Vault
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="hours">
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-0">
                {trackedHours.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-3 rounded-tl-lg font-medium">Date</th>
                          <th className="px-4 py-3 font-medium">Client / Source</th>
                          <th className="px-4 py-3 font-medium">Category</th>
                          <th className="px-4 py-3 font-medium">Duration</th>
                          <th className="px-4 py-3 rounded-tr-lg font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trackedHours.slice(0, 5).map((hour) => (
                          <tr key={hour.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                            <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                              {new Date(hour.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {hour.client}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                {hour.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-medium">
                              {(hour.durationMinutes / 60).toFixed(1)} hrs
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Badge variant={hour.status === 'verified' ? 'success' : 'default'} className="bg-background">
                                {hour.status === 'verified' ? 'Verified' : 'Pending'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="bg-muted/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 opacity-50" />
                    </div>
                    <p>No hours imported yet.</p>
                    <p className="text-sm mt-1">Upload a timesheet to get started.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vault">
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-0">
                {vaultDocuments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-3 rounded-tl-lg font-medium">Upload Date</th>
                          <th className="px-4 py-3 font-medium">Filename</th>
                          <th className="px-4 py-3 font-medium">Category</th>
                          <th className="px-4 py-3 font-medium">Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vaultDocuments.map((doc) => (
                          <tr key={doc.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                            <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                              {new Date(doc.uploadDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground truncate max-w-[200px]" title={doc.name}>
                              {doc.name}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary capitalize">
                                {doc.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-medium">
                              {(doc.size / 1024).toFixed(1)} KB
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="bg-muted/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <History className="h-6 w-6 opacity-50" />
                    </div>
                    <p>Your document vault is empty.</p>
                    <p className="text-sm mt-1">Files uploaded in this tracking session will appear here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Document Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">AI Document Parser</h3>
                  <p className="text-sm text-muted-foreground">Extracting hours data</p>
                </div>
              </div>
              {!isUploading && (
                <Button variant="ghost" size="icon" onClick={() => setIsUploadModalOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                  <div className="relative rounded-full bg-primary/10 p-4">
                    <BrainCircuit className={cn("h-8 w-8 text-primary", isUploading && "animate-pulse")} />
                  </div>
                </div>
                <p className="text-sm font-medium animate-pulse">{uploadStatusMessage}</p>
              </div>

              <div className="space-y-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
              </div>
            </div>
            
            {!isUploading && uploadProgress === 100 && (
              <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setIsUploadModalOpen(false)}>
                Done
              </Button>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
