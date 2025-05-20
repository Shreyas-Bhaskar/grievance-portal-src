import React, { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import { useGrievances, GrievanceMood, GrievanceSeverity } from '../context/GrievanceContext';
import { useAuth } from '../context/AuthContext';
import { 
  Button, 
  Input, 
  FormGroup, 
  Label, 
  Card, 
  Container, 
  Select, 
  Textarea,
  Flex,
  PageTitle,
  SuccessMessage
} from '../components/UIComponents';

const FormContainer = styled.div`
  padding: 40px 0;
`;

const SubmitGrievancePage: React.FC = () => {
  const { user } = useAuth();
  const { addGrievance } = useGrievances();
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mood: 'Annoyed' as GrievanceMood,
    severity: 'Low' as GrievanceSeverity,
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addGrievance(formData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      mood: 'Annoyed' as GrievanceMood,
      severity: 'Low' as GrievanceSeverity,
      date: new Date().toISOString().split('T')[0]
    });
    
    // Show success message
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Container>
      <FormContainer>
      <PageTitle>Submit a Grievance</PageTitle>
<p style={{ color: theme.colors.primary, marginBottom: '24px' }}>
  Hey Amulya, this is your safe little corner to vent anything that's bothering you — big or small.
  I promise I’ll read everything carefully and get back to you with all my love (and solutions, of course).
  You matter, and your voice will always be heard here. 💌
</p>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="What's your grievance about?"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell Shreyas what's bothering you..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <Flex gap={20}>
              <FormGroup style={{ flex: 1 }}>
                <Label htmlFor="mood">Current Mood</Label>
                <Select
                  id="mood"
                  name="mood"
                  value={formData.mood}
                  onChange={handleChange}
                  required
                >
                  <option value="Annoyed">Annoyed</option>
                  <option value="Disappointed">Disappointed</option>
                  <option value="Frustrated">Frustrated</option>
                  <option value="Angry">Angry</option>
                  <option value="Furious">Furious</option>
                </Select>
              </FormGroup>
              
              <FormGroup style={{ flex: 1 }}>
                <Label htmlFor="severity">Severity</Label>
                <Select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </Select>
              </FormGroup>
            </Flex>
            
            <FormGroup>
              <Label htmlFor="date">Date of Incident</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            {success && (
              <SuccessMessage>
                Thank you, {user.username}. Your grievance has been sent to Shreyas. He will get back to you very soon! (He will think about it).
              </SuccessMessage>
            )}
            
            <Button type="submit" fullWidth>
              Submit Grievance
            </Button>
          </form>
        </Card>
      </FormContainer>
    </Container>
  );
};

export default SubmitGrievancePage;
