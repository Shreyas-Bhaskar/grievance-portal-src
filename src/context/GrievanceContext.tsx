import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  query
} from 'firebase/firestore';

// Define types for our grievance system
export type GrievanceSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type GrievanceMood = 'Annoyed' | 'Disappointed' | 'Frustrated' | 'Angry' | 'Furious';

export type Grievance = {
  id: string;
  title: string;
  description: string;
  mood: GrievanceMood;
  severity: GrievanceSeverity;
  date: string;
  createdAt: string;
  status: 'Pending' | 'Acknowledged' | 'Resolved';
};

type GrievanceContextType = {
  grievances: Grievance[];
  addGrievance: (grievance: Omit<Grievance, 'id' | 'createdAt' | 'status'>) => void;
  updateGrievanceStatus: (id: string, status: Grievance['status']) => void;
  getGrievance: (id: string) => Promise<Grievance | undefined>;
};

const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);

export const GrievanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);

  // Listen to real-time Firestore changes
  useEffect(() => {
    const q = query(collection(db, 'grievances'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Grievance[];
      setGrievances(items);
    });

    return () => unsubscribe();
  }, []);

  const addGrievance = async (grievance: Omit<Grievance, 'id' | 'createdAt' | 'status'>) => {
    await addDoc(collection(db, 'grievances'), {
      ...grievance,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    });
  };

  const updateGrievanceStatus = async (id: string, status: Grievance['status']) => {
    const grievanceRef = doc(db, 'grievances', id);
    await updateDoc(grievanceRef, { status });
  };

  const getGrievance = async (id: string): Promise<Grievance | undefined> => {
    const grievanceRef = doc(db, 'grievances', id);
    const snapshot = await getDoc(grievanceRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Grievance;
    }
    return undefined;
  };

  return (
    <GrievanceContext.Provider value={{ grievances, addGrievance, updateGrievanceStatus, getGrievance }}>
      {children}
    </GrievanceContext.Provider>
  );
};

export const useGrievances = () => {
  const context = useContext(GrievanceContext);
  if (context === undefined) {
    throw new Error('useGrievances must be used within a GrievanceProvider');
  }
  return context;
};
