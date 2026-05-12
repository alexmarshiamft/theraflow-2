import { db } from './firebase';
import { collection, onSnapshot, doc, setDoc, getDocs, writeBatch } from 'firebase/firestore';
import { useStore } from './store';

// Helper to push all local mock data to Firestore (Run once)
export const seedFirestore = async () => {
  const state = useStore.getState();
  const batch = writeBatch(db);

  // Seed Clients
  state.clients.forEach(client => {
    const ref = doc(db, 'clients', client.id);
    batch.set(ref, client);
  });

  // Seed Employees
  state.employees.forEach(employee => {
    const ref = doc(db, 'employees', employee.id);
    batch.set(ref, employee);
  });

  // Seed Clinical Notes
  state.clinicalNotes.forEach(note => {
    const ref = doc(db, 'clinicalNotes', note.id);
    batch.set(ref, note);
  });

  // Seed Audit Logs
  state.auditLogs.forEach(log => {
    const ref = doc(db, 'auditLogs', log.id);
    batch.set(ref, log);
  });

  await batch.commit();
  console.log("Firestore successfully seeded with mock data!");
};

// Initialize listeners to sync Firestore -> Zustand
export const initializeFirebaseSync = () => {
  // Sync Clients
  const unsubClients = onSnapshot(collection(db, 'clients'), (snapshot) => {
    const clients: any[] = [];
    snapshot.forEach(doc => clients.push({ id: doc.id, ...doc.data() }));
    if (clients.length > 0) {
      useStore.setState({ clients });
    }
  });

  // Sync Employees
  const unsubEmployees = onSnapshot(collection(db, 'employees'), (snapshot) => {
    const employees: any[] = [];
    snapshot.forEach(doc => employees.push({ id: doc.id, ...doc.data() }));
    if (employees.length > 0) {
      useStore.setState({ employees });
    }
  });

  // Sync Clinical Notes
  const unsubNotes = onSnapshot(collection(db, 'clinicalNotes'), (snapshot) => {
    const notes: any[] = [];
    snapshot.forEach(doc => notes.push({ id: doc.id, ...doc.data() }));
    if (notes.length > 0) {
      useStore.setState({ clinicalNotes: notes });
    }
  });

  // Sync Audit Logs
  const unsubLogs = onSnapshot(collection(db, 'auditLogs'), (snapshot) => {
    const logs: any[] = [];
    snapshot.forEach(doc => logs.push({ id: doc.id, ...doc.data() }));
    if (logs.length > 0) {
      useStore.setState({ auditLogs: logs });
    }
  });

  return () => {
    unsubClients();
    unsubEmployees();
    unsubNotes();
    unsubLogs();
  };
};

// Interceptor helper to push updates to Firestore
export const syncToFirestore = async (collectionName: string, id: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error(`Error syncing ${collectionName} to Firestore:`, error);
  }
};
