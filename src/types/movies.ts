export interface Movie {
  id: number
  original_title: string
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  tagline: string
  vote_count: number
  genres: Genres[]
}

export interface Genres {
  id: number
  name: string
}