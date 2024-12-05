import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, CircularProgress } from '@mui/material';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page on initial load
    router.push('/login').catch(console.error);
  }, [router]);

  return (
    <Container 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}
    >
      <CircularProgress />
    </Container>
  );
}
