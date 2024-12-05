import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // TODO: get genre ids from database table using genres
      const [genres, tableInfo] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      // genre without movies
      if (genres.length === 0) return []

      // get the id from the first genre result
      const [{ id }] = genres

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados
      return []
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie'
    )

    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
            FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const {
        genre: genreInput,
        title,
        year,
        duration,
        director,
        rate,
        poster
    } = input

    // todo: crear la conexion de genre

  }

  static async delete ({ id, title }) {

  }

  static async update ({ id, input }) {

  }
}
