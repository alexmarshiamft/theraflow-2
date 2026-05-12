import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Client {
  id: string;
  userId?: string;
  name: string;
  dob: string;
  clientId: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppt: string | null;
  status: 'active' | 'inactive' | 'critical';
  provider: string;
  insurance: string;
  alerts: string[];
}

export interface Employee {
  id: string;
  userId?: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  salary: number;
  payType: 'salary' | 'hourly';
  status: 'active' | 'on-leave' | 'terminated';
  startDate: string;
}

export interface Appointment {
  id: string;
  userId?: string;
  client: string;
  time: string;
  duration: number;
  type: 'in-person' | 'telehealth' | 'follow-up';
  provider: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  reason: string;
}

export interface Claim {
  id: string;
  userId?: string;
  client: string;
  serviceDate: string;
  cptCode: string;
  amount: number;
  payer: string;
  status: 'submitted' | 'rejected' | 'paid' | 'denied';
  submittedDate: string;
}

export interface Transaction {
  id: string;
  userId?: string;
  date: string;
  description: string;
  category: string;
  account: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'posted' | 'pending' | 'failed';
}

export interface VAAuthorization {
  id: string;
  clientId: string;
  authorizationNumber: string;
  referralSource: 'VA_CCN' | 'TRIWEST';
  approvedCptCodes: string[];
  approvedSessions: number;
  sessionsUsed: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXHAUSTED' | 'EXPIRED' | 'PENDING_RENEWAL';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClinicalNote {
  id: string;
  userId?: string;
  associateId: string;
  associateName: string;
  clientId: string;
  clientName: string;
  date: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  status: 'pending_review' | 'signed' | 'rejected';
  aiFlags?: { type: 'warning' | 'error'; text: string; location: 'subjective' | 'objective' | 'assessment' | 'plan' }[];
  
  // VA Compliance Fields
  vaCompliant?: boolean;
  authorizationNumber?: string;
  sessionMinutes?: number;
  interventionTechniques?: string[];
  riskAssessment?: string;
  posCode?: string;
  modifier?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ACCESS' | 'SYSTEM';
  entityType: string;
  entityId: string;
  details: string;
  hash?: string;
  previousHash?: string;
}

export interface Filing {
  id: string;
  form: string;
  description: string;
  period: string;
  dueDate: string;
  filedDate: string | null;
  status: 'filed' | 'pending' | 'overdue' | 'upcoming';
  preparer: string;
}

export interface PayrollRun {
  id: string;
  period: string;
  grossRevenue: number;
  associateShare: number;
  netProfit: number;
  status: 'settled';
  executedAt: string;
}

export interface CallState {
  id: string;
  number: string;
  status: 'ringing' | 'connected' | 'ended';
  duration: number;
  startTime: string;
  isMuted: boolean;
}

export interface EmailMessage {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  folder: 'inbox' | 'sent' | 'draft' | 'trash';
}

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface VaultDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  category: 'licensure' | 'general' | 'failed_parse';
  data?: string;
}

export interface WebhookLog {
  id: string;
  userId?: string;
  event: string;
  endpoint: string;
  status: number;
  time: string;
  payload: string;
  timestamp: number;
}

export interface TrackedHour {
  id: string;
  associateId: string;
  associateName: string;
  date: string;
  client: string;
  type: 'Direct Counseling' | 'Diagnosis and Treatment' | 'Non-Clinical' | 'Individual/Triadic Supervision' | 'Group Supervision' | 'Couples, Families, Children';
  durationMinutes: number;
  status: 'pending_verification' | 'verified' | 'adjusted';
  notes?: string;
}

interface AppState {
  clients: Client[];
  employees: Employee[];
  appointments: Appointment[];
  transactions: Transaction[];
  filings: Filing[];
  claims: Claim[];
  clinicalNotes: ClinicalNote[];
  payrollRuns: PayrollRun[];
  messages: Message[];
  vaAuthorizations: VAAuthorization[];
  trackedHours: TrackedHour[];
  vaultDocuments: VaultDocument[];
  emails: EmailMessage[];
  webhookLogs: WebhookLog[];
  
  privacyMode: boolean;
  setPrivacyMode: (enabled: boolean) => void;
  isLocked: boolean;
  setIsLocked: (locked: boolean) => void;
  isBankAccountConnected: boolean;
  setBankAccountConnected: (connected: boolean) => void;
  userRole: 'owner' | 'associate';
  setUserRole: (role: 'owner' | 'associate') => void;
  
  isOnboarded: boolean;
  setIsOnboarded: (onboarded: boolean) => void;

  activeCall: CallState | null;
  setActiveCall: (call: CallState | null) => void;
  updateActiveCall: (updates: Partial<CallState>) => void;
  
  // Tracked Hours
  verifyHour: (id: string, updates?: Partial<TrackedHour>) => void;
  addTrackedHours: (hours: TrackedHour[]) => void;
  clearLicensureData: () => void;
  addVaultDocument: (doc: VaultDocument) => void;
  
  // Actions
  sendMessage: (msg: Message) => void;
  markMessageRead: (id: string) => void;

  // Emails
  sendEmail: (email: Omit<EmailMessage, 'id' | 'timestamp'>) => void;
  markEmailRead: (id: string) => void;
  deleteEmail: (id: string) => void;

