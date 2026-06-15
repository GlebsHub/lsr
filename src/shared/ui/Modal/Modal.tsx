import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

const CLOSE_ANIMATION_MS = 200;

interface ModalProps {
  open: boolean;
  children: ReactNode;
  titleId?: string;
  className?: string;
  onClose: () => void;
}

export function Modal({
  open,
  children,
  titleId,
  className = "",
  onClose,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (!open || isClosing) return;

    setIsClosing(true);
  }, [open, isClosing]);

  useEffect(() => {
    if (!isClosing) return;

    document.body.classList.add("modal-open");

    const timer = window.setTimeout(() => {
      setIsClosing(false);
      onClose();
      document.body.classList.remove("modal-open");
    }, CLOSE_ANIMATION_MS);

    return () => window.clearTimeout(timer);
  }, [isClosing, onClose]);

  useEffect(() => {
    if (!open) return;

    document.body.classList.add("modal-open");
    dialogRef.current?.focus();

    return () => {
      if (!isClosing) {
        document.body.classList.remove("modal-open");
      }
    };
  }, [open, isClosing]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  const isVisible = open || isClosing;

  if (!isVisible) return null;

  return createPortal(
    <div
      className={`modal ${!isClosing ? "modal--open" : ""} ${isClosing ? "modal--closing" : ""} ${className}`.trim()}
    >
      <button
        type="button"
        className="modal__overlay"
        aria-label="Закрыть"
        onClick={handleClose}
      />

      <div
        ref={dialogRef}
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Закрыть"
          onClick={handleClose}
        >
          ×
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
}
