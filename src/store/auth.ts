import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AuthService from '@/service/auth';

interface User {
  cell: string;
  dob: object;
  email: string;
  gender: string;
  id: object;
  location: object;
  login: object;
  name: object;
  nat: string;
  phone: string;
  picture: object;
  registered: object;
}

interface AuthStore {
  user: User | null;
  isHydrated: boolean;
  getInstance: () => AuthService;
  login: () => Promise<any>;
  setUserInformation: (data: object) => any;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isHydrated: false,
      user: null,
      getInstance: () => AuthService.getInstance(),
      setUserInformation: (data) => set(() => ({ user: { ...data } as User })),
      login: () => get().getInstance().login(),
    }),
    {
      name: 'auth-store',
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error);
          } else {
            state.isHydrated = true;
          }
        };
      },
    },
  ),
);

export default useAuthStore;
