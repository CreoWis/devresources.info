import { useEffect, useRef } from "react";

const Modal = ({ onClose, children }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.body.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return <div ref={modalRef}>{children}</div>;
};

export default Modal;
