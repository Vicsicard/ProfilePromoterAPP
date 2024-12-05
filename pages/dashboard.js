import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        window.location.href = '/login';
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.email}</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
