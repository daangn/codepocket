import { createContext, useContext, useMemo, useState } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

interface ModalValueState {
  isOpen: boolean;
}

interface ModalActionState {
  closeModal: () => void;
  openModal: () => void;
}

const LoanValueContext = createContext<ModalValueState>({} as ModalValueState);
const LoanActionsContext = createContext<ModalActionState>({} as ModalActionState);

const ModalProvider = ({ children }: ProviderProps) => {
  const [modal, setModal] = useState<ModalValueState>({ isOpen: false });

  const actions = useMemo(
    () => ({
      closeModal: () => setModal({ isOpen: false }),
      openModal: () => setModal({ isOpen: true }),
    }),
    [],
  );

  return (
    <LoanValueContext.Provider value={modal}>
      <LoanActionsContext.Provider value={actions}>{children}</LoanActionsContext.Provider>
    </LoanValueContext.Provider>
  );
};

export function useModalValue() {
  const value = useContext(LoanValueContext);
  if (value === undefined) {
    throw new Error('useModalValue should be used within LoanProvider');
  }
  return value;
}

export function useModalAction() {
  const value = useContext(LoanActionsContext);
  if (value === undefined) {
    throw new Error('useModalAction should be used within LoanProvider');
  }
  return value;
}

export default ModalProvider;
