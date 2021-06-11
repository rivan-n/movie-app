import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { MovieModel, MovieSnapshot } from "../movie/movie"
import { MoviesApi } from "../../services/api/movies-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing movies
 */
export const MovieStoreModel = types
  .model("MovieStores")
  .props({
    nowPlayingMovies: types.optional(types.array(MovieModel), []),
    popularMovies: types.optional(types.array(MovieModel), []),
    topRatedMovies: types.optional(types.array(MovieModel), []),
    upcomingMovies: types.optional(types.array(MovieModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveNowPlayingMovies: (movieSnapshots: MovieSnapshot[]) => {
      self.nowPlayingMovies.replace(movieSnapshots)
    },
    savePopularMovies: (movieSnapshots: MovieSnapshot[]) => {
      self.popularMovies.replace(movieSnapshots)
    },
    saveTopRatedMovies: (movieSnapshots: MovieSnapshot[]) => {
      self.topRatedMovies.replace(movieSnapshots)
    },
    saveUpcomingMovies: (movieSnapshots: MovieSnapshot[]) => {
      self.upcomingMovies.replace(movieSnapshots)
    },
  }))
  .actions((self) => ({
    getNowPlayingMovies: async () => {
      const moviesApi = new MoviesApi(self.environment.api)
      const result = await moviesApi.getNowPlaying()

      if (result.kind === "ok") {
        self.saveNowPlayingMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    getPopularMovies: async () => {
      const moviesApi = new MoviesApi(self.environment.api)
      const result = await moviesApi.getPopular()

      if (result.kind === "ok") {
        self.savePopularMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    getTopRatedMovies: async () => {
      const moviesApi = new MoviesApi(self.environment.api)
      const result = await moviesApi.getTopRated()

      if (result.kind === "ok") {
        self.saveTopRatedMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    getUpcomingMovies: async () => {
      const moviesApi = new MoviesApi(self.environment.api)
      const result = await moviesApi.getUpcoming()

      if (result.kind === "ok") {
        self.saveUpcomingMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type MovieStoreType = Instance<typeof MovieStoreModel>
export interface MovieStore extends MovieStoreType {}
type MovieStoreSnapshotType = SnapshotOut<typeof MovieStoreModel>
export interface MovieStoreSnapshot extends MovieStoreSnapshotType {}
export const createMovieStoreDefaultModel = () => types.optional(MovieStoreModel, {})