  addClient: (client: Client) => void;
  updateClient: (id: string, data: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;

  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;

  addFiling: (filing: Filing) => void;
  deleteFiling: (id: string) => void;

  addClaim: (claim: Claim) => void;
  updateClaim: (id: string, data: Partial<Claim>) => void;
  deleteClaim: (id: string) => void;

  updateClinicalNote: (id: string, data: Partial<ClinicalNote>) => void;
  addClinicalNote: (note: ClinicalNote) => void;
  batchSubmitClaims: (noteIds: string[]) => void;

  addVAAuthorization: (auth: VAAuthorization) => void;
  updateVAAuthorization: (id: string, data: Partial<VAAuthorization>) => void;
  deleteVAAuthorization: (id: string) => void;

  auditLogs: AuditLog[];
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp' | 'hash' | 'previousHash'>) => void;

  runPayroll: (period: string, grossRevenue: number, associateShare: number, netProfit: number) => void;
  executeSCorpDistribution: (amount: number) => void;
}

const initialClients: Client[] = [
  {
    id: 'P001',
    name: 'Test Client One',
    dob: '1985-03-14',
    clientId: 'MRN-00142',
    phone: '(555) 234-5678',
    email: 'testone@email.com',
    lastVisit: '2026-05-10',
    nextAppt: '2026-06-03',
    status: 'active',
    provider: 'Sarah Jenkins, LMFT',
    insurance: 'BlueCross PPO',
    alerts: [],
  },
  {
    id: 'P002',
    name: 'Test Client Two',
    dob: '1972-11-28',
    clientId: 'MRN-00287',
    phone: '+13108646739',
    email: 'testtwo@email.com',
    lastVisit: '2026-05-14',
    nextAppt: '2026-05-30',
    status: 'critical',
    provider: 'Sarah Jenkins, LMFT',
    insurance: 'Aetna HMO',
    alerts: ['High Suicidality Risk', 'Safety Plan Active'],
  },
  {
    id: 'P003',
    name: 'Test Client Three',
    dob: '1990-07-04',
    clientId: 'MRN-00394',
    phone: '(555) 456-7890',
    email: 'testthree@email.com',
    lastVisit: '2026-04-22',
    nextAppt: null,
    status: 'inactive',
    provider: 'Alexander Marshi, AMFT',
    insurance: 'United Health',
    alerts: [],
  },
  {
    id: 'P004',
    name: 'Test Client Four',
    dob: '1968-09-19',
    clientId: 'MRN-00501',
    phone: '(555) 567-8901',
    email: 'testfour@email.com',
    lastVisit: '2026-05-16',
    nextAppt: '2026-06-01',
    status: 'active',
    provider: 'Alexander Marshi, AMFT',
    insurance: 'Cigna PPO',
    alerts: [],
  },
  {
    id: 'P005',
    name: 'Test Client Five',
    dob: '2001-02-12',
    clientId: 'MRN-00612',
    phone: '(555) 678-9012',
    email: 'testfive@email.com',
    lastVisit: '2026-05-18',
    nextAppt: '2026-06-08',
    status: 'active',
    provider: 'Sarah Jenkins, LMFT',
    insurance: 'Optum',
    alerts: [],
  },
  {
    id: 'P006',
    name: 'Test Client Six',
    dob: '1955-12-31',
    clientId: 'MRN-00723',
    phone: '+13108646739',
    email: 'testsix@email.com',
    lastVisit: '2026-05-12',
    nextAppt: '2026-05-28',
    status: 'critical',
    provider: 'Alexander Marshi, AMFT',
    insurance: 'Medicare Advantage',
    alerts: ['Severe Depression', 'Triadic Supervision Required'],
  },
];

const initialEmployees: Employee[] = [
  { id: 'E001', name: 'Sarah Jenkins, LMFT', title: 'Clinical Director & Supervisor', department: 'Clinical', email: 'sjenkins@theraflow.health', phone: '(555) 100-2001', salary: 150000, payType: 'salary', status: 'active', startDate: '2019-03-01' },
  { id: 'E002', name: 'Alexander E. Marshi', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'amarshi@theraflow.health', phone: '(555) 100-2002', salary: 65000, payType: 'salary', status: 'active', startDate: '2022-07-12' },
  { id: 'E003', name: 'Alex Lerza', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'alerza@theraflow.health', phone: '(555) 100-2003', salary: 65000, payType: 'salary', status: 'active', startDate: '2023-01-15' },
  { id: 'E004', name: 'Benjamin Raskin', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'braskin@theraflow.health', phone: '(555) 100-2004', salary: 65000, payType: 'salary', status: 'active', startDate: '2023-03-10' },
  { id: 'E005', name: 'Lisa Garratt', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'lgarratt@theraflow.health', phone: '(555) 100-2005', salary: 65000, payType: 'salary', status: 'active', startDate: '2023-05-20' },
  { id: 'E006', name: 'Juen Marc G. Arzadon', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'jarzadon@theraflow.health', phone: '(555) 100-2006', salary: 65000, payType: 'salary', status: 'active', startDate: '2023-06-05' },
  { id: 'E007', name: 'Kalaya Irby', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'kirby@theraflow.health', phone: '(555) 100-2007', salary: 65000, payType: 'salary', status: 'active', startDate: '2023-08-12' },
  { id: 'E008', name: 'Jeremy Larson', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'jlarson@theraflow.health', phone: '(555) 100-2008', salary: 65000, payType: 'salary', status: 'active', startDate: '2023-09-01' },
  { id: 'E009', name: 'Aaron Kuyper', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'akuyper@theraflow.health', phone: '(555) 100-2009', salary: 65000, payType: 'salary', status: 'active', startDate: '2023-10-15' },
  { id: 'E010', name: 'Eliana Nivon', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'enivon@theraflow.health', phone: '(555) 100-2010', salary: 65000, payType: 'salary', status: 'active', startDate: '2024-01-10' },
  { id: 'E011', name: 'Kiran Dave', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'kdave@theraflow.health', phone: '(555) 100-2011', salary: 65000, payType: 'salary', status: 'active', startDate: '2024-02-01' },
  { id: 'E012', name: 'Ashley Beer', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'abeer@theraflow.health', phone: '(555) 100-2012', salary: 65000, payType: 'salary', status: 'active', startDate: '2024-03-15' },
  { id: 'E013', name: 'Iliana Canez-Gonzalez', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'icanez@theraflow.health', phone: '(555) 100-2013', salary: 65000, payType: 'salary', status: 'active', startDate: '2024-04-01' },
  { id: 'E014', name: 'Kristian King', title: 'Pre-Licensed Associate', department: 'Clinical', email: 'kking@theraflow.health', phone: '(555) 100-2014', salary: 65000, payType: 'salary', status: 'active', startDate: '2024-05-10' },
  { id: 'E015', name: 'Prisilla Lerza', title: 'Practice Manager', department: 'Administration', email: 'plerza@theraflow.health', phone: '(555) 100-2015', salary: 75000, payType: 'salary', status: 'active', startDate: '2022-01-10' },
  { id: 'E016', name: 'Kyla Krontz', title: 'Biller / Credentialing', department: 'Administration', email: 'kkrontz@theraflow.health', phone: '(555) 100-2016', salary: 65000, payType: 'salary', status: 'active', startDate: '2022-06-15' },
];

const initialAppointments: Appointment[] = [
  {
    id: 'A001',
    client: 'Test Client One',
    time: '2026-05-24T08:00:00',
    duration: 53,
    type: 'telehealth',
    provider: 'Sarah Jenkins, LMFT',
    status: 'confirmed',
    reason: 'Individual Therapy (90837)',
  },
  {
    id: 'A002',
    client: 'Test Client Two',
    time: '2026-05-24T09:00:00',
    duration: 53,
    type: 'in-person',
    provider: 'Sarah Jenkins, LMFT',
    status: 'in-progress',
    reason: 'Crisis Intervention / Safety Planning',
  },
  {
    id: 'A003',
    client: 'Test Client Three',
    time: '2026-05-24T10:00:00',
    duration: 53,
    type: 'telehealth',
    provider: 'Alexander Marshi, AMFT',
    status: 'scheduled',
    reason: 'Couples Counseling (90847)',
  },
  {
    id: 'A004',
    client: 'Test Client Four',
    time: '2026-05-24T11:00:00',
    duration: 60,
    type: 'in-person',
    provider: 'Alexander Marshi, AMFT',
    status: 'confirmed',
    reason: 'Intake Assessment (90791)',
  },
  {
    id: 'A005',
    client: 'Test Client Five',
    time: '2026-05-24T13:00:00',
    duration: 53,
    type: 'telehealth',
    provider: 'Elena Rodriguez, LCSW',
    status: 'scheduled',
    reason: 'Individual Therapy (90837)',
  },
  {
    id: 'A006',
    client: 'Test Client Six',
    time: '2026-05-24T14:00:00',
    duration: 60,
    type: 'in-person',
    provider: 'David Foster, ASW',
    status: 'confirmed',
    reason: 'Group Therapy Session (90853)',
  },
  {
    id: 'A007',
    client: 'Alexander Marshi & David Foster',
    time: '2026-05-24T15:00:00',
    duration: 60,
    type: 'telehealth',
    provider: 'Sarah Jenkins, LMFT',
    status: 'scheduled',
    reason: 'Triadic Clinical Supervision',
  },
];

const initialTransactions: Transaction[] = [
  {
    id: 'T001',
    date: '2026-05-22',
    description: 'BlueCross Insurance Payment',
    category: 'Insurance Reimbursement',
    account: 'Practice Operating',
    amount: 12450.00,
    type: 'credit',
    status: 'posted',
  },
  {
    id: 'T002',
    date: '2026-05-21',
    description: 'Medical Supplies — Henry Schein',
    category: 'Supplies',
    account: 'Practice Operating',
    amount: 2340.80,
    type: 'debit',
    status: 'posted',
  },
  {
    id: 'T003',
    date: '2026-05-21',
    description: 'Staff Payroll Run — May 15',
    category: 'Payroll',
    account: 'Payroll Reserve',
    amount: 18200.00,
    type: 'debit',
    status: 'posted',
  },
  {
    id: 'T004',
    date: '2026-05-20',
    description: 'Aetna Claims Payment',
    category: 'Insurance Reimbursement',
    account: 'Practice Operating',
    amount: 8920.50,
    type: 'credit',
    status: 'posted',
  },
  {
    id: 'T005',
    date: '2026-05-20',
    description: 'Q2 Estimated Tax Transfer',
    category: 'Tax',
    account: 'Tax Escrow',
    amount: 5000.00,
    type: 'debit',
    status: 'posted',
  },
  {
    id: 'T006',
    date: '2026-05-19',
    description: 'EHR Software Subscription',
    category: 'Software',
    account: 'Practice Operating',
    amount: 599.00,
    type: 'debit',
    status: 'posted',
  },
  {
    id: 'T007',
    date: '2026-05-18',
    description: 'Medicare Reimbursement',
    category: 'Insurance Reimbursement',
    account: 'Practice Operating',
    amount: 6780.25,
    type: 'credit',
    status: 'pending',
  },
];

const initialFilings: Filing[] = [
  {
    id: 'F001',
    form: 'Form 1120-S',
    description: 'S-Corporation Income Tax Return',
    period: 'Tax Year 2025',
    dueDate: '2026-03-15',
    filedDate: '2026-03-12',
    status: 'filed',
    preparer: 'CPA Johnson & Assoc.',
  },
  {
    id: 'F002',
    form: 'Form 941',
    description: 'Employer Quarterly Federal Tax Return',
    period: 'Q1 2026',
    dueDate: '2026-04-30',
    filedDate: '2026-04-28',
    status: 'filed',
    preparer: 'Theraflow Auto-File',
  },
  {
    id: 'F003',
    form: 'Form W-2',
    description: 'Wage & Tax Statements (Assoc. & Staff)',
    period: 'Tax Year 2025',
    dueDate: '2026-01-31',
    filedDate: '2026-01-29',
    status: 'filed',
    preparer: 'Theraflow Auto-File',
  },
  {
    id: 'F004',
    form: 'Form 1099-NEC',
    description: 'Non-Employee Compensation (Contractors)',
    period: 'Tax Year 2025',
    dueDate: '2026-01-31',
    filedDate: '2026-01-30',
    status: 'filed',
    preparer: 'Theraflow Auto-File',
  },
];

const initialClaims: Claim[] = [
  {
    id: 'CLM-001',
    client: 'Test Client One',
    serviceDate: '2026-05-10',
    cptCode: '90837',
    amount: 150.00,
    payer: 'BlueCross BlueShield',
    status: 'paid',
    submittedDate: '2026-05-11',
  },
  {
    id: 'CLM-002',
    client: 'Test Client Two',
    serviceDate: '2026-05-14',
    cptCode: '90837',
    amount: 150.00,
    payer: 'Aetna',
    status: 'submitted',
    submittedDate: '2026-05-15',
  },
  {
    id: 'CLM-003',
    client: 'Test Client Four',
    serviceDate: '2026-05-16',
    cptCode: '90791',
    amount: 200.00,
    payer: 'Cigna',
    status: 'submitted',
    submittedDate: '2026-05-17',
  },
  {
    id: 'CLM-004',
    client: 'Test Client Five',
    serviceDate: '2026-05-18',
    cptCode: '90837',
    amount: 150.00,
    payer: 'Optum',
    status: 'submitted',
    submittedDate: '2026-05-19',
  },
];

const initialVAAuthorizations: VAAuthorization[] = [
  {
    id: 'AUTH-001',
    clientId: 'P001',
    authorizationNumber: 'VA12345678',
    referralSource: 'VA_CCN',
    approvedCptCodes: ['90837', '90791'],
    approvedSessions: 12,
    sessionsUsed: 10,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'ACTIVE',
    notes: 'Standard individual therapy auth.',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z'
  },
  {
    id: 'AUTH-002',
    clientId: 'P002',
    authorizationNumber: 'TW87654321',
    referralSource: 'TRIWEST',
    approvedCptCodes: ['90837'],
    approvedSessions: 6,
    sessionsUsed: 6,
    startDate: '2026-03-01',
    endDate: '2026-08-31',
    status: 'EXHAUSTED',
    notes: 'Exhausted, needs renewal.',
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z'
  }
];

const initialPayrollRuns: PayrollRun[] = [];

const initialAuditLogs: AuditLog[] = [
  {
    id: 'audit_001',
    timestamp: '2026-05-10T00:00:00.000Z', // 1 day ago
    userId: 'system',
    action: 'SYSTEM',
    entityType: 'Auth',
    entityId: 'global',
    details: 'System startup and initialization',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000'
  },
  {
    id: 'audit_002',
    timestamp: '2026-05-11T15:00:00.000Z', // 2 hours ago
    userId: 'Dr. Sarah Jenkins',
    action: 'ACCESS',
    entityType: 'Client Record',
    entityId: 'P001',
    details: 'Accessed Protected Health Information (PHI)',
    hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
    previousHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'audit_003',
    timestamp: '2026-05-11T16:45:00.000Z', // 15 mins ago
    userId: 'Dr. Sarah Jenkins',
    action: 'UPDATE',
    entityType: 'Appointment',
    entityId: 'A002',
    details: 'Changed status to IN_PROGRESS',
    hash: 'a2c41764df75883a9a1af8dc40b9cdceecdae77d07997455850e0544f172154d',
    previousHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
  }
];

const initialClinicalNotes: ClinicalNote[] = [
  {
    id: 'NOTE-001',
    associateId: 'E004',
    associateName: 'David Foster, ASW',
    clientId: 'P006',
    clientName: 'Test Client Six',
    date: '2026-05-24',
    subjective: 'Client, a 68-year-old male, presented for his bi-weekly individual psychotherapy session reporting a significant exacerbation of depressive symptomology over the past 14 days. He described his mood as "heavy and unrelenting," rating his subjective distress as an 8/10 on a Likert scale. Client reported severe terminal insomnia, consistently awakening at 3:00 AM with an inability to return to sleep, accompanied by ruminative thoughts regarding past occupational failures. He noted a near-total loss of appetite, resulting in an unquantified but visible weight loss. Most concerningly, client endorsed passive suicidal ideation, stating, "I just wish I didn\'t have to wake up tomorrow. It would be easier for everyone if I was just gone." When pressed, he denied having a specific active plan, means, or immediate intent, identifying his adult daughter as a primary protective factor. He denied homicidal ideation, auditory/visual hallucinations, or symptoms of mania.',
    objective: 'Mental Status Examination (MSE): Client presented neatly dressed but with poor hygiene (unkempt hair, body odor noted). Posture was slumped, and eye contact was markedly poor, frequently staring at the floor. Motor activity was characterized by significant psychomotor retardation. Speech was delayed in response time, monotonous, and hypophonic. Affect was flat and mood was congruent with his subjective report of severe depression. Thought processes were linear but impoverished, heavily focused on themes of guilt and worthlessness. Cognitive functioning appeared grossly intact, though concentration was visibly impaired. No evidence of psychosis or intoxication was observed during the 60-minute session.',
    assessment: 'Client meets criteria for Major Depressive Disorder, Recurrent, Severe without psychotic features (F33.2). Current presentation indicates a dangerous trajectory, with worsening neurovegetative symptoms and emerging passive suicidal ideation. While he denies active intent or plan, his isolation and severe hopelessness elevate his acute risk profile. Client demonstrated limited responsiveness to standard cognitive restructuring today, indicating a potential need for pharmacological re-evaluation or escalation of care if symptoms persist. Progress toward treatment goals is currently stalled due to symptom severity.',
    plan: '1. Provided empathetic validation and supportive counseling to address immediate emotional distress.\n2. Attempted to engage client in cognitive defusion exercises regarding themes of worthlessness, with limited success.\n3. Strongly recommended client schedule an emergency medication management appointment with his prescribing psychiatrist; client agreed.\n4. Will follow up with client via phone check-in tomorrow at 10:00 AM to monitor safety.\n5. Next scheduled session moved up to 3 days from now instead of standard 14 days.',
    status: 'pending_review',
    aiFlags: [
      { type: 'error', text: 'Critical Safety Oversight: The plan mentions following up and medication management, but fails to explicitly document the creation or review of a formal Safety Plan despite endorsing passive suicidal ideation.', location: 'plan' },
      { type: 'warning', text: 'Clinical Specificity: The assessment notes "progress is stalled" but should explicitly state which specific measurable objectives from the treatment plan are currently failing to be met.', location: 'assessment' }
    ]
  },
  {
    id: 'NOTE-002',
    associateId: 'E002',
    associateName: 'Alexander Marshi, AMFT',
    clientId: 'P004',
    clientName: 'Test Client Four',
    date: '2026-05-24',
    subjective: 'Client and partner attended session. Both reported high levels of distress regarding financial management. Partner stated, "He never listens to me when I try to budget." Client responded defensively, "I wouldn\'t have to ignore you if you weren\'t constantly nagging." Both described frequent, escalating arguments resulting in emotional withdrawal for 2-3 days post-conflict.',
    objective: 'Both partners presented with visibly tense body language, sitting far apart on the couch with crossed arms. Eye contact between partners was virtually non-existent. Speech rate was elevated during conflictual topics, with frequent interruptions of one another. Tone was highly critical and defensive. Affect was angry and frustrated.',
    assessment: 'The couple is currently entrenched in a negative interactional cycle characterized by pursue/withdraw dynamics (Emotionally Focused Therapy framework). The high level of contempt and defensiveness observed in-session are significant predictors of relational instability. They are currently struggling to utilize emotional regulation skills when triggered by financial stressors. Prognosis is guarded to fair, dependent on their willingness to practice structured communication exercises outside of the clinical setting.',
    plan: '1. Intervened to de-escalate immediate conflict using active structuring and boundary setting.\n2. Psychoeducation provided on the physiological impacts of flooding and the necessity of taking a "time-out" when heart rate elevates during conflict.\n3. Introduced and modeled the "Speaker-Listener" technique for discussing finances.\n4. Assigned homework: Practice the Speaker-Listener technique for exactly 15 minutes, twice this week, strictly on low-stakes topics.\n5. Next conjoint session scheduled for next week.',
    status: 'pending_review'
  },
  ...Array.from({ length: 60 }).map((_, i) => ({
    id: `NOTE-BATCH-${i}`,
    associateId: `E00${(i % 6) + 1}`,
    associateName: ['David Foster, ASW', 'Alexander Marshi, AMFT', 'Sarah Jenkins, LMFT', 'Emma Watson, LPCC', 'John Doe, ASW', 'Jane Smith, AMFT'][i % 6],
    clientId: `P00${(i % 5) + 1}`,
    clientName: `Test Client ${(i % 5) + 1}`,
    date: '2026-05-24',
    subjective: 'Client reports stable mood and improved sleep.',
    objective: 'Affect bright, cooperative.',
    assessment: 'Responding well to CBT for anxiety.',
    plan: 'Continue current treatment plan.',
    status: 'signed' as const
  }))
];

const initialMessages: Message[] = [
  {
    id: 'MSG-001',
    channelId: 'general',
    senderId: 'E001',
    senderName: 'David Foster, ASW',
    content: 'Has anyone seen the updated BBS forms for this month?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isRead: true
  },
  {
    id: 'MSG-002',
    channelId: 'general',
    senderId: 'system',
    senderName: 'Clinical Director',
    content: 'Yes, they are in the Compliance drive. Please use the V4 forms.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    isRead: true
  }
];

const initialVaultDocuments: VaultDocument[] = [
  {
    id: 'VAULT-1',
    name: 'AEM_ITR_BBS_Weekly_Log_2026-04-26_and_2026-05-03.pdf',
    type: 'application/pdf',
    size: 160266,
    uploadDate: new Date('2026-05-03T10:00:00Z').toISOString(),
    category: 'licensure'
  },
  {
    id: 'VAULT-2',
    name: 'BBS ITR AEM Hours 3.1-4.26 To Be Signed.pdf',
    type: 'application/pdf',
    size: 200890,
    uploadDate: new Date('2026-04-26T10:00:00Z').toISOString(),
    category: 'licensure'
  },
  {
    id: 'VAULT-3',
    name: 'BBS ITR AEM Hours 3.1-4.26 To Be Signed.png',
    type: 'image/png',
    size: 245027,
    uploadDate: new Date('2026-04-26T10:00:00Z').toISOString(),
    category: 'licensure'
  },
  {
    id: 'VAULT-4',
    name: 'EVF (1).pdf',
    type: 'application/pdf',
    size: 272810,
    uploadDate: new Date('2026-05-01T10:00:00Z').toISOString(),
    category: 'general'
  },
  {
    id: 'VAULT-5',
    name: 'EVF (1).png',
    type: 'image/png',
    size: 279126,
    uploadDate: new Date('2026-05-01T10:00:00Z').toISOString(),
    category: 'general'
  },
  {
    id: 'VAULT-6',
    name: 'ITR_supervision_agreement_signed_AEM_BBS_4.24.26.pdf',
    type: 'application/pdf',
    size: 576094,
    uploadDate: new Date('2026-04-24T10:00:00Z').toISOString(),
    category: 'general'
  },
  {
    id: 'VAULT-7',
    name: 'McGuire Treatment Summary Letter ITR.pdf',
    type: 'application/pdf',
    size: 56804,
    uploadDate: new Date('2026-05-05T10:00:00Z').toISOString(),
    category: 'general'
  },
  {
    id: 'VAULT-8',
    name: 'McGuire_Treatment_Summary_Letter_ITR_1page_migraine_depression_focus (1).png',
    type: 'image/png',
    size: 185097,
    uploadDate: new Date('2026-05-05T10:00:00Z').toISOString(),
    category: 'general'
  },
  {
    id: 'VAULT-9',
    name: 'Multi-Week General Hours Progress.pdf',
    type: 'application/pdf',
    size: 1155786,
    uploadDate: new Date('2026-05-10T10:00:00Z').toISOString(),
    category: 'licensure'
  },
  {
    id: 'VAULT-10',
    name: 'Multi-Week General Hours Progress.png',
    type: 'image/png',
    size: 1526394,
    uploadDate: new Date('2026-05-10T10:00:00Z').toISOString(),
    category: 'licensure'
  }
];

const initialTrackedHours: TrackedHour[] = [
  {
    id: 'EXTRACT-1',
    client: 'Cumulative Track',
    type: 'Direct Counseling',
    durationMinutes: 27960, // 466.00 hours
    status: 'verified',
    date: '2026-05-10',
    associateId: 'A001',
    associateName: 'Alexander Marshi'
  },
  {
    id: 'EXTRACT-2',
    client: 'Cumulative Track',
    type: 'Couples, Families, Children',
    durationMinutes: 1020, // 17.00 hours
    status: 'verified',
    date: '2026-05-10',
    associateId: 'A001',
    associateName: 'Alexander Marshi'
  },
  {
    id: 'EXTRACT-3',
    client: 'Cumulative Track',
    type: 'Non-Clinical',
    durationMinutes: 15345, // 255.75 hours
    status: 'verified',
    date: '2026-05-10',
    associateId: 'A001',
    associateName: 'Alexander Marshi'
  },
  {
    id: 'EXTRACT-4',
    client: 'Cumulative Track',
    type: 'Individual/Triadic Supervision',
    durationMinutes: 1770, // 29.50 hours
    status: 'verified',
    date: '2026-05-10',
    associateId: 'A001',
    associateName: 'Alexander Marshi'
  },
  {
    id: 'EXTRACT-5',
    client: 'Cumulative Track',
    type: 'Group Supervision',
    durationMinutes: 10120.2, // 168.67 hours
    status: 'verified',
    date: '2026-05-10',
    associateId: 'A001',
    associateName: 'Alexander Marshi'
  }
];

const initialEmails: EmailMessage[] = [
  {
    id: 'EML-001',
    sender: 'system@theraflow.com',
    recipient: 'associate@theraflow.com',
    subject: 'Welcome to Theraflow Email',
    body: 'Your premium company email account is now active. All internal and external communications should be securely routed through this portal.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: false,
    folder: 'inbox'
  },
  {
    id: 'EML-002',
    sender: 'clinical.director@theraflow.com',
    recipient: 'associate@theraflow.com',
    subject: 'Required: Updated Compliance Forms',
    body: 'Please ensure you use the V4 compliance forms located in the shared drive for all new intakes moving forward. The older versions will no longer be accepted by billing.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isRead: true,
    folder: 'inbox'
  },
  {
    id: 'EML-003',
    sender: 'associate@theraflow.com',
    recipient: 'client.support@theraflow.com',
    subject: 'Telehealth Portal Access Issue',
    body: 'I had a client report issues accessing the telehealth room today. They were getting a blank screen. Can we look into the logs?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    isRead: true,
    folder: 'sent'
  }
];

import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from './firebase';
import { generateHash, formatCurrency } from './utils';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      clients: initialClients,
      employees: initialEmployees,
      appointments: initialAppointments,
      webhookLogs: [],
      transactions: initialTransactions,
      filings: initialFilings,
      claims: initialClaims,
      auditLogs: initialAuditLogs,
      clinicalNotes: initialClinicalNotes,
      payrollRuns: initialPayrollRuns,
      messages: initialMessages,
      vaAuthorizations: initialVAAuthorizations,
      trackedHours: initialTrackedHours,
      vaultDocuments: initialVaultDocuments,
      emails: initialEmails,
      privacyMode: false,
      setPrivacyMode: (enabled) => set({ privacyMode: enabled }),
      isLocked: false,
      setIsLocked: (locked) => set({ isLocked: locked }),
      userRole: 'associate',
      setUserRole: (role) => set({ userRole: role }),
      isBankAccountConnected: false,
      setBankAccountConnected: (connected) => set({ isBankAccountConnected: connected }),
      isOnboarded: false,
      setIsOnboarded: (onboarded) => set({ isOnboarded: onboarded }),
      activeCall: null,
      setActiveCall: (call) => set({ activeCall: call }),
      updateActiveCall: (updates) => set((state) => ({
        activeCall: state.activeCall ? { ...state.activeCall, ...updates } : null
      })),

