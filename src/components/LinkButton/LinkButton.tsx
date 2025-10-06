import React from "react";
import "./LinkButton.css";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  label: string;
  to: string;
  type?: "primary" | "secondary" | "tertiary";
  borderRadius?: number | "default";
  disabled?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  label,
  to,
  type = "primary",
  borderRadius = "default",
  disabled = false,
}) => {
  return (
    <Link
      to={to}
      className={`link-button ${type}`}
      style={{
        borderRadius:
          borderRadius === "default" ? "100px" : `${borderRadius}px`,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {label}
    </Link>
  );
};

export default LinkButton;
