import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getAccountTier } from '../services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [accountTier, setAccountTier] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])


  useEffect(() => {
    const fetchTier = async () => {
      if (session?.user?.id) {
        const tier = await getAccountTier(session.user.id)
        setAccountTier(tier)
      }
    }

    fetchTier()
  }, [session])

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  const isAuthenticated = !!session
  const userId = session?.user?.id

  return (
    <AuthContext.Provider value={{ session, isAuthenticated, logout, supabase, userId, accountTier }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
