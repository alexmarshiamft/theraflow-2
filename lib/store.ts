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

interface AppState {
  clients: Client[];
  employees: Employee[];
  appointments: Appointment[];
  transactions: Transaction[];
  filings: Filing[];
  claims: Claim[];
  
  // Actions
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
}

const initialClients: Client[] = [
  {
    id: 'P001',
    name: 'Test Client One',
    dob: '1985-03-14',
    clientId: 'MRN-00142',
    phone: '(555) 234-5678',
    email: 'testone@email.com',
    lastVisit: '2024-05-10',
    nextAppt: '2024-06-03',
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
    phone: '(555) 345-6789',
    email: 'testtwo@email.com',
    lastVisit: '2024-05-14',
    nextAppt: '2024-05-30',
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
    lastVisit: '2024-04-22',
    nextAppt: null,
    status: 'inactive',
    provider: 'Michael Chen, AMFT',
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
    lastVisit: '2024-05-16',
    nextAppt: '2024-06-01',
    status: 'active',
    provider: 'Michael Chen, AMFT',
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
    lastVisit: '2024-05-18',
    nextAppt: '2024-06-08',
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
    phone: '(555) 789-0123',
    email: 'testsix@email.com',
    lastVisit: '2024-05-12',
    nextAppt: '2024-05-28',
    status: 'critical',
    provider: 'Michael Chen, AMFT',
    insurance: 'Medicare Advantage',
    alerts: ['Severe Depression', 'Triadic Supervision Required'],
  },
];

const initialEmployees: Employee[] = [
  {
    id: 'E001',
    name: 'Sarah Jenkins, LMFT',
    title: 'Clinical Director & Supervisor',
    department: 'Clinical',
    email: 'sjenkins@theraflow.health',
    phone: '(555) 100-2001',
    salary: 150_000,
    payType: 'salary',
    status: 'active',
    startDate: '2019-03-01',
  },
  {
    id: 'E002',
    name: 'Michael Chen, AMFT',
    title: 'Pre-Licensed Associate',
    department: 'Clinical',
    email: 'mchen@theraflow.health',
    phone: '(555) 100-2002',
    salary: 65_000,
    payType: 'salary',
    status: 'active',
    startDate: '2022-07-12',
  },
  {
    id: 'E003',
    name: 'Elena Rodriguez, LCSW',
    title: 'Licensed Therapist',
    department: 'Clinical',
    email: 'erodriguez@theraflow.health',
    phone: '(555) 100-2003',
    salary: 95_000,
    payType: 'salary',
    status: 'active',
    startDate: '2020-01-06',
  },
  {
    id: 'E004',
    name: 'David Foster, ASW',
    title: 'Pre-Licensed Associate',
    department: 'Clinical',
    email: 'dfoster@theraflow.health',
    phone: '(555) 100-2004',
    salary: 35.0,
    payType: 'hourly',
    status: 'active',
    startDate: '2023-04-18',
  },
  {
    id: 'E005',
    name: 'Charlie Fictitious',
    title: 'Practice Manager',
    department: 'Administration',
    email: 'cfictitious@theraflow.health',
    phone: '(555) 100-2005',
    salary: 72_000,
    payType: 'salary',
    status: 'active',
    startDate: '2020-08-10',
  },
  {
    id: 'E006',
    name: 'Diana Placeholder',
    title: 'Biller / Credentialing',
    department: 'Finance',
    email: 'dplaceholder@theraflow.health',
    phone: '(555) 100-2006',
    salary: 58_000,
    payType: 'salary',
    status: 'on-leave',
    startDate: '2023-02-01',
  },
];

