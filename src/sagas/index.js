import { all } from "redux-saga/effects";
import {ListSagas} from '../reducers/app-reducer'
import { UserSagas } from "../reducers/user";

export default function* sagas() {
  yield all([
      ListSagas(),
      UserSagas()
  ]);
}
