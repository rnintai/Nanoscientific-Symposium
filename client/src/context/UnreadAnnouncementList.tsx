import React, { useReducer, useContext, createContext, Dispatch } from "react";

type State = number[]; // 읽혀지지 않은 announcement list index 배열

type Action =
  | { type: "Add_ANNOUNCEMENT"; id: number }
  | { type: "INSERT_ANNOUNCEMENT"; arr: number[] }
  | { type: "DELETE_ANNOUNCEMENT"; id: number };
type UnreadDispatch = Dispatch<Action>;

const UnreadStateContext = createContext<State | null>([]);
const UnreadDispatchContext = createContext<UnreadDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "Add_ANNOUNCEMENT":
      console.log(`UnreadAnnouncementList.tsx => ${action.id}`);
      return state.concat(action.id);
    case "INSERT_ANNOUNCEMENT":
      console.log(`UnreadAnnouncementList.tsx => ${action.arr}`);
      return action.arr;
    case "DELETE_ANNOUNCEMENT":
      console.log(`UnreadAnnouncementList.tsx => ${action.id}`);
      return state.filter(
        (UnReadAnnouncement) => UnReadAnnouncement !== action.id,
      );
    default:
      throw new Error("reducer: Unhandled Action");
  }
}

export const UnreadProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <UnreadStateContext.Provider value={state}>
      <UnreadDispatchContext.Provider value={dispatch}>
        {children}
      </UnreadDispatchContext.Provider>
    </UnreadStateContext.Provider>
  );
};

export function useUnreadListState(): State {
  const state = useContext(UnreadStateContext);
  if (!state) throw new Error("Cannot find UnreadProvider");
  return state;
}

export function useUnreadListDispatch() {
  const dispatch = useContext(UnreadDispatchContext);
  if (!dispatch) throw new Error("Cannot find UnreadProvider");
  return dispatch;
}

// for flag
type FlagState = {
  value: boolean;
};

type FlagAction = { type: "FLAGUP" } | { type: "FLAGDOWN" };

type FlagDispatch = Dispatch<FlagAction>;

const FlagStateContext = createContext<FlagState | null>({ value: false });
const FlagDispatchContext = createContext<FlagDispatch | null>(null);

function flagReducer(state: FlagState, action: FlagAction): FlagState {
  switch (action.type) {
    case "FLAGUP":
      return { value: true };
    case "FLAGDOWN":
      return { value: false };

    default:
      throw new Error("reducer: Unhandled Action");
  }
}

// Provider
export const FlagProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(flagReducer, {
    value: false,
  });

  return (
    <FlagStateContext.Provider value={state}>
      <FlagDispatchContext.Provider value={dispatch}>
        {children}
      </FlagDispatchContext.Provider>
    </FlagStateContext.Provider>
  );
};

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useFlagState(): FlagState {
  const state = useContext(FlagStateContext);
  if (!state) throw new Error("Cannot find FlagProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useFlagDispatch() {
  const dispatch = useContext(FlagDispatchContext);
  if (!dispatch) throw new Error("Cannot find FlagProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
