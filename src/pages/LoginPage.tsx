import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import { useAuth } from '../context/AuthContext';
import { Button, Input, FormGroup, Label, Card, Container, ErrorMessage } from '../components/UIComponents';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: 32px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 24px;
  
  h1 {
    color: ${theme.colors.primary};
    font-size: 2rem;
    margin-bottom: 8px;
  }
  
  p {
    color: ${theme.colors.lightText};
  }
`;

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <h1>Grievance Portal</h1>
          <p>Hello Amulya! Submit your complaints for Shreyas's response</p>
        </Logo>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button type="submit" fullWidth>
            Log In
          </Button>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
