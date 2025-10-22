import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./DropdownButton.css";

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface DropdownButtonProps {
  children: React.ReactNode;
  items: DropdownItem[];
  align?: "start" | "center" | "end";
  className?: string;
  keepOpenOnFocus?: boolean; // 👈 prop mới
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  items,
  align = "end",
  className,
  keepOpenOnFocus = true,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <DropdownMenu.Root
      modal={false}
      open={open}
      onOpenChange={(nextOpen) => {
        if (keepOpenOnFocus && !nextOpen && document.activeElement) {
          const triggerEl = document.getElementById("dropdown-trigger");
          if (triggerEl && triggerEl.contains(document.activeElement)) {
            return; 
          }
        }
        setOpen(nextOpen);
      }}
    >
      <DropdownMenu.Trigger asChild>
        <div
          id="dropdown-trigger"
          className={className}
          onClick={() => {
            if (!keepOpenOnFocus) setOpen((prev) => !prev);
            else setOpen(true);
          }}
        >
          {children}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={6}
          className="dropdown-content"
          {...({ onOpenAutoFocus: (e: Event) => e.preventDefault() } as any)}
          onCloseAutoFocus={(e) => e.preventDefault()} 
        >
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              onSelect={item.onClick}
              disabled={item.disabled}
              className="dropdown-item"
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownButton;
