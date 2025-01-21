import { Button, styled } from "@mui/material";
import React from "react";

interface EventButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const StyledButton = styled(Button)({
  color: "#6D3A0A",
  borderRadius: "16px",
  paddingTop: "4px",
  paddingBottom: "4px",
  background: "linear-gradient(180deg, #F3DBA9 0%, #FFA031 100%)",
  minWidth: "40px",
  textTransform: "none",
  "&:disabled": {
    color: "#6D3A0A",
    background: "linear-gradient(180deg, #EFEBE4 0%, #B3AAA0 100%)",
  },
});

const EventButton: React.FC<EventButtonProps> = ({
  onClick,
  children,
  className,
  disabled,
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} className={className}>
      {children}
    </StyledButton>
  );
};

export default EventButton;
