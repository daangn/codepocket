import React, { createContext, Dispatch, useContext, useReducer } from 'react';

import GlobalModal from './GlobalModal';

export interface ModalInterface {
  closeModal?: () => void;
  targetId?: string;
}
type Component = (props: ModalInterface) => JSX.Element;
type State = {
  ModalComponent: Component | null;
  isModalOpen: boolean;
  targetId: string;
};

type Action =
  | { type: 'OPEN_MODAL'; Component: Component; targetId?: string }
  | { type: 'CLOSE_MODAL' };

type ModalDispatch = Dispatch<Action>;

const ModalStateContext = createContext<State | null>(null);
const ModalDispatchContext = createContext<ModalDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        ModalComponent: action.Component,
        isModalOpen: true,
        targetId: action.targetId || '',
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        ModalComponent: null,
        isModalOpen: false,
        targetId: '',
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
