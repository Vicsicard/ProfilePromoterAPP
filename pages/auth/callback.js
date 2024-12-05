import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import { Container, CircularProgress, Typography, Box } from '@mui/material';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error.message);
        router.push('/login?error=Unable to verify email');
        return;
      }

      if (session) {
        // Successfully authenticated
        router.push('/dashboard');
      } else {
        // No session, redirect to login
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <CircularProgress />
        <Typography variant="h6">
          Verifying your email...
        </Typography>
      </Box>
    </Container>
  );
}
