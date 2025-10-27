import React from "react";
import "./LinkIconButton.css";
import { IconProps } from "phosphor-react";
import { Link } from "react-router-dom";

interface IconButtonProps {
  Icon?: React.ComponentType<IconProps>;
  IconSize?: number;
  to: string;
  IconWeight?: "thin" | "light" | "regular" | "bold";
}

const LinkIconButton: React.FC<IconButtonProps> = ({
  Icon,
  IconWeight = "regular",
  IconSize = 20,
  to,
}) => {
  return (
    <Link to={to} className="icon-button">
      {Icon && <Icon size={IconSize} weight={IconWeight} />}
    </Link>
  );
};

export default LinkIconButton;
