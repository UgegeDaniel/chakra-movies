import  { useState, useEffect } from 'react'
import { API_KEY, BASE_URL, IMG_URL, LANGUAGE, YT_URL } from '../constants'
import { movie, item } from '../types'
// import {  debounce } from '../utils'

const useData = (urlParams?: string) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Array<movie>>([])
    const [search, setSearch] = useState({ type: 'movie', term: '' })

    const fetchData = async (url: string) => {
        setLoading(true);
        try {
            const response = await fetch(url)
            const { results } = await response.json()
            setData(results)
            setLoading(false)
            return
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if (data.length > 0 && !search.term) {
            const urls = data.map((item: movie,) => {
                const media = item.media_type || 'movie' 
                return {
                    id: item.id, streamProviderUrl: `${BASE_URL}/${media}/${item.id}/watch/providers?api_key=${API_KEY}`, trailerKeyUrl: `${BASE_URL}/${media}/${item.id}/videos?api_key=${API_KEY}${LANGUAGE}`,
                }
            })
            //GET STREAM PROVIDERS
            Promise.all(urls.map(item => fetch(item.streamProviderUrl))).then(resp => Promise.all(resp.map(r => r.text()))).then((streamProviders) => {
                const json = streamProviders.map((item) => ({ id: JSON.parse(item).id, urls: JSON.parse(item).results.MX?.flatrate || JSON.parse(item).results.MX?.buy || JSON.parse(item).results.US?.flatrate || JSON.parse(item).results.GB?.free || JSON.parse(item).results.GB?.flatrate, }))
                const providers = json.map((item: item) => ({ ...item, streamProvider: (item.urls && item.urls.length > 0) ? `${IMG_URL}${item.urls[0].logo_path}` : '' }))
                const augmentedData = data.map((item: movie, index) => (item.id === providers[index].id ? { ...item, streamProvider: providers[index].streamProvider } : item))
                !data[0].streamProvider && setData(augmentedData)
            })
            //GET TRAILERS
            Promise.all(urls.map(item => fetch(item.trailerKeyUrl))).then(resp => Promise.all(resp.map(r => r.text()))).then((trailers) => {
                const json = trailers.map((item) => (
                    { id: JSON.parse(item).id, url: `${YT_URL}${JSON.parse(item).results.find((item: item) => item.type === 'Trailer').key}` }
                    ))
                    const augmentedData = data.map((item: movie, index) => (item.id === json[index].id ? { ...item, trailerUrl: json[index].url } : item))
                    !data[0].trailerUrl && setData(augmentedData)
                })
            }
        }, [data])

        const debounce = (debounceFxn: Promise<void>, delay: number) => {
            return (url: string) => {
              const timeout = setTimeout(() => {
                debounceFxn(url);
              }, delay)
              clearTimeout(timeout);
            }
          }

        useEffect(() => {
            const searchUrl = `${BASE_URL}/search/${search.type}?api_key=${API_KEY}${LANGUAGE}&page=1&query=${search.term}&include_adult=false`
            if (search.term) {
              debounce(fetchData(searchUrl), 500)
              return
            } else {
              fetchData(`${BASE_URL}${urlParams}?api_key=${API_KEY}${LANGUAGE}`)
            }
          }, [urlParams, search.term])

  
        return { loading, data, search, setSearch, setData }
    }

export default useData