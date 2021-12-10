import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface IModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ show, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  const backdrop = (
    <div
      className="absolute top-0 left-0 w-screen h-screen flex content-center items-center bg-black opacity-50"
      onClick={handleCloseClick}
    />
  );

  const modalContent = show ? (
    <>
      {backdrop}
      <div className="flex flex-col w-screen h-4/5 items-center">
        <div className="bg-gray-900 w-[300px] h-auto p-4 z-10 absolute top-[200px] text-white font-bold text-center">
          <div className="flex justify-end text-base">
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          Reset Data
          <div className="pt-3">{children}</div>
        </div>
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  } else {
    return null;
  }
};

export default Modal;
