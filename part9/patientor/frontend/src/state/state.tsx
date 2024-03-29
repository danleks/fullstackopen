import React, { createContext, useContext, useReducer } from "react";
import {Diagnoses, Patient} from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient },
  patient: { [id: string]: Patient },
  diagnoses: { [code: string]: Diagnoses }
};

const initialState: State = {
  patients: {},
  patient: {},
  diagnoses: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
