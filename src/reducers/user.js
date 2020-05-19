import { all, call, take, put } from "redux-saga/effects";
import Http from "../components/http/Http";
import { URL } from "../resource";

const NAMESPACE = "UserReducer";

const GET_USER_REQUEST = `${NAMESPACE}/GET_USER_REQUEST`;
const SET_USER = `${NAMESPACE}/SET_USER`;
const SET_LOADING = `${NAMESPACE}/SET_LOADING`;
const SET_ERROR = `${NAMESPACE}/SET_ERROR`;
const RESET_STATE = `${NAMESPACE}/RESET_STATE`;


export const getUserRequest = (payload) => ({
  type: GET_USER_REQUEST,
  payload,
});
export const setUser = (payload) => ({ type: SET_USER, payload });
export const setLoading = (payload) => ({ type: SET_LOADING, payload });
export const resetState = ()=>({type: RESET_STATE})


const initialState = {
  user: null,
  loading: false,
  error: null,
};
const handlerActions = {
  [SET_USER]: (state, { payload }) => ({ ...state, user: payload }),
  [SET_LOADING]: (state, { payload }) => ({ ...state, loading: payload }),
  [RESET_STATE]: ()=>initialState,
  [SET_ERROR]: (state,{payload})=>({...state, error: payload}),
  DEFAULT: (state) => state,
};
export default function UserReducer(state = initialState, { type, payload }) {
  const handler = handlerActions[type] || handlerActions.DEFAULT;
  return handler(state, { type, payload });
}

export const userSelector = (state) => state[NAMESPACE];

export function* getUserSaga() {
  while (true) {
    const { payload } = yield take(GET_USER_REQUEST);
    yield put(setLoading(true));
    yield put({type: SET_ERROR, payload:null})

    const url = `${URL}/${payload}`;
    try {
      const response = yield call(Http.get, url);
      yield put(setUser(response));
    } catch (err) {
        yield put({type: SET_ERROR, payload:'There should be an error text'})
    } finally {
      yield put(setLoading(false));
    }
  }
}

export function* UserSagas() {
  yield all([getUserSaga()]);
}
