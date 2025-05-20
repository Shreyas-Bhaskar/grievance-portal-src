import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

// Button variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

// Styled button component
export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius};
  font-weight: 500;
  transition: ${theme.transition};
  border: none;
  
  /* Size variations */
  padding: ${props => 
    props.size === 'small' ? '6px 12px' : 
    props.size === 'large' ? '12px 24px' : 
    '8px 16px'};
  
  font-size: ${props => 
    props.size === 'small' ? '0.875rem' : 
    props.size === 'large' ? '1.125rem' : 
    '1rem'};
  
  /* Width */
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  /* Variant styles */
  background-color: ${props => {
    switch(props.variant) {
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
      case 'text':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  }};
  
  color: ${props => {
    switch(props.variant) {
      case 'outline':
        return theme.colors.primary;
      case 'text':
        return theme.colors.primary;
      default:
        return 'white';
    }
  }};
  
  border: ${props => 
    props.variant === 'outline' ? `1px solid ${theme.colors.primary}` : 'none'};
  
  &:hover {
    background-color: ${props => {
      switch(props.variant) {
        case 'secondary':
          return '#7B1FA2'; // Darker purple
        case 'outline':
          return 'rgba(232, 62, 140, 0.1)';
        case 'text':
          return 'rgba(232, 62, 140, 0.1)';
        default:
          return '#D81B60'; // Darker pink
      }
    }};
    
    box-shadow: ${props => 
      props.variant === 'text' ? 'none' : theme.boxShadow};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Default props are set in the component with default parameters

// Input component
export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius};
  font-size: 1rem;
  transition: ${theme.transition};
  
  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(232, 62, 140, 0.2);
    outline: none;
  }
  
  &::placeholder {
    color: ${theme.colors.lightText};
  }
`;

// Form group component
export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

// Label component
export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${theme.colors.text};
`;

// Card component
export const Card = styled.div`
  background-color: white;
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  padding: 24px;
  margin-bottom: 20px;
`;

// Container component
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

// Select component
export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius};
  font-size: 1rem;
  background-color: white;
  transition: ${theme.transition};
  
  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(232, 62, 140, 0.2);
    outline: none;
  }
`;

// Textarea component
export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: ${theme.transition};
  
  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(232, 62, 140, 0.2);
    outline: none;
  }
  
  &::placeholder {
    color: ${theme.colors.lightText};
  }
`;

// Flex container
export const Flex = styled.div<{
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  gap?: number;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  gap: ${props => props.gap ? `${props.gap}px` : '0'};
`;

// Page title
export const PageTitle = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.primary};
  margin-bottom: 24px;
  font-weight: 600;
`;

// Section title
export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text};
  margin-bottom: 16px;
  font-weight: 500;
`;

// Error message
export const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: 0.875rem;
  margin-top: 4px;
`;

// Success message
export const SuccessMessage = styled.p`
  color: ${theme.colors.success};
  font-size: 0.875rem;
  margin-top: 4px;
`;

// Badge for status
export const Badge = styled.span<{ variant: 'pending' | 'acknowledged' | 'resolved' }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  
  background-color: ${props => {
    switch(props.variant) {
      case 'pending':
        return '#FFF3CD';
      case 'acknowledged':
        return '#CCE5FF';
      case 'resolved':
        return '#D4EDDA';
      default:
        return '#FFF3CD';
    }
  }};
  
  color: ${props => {
    switch(props.variant) {
      case 'pending':
        return '#856404';
      case 'acknowledged':
        return '#004085';
      case 'resolved':
        return '#155724';
      default:
        return '#856404';
    }
  }};
`;
