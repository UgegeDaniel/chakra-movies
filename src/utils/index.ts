import { movie } from '../types'
export const newUrlParams = (newParam: string, setData: React.Dispatch<React.SetStateAction<movie[]>>, setUrlParams: React.Dispatch<React.SetStateAction<string>>) => {
  setData([])
  setUrlParams(newParam)
}

export const getGenres = (genreIds: Array<number | null | undefined>, genres: { name: string; id: number | null | undefined; }[]) => {
  const genreNames = genres.filter((genre) => genreIds.includes(genre.id)).map((genre) => genre.name)
  return genreNames
}

export const debounce = (debounceFxn: any) => {
  let timer: any;
  return function (...args: any) {
    const context = this;
    if (timer)  clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      debounceFxn.apply(context, args)
    }, 2000)
  }
}
