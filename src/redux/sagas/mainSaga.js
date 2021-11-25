import { takeEvery, put, call } from "redux-saga/effects";
import { successUsers } from "../actions/usersActions";

export default function* sagaWatcher() {
  yield takeEvery("request", sagaWorker);
}

function* sagaWorker() {
  const data = yield call(getProducts);
  console.log("hi");
  yield put(successUsers(data));
}

const getProducts = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (res) => {
      return res.json();
    }
  );

  console.log(data);

  return data;
};
