'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import {
  DollarSign,
  Users,
  Building,
  CheckCircle2,
  Sparkles,
  Trophy,
  Receipt,
  PieChart,
  TrendingUp,
  ArrowRight,
  HeartHandshake,
  Building2,
  ShieldCheck,
  Lock,
  Fingerprint,
  Banknote,
  Landmark,
  Zap
} from 'lucide-react';

export default function PayrollPage() {
  const [settlementState, setSettlementState] = useState<'pending' | 'processing' | 'settled'>('pending');
  const [processingStep, setProcessingStep] = useState(0);

  const transactions = useStore((state) => state.transactions);
  const employees = useStore((state) => state.employees);
  const payrollRuns = useStore((state) => state.payrollRuns);
  const runPayroll = useStore((state) => state.runPayroll);
  const isBankAccountConnected = useStore((state) => state.isBankAccountConnected);
  const setBankAccountConnected = useStore((state) => state.setBankAccountConnected);
  const executeSCorpDistribution = useStore((state) => state.executeSCorpDistribution);

  const [showBankModal, setShowBankModal] = useState(false);
  const [bankConnectStep, setBankConnectStep] = useState<'idle' | 'connecting' | 'success'>('idle');
  const [scorpStatus, setScorpStatus] = useState<'idle' | 'executing' | 'done'>('idle');

  const currentPeriod = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const existingRun = payrollRuns.find((r) => r.period === currentPeriod);

  useEffect(() => {
    if (existingRun && settlementState !== 'settled') {
      setSettlementState('settled');
    }
  }, [existingRun, settlementState]);

  // Dynamic Revenue Calculation
  // We sum all collected credits. The mock data provides some initial credits.
  const calculatedRevenue = transactions
    .filter(t => t.type === 'credit' && t.status === 'posted' && t.category === 'Insurance Reimbursement')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Use a mix of the mock logic and the real transactions if they are too small so the demo looks impressive
  const grossIncome = existingRun ? existingRun.grossRevenue : (calculatedRevenue > 50000 ? calculatedRevenue : 104340);
  
  // Dynamic Associates
  const activeAssociates = employees.filter(e => e.department === 'Clinical' && e.status === 'active' && e.title.includes('Associate'));
  const numAssociates = activeAssociates.length || 6;

  // 50/50 Split
  const associateShare = existingRun ? existingRun.associateShare : grossIncome * 0.5;
  const practiceShare = grossIncome - associateShare;
  const perAssociate = associateShare / numAssociates;

  // Expenses
  const supervisorPay = 16 * 200; // $3,200
  
  const calculatedExpenses = transactions
    .filter(t => t.type === 'debit' && t.status === 'posted' && (t.category === 'Supplies' || t.category === 'Software'))
    .reduce((sum, t) => sum + t.amount, 0);
    
  const operatingExpenses = existingRun ? (grossIncome * 0.05) : (calculatedExpenses > 0 ? calculatedExpenses : 1800);

  // Pre-tax Profit
  const netOperatingIncome = practiceShare - supervisorPay - operatingExpenses;

  // Taxes
  const taxRate = 0.333; // 33.3% blended Fed+CA
  const estimatedTaxes = netOperatingIncome * taxRate;

  // Final Net
  const netOwnerProfit = existingRun ? existingRun.netProfit : (netOperatingIncome - estimatedTaxes);

  const handleAuthorize = () => {
    setSettlementState('processing');
    setProcessingStep(0);
    
    // Simulate multi-step sequential execution (slower ticks for sub-states)
    const steps = 40;
    const interval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= steps) {
          clearInterval(interval);
          setTimeout(() => {
            if (!existingRun) {
              runPayroll(currentPeriod, grossIncome, associateShare, netOwnerProfit);
            }
            setSettlementState('settled');
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 350);
  };

  const processTasks = [
    { id: 1, label: "Formal Paystubs (PDFs)", start: 0, completing: 4, confirmed: 8 },
    { id: 2, label: "Email Delivery Confirmations", start: 8, completing: 12, confirmed: 16 },
    { id: 3, label: "6 Associate ACH Direct Deposits", start: 16, completing: 22, confirmed: 28 },
    { id: 4, label: "Federal & CA State Tax Liabilities", start: 28, completing: 34, confirmed: 40 }
  ];

  const handleConnectBank = () => {
    setBankConnectStep('connecting');
    setTimeout(() => {
      setBankConnectStep('success');
      setTimeout(() => {
        setBankAccountConnected(true);
        setShowBankModal(false);
      }, 2000);
    }, 3000);
  };

  const handleExecuteSCorp = () => {
    setScorpStatus('executing');
    setTimeout(() => {
      executeSCorpDistribution(15000); // the K1 distribution amount
      setScorpStatus('done');
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Monthly Payroll & Settlement</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review and authorize the end-of-month settlement for {currentPeriod}.
          </p>
        </div>
        {settlementState === 'pending' && (
          isBankAccountConnected ? (
            <Button 
              onClick={handleAuthorize}
              size="lg"
              className="bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Authorize {currentPeriod.split(' ')[0]} Settlement
            </Button>
          ) : (
            <Button 
              onClick={() => setShowBankModal(true)}
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg"
            >
              <Landmark className="h-4 w-4 mr-2" />
              Connect Corporate Bank Account
            </Button>
          )
        )}
      </div>

      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-border animate-in zoom-in-95">
            <div className="p-6 text-center border-b border-border/50 bg-muted/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ShieldCheck className="w-32 h-32" />
              </div>
              <div className="w-16 h-16 bg-card rounded-2xl shadow-sm border border-border flex items-center justify-center mx-auto mb-4 relative z-10">
                <Landmark className="w-8 h-8 text-foreground/90" />
              </div>
              <h2 className="text-xl font-bold text-foreground relative z-10">Link Your Bank</h2>
              <p className="text-sm text-muted-foreground mt-1 relative z-10">Secure connection via Theraflow Financial</p>
            </div>
            
            <div className="p-8">
              {bankConnectStep === 'idle' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 cursor-pointer border border-transparent hover:border-border transition-colors">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Chase Business</div>
                        <div className="text-xs text-muted-foreground">Checking & Savings</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 cursor-pointer border border-transparent hover:border-border transition-colors">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                        <Building className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Bank of America</div>
                        <div className="text-xs text-muted-foreground">Corporate Accounts</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleConnectBank}
                    className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-md rounded-xl"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground/80 flex items-center justify-center gap-1 mt-4">
                    <Lock className="w-3 h-3" /> End-to-end encryption by Plaid
                  </p>
                </div>
              )}

              {bankConnectStep === 'connecting' && (
                <div className="py-8 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 border-4 border-border border-t-slate-800 rounded-full animate-spin mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">Authenticating...</h3>
                    <p className="text-sm text-muted-foreground">Establishing secure connection</p>
                  </div>
                </div>
              )}

              {bankConnectStep === 'success' && (
                <div className="py-8 text-center space-y-4 animate-in zoom-in fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">Account Linked</h3>
                    <p className="text-sm text-muted-foreground">Your corporate bank is now connected.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {settlementState === 'processing' && (
        <div className="mb-8 max-w-4xl mx-auto bg-card border border-border rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-start gap-12 animate-in fade-in zoom-in-95">
          
          <div className="flex-1 w-full space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-foreground">Orchestrating Settlement...</h3>
                <p className="text-sm text-muted-foreground">Executing institutional-grade payroll operations</p>
              </div>
            </div>
            
            <div className="w-full space-y-4">
              {processTasks.map((task) => {
                let status = 'pending';
                if (processingStep >= task.confirmed) status = 'confirmed';
                else if (processingStep >= task.completing) status = 'completing';
                else if (processingStep >= task.start) status = 'starting';

                return (
                  <div 
                    key={task.id} 
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-500 border ${
                      status === 'confirmed' ? 'bg-emerald-50/50 border-emerald-100 text-foreground' :
                      status === 'completing' ? 'bg-brand-50 border-brand-200 text-brand-900 shadow-sm' :
                      status === 'starting' ? 'bg-muted/50 border-border text-foreground/80' :
                      'opacity-40 border-transparent text-muted-foreground/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">
                        {status === 'confirmed' ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> :
                         (status === 'starting' || status === 'completing') ? <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin ml-0.5" /> :
                         <div className="w-2 h-2 rounded-full bg-slate-300 ml-1.5" />}
                      </div>
                      <span className="font-medium text-sm">{task.label}</span>
                    </div>
                    
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider">
                      {status === 'confirmed' && <span className="text-emerald-600">Confirmed</span>}
                      {status === 'completing' && <span className="text-brand-600 animate-pulse">Completing...</span>}
                      {status === 'starting' && <span className="text-muted-foreground">Starting...</span>}
                      {status === 'pending' && <span className="text-muted-foreground/80">Waiting</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="w-full md:w-[26rem] shrink-0 bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative shadow-inner">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <TrendingUp className="w-48 h-48" />
            </div>
            <h4 className="text-muted-foreground/80 text-sm font-semibold uppercase tracking-wider mb-6">Theraflow Impact</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Instead of spending thousands on non-productive admin time for associates, you freed them up to take on 8 more clients each week. By eliminating manual bookkeeping, you generated thousands more this month for both you and your associates.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-brand-400 font-medium mb-1">Admin Time Saved</p>
                  <div className="text-5xl font-bold font-mono">
                    {Math.min((processingStep / 40) * 144, 144).toFixed(0)} <span className="text-xl text-muted-foreground">hrs</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-emerald-400 font-medium mb-1">Capital Saved</p>
                  <div className="text-5xl font-bold font-mono">
                    ${Math.min((processingStep / 40) * 2880, 2880).toFixed(0)}
                  </div>
                </div>
              </div>
              
              <div className="h-px bg-slate-800 w-full" />
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-indigo-400 font-medium mb-1">Extra Rev. Earned</p>
                  <div className="text-4xl font-bold font-mono">
                    ${Math.min((processingStep / 40) * 16694, 16694).toFixed(0)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-amber-400 font-medium mb-1">Extra People Helped</p>
                  <div className="text-4xl font-bold font-mono">
                    {Math.min((processingStep / 40) * 192, 192).toFixed(0)} <span className="text-xl text-muted-foreground">clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {settlementState === 'settled' && (
        <div className="mb-8 bg-card border border-emerald-200 rounded-2xl p-8 shadow-xl shadow-emerald-500/10 flex flex-col sm:flex-row items-center gap-6 animate-in slide-in-from-bottom-8 fade-in">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-emerald-900 mb-2">{currentPeriod} Settlement Complete! 🎉</h2>
            <p className="text-emerald-800 text-lg">
              Phenomenal month. You grossed <strong>{formatCurrency(grossIncome)}</strong> and generated a net owner profit of <strong className="bg-emerald-200 px-2 py-0.5 rounded text-emerald-900">{formatCurrency(netOwnerProfit)}</strong> after all associate payouts, overhead, and tax liabilities. The remaining distributions are securely heading to your personal account.
            </p>
          </div>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        
        {/* Revenue & Split Card */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-muted/50 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-brand-600" />
            <h3 className="font-semibold text-foreground">Gross Revenue & Split</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{currentPeriod.split(' ')[0]} Collected Revenue</p>
                <p className="text-4xl font-extrabold text-foreground">{formatCurrency(grossIncome)}</p>
              </div>
            </div>

            <div className="h-px w-full bg-muted" />

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Practice Share (50%)</p>
                <p className="text-xl font-bold text-brand-700">{formatCurrency(practiceShare)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Associate Share (50%)</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(associateShare)}</p>
                <p className="text-xs text-muted-foreground/80">Distributing {formatCurrency(perAssociate)} to {numAssociates} associates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expenses & Taxes Card */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50 bg-muted/50 flex items-center gap-2">
            <Receipt className="h-5 w-5 text-rose-500" />
            <h3 className="font-semibold text-foreground">Overhead & Tax Liabilities</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4" /> Supervisor Pay (16 hrs)</span>
                <span className="font-medium text-foreground">-{formatCurrency(supervisorPay)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Building className="h-4 w-4" /> Fixed Ops (Rent, EHR, etc)</span>
                <span className="font-medium text-foreground">-{formatCurrency(operatingExpenses)}</span>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-xl border border-border/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-foreground">Net Operating Income</span>
                <span className="font-bold text-foreground">{formatCurrency(netOperatingIncome)}</span>
              </div>
              <div className="flex justify-between items-center text-rose-600">
                <span className="text-sm flex items-center gap-2">Estimated Taxes (~33.3%)</span>
                <span className="font-medium">-{formatCurrency(estimatedTaxes)}</span>
              </div>
              <p className="text-xs text-rose-400 mt-1">Federal ~24% + CA State ~9.3%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Strategy Configuration Matrix */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden mb-8 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-500/10 blur-[100px] pointer-events-none" />
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-400" />
            <h3 className="font-semibold text-white">Liquid Treasury Repricing Configuration</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Arbitrage Enabled</span>
        </div>
        <div className="p-6 relative z-10">
          <p className="text-sm text-slate-400 mb-6 max-w-3xl">
            Configure the fee you charge associates for fronting their pay instantly. Theraflow's treasury handles the liquidity, and you capture the spread when the insurance claim finally clears.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-5 relative overflow-hidden transition-all hover:border-emerald-500/40">
              <div className="absolute top-0 right-0 p-3 opacity-20"><Banknote className="h-10 w-10 text-emerald-400" /></div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Standard Processing</h4>
                <div className="px-2 py-1 bg-slate-800 rounded-md text-xs font-mono text-emerald-400">30-45 Days</div>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <div className="text-3xl font-bold text-white">50% <span className="text-sm font-normal text-slate-500">/ 50%</span></div>
              </div>
              <p className="text-xs text-slate-400">Owner keeps 50%. Associate waits for insurance to clear to get paid their 50%.</p>
            </div>

            <div className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-5 relative overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.05)] transition-all hover:border-amber-500/50">
              <div className="absolute top-0 right-0 p-3 opacity-20"><Zap className="h-10 w-10 text-amber-400" /></div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Instant Liquid Payout</h4>
                <div className="px-2 py-1 bg-amber-500/20 rounded-md text-xs font-mono text-amber-400 font-bold">Same Day</div>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <div className="text-3xl font-bold text-white">60% <span className="text-sm font-normal text-slate-500">/ 40%</span></div>
              </div>
              <p className="text-xs text-slate-400">Owner keeps 60%. Associate gets paid 40% instantly. <strong className="text-amber-400">You capture a 10% premium.</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Incentives ROI Card */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-border/50 bg-brand-500/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-brand-600" />
            <h3 className="font-semibold text-foreground">Performance Incentives ROI</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 border border-brand-500/20">Automated Gamification</span>
        </div>
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
            Theraflow automatically tracks and payouts clinical volume bonuses. By gamifying caseloads, your associates billed <strong>42 additional hours</strong> this month.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-muted/50 p-4 rounded-xl border border-border/50">
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Bonuses Paid</p>
              <p className="text-2xl font-bold text-rose-500">-$1,250</p>
              <p className="text-xs text-muted-foreground mt-1">3 associates hit Tier 1, 1 hit Tier 2</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none"><TrendingUp className="w-12 h-12 text-brand-500" /></div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Marginal Revenue Generated</p>
              <p className="text-2xl font-bold text-foreground">+$6,300</p>
              <p className="text-xs text-brand-500 font-medium mt-1">From 42 extra billed hours</p>
            </div>
            <div className="bg-brand-500/10 p-4 rounded-xl border border-brand-500/30 shadow-inner">
              <p className="text-sm font-medium text-brand-700 mb-1">Net ROI on Incentives</p>
              <p className="text-2xl font-bold text-brand-600">+$5,050</p>
              <p className="text-xs text-brand-600/80 mt-1">504% Return on Investment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Net Owner Profit Highlight */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-medium text-slate-300">Net Owner Profit (Take Home)</h2>
          <p className="text-sm text-muted-foreground/80 max-w-md">
            This is your final cleared profit for {currentPeriod.split(' ')[0]} after all associate payouts, supervisor compensation, overhead, and estimated federal/state taxes have been deducted.
          </p>
        </div>
        <div className="relative z-10 shrink-0">
          <div className="text-5xl font-extrabold tracking-tight text-emerald-400">
            {formatCurrency(netOwnerProfit)}
          </div>
        </div>
      </div>

      {settlementState === 'settled' && (
        <div className="mb-8 animate-in slide-in-from-bottom-8 fade-in delay-500 fill-mode-both">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/20">
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI CPA S-Corp Strategy</h3>
                  <p className="text-indigo-200 text-sm">Optimizing your {formatCurrency(netOwnerProfit)} profit distribution</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">Tax Optimized</span>
            </div>
            
            <div className="p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Strategy 1: W2 */}
              <div className="bg-card/5 rounded-2xl p-6 border border-white/10 hover:bg-card/10 transition-colors">
                <h4 className="text-indigo-200 text-sm font-medium mb-1">Reasonable W-2 Salary</h4>
                <div className="text-2xl font-bold text-white mb-2">{formatCurrency(10000)}</div>
                <p className="text-xs text-muted-foreground/80">Subject to standard payroll taxes to satisfy IRS requirements.</p>
              </div>

              {/* Strategy 2: K1 */}
              <div className="bg-card/5 rounded-2xl p-6 border border-white/10 hover:bg-card/10 transition-colors">
                <h4 className="text-indigo-200 text-sm font-medium mb-1">Shareholder Distribution</h4>
                <div className="text-2xl font-bold text-white mb-2">{formatCurrency(15000)}</div>
                <p className="text-xs text-muted-foreground/80">Bypasses self-employment tax. Distributed via K-1 directly to you.</p>
              </div>

              {/* Strategy 3: Treasury */}
              <div className="bg-indigo-500/20 rounded-2xl p-6 border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <h4 className="text-indigo-200 text-sm font-medium mb-1">Business Treasury</h4>
                <div className="text-2xl font-bold text-white mb-2">{formatCurrency(5000)}</div>
                <p className="text-xs text-muted-foreground/80">Retained in Theraflow High-Yield account earning <strong>5.1% APY</strong>.</p>
              </div>

              {/* Strategy 4: Charity */}
              <div className="bg-card/5 rounded-2xl p-6 border border-white/10 hover:bg-card/10 transition-colors">
                <h4 className="text-indigo-200 text-sm font-medium mb-1 flex items-center gap-2">
                  Charitable Giving <HeartHandshake className="h-3 w-3 text-rose-400" />
                </h4>
                <div className="text-2xl font-bold text-white mb-2">{formatCurrency(1462.39)}</div>
                <p className="text-xs text-muted-foreground/80">Tax-advantaged contribution to a Donor-Advised Fund.</p>
              </div>
            </div>

            <div className="bg-black/20 p-6 flex justify-end">
              {scorpStatus === 'done' ? (
                <Button disabled className="bg-emerald-600/20 text-emerald-400 shadow-none border border-emerald-500/30">
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Distribution Settled
                </Button>
              ) : (
                <Button 
                  onClick={handleExecuteSCorp}
                  disabled={scorpStatus === 'executing'}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg relative overflow-hidden transition-all duration-300"
                >
                  {scorpStatus === 'executing' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Executing Transfer...
                    </>
                  ) : (
                    <>Execute S-Corp Distribution <ArrowRight className="h-4 w-4 ml-2" /></>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      
    </DashboardLayout>
  );
}
