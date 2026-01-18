import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

interface User {
  id: number;
  email: string;
}

interface Profile {
  credits: number;
  subscription_status: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    apiFetch('/auth/me.php')
      .then((data) => {
        setUser(data.user);
        setProfile({
          credits: data.user.credits,
          subscription_status:
            data.user.plan === 'paid' ? 'active' : null,
        });
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const data = await apiFetch('/auth/login.php', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});

      localStorage.setItem('token', data.token);

      setUser(data.user);
      setProfile({
        credits: data.user.credits,
        subscription_status:
          data.user.plan === 'paid' ? 'active' : null,
      });

      return { error: null };
    } catch (err: any) {
      return {
        error: err?.message || 'Login failed',
      };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const data = await apiFetch('/auth/register.php', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});

      localStorage.setItem('token', data.token);
      setUser(data.user);
      setProfile({
        credits: data.user.credits,
        subscription_status:
          data.user.plan === 'paid' ? 'active' : null,
      });

      return { error: null };
    } catch (err: any) {
      return {
        error: err?.message || 'Signup failed',
      };
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setProfile(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
