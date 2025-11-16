import React from "react";
import "./LinkIconButton.css";
import { IconProps } from "phosphor-react";
import { Link } from "react-router-dom";

interface IconButtonProps {
  Icon?: React.ComponentType<IconProps>;
  IconSize?: number;
  to: string;
  IconWeight?: "thin" | "light" | "regular" | "bold";
  title?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
}

const LinkIconButton: React.FC<IconButtonProps> = ({
  Icon,
  IconWeight = "regular",
  IconSize = 20,
  to,
  title = "",
  target = null,
}) => {
  return (
    <Link to={to} title={title} className="icon-button" target={!!target? target : ""}>
      {Icon && <Icon size={IconSize} weight={IconWeight} />}
    </Link>
  );
};

export default LinkIconButton;
