import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';

// Example: styled MUI button with custom variants
const StyledButton = styled(Button)<{ glow?: boolean }>`
  font-weight: 600;
  border-radius: 8px;
  box-shadow: ${({ glow }) =>
    glow ? '0 0 8px 2px rgba(58, 123, 213, 0.3)' : 'none'};
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: ${({ glow }) =>
      glow ? '0 0 16px 4px rgba(58, 123, 213, 0.5)' : '0 2px 8px rgba(0,0,0,0.08)'};
    transform: scale(1.05);
  }
`;

interface MuiButtonProps {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  glow?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const MuiButton: React.FC<MuiButtonProps> = ({ children, glow, ...props }) => {
  return (
    <StyledButton {...props} glow={glow ? 1 : 0}>
      {children}
    </StyledButton>
  );
};

export default MuiButton;
