import * as types from "../Constants/movie";
import MovieService from "../../services/MovieService";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createMovieError,
  createMovieSuccess,
  fetchAllMoviesError,
  fetchAllMoviesSuccess,
} from "../Actions/movie";
import ROUTES from "./../../shared/routes/routes";

export function* createMovie(action) {
  try {
    const data = yield call(MovieService.createMovie, action.movie);
    yield put(createMovieSuccess(data));
    action.history.push(ROUTES.DASHBOARD);
  } catch (error) {
    yield put(createMovieError(error));
  }
}
export function* fetchMovies() {
  try {
    const data = yield call(MovieService.getAll);
    yield put(fetchAllMoviesSuccess(data));
  } catch (error) {
    yield put(fetchAllMoviesError(error));
  }
}
export default function* watchMovies() {
  yield takeLatest(types.CREATE_MOVIE, createMovie);
  yield takeLatest(types.FETCH_ALL_MOVIES, fetchMovies);
}
