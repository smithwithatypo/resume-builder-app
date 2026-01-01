import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface JobContextType {
  jobDescription: string;
  setJobDescription: (desc: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobDescriptionProvider({ children }: { children: ReactNode }) {
  const [jobDescription, setJobDescription] = useState('');

  return (
    <JobContext.Provider value={{ jobDescription, setJobDescription }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobDescription() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobDescription must be used within JobDescriptionProvider');
  }
  return context;
}
