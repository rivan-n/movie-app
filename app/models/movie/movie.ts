import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Movie model.
 */
export const MovieModel = types.model("Movie").props({
  id: types.identifierNumber,
  title: types.maybe(types.string),
  original_title: types.maybe(types.string),
  overview: types.maybe(types.string),
  poster_path: types.maybe(types.string),
  backdrop_path: types.maybe(types.string),
  release_date: types.maybe(types.string),
  popularity: types.maybe(types.number),
  vote_average: types.maybe(types.number),
  vote_count: types.maybe(types.number),
})

type MovieType = Instance<typeof MovieModel>
export interface Movie extends MovieType {}
type MovieSnapshotType = SnapshotOut<typeof MovieModel>
export interface MovieSnapshot extends MovieSnapshotType {}
export const createMovieDefaultModel = () => types.optional(MovieModel, {})
