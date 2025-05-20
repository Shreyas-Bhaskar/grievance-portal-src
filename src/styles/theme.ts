// Theme configuration for the grievance portal
export const theme = {
  colors: {
    primary: '#e83e8c', // Pink
    secondary: '#9c27b0', // Purple
    background: '#fff9fc', // Light pink background
    text: '#333333',
    lightText: '#666666',
    border: '#f8bbd0',
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
  },
  fonts: {
    main: "'Poppins', sans-serif",
  },
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(232, 62, 140, 0.1)',
  transition: 'all 0.3s ease',
};

export type ThemeType = typeof theme;
