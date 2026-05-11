import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit, DocumentData } from 'firebase/firestore';
import { db } from './firebase';

export interface IntelligenceData {
  mrr: number;
  claimDenialRisk: number;
  patientAttritionRisk: number;
  avgNoteCompletion: number;
  lastUpdated: string;
}

export function useRealtimeIntelligence() {
  const [data, setData] = useState<IntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'intelligence_metrics'),
        orderBy('timestamp', 'desc'),
        limit(1)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setData(doc.data() as IntelligenceData);
        }
        setLoading(false);
      }, (err) => {
        console.error("Firestore Intelligence Subscription Error:", err);
        setError(err as Error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Failed to initialize intelligence subscription:", err);
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}

// Hook for Mood Topography data
export function useRealtimeMoodTopography() {
  const [moodPoints, setMoodPoints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'client_moods'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const points = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMoodPoints(points);
        setLoading(false);
      }, (err) => {
        console.error("Mood Topography Error:", err);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Failed to init mood subscription:", err);
      setLoading(false);
    }
  }, []);

  return { moodPoints, loading };
}