      sendMessage: async (msg) => {
        set((state) => ({ messages: [...state.messages, msg] }));
        try { await setDoc(doc(db, "messages", msg.id), msg); } catch (e) { console.error(e); }
      },
      verifyHour: (id, updates) => set((state) => ({
        trackedHours: state.trackedHours.map(h => h.id === id ? { ...h, status: updates ? 'adjusted' : 'verified', ...updates } : h)
      })),
      addTrackedHours: (hours) => set((state) => ({
        trackedHours: [...hours, ...state.trackedHours]
      })),
      clearLicensureData: () => set(() => ({
        trackedHours: [],
        vaultDocuments: []
      })),
      addVaultDocument: (doc) => set((state) => ({
        vaultDocuments: [doc, ...state.vaultDocuments]
      })),
      markMessageRead: async (id) => {
        set((state) => ({ messages: state.messages.map(m => m.id === id ? { ...m, isRead: true } : m) }));
        try { await updateDoc(doc(db, "messages", id), { isRead: true }); } catch (e) { console.error(e); }
      },

      sendEmail: (email) => {
        const newEmail: EmailMessage = {
          ...email,
          id: `EML-${Date.now()}`,
          timestamp: new Date().toISOString()
        };
        set((state) => ({ emails: [newEmail, ...state.emails] }));
      },
      markEmailRead: (id) => set((state) => ({
        emails: state.emails.map(e => e.id === id ? { ...e, isRead: true } : e)
      })),
      deleteEmail: (id) => set((state) => ({
        emails: state.emails.map(e => e.id === id ? { ...e, folder: 'trash' } : e)
      })),

