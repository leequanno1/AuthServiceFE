import { IconProps } from "phosphor-react";
import "./IconButton.css";
import React from "react";

interface IconButtonProps {
    Icon?: React.ComponentType<IconProps>;
    IconSize?: number;
    IconWeight?: "thin" | "light" | "regular" | "bold";
    onClick: () => void;
    disabled?: boolean;
    color?: string
};

const IconButton: React.FC<IconButtonProps> = ({ 
    Icon, 
    IconWeight = "regular", 
    IconSize = 20, 
    disabled = false, 
    onClick = () => {},
    color = "var(--text-color)"
}) => {
  return (
    <button
      className="icon-button"
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={IconSize} weight={IconWeight} color={color}/>}
    </button>
  );
};

export default IconButton;