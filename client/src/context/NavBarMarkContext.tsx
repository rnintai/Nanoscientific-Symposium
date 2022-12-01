import React, { useReducer, useContext, createContext, Dispatch } from "react";

type State = {
  alarm: boolean;
};

type Action = { type: "ON" } | { type: "OFF" };
type AlarmDispatch = Dispatch<Action>;

const AlarmStateContext = createContext<State | null>({ alarm: false });
const AlarmDispatchContext = createContext<AlarmDispatch | null>(null);
//
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ON":
      return { alarm: true };
    case "OFF":
      return { alarm: false };
    default:
      throw new Error("reducer: Unhandled Action");
  }
}

export const AlarmProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    alarm: false,
  });

  return (
    <AlarmStateContext.Provider value={state}>
      <AlarmDispatchContext.Provider value={dispatch}>
        {children}
      </AlarmDispatchContext.Provider>
    </AlarmStateContext.Provider>
  );
};

export function useAlarmState(): State {
  const state = useContext(AlarmStateContext);
  if (!state) throw new Error("Cannot find AlarmProvider");
  return state;
}

export function useAlarmDispatch() {
  const dispatch = useContext(AlarmDispatchContext);
  if (!dispatch) throw new Error("Cannot find AlarmProvider");
  return dispatch;
}
