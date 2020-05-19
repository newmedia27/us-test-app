import { all, call, take, put } from "redux-saga/effects";
import Http from "../components/http/Http";
import { URL } from "../resource";
import { COUNT_SHOW_ITEMS } from "../constants";

const NAMESPACE = "AppReducer";

const GET_USERS_REQUEST = `${NAMESPACE}/GET_USERS_REQUEST`;
const SET_USERS = `${NAMESPACE}/SET_USERS`;
const SET_CURRENT_PAGE = `${NAMESPACE}/SET_CURRENT_PAGE`;
const SET_LOADING = `${NAMESPACE}/SET_LOADING`;
const SET_ERROR = `${NAMESPACE}/SET_ERROR`;

export const getUsersRequest = (payload) => ({
  type: GET_USERS_REQUEST,
  payload,
});
export const setUsers = (payload) => ({ type: SET_USERS, payload });
export const setLoading = (payload) => ({ type: SET_LOADING, payload });
export const setCurrentPage = (payload) => ({
  type: SET_CURRENT_PAGE,
  payload,
});

const initialState = {
  list: [],
  currentPage: 1,
  loading: false,
  error: null,
};
const handlerActions = {
  [SET_USERS]: (state, { payload }) => ({ ...state, list: payload }),
  [SET_LOADING]: (state, { payload }) => ({ ...state, loading: payload }),
  [SET_CURRENT_PAGE]: (state, { payload }) => ({ ...state, currentPage: payload }),
  [SET_ERROR]: (state,{payload})=>({...state, error: payload}),
  DEFAULT: (state) => state,
};
export default function AppReducer(state = initialState, { type, payload }) {
  const handler = handlerActions[type] || handlerActions.DEFAULT;
  return handler(state, { type, payload });
}

export const listSelector = (state) => state[NAMESPACE];

export function* getUserList() {
  while (true) {
    const { payload } = yield take(GET_USERS_REQUEST);
    yield put(setLoading(true));
    yield put({type: SET_ERROR, payload:null})
    let url = URL;
    if (payload && payload !== 1) {
      url = `${URL}?since=${payload * COUNT_SHOW_ITEMS}`;
    }
    try {
      const response = yield call(Http.get, url);
      yield put(setUsers(response));
    } catch (err) {
      console.log(err)
      yield put({type: SET_ERROR, payload:'There should be an error text'})
    } finally {
      yield put(setLoading(false));
    }
  }
}

export function* getPaginationItems() {
  while (true) {
    const { payload } = yield take(SET_CURRENT_PAGE);
    yield put(getUsersRequest(payload));
  }
}

export function* ListSagas() {
  yield all([getUserList(), getPaginationItems()]);
}
