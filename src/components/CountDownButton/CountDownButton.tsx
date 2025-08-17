import React from "react";
import "./CountDownButton.css";
import { IconProps } from "phosphor-react";

interface CountDownButtonProps {
    label?: string;
    onClick: () => void;
    Icon?: React.ComponentType<IconProps>;
    IconSize?: number;
    IconWeight?: "thin" | "light" | "regular" | "bold";
    disabled?: boolean;
    timeLeft: number; // Time left in seconds
    step?: number; 
    width?: number | "auto";
}

const CountDownButton: React.FC<CountDownButtonProps> = ({ 
    label = "",
    Icon, 
    IconWeight = "regular", 
    IconSize = 20, 
    disabled = false, 
    timeLeft, 
    step = 1, 
    width = "auto",
    onClick 
}) => {
  const [timeTotal, setTimeTotal] = React.useState(timeLeft);
  const [isCounting, setIsCounting] = React.useState(false);

  React.useEffect(() => {
    if (!isCounting) return;
    if (timeTotal <= 0) {
      setIsCounting(false);
      setTimeTotal(timeLeft); // Reset
      return;
    }
    const timer = setTimeout(() => {
      setTimeTotal(t => t - step);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isCounting, timeTotal, timeLeft, step]);

  const handleClick = async () => {
    if (!isCounting && timeTotal === timeLeft && timeLeft > 0) {
      await onClick();
      setIsCounting(true);
    }
  };

  return (
    <button
      className="countdown-button"
      onClick={handleClick}
      disabled={disabled || isCounting}
      style={{ width: typeof width === "number" ? `${width}px` : width }}
    >
      {isCounting && <span className="countdown-timer"> ({timeTotal}s)</span>}
      {label && <span className="countdown-label">{label}</span>}
      {Icon && <Icon size={IconSize} weight={IconWeight} />}
    </button>
  );
};

export default CountDownButton;