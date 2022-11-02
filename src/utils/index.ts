export const getGenres = (genreIds: Array<number>, genres: object[]) => {
    const genreNames = genres.filter((genre) => genreIds.includes(genre.id)).map((genre) => genre.name)
    return genreNames
}