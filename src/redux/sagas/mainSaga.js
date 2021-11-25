import { all, fork, call, put } from "redux-saga/effects";
import {
  requestProducts,
  successProducts,
  failProducts,
} from "../actions/productsActions";

export default function* rootSaga() {
  yield all([fork(getProducts)]);
}

function* getProducts() {
  try {
    yield put(requestProducts());
    const products = yield call(fetchProducts);
    yield put(successProducts(products));
  } catch (e) {
    yield put(failProducts(e.message));
  }
}

const fetchProducts = async () => {
  const data = await fetch("http://localhost:4000/products").then((res) => {
    return res.json();
  });

  console.log(data);

  return data;
};
