import React from "react";
import "./Button.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  tyle?: "primary" | "secondary" | "tertiary";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, tyle = "primary" }) => {
  return (
    <button
      className={`button ${tyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;