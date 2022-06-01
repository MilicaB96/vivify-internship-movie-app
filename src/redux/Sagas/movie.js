import * as types from "../Constants/movie";
import MovieService from "../../services/MovieService";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createMovieError,
  createMovieSuccess,
  dislikeMovieError,
  dislikeMovieSuccess,
  fetchAllMoviesError,
  fetchAllMoviesSuccess,
  fetchMovieError,
  fetchMovieSuccess,
  likeMovieError,
  likeMovieSuccess,
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
export function* fetchMovies(action) {
  try {
    const data = yield call(
      MovieService.getAll,
      action.page,
      action.search,
      action.genre
    );
    yield put(
      fetchAllMoviesSuccess(
        data.results,
        Boolean(data.previous),
        Boolean(data.next)
      )
    );
  } catch (error) {
    yield put(fetchAllMoviesError(error));
  }
}

export function* fetchMovie(action) {
  try {
    const data = yield call(MovieService.getMovie, action.id);
    yield put(fetchMovieSuccess(data));
  } catch (error) {
    yield put(fetchMovieError(error));
  }
}

export function* likeMovie(action) {
  try {
    const data = yield call(MovieService.like, action.id);
    yield put(likeMovieSuccess(data));
  } catch (error) {
    yield put(likeMovieError());
  }
}

export function* dislikeMovie(action) {
  try {
    const data = yield call(MovieService.dislike, action.id);
    yield put(dislikeMovieSuccess(data));
  } catch (error) {
    yield put(dislikeMovieError());
  }
}

export default function* watchMovies() {
  yield takeLatest(types.CREATE_MOVIE, createMovie);
  yield takeLatest(types.FETCH_ALL_MOVIES, fetchMovies);
  yield takeLatest(types.FETCH_MOVIE, fetchMovie);
  yield takeLatest(types.LIKE_MOVIE, likeMovie);
  yield takeLatest(types.DISLIKE_MOVIE, dislikeMovie);
}
