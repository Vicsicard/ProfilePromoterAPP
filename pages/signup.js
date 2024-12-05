import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        setMessage(error.message);
      } else {
        setEmailSent(true);
        setMessage('Please check your email for the confirmation link.');
      }
    } catch (error) {
      setMessage('An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Typography variant="h4" gutterBottom align="center">
            Check Your Email
          </Typography>
          <Alert severity="success" sx={{ mt: 2 }}>
            We've sent you a confirmation email. Please click the link in the email to verify your account.
          </Alert>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              component={Link}
              href="/login"
              variant="text"
              color="primary"
            >
              Return to Login
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
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
          onKeyPress={(e) => e.key === 'Enter' && handleSignup()}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
        {message && (
          <Typography 
            variant="body2" 
            color={message.includes('check your email') ? 'success.main' : 'error.main'} 
            sx={{ mt: 2, textAlign: 'center' }}
          >
            {message}
          </Typography>
        )}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Button
              component={Link}
              href="/login"
              variant="text"
              color="primary"
              sx={{ ml: 1 }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