      updateClinicalNote: async (id, data) => {
        set((state) => {
          const existingNote = state.clinicalNotes.find(n => n.id === id);
          let vaAuthorizations = [...state.vaAuthorizations];

          if (
            existingNote?.vaCompliant && 
            existingNote.authorizationNumber && 
            data.status === 'signed' && 
            existingNote.status !== 'signed'
          ) {
            vaAuthorizations = vaAuthorizations.map(auth => {
              if (auth.authorizationNumber === existingNote.authorizationNumber) {
                const newSessionsUsed = auth.sessionsUsed + 1;
                return { 
                  ...auth, 
                  sessionsUsed: newSessionsUsed,
                  status: newSessionsUsed >= auth.approvedSessions ? 'EXHAUSTED' : auth.status
                };
              }
              return auth;
            });
          }

          return {
            clinicalNotes: state.clinicalNotes.map(n => n.id === id ? { ...n, ...data } : n),
            vaAuthorizations
          };
        });
        
        try { await updateDoc(doc(db, "clinicalNotes", id), data); } catch (e) { console.error(e); }
      },

      addClinicalNote: async (note) => {
        set((state) => ({
          clinicalNotes: [note, ...state.clinicalNotes]
        }));
        try { await setDoc(doc(db, "clinicalNotes", note.id), note); } catch (e) { console.error(e); }
      },


