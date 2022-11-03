import { movie } from '../types'
export const newUrlParams = (newParam: string, setData: React.Dispatch<React.SetStateAction<movie[]>>, setUrlParams: React.Dispatch<React.SetStateAction<string>>) => {
  setData([])
  setUrlParams(newParam)
}

export const getGenres = (genreIds: Array<number | null | undefined>, genres: { name: string; id: number | null | undefined; }[]) => {
  const genreNames = genres.filter((genre) => genreIds.includes(genre.id)).map((genre) => genre.name)
  return genreNames
}


export const debounce = (debounceFxn: (e: any) => void) => {
  let timer: any;
  return (...args: any) => {
    if (timer)  clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      debounceFxn.apply(null, args)
    }, 2000)
  }
}
