import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetMoviesResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class MoviesApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getNowPlaying(): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/movie/now_playing",
        { page: "1" },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const movies = response.data.results

      return { kind: "ok", movies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  
  async getPopular(): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/movie/popular",
        { page: "1" },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const movies = response.data.results

      return { kind: "ok", movies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getTopRated(): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/movie/top_rated",
        { page: "1" },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const movies = response.data.results

      return { kind: "ok", movies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getUpcoming(): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/movie/upcoming",
        { page: "1" },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const movies = response.data.results

      return { kind: "ok", movies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}