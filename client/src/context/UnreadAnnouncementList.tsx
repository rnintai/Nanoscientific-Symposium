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
