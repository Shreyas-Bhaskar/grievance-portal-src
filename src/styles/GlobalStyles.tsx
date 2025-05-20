import React from 'react';
import { Global, css } from '@emotion/react';
import { theme } from './theme';

const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        font-family: ${theme.fonts.main};
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
        line-height: 1.6;
      }
      
      button {
        cursor: pointer;
        font-family: ${theme.fonts.main};
        transition: ${theme.transition};
      }
      
      input, textarea, select {
        font-family: ${theme.fonts.main};
        border-radius: ${theme.borderRadius};
        border: 1px solid ${theme.colors.border};
        padding: 10px 12px;
        transition: ${theme.transition};
        
        &:focus {
          outline: none;
          border-color: ${theme.colors.primary};
          box-shadow: 0 0 0 2px rgba(232, 62, 140, 0.2);
        }
      }
      
      h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
        font-weight: 600;
      }
    `}
  />
);

export default GlobalStyles;