      addVAAuthorization: (auth) => set((state) => ({ vaAuthorizations: [...state.vaAuthorizations, auth] })),
      updateVAAuthorization: (id, data) => set((state) => ({
        vaAuthorizations: state.vaAuthorizations.map(a => a.id === id ? { ...a, ...data } : a)
      })),
      deleteVAAuthorization: (id) => set((state) => ({ vaAuthorizations: state.vaAuthorizations.filter(a => a.id !== id) })),

      batchSubmitClaims: (noteIds) => set((state) => {
        const notesToSubmit = state.clinicalNotes.filter(n => noteIds.includes(n.id));
        
        const newClaims: Claim[] = notesToSubmit.map(note => ({
          id: `CLM-AUTO-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          client: note.clientName,
          serviceDate: note.date,
          cptCode: '90837', // Defaulting to 90837 for mock purposes
          amount: 150,
          payer: 'Aetna (Mock Auto)',
          status: 'submitted',
          submittedDate: new Date().toISOString().split('T')[0],
        }));

        const updatedNotes = state.clinicalNotes.map(n => 
          noteIds.includes(n.id) ? { ...n, status: 'signed' as const } : n // Actually they should probably be marked 'billed' if we had that, but signed is fine, we just remove them from the UI manually or filter later
        );
        // Wait, 'signed' notes are the ones we submit. So maybe just leave them 'signed' or add a 'billed' status. We will handle filtering in the component.

        return {
          claims: [...newClaims, ...state.claims],
          clinicalNotes: updatedNotes
        };
      }),

      addAuditLog: async (log) => {
        let newLog: AuditLog | null = null;
        set((state) => {
          const previousLog = state.auditLogs[0];
          const previousHash = previousLog?.hash || '0000000000000000000000000000000000000000000000000000000000000000';
          const timestamp = new Date().toISOString();
          const id = `audit_${Date.now()}_${Math.random().toString(36).substring(7)}`;
          
          const dataToHash = previousHash + id + timestamp + log.userId + log.action + log.entityId;
          const currentHash = generateHash(dataToHash);

          newLog = {
            ...log,
            id,
            timestamp,
            previousHash,
            hash: currentHash
          };

          return {
            auditLogs: [newLog, ...state.auditLogs]
          };
        });
        if (newLog) {
          try { await setDoc(doc(db, "auditLogs", (newLog as AuditLog).id), newLog); } catch (e) { console.error(e); }
        }
      },

      addClient: async (client) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        const newClient = { ...client, userId: uid };
        set((state) => {
          const newLog = {
            id: `audit_${Date.now()}`,
            timestamp: new Date().toISOString(),
            userId: uid,
            action: 'CREATE' as const,
            entityType: 'Client',
            entityId: newClient.id,
            details: `Created new client record: ${newClient.name}`
          };
          return { clients: [...state.clients, newClient], auditLogs: [newLog, ...state.auditLogs] };
        });
        try { await setDoc(doc(db, "clients", newClient.id), newClient); } catch (e) { console.error(e); }
      },
      updateClient: async (id, data) => {
        set((state) => ({ clients: state.clients.map((p) => (p.id === id ? { ...p, ...data } : p)) }));
        try { await updateDoc(doc(db, "clients", id), data); } catch (e) { console.error(e); }
      },
      deleteClient: async (id) => {
        set((state) => ({ clients: state.clients.filter((p) => p.id !== id) }));
        try { await deleteDoc(doc(db, "clients", id)); } catch (e) { console.error(e); }
      },

      addEmployee: (employee) =>
        set((state) => ({ employees: [...state.employees, employee] })),
      updateEmployee: (id, data) =>
        set((state) => ({
          employees: state.employees.map((e) => (e.id === id ? { ...e, ...data } : e)),
        })),
      deleteEmployee: (id) =>
        set((state) => ({ employees: state.employees.filter((e) => e.id !== id) })),

      addAppointment: async (appointment) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        const newAppt = { ...appointment, userId: uid };
        set((state) => {
          const newLog = {
            id: `audit_${Date.now()}`,
            timestamp: new Date().toISOString(),
            userId: uid,
            action: 'CREATE' as const,
            entityType: 'Appointment',
            entityId: newAppt.id,
            details: `Scheduled appointment for ${newAppt.client}`
          };
          return { appointments: [...state.appointments, newAppt], auditLogs: [newLog, ...state.auditLogs] };
        });
        try { await setDoc(doc(db, "appointments", newAppt.id), newAppt); } catch (e) { console.error(e); }
      },
      updateAppointment: async (id, data) => {
        set((state) => ({ appointments: state.appointments.map((a) => (a.id === id ? { ...a, ...data } : a)) }));
        try { await updateDoc(doc(db, "appointments", id), data); } catch (e) { console.error(e); }
      },
      deleteAppointment: async (id) => {
        set((state) => ({ appointments: state.appointments.filter((a) => a.id !== id) }));
        try { await deleteDoc(doc(db, "appointments", id)); } catch (e) { console.error(e); }
      },
        
      addTransaction: (transaction) =>
        set((state) => ({ transactions: [transaction, ...state.transactions] })),
      deleteTransaction: (id) =>
        set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),
        
      addFiling: (filing) =>
        set((state) => ({ filings: [filing, ...state.filings] })),
      deleteFiling: (id) =>
        set((state) => ({ filings: state.filings.filter((f) => f.id !== id) })),
        
      addClaim: async (claim) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        const newClaim = { ...claim, userId: uid };
        set((state) => {
          const newLog = {
            id: `audit_${Date.now()}`,
            timestamp: new Date().toISOString(),
            userId: uid,
            action: 'CREATE' as const,
            entityType: 'Claim',
            entityId: newClaim.id,
            details: `Generated insurance claim for ${newClaim.client}`
          };
          return { claims: [newClaim, ...state.claims], auditLogs: [newLog, ...state.auditLogs] };
        });
        try { await setDoc(doc(db, "claims", newClaim.id), newClaim); } catch (e) { console.error(e); }
      },
      updateClaim: async (id, data) => {
        set((state) => ({ claims: state.claims.map((c) => (c.id === id ? { ...c, ...data } : c)) }));
        try { await updateDoc(doc(db, "claims", id), data); } catch (e) { console.error(e); }
      },
      deleteClaim: async (id) => {
        set((state) => ({ claims: state.claims.filter((c) => c.id !== id) }));
        try { await deleteDoc(doc(db, "claims", id)); } catch (e) { console.error(e); }
      },

      runPayroll: async (period, grossRevenue, associateShare, netProfit) => {
        const id = `PR_${Date.now()}`;
        const newRun: PayrollRun = {
          id,
          period,
          grossRevenue,
          associateShare,
          netProfit,
          status: 'settled',
          executedAt: new Date().toISOString()
        };

        const debitTx: Transaction = {
          id: `TX_PR_${Date.now()}`,
          userId: auth.currentUser?.uid || 'system',
          date: new Date().toISOString().split('T')[0],
          description: `Staff Payroll Run — ${period}`,
          category: 'Payroll',
          account: 'Payroll Reserve',
          amount: associateShare,
          type: 'debit',
          status: 'posted'
        };

        const auditLog: AuditLog = {
          id: `audit_${Date.now()}`,
          timestamp: new Date().toISOString(),
          userId: auth.currentUser?.uid || 'system',
          action: 'SYSTEM',
          entityType: 'Payroll',
          entityId: id,
          details: `Executed payroll settlement for ${period} isolating ${formatCurrency(associateShare)} for associate distribution.`
        };

        set((state) => ({
          payrollRuns: [newRun, ...state.payrollRuns],
          transactions: [debitTx, ...state.transactions],
          auditLogs: [auditLog, ...state.auditLogs]
        }));
        
        try {
          await setDoc(doc(db, "payrollRuns", newRun.id), newRun);
          await setDoc(doc(db, "transactions", debitTx.id), debitTx);
          await setDoc(doc(db, "auditLogs", auditLog.id), auditLog);
        } catch (e) {
          console.error("Failed to sync payroll to Firebase", e);
        }
      },

      executeSCorpDistribution: async (amount) => {
        const txId = `TX_DIST_${Date.now()}`;
        const debitTx: Transaction = {
          id: txId,
          userId: auth.currentUser?.uid || 'system',
          date: new Date().toISOString().split('T')[0],
          description: `S-Corp Shareholder Distribution`,
          category: 'Owner Draw',
          account: 'Practice Operating',
          amount: amount,
          type: 'debit',
          status: 'posted'
        };

        const auditLog: AuditLog = {
          id: `audit_dist_${Date.now()}`,
          timestamp: new Date().toISOString(),
          userId: auth.currentUser?.uid || 'system',
          action: 'SYSTEM',
          entityType: 'Banking',
          entityId: txId,
          details: `Executed S-Corp shareholder distribution of ${formatCurrency(amount)} to personal connected accounts.`
        };

        set((state) => ({
          transactions: [debitTx, ...state.transactions],
          auditLogs: [auditLog, ...state.auditLogs]
        }));
        
        try {
          await setDoc(doc(db, "transactions", debitTx.id), debitTx);
          await setDoc(doc(db, "auditLogs", auditLog.id), auditLog);
        } catch (e) {
          console.error("Failed to sync distribution to Firebase", e);
        }
      },
    }),
    {
      name: 'theraflow-storage',
      version: 4,
      migrate: (persistedState: any, version: number) => {
        // Suppress the migration warning and force a refresh of the licensure data 
        // so the new initial states take effect automatically.
        const state = persistedState as any;
        delete state.trackedHours;
        delete state.vaultDocuments;
        return state;
      }
    }
  )
);

export const initFirebaseSync = async () => {
  if (typeof window === 'undefined') return;
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  
  try {
    const clientsRef = collection(db, "clients");
    const qClients = query(clientsRef, where("userId", "==", uid));
    const clientsSnap = await getDocs(qClients);
    
    // Seed database if empty for this user
    if (clientsSnap.empty) {
      console.log("Seeding Firebase database for user...", uid);
      for (const c of initialClients) await setDoc(doc(db, "clients", `${uid}_${c.id}`), { ...c, id: `${uid}_${c.id}`, userId: uid });
      for (const a of initialAppointments) await setDoc(doc(db, "appointments", `${uid}_${a.id}`), { ...a, id: `${uid}_${a.id}`, userId: uid });
      for (const cl of initialClaims) await setDoc(doc(db, "claims", `${uid}_${cl.id}`), { ...cl, id: `${uid}_${cl.id}`, userId: uid });
      for (const cn of initialClinicalNotes) await setDoc(doc(db, "clinicalNotes", `${uid}_${cn.id}`), { ...cn, id: `${uid}_${cn.id}`, userId: uid });
      for (const al of initialAuditLogs) await setDoc(doc(db, "auditLogs", `${uid}_${al.id}`), { ...al, id: `${uid}_${al.id}`, userId: uid });
    }

    onSnapshot(qClients, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Client);
      useStore.setState({ clients: data });
    });
    
    onSnapshot(query(collection(db, "appointments"), where("userId", "==", uid)), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Appointment);
      useStore.setState({ appointments: data });
    });

    onSnapshot(query(collection(db, "claims"), where("userId", "==", uid)), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Claim);
      useStore.setState({ claims: data });
    });

    onSnapshot(query(collection(db, "clinicalNotes"), where("userId", "==", uid)), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as ClinicalNote);
      useStore.setState({ clinicalNotes: data });
    });

    onSnapshot(query(collection(db, "auditLogs"), where("userId", "==", uid)), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as AuditLog);
      useStore.setState({ auditLogs: data });
    });

    onSnapshot(query(collection(db, "webhookLogs"), where("userId", "==", uid)), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as WebhookLog);
      // Sort by timestamp descending
      data.sort((a, b) => b.timestamp - a.timestamp);
      useStore.setState({ webhookLogs: data });
    });
  } catch (error) {
    console.error("Firebase sync failed:", error);
  }
};

