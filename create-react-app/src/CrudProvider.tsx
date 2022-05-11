import {
  createContext,
  type Dispatch,
  type ReactNode,
  useReducer,
  useContext,
} from "react";

export interface Person {
  first: string;
  last: string;
}

type State = Person[];

type Action =
  | { type: "CREATE"; payload: Person }
  | {
      type: "UPDATE";
      payload: { selected: Person } & Person;
    }
  | { type: "REMOVE"; payload: { selected: Person } };

const initialState = [
  { first: "Hans", last: "Emil" },
  { first: "Max", last: "Mustermann" },
  { first: "Roman", last: "Tisch" },
];

const CrudStateContext = createContext(initialState);
const CrudDispatchContext = createContext<Dispatch<Action>>(() => null);

type Reducer<S, A> = (state: S, action: A) => S;
const reducer: Reducer<State, Action> = (state, action) => {
  const selectedPersonIndex = (selected: Person) =>
    state.findIndex(
      (person) =>
        person.first === selected.first && person.last === selected.last
    );

  switch (action.type) {
    case "CREATE":
      return [
        ...state,
        { first: action.payload.first, last: action.payload.last },
      ];
    case "UPDATE":
      return state.map((person, i) =>
        i === selectedPersonIndex(action.payload.selected)
          ? { first: action.payload.first, last: action.payload.last }
          : person
      );
    case "REMOVE":
      const index = selectedPersonIndex(action.payload.selected);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

export const CrudProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CrudDispatchContext.Provider value={dispatch}>
      <CrudStateContext.Provider value={state}>
        {children}
      </CrudStateContext.Provider>
    </CrudDispatchContext.Provider>
  );
};

export const useCrud = (): [State, Dispatch<Action>] => [
  useContext(CrudStateContext),
  useContext(CrudDispatchContext),
];
