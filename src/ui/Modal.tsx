import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type ReactElement,
  type MouseEventHandler,
} from 'react';

import { useOutsideClick } from '../hooks/useOutsideClick';
import { HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';

// Types
interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}
type OpenProps = {
  children: ReactElement<{ onClick?: MouseEventHandler }>;
  opens: string;
};
type WindowProps = {
  children: ReactElement<{ onClose?: () => void }>;
  name: string;
};

//
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 1)
function Modal({
  openOnMount,
  children,
}: {
  openOnMount?: string;
  children: ReactNode;
}) {
  const [openName, setOpenName] = useState<string>(openOnMount ?? '');

  const close = () => setOpenName('');
  const open = setOpenName;

  useEffect(
    function () {
      if (openName) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }

      return () => {
        document.body.style.overflow = 'auto';
      };
    },
    [openName],
  );

  return (
    <ModalContext.Provider
      value={{
        openName,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within Modal');
  return context;
}

// 2)
function Open({ opens, children }: OpenProps) {
  const { open } = useModal();

  return cloneElement(children, { onClick: () => open(opens) });
}

// 3)
function Window({ name, children }: WindowProps) {
  const { close, openName } = useModal();
  const ref = useOutsideClick(close);

  if (openName !== name) return null;

  return createPortal(
    <div
      className="fixed inset-0 w-full h-dvh bg-gray-100/50 backdrop-blur-xs z-[1000] transition-all duration-500 dark:bg-gray-900/50"
      data-modal-portal
      // onClick={close}
    >
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 -translate-1/2 w-[calc(100%-2rem)] md:w-max sm:max-w-3xl max-h-[85dvh] bg-gray-50 px-4 py-6 sm:px-7 sm:py-8 shadow-lg rounded overflow-y-auto overflow-x-hidden transition-all duration-500 dark:bg-gray-800"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
          onClick={close}
        >
          <HiXMark className="w-6 h-6" />
        </button>

        <div>{cloneElement(children, { onClose: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

// 4)
Modal.Open = Open;
Modal.Window = Window;

//
export default Modal;
