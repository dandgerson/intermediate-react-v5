import { ReactElement, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  renderContent: () => ReactElement;
  target: string;
  onCancel?: () => void;
};

export const Modal = ({
  renderContent,
  target,
  onCancel = () => {},
}: ModalProps) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  const handleOnCancel = useCallback(
    (e: Event) => {
      if (e.target === document.querySelector(target)) {
        onCancel();
      }
    },
    [onCancel, target]
  );

  useEffect(() => {
    const modalRoot = document.querySelector(target);

    if (!modalRoot || !elRef.current) return;

    modalRoot.appendChild(elRef.current);
    modalRoot.addEventListener("click", handleOnCancel);

    return () => {
      modalRoot.removeEventListener("click", handleOnCancel);

      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, [target, onCancel, handleOnCancel]);

  return createPortal(<div>{renderContent()}</div>, elRef.current);
};
