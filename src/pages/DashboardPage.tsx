import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import { useGrievances, Grievance } from '../context/GrievanceContext';
import { useAuth } from '../context/AuthContext';
import { 
  Button, 
  Card, 
  Container, 
  Flex,
  PageTitle,
  SectionTitle,
  Badge
} from '../components/UIComponents';

const DashboardContainer = styled.div`
  padding: 40px 0;
`;

const GrievanceCard = styled(Card)`
  margin-bottom: 16px;
  transition: ${theme.transition};
  
  &:hover {
    box-shadow: 0 8px 16px rgba(232, 62, 140, 0.15);
  }
`;

const GrievanceTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: ${theme.colors.primary};
`;

const GrievanceDate = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.lightText};
  margin-bottom: 12px;
`;

const GrievanceDescription = styled.p`
  margin-bottom: 16px;
`;

const GrievanceMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  
  span {
    font-size: 0.875rem;
    color: ${theme.colors.lightText};
    
    strong {
      color: ${theme.colors.text};
      margin-left: 4px;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  
  h3 {
    margin-bottom: 16px;
    color: ${theme.colors.primary};
  }
  
  p {
    color: ${theme.colors.lightText};
    margin-bottom: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const GrievanceItem: React.FC<{ grievance: Grievance }> = ({ grievance }) => {
  const { updateGrievanceStatus } = useGrievances();

  const statusMap = {
    'Pending': 'pending' as const,
    'Acknowledged': 'acknowledged' as const,
    'Resolved': 'resolved' as const
  };

  const handleStatusChange = async (newStatus: Grievance['status']) => {
    await updateGrievanceStatus(grievance.id, newStatus);
  };

  return (
    <GrievanceCard>
      <Flex justify="space-between" align="center">
        <GrievanceTitle>{grievance.title}</GrievanceTitle>
        <Badge variant={statusMap[grievance.status]}>{grievance.status}</Badge>
      </Flex>

      <GrievanceDate>Incident date: {formatDate(grievance.date)}</GrievanceDate>
      <GrievanceDescription>{grievance.description}</GrievanceDescription>

      <GrievanceMeta>
        <span>Mood: <strong>{grievance.mood}</strong></span>
        <span>Severity: <strong>{grievance.severity}</strong></span>
      </GrievanceMeta>

      <GrievanceDate>Submitted on {formatDate(grievance.createdAt)}</GrievanceDate>

      {grievance.status !== 'Resolved' && (
        <Flex gap={12} style={{ marginTop: '12px' }}>
          {grievance.status === 'Pending' && (
            <Button onClick={() => handleStatusChange('Acknowledged')}>Mark as Acknowledged</Button>
          )}
          <Button onClick={() => handleStatusChange('Resolved')} variant="secondary">
            Mark as Resolved
          </Button>
        </Flex>
      )}
    </GrievanceCard>
  );
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { grievances } = useGrievances();

  return (
    <Container>
      <DashboardContainer>
        <Header>
          <PageTitle>Your Grievances</PageTitle>
          <Button onClick={() => window.location.href = '/submit'}>Submit New Grievance</Button>
        </Header>
        
        {grievances.length > 0 ? (
          <>
            <SectionTitle>All Grievances</SectionTitle>
            {grievances.map(grievance => (
              <GrievanceItem key={grievance.id} grievance={grievance} />
            ))}
          </>
        ) : (
          <EmptyState>
            <h3>No Grievances Yet</h3>
            <p>You haven't submitted any grievances yet. When you do, they'll appear here.</p>
            <Button onClick={() => window.location.href = '/submit'}>Submit Your First Grievance</Button>
          </EmptyState>
        )}
      </DashboardContainer>
    </Container>
  );
};

export default DashboardPage;
