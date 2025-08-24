import { IconProps } from "phosphor-react";
import "./IconButton.css";
import React from "react";

interface IconButtonProps {
    Icon?: React.ComponentType<IconProps>;
    IconSize?: number;
    IconWeight?: "thin" | "light" | "regular" | "bold";
    onClick: () => void;
    disabled?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({ 
    Icon, 
    IconWeight = "regular", 
    IconSize = 20, 
    disabled = false, 
    onClick 
}) => {
  return (
    <button
      className="icon-button"
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={IconSize} weight={IconWeight} />}
    </button>
  );
};

export default IconButton;