const initialAppointments: Appointment[] = [
  {
    id: 'A001',
    client: 'Test Client One',
    time: '2024-05-24T08:00:00',
    duration: 53,
    type: 'telehealth',
    provider: 'Sarah Jenkins, LMFT',
    status: 'confirmed',
    reason: 'Individual Therapy (90837)',
  },
  {
    id: 'A002',
    client: 'Test Client Two',
    time: '2024-05-24T09:00:00',
    duration: 53,
    type: 'in-person',
    provider: 'Sarah Jenkins, LMFT',
    status: 'in-progress',
    reason: 'Crisis Intervention / Safety Planning',
  },
  {
    id: 'A003',
    client: 'Test Client Three',
    time: '2024-05-24T10:00:00',
    duration: 53,
    type: 'telehealth',
    provider: 'Michael Chen, AMFT',
    status: 'scheduled',
    reason: 'Couples Counseling (90847)',
  },
  {
    id: 'A004',
    client: 'Test Client Four',
    time: '2024-05-24T11:00:00',
    duration: 60,
    type: 'in-person',
    provider: 'Michael Chen, AMFT',
    status: 'confirmed',
    reason: 'Intake Assessment (90791)',
  },
  {
    id: 'A005',
    client: 'Test Client Five',
    time: '2024-05-24T13:00:00',
    duration: 53,
    type: 'telehealth',
    provider: 'Elena Rodriguez, LCSW',
    status: 'scheduled',
    reason: 'Individual Therapy (90837)',
  },
  {
    id: 'A006',
    client: 'Test Client Six',
    time: '2024-05-24T14:00:00',
    duration: 60,
    type: 'in-person',
    provider: 'David Foster, ASW',
    status: 'confirmed',
    reason: 'Group Therapy Session (90853)',
  },
  {
    id: 'A007',
    client: 'Michael Chen & David Foster',
    time: '2024-05-24T15:00:00',
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
    date: '2024-05-22',
    description: 'BlueCross Insurance Payment',
    category: 'Insurance Reimbursement',
    account: 'Practice Operating',
    amount: 12450.00,
    type: 'credit',
    status: 'posted',
  },
  {
    id: 'T002',
    date: '2024-05-21',
    description: 'Medical Supplies — Henry Schein',
    category: 'Supplies',
    account: 'Practice Operating',
    amount: 2340.80,
    type: 'debit',
    status: 'posted',
  },
  {
    id: 'T003',
    date: '2024-05-21',
    description: 'Staff Payroll Run — May 15',
    category: 'Payroll',
    account: 'Payroll Reserve',
    amount: 18200.00,
    type: 'debit',
    status: 'posted',
  },
  {
    id: 'T004',
    date: '2024-05-20',
    description: 'Aetna Claims Payment',
    category: 'Insurance Reimbursement',
    account: 'Practice Operating',
    amount: 8920.50,
    type: 'credit',
    status: 'posted',
  },
  {
    id: 'T005',
    date: '2024-05-20',
    description: 'Q2 Estimated Tax Transfer',
    category: 'Tax',
    account: 'Tax Escrow',
    amount: 5000.00,
    type: 'debit',
    status: 'posted',
  },
  {
    id: 'T006',
    date: '2024-05-19',
    description: 'EHR Software Subscription',
    category: 'Software',
    account: 'Practice Operating',
    amount: 599.00,
    type: 'debit',
    status: 'posted',
  },
  {
    id: 'T007',
    date: '2024-05-18',
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
    period: 'Tax Year 2023',
    dueDate: '2024-03-15',
    filedDate: '2024-03-12',
    status: 'filed',
    preparer: 'CPA Johnson & Assoc.',
  },
  {
    id: 'F002',
    form: 'Form 941',
    description: 'Employer Quarterly Federal Tax Return',
    period: 'Q1 2024',
    dueDate: '2024-04-30',
    filedDate: '2024-04-28',
    status: 'filed',
    preparer: 'Theraflow Auto-File',
  },
  {
    id: 'F003',
    form: 'Form W-2',
    description: 'Wage & Tax Statements (Assoc. & Staff)',
    period: 'Tax Year 2023',
    dueDate: '2024-01-31',
    filedDate: '2024-01-29',
    status: 'filed',
    preparer: 'Theraflow Auto-File',
  },
  {
    id: 'F004',
    form: 'Form 1099-NEC',
    description: 'Non-Employee Compensation (Contractors)',
    period: 'Tax Year 2023',
    dueDate: '2024-01-31',
    filedDate: '2024-01-30',
    status: 'filed',
    preparer: 'Theraflow Auto-File',
  },
];

const initialClaims: Claim[] = [
  {
    id: 'CLM-001',
    client: 'Test Client One',
    serviceDate: '2024-05-10',
    cptCode: '90837',
    amount: 150.00,
    payer: 'BlueCross BlueShield',
    status: 'paid',
    submittedDate: '2024-05-11',
  },
  {
    id: 'CLM-002',
    client: 'Test Client Two',
    serviceDate: '2024-05-14',
    cptCode: '90837',
    amount: 150.00,
    payer: 'Aetna',
    status: 'submitted',
    submittedDate: '2024-05-15',
  },
  {
    id: 'CLM-003',
    client: 'Test Client Four',
    serviceDate: '2024-05-16',
    cptCode: '90791',
    amount: 200.00,
    payer: 'Cigna',
    status: 'rejected',
    submittedDate: '2024-05-17',
  },
  {
    id: 'CLM-004',
    client: 'Test Client Five',
    serviceDate: '2024-05-18',
    cptCode: '90837',
    amount: 150.00,
    payer: 'Optum',
    status: 'submitted',
    submittedDate: '2024-05-19',
  },
];

import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from './firebase';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      clients: initialClients,
      employees: initialEmployees,
      appointments: initialAppointments,
      transactions: initialTransactions,
      filings: initialFilings,
      claims: initialClaims,

      addClient: async (client) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        const newClient = { ...client, userId: uid };
        set((state) => ({ clients: [...state.clients, newClient] }));
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
        set((state) => ({ appointments: [...state.appointments, newAppt] }));
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
        set((state) => ({ claims: [newClaim, ...state.claims] }));
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
    }),
    {
      name: 'theraflow-storage',
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
  } catch (error) {
    console.error("Firebase sync failed:", error);
  }
};

