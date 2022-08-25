import React, { createContext, Dispatch, useContext, useReducer } from 'react';

import GlobalModal from './GlobalModal';

export interface ModalInterface {
  targetId?: string;
  onConfirm?: () => void;
  closeModal?: () => void;
}
type Component = (props: ModalInterface) => JSX.Element;
type State = {
  targetId: string;
  isModalOpen: boolean;
  ModalComponent: Component | null;
  onConfirm?: () => void;
  closeModal?: () => void;
};

type Action =
  | {
      type: 'OPEN_MODAL';
      Component: Component;
      targetId?: string;
      closeModal?: () => void;
      onConfirm?: () => void;
    }
  | { type: 'CLOSE_MODAL' };

type ModalDispatch = Dispatch<Action>;

const ModalStateContext = createContext<State | null>(null);
const ModalDispatchContext = createContext<ModalDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        targetId: action.targetId || '',
        isModalOpen: true,
        ModalComponent: action.Component,
        onConfirm: action.onConfirm,
        closeModal: action.closeModal,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        targetId: '',
        isModalOpen: false,
        ModalComponent: null,
        onConfirm: undefined,
        closeModal: undefined,
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    ModalComponent: null,
    isModalOpen: false,
    targetId: '',
  });

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        <GlobalModal />
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

export function useModalState() {
  const state = useContext(ModalStateContext);
  if (!state) throw new Error('Cannot find ModalStateContext');
  return state;
}

export function useModalDispatch() {
  const dispatch = useContext(ModalDispatchContext);
  if (!dispatch) throw new Error('Cannot find ModalDispatchContext');
  return dispatch;
}
