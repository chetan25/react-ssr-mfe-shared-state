import { createContext, Dispatch } from 'react';


export interface SharedContextType {
  user: {
      name: string;
  },
  remoteJs: Record<string, string>
}

const SharedContext = createContext<[SharedContextType, Dispatch<SharedContextType>] | null>(null);

export default SharedContext;