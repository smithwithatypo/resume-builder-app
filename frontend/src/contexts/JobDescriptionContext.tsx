import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface JobDescriptionContextType {
  jobDescription: string;
  setJobDescription: (desc: string) => void;
}

const JobDescriptionContext = createContext<JobDescriptionContextType | undefined>(undefined);

export function JobDescriptionProvider({ children }: { children: ReactNode }) {
  const [jobDescription, setJobDescription] = useState('');

  return (
    <JobDescriptionContext.Provider value={{ jobDescription, setJobDescription }}>
      {children}
    </JobDescriptionContext.Provider>
  );
}

export function useJobDescription() {
  const context = useContext(JobDescriptionContext);
  if (!context) {
    throw new Error('useJobDescription must be used within JobDescriptionProvider');
  }
  return context;
}
