import { getTeamById, Team, User, UserRole } from '@/api/mocks/_auth';
import { useAppStore } from '@/stores/useAppStore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface StoredSession {
  user: User;
  token: string | null;
}

interface BackendLoginResponse {
  success: boolean;
  message?: string;
  data?: {
    admin?: {
      id: number | string;
      name: string;
      email: string;
      roles?: string[];
    };
    token?: string;
  };
}

interface BackendRegisterResponse {
  success: boolean;
  message?: string;
  data?: {
    uuid: string;
    name: string;
    email: string;
    role: string;
    token?: string;
  };
}

type LoginResult = { success: true } | { success: false; message?: string };
type RegisterResult = { success: true } | { success: false; message?: string };

const SESSION_STORAGE_KEY = 'nexus_session';
const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) || '';

interface AuthContextType {
  user: User | null;
  team: Team | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<RegisterResult>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: User['role'][]) => boolean;
  canAccessTeamSettings: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initializeForUser = useAppStore((state) => state.initializeForUser);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    const legacyUser = localStorage.getItem('nexus_user');

    try {
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession) as StoredSession;
        setUser(parsedSession.user);
        setToken(parsedSession.token ?? null);

        if (parsedSession.user.teamId) {
          setTeam(getTeamById(parsedSession.user.teamId) || null);
        }

        initializeForUser(parsedSession.user);
      } else if (legacyUser) {
        const parsedUser = JSON.parse(legacyUser) as User;
        setUser(parsedUser);
        setToken(null);

        if (parsedUser.teamId) {
          setTeam(getTeamById(parsedUser.teamId) || null);
        }

        initializeForUser(parsedUser);
      }
    } catch (e) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        localStorage.removeItem('nexus_user');
      }
    }
    setIsLoading(false);
  }, [initializeForUser]);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    setIsLoading(true);
    try {
      if (!API_BASE_URL) {
        return { success: false, message: 'API base URL is not configured.' };
      }

      console.debug('Login attempt:', { url: `${API_BASE_URL}/admin/login`, email });

      let response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-key': import.meta.env.VITE_FRONTEND_SECRET || '',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 404) {
        console.debug('Admin login endpoint not found, trying /login');
        response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-app-key': import.meta.env.VITE_FRONTEND_SECRET || '',
          },
          body: JSON.stringify({ email, password }),
        });
      }

      const payload = await response.json().catch(() => ({ success: false }));
      console.debug('Login response payload:', payload);

      if (!response.ok) {
        return { success: false, message: payload?.message || 'Unable to login. Please try again.' };
      }

      // Flexible extraction of user data and token
      const data = payload.data || payload;
      const authToken = data.token || payload.token;
      const adminData = data.admin || data.user || (data.email ? data : null);

      if (payload?.success && adminData && authToken) {
        // Handle various role field names and formats
        const roles = adminData.roles || (adminData.role ? [adminData.role] : []);
        const mappedRole: UserRole = roles.includes('superadmin')
          ? 'superadmin'
          : roles.includes('admin')
            ? 'admin'
            : 'user';

        const authenticatedUser: User = {
          id: String(adminData.id || adminData.uuid),
          email: adminData.email,
          name: adminData.name || adminData.email,
          role: mappedRole,
          teamId: adminData.team_id || adminData.teamId,
          createdAt: adminData.created_at || adminData.createdAt || new Date().toISOString(),
        };

        setUser(authenticatedUser);
        setToken(authToken);
        if (typeof window !== 'undefined') {
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ user: authenticatedUser, token: authToken }));
          localStorage.removeItem('nexus_user');
        }

        if (authenticatedUser.teamId) {
          setTeam(getTeamById(authenticatedUser.teamId) || null);
        }

        initializeForUser(authenticatedUser);
        return { success: true };
      }

      return { success: false, message: payload?.message || 'Invalid email or password' };
    } catch (error) {
      console.error('Login error', error);
      return { success: false, message: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<RegisterResult> => {
    setIsLoading(true);
    try {
      if (!API_BASE_URL) {
        return { success: false, message: 'API base URL is not configured.' };
      }

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-key': import.meta.env.VITE_FRONTEND_SECRET || '',
        },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
      });

      const payload: BackendRegisterResponse = await response.json().catch(() => ({ success: false }));

      if (!response.ok) {
        return { success: false, message: payload?.message || 'Unable to register. Please try again.' };
      }

      if (payload?.success && payload.data && payload.data.token) {
        const { uuid, name: userName, email: userEmail, role, token: authToken } = payload.data;
        const mappedRole: UserRole = role === 'freelancer' ? 'user' : (role as UserRole);

        const registeredUser: User = {
          id: uuid,
          email: userEmail,
          name: userName,
          role: mappedRole,
          createdAt: new Date().toISOString(),
        };

        setUser(registeredUser);
        setToken(authToken);
        if (typeof window !== 'undefined') {
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ user: registeredUser, token: authToken }));
          localStorage.removeItem('nexus_user');
        }

        if (registeredUser.teamId) {
          setTeam(getTeamById(registeredUser.teamId) || null);
        }

        initializeForUser(registeredUser);
        return { success: true };
      }

      return { success: false, message: payload?.message || 'Registration failed' };
    } catch (error) {
      console.error('Registration error', error);
      return { success: false, message: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token && API_BASE_URL) {
        const endpoint = user?.role === 'admin' || user?.role === 'superadmin'
          ? `${API_BASE_URL}/admin/logout`
          : `${API_BASE_URL}/logout`;

        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'x-app-key': import.meta.env.VITE_FRONTEND_SECRET || '',
          },
        }).catch(() => { });
      }
    } finally {
      setUser(null);
      setTeam(null);
      setToken(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        localStorage.removeItem('nexus_user');
      }
    }
  };

  const hasRole = (roles: User['role'][]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const canAccessTeamSettings = user?.role === 'admin' || user?.role === 'superadmin';

  return (
    <AuthContext.Provider
      value={{
        user,
        team,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        hasRole,
        canAccessTeamSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
