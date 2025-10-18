import React from "react";
import "./InputText.css";
import { IconProps } from "phosphor-react";

interface InputTextProps{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "password" | "email" | "number";
  width?: number;
  lable?: string;
  textSize?: number;
  Icon?: React.ComponentType<IconProps>;
  IconSize?: number;
  IconWeight?: "thin" | "light" | "regular" | "bold";
  stretch?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  width = 300,
  lable,
  textSize = 14,
  Icon,
  IconSize = 20,
  IconWeight = "regular",
  stretch = true,
}) => {
  return ( 
    <div className="input-text-wrapper" style={{width:stretch?"100%":"auto"}}>
      {lable && <label className="input-label" style={{ fontSize: `${textSize + 2}px` }}>{lable}</label>}
      <div className={`input-text-container ${disabled ? "disabled" : ""}`} style={{width:stretch?"100%":"auto"}}>
        {Icon && <Icon className="input-icon" size={IconSize} weight={IconWeight} color="var(--muted-text)" />}
        <input
          className="input-text"
          type={type}
          value={value}
          style={{ fontSize: `${textSize}px`, width: `${width}px` }}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputText;