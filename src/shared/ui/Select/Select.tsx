import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import "./Select.scss";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  value: string;
  options: SelectOption[];
  className?: string;
  onChange: (value: string) => void;
}

export function Select({
  id,
  value,
  options,
  className = "",
  onChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((prev) => !prev);
    }

    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`select ${open ? "select--open" : ""} ${className}`.trim()}
    >
      <button
        type="button"
        id={id}
        className="select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="select__value">{selected.label}</span>
      </button>

      {open && (
        <ul id={listId} className="select__list" role="listbox">
          {options.map((option) => (
            <li key={option.value || "all"} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={`select__option ${
                  option.value === value ? "select__option--selected" : ""
                }`.trim()}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
