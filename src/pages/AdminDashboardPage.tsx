import React from 'react';
import { useGrievances, Grievance } from '../context/GrievanceContext';
import { Container, PageTitle, Button, Card, Flex, Badge, Textarea } from '../components/UIComponents';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const GrievanceCard = styled(Card)`
  margin-bottom: 20px;
`;

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const AdminDashboardPage: React.FC = () => {
  const { grievances, updateGrievanceStatus } = useGrievances();
  const [notes, setNotes] = React.useState<Record<string, string>>({});

  const handleAcknowledge = async (id: string) => {
    await updateGrievanceStatus(id, 'Acknowledged');
  };

  const handleResolve = async (id: string) => {
    await updateGrievanceStatus(id, 'Resolved');
    // Optional: Save note in Firebase in future
  };

  return (
    <Container>
      <PageTitle>Admin Dashboard – Hello Shreyas 👋</PageTitle>
      {grievances.length === 0 ? (
        <p>No grievances submitted yet.</p>
      ) : (
        grievances.map(g => (
          <GrievanceCard key={g.id}>
            <Flex justify="space-between" align="center">
              <h3>{g.title}</h3>
              <Badge variant={g.status.toLowerCase() as 'pending' | 'acknowledged' | 'resolved'}>
                {g.status}
              </Badge>
            </Flex>
            <p><strong>Date:</strong> {formatDate(g.date)}</p>
            <p><strong>Description:</strong> {g.description}</p>
            <p><strong>Mood:</strong> {g.mood}</p>
            <p><strong>Severity:</strong> {g.severity}</p>
            <Textarea
              placeholder="Optional message for Amulya..."
              value={notes[g.id] || ''}
              onChange={(e) => setNotes(prev => ({ ...prev, [g.id]: e.target.value }))}
              style={{ marginTop: '12px' }}
            />
            <Flex gap={12} style={{ marginTop: '12px' }}>
              {g.status === 'Pending' && (
                <Button onClick={() => handleAcknowledge(g.id)}>Acknowledge</Button>
              )}
              {g.status !== 'Resolved' && (
                <Button variant="secondary" onClick={() => handleResolve(g.id)}>Resolve</Button>
              )}
            </Flex>
          </GrievanceCard>
        ))
      )}
    </Container>
  );
};

export default AdminDashboardPage;
