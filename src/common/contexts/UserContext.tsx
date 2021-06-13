import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";
import firebase from "firebase";

export type StateType = {
  loading: boolean;
  user: firebase.User;
  error?: string;
};

const initialState: StateType = {
  loading: true,
  user: undefined,
  error: undefined,
};

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";
export const GET_USER_NO_AUTH = "GET_USER_NO_AUTH";

type ActionType =
  | { type: typeof GET_USER }
  | {
      type: typeof GET_USER_SUCCESS;
      user: firebase.User;
    }
  | { type: typeof GET_USER_ERROR; error: string }
  | { type: typeof GET_USER_NO_AUTH };

const loading = () => ({
  loading: true,
  user: undefined,
  error: undefined,
});

const success = (user: firebase.User) => ({
  user,
  loading: false,
  error: undefined,
});

const fail = (error: string) => ({
  user: undefined,
  loading: false,
  error,
});

const noAuth = () => ({
  user: undefined,
  loading: false,
  error: undefined,
});

const userReducer: Reducer<StateType, ActionType> = (
  _state: StateType,
  action: ActionType
) => {
  switch (action.type) {
    case GET_USER:
      return loading();
    case GET_USER_SUCCESS:
      return success(action.user);
    case GET_USER_ERROR:
      return fail(action.error);
    case GET_USER_NO_AUTH:
      return noAuth();
    default:
      throw new Error("UserReducer: Unhanded action type");
  }
};

export const dispatchGetUser = (dispatch: Dispatch<ActionType>): void => {
  dispatch({ type: GET_USER_NO_AUTH });
};

export const dispatchGetUserSuccess = (
  dispatch: Dispatch<ActionType>,
  user: firebase.User
): void => {
  dispatch({ type: GET_USER_SUCCESS, user });
};

export const dispatchGetUserError = (
  dispatch: Dispatch<ActionType>,
  error: string
): void => {
  dispatch({ type: GET_USER_ERROR, error });
};

export const dispatchGetUserNoAuth = (dispatch: Dispatch<ActionType>): void => {
  dispatch({ type: GET_USER_NO_AUTH });
};

type UserContextValue = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextValue>({} as UserContextValue);

type Props = {
  children: ReactNode;
};

const asyncGetFirebaseApp = async () => {
  const { firebaseApp } = await import("../../../src/firebase/firebase");
  return firebaseApp;
};

export const UserContextProvider: React.FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const firebaseApp = await asyncGetFirebaseApp();
        firebaseApp.auth().onAuthStateChanged((user) => {
          if (user) {
            dispatchGetUserSuccess(dispatch, user);
            if (router.pathname === "/login" || router.pathname === "/signup")
              router.push("/");
          } else {
            if (router.pathname === "/game/add") router.push("/");
            dispatchGetUserNoAuth(dispatch);
          }
        });
      } catch (error) {
        dispatchGetUserError(dispatch, error);
      }
    };

    fetchAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const firebaseApp = await asyncGetFirebaseApp();
    const { user } = await firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password);
    dispatchGetUserSuccess(dispatch, user);
  };

  const logout = async () => {
    const firebaseApp = await asyncGetFirebaseApp();
    firebaseApp.auth().signOut();
    if (router.pathname === "/game/add") router.push("/");
  };

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextValue => {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error("Cannot find UserContext");
  }
  return value;
};

export default UserContextProvider;
