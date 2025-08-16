import React from "react";
import "./CountDownButton.css"
import { IconProps } from "phosphor-react";

interface CountDownButtonProps {
    label?: string;
    onClick: () => void;
    Icon?: React.ComponentType<IconProps>;
    IconSize?: number;
    IconWeight?: "thin" | "light" | "regular" | "bold";
    disabled?: boolean;
    timeLeft: number; // Time left in seconds
    timeTotal: number; 
}

const CountDownButton: React.FC<CountDownButtonProps> = ({ 
    label = "",
    Icon, 
    IconWeight = "regular", 
    IconSize = 20, 
    disabled = false, 
    timeLeft, 
    timeTotal, 
    onClick 
}) => {
  return (
    <button
      className="countdown-button"
      onClick={onClick}
      disabled={disabled || (timeLeft !== timeTotal && timeLeft > 0)}
    >
        {(timeLeft !== timeTotal && timeLeft > 0) && <span className="countdown-timer"> ({timeLeft}s)</span>}
        {Icon && <Icon size={IconSize} weight={IconWeight} />}
        {label && <span className="countdown-label">{label}</span>}
    </button>
  );
};

export default CountDownButton;