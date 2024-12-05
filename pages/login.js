import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Login successful!');
        router.push('/dashboard');
      }
    } catch (error) {
      setMessage('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {message && (
          <Typography 
            variant="body2" 
            color={message.includes('successful') ? 'success.main' : 'error.main'} 
            sx={{ mt: 2, textAlign: 'center' }}
          >
            {message}
          </Typography>
        )}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Don&apos;t have an account?{' '}
            <Button
              component={Link}
              href="/signup"
              variant="text"
              color="primary"
              sx={{ ml: 1 }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
