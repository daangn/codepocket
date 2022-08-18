import React, { createContext, Dispatch, useContext, useReducer } from 'react';

type State = {
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  deleteTargetId: string;
  editTargetId: string;
};

type Action =
  | { type: 'TOGGLE_DELETE_MODAL' }
  | { type: 'TOGGLE_EDIT_MODAL' }
  | { type: 'SET_DELETE_TARGET_ID'; targetId: string }
  | { type: 'SET_EDIT_TARGET_ID'; targetId: string };

type ModalDispatch = Dispatch<Action>;

const ModalStateContext = createContext<State | null>(null);
const ModalDispatchContext = createContext<ModalDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_DELETE_MODAL':
      return {
        ...state,
        isDeleteModalOpen: !state.isDeleteModalOpen,
      };
    case 'TOGGLE_EDIT_MODAL':
      return {
        ...state,
        isEditModalOpen: !state.isEditModalOpen,
      };
    case 'SET_DELETE_TARGET_ID':
      return {
        ...state,
        deleteTargetId: action.targetId,
      };
    case 'SET_EDIT_TARGET_ID':
      return {
        ...state,
        editTargetId: action.targetId,
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    isDeleteModalOpen: false,
    isEditModalOpen: false,
    deleteTargetId: '',
    editTargetId: '',
  });

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
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
