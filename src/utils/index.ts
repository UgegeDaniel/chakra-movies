import { movie } from '../types'
export const newUrlParams = (newParam: string, setData: React.Dispatch<React.SetStateAction<movie[]>>, setUrlParams: React.Dispatch<React.SetStateAction<string>>) => {
    setData([])
    setUrlParams(newParam)
}

export const getGenres = (genreIds: Array<number>, genres: { name: string; id: number; }[]) => {
    const genreNames = genres.filter((genre) => genreIds.includes(genre.id)).map((genre) => genre.name)
    return genreNames
}

export const debounce = (debounceFxn: (url: string) => Promise<void>, delay: number) => {
  return (url: string) => {
    const timeout = setTimeout(() => {
      debounceFxn(url);
    }, delay)
    clearTimeout(timeout);
  }
}