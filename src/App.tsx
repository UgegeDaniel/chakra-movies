import { useState, useRef, useEffect } from 'react'
import { Box, SimpleGrid, CircularProgress, Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure } from '@chakra-ui/react'
import { API_KEY, BASE_URL, IMG_URL, LANGUAGE, YT_URL, TABS } from './constants'
import { AppHeader, MovieCard, VideoModal } from './components'
import { movie, item } from './types'

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Array<movie>>([])
  const [genres, setGenres] = useState<Array<{ name: string; id: number }>>([])
  const [urlParams, setUrlParams] = useState<string>('/trending/all/day')
  const [trailer, setTrailer] = useState({ show: false, url: '' })
  const [search, setSearch] = useState({ type: 'movie', term: '' })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getGenres = (genreIds: Array<number>) => {
    const genreNames = genres.filter((genre) => genreIds.includes(genre.id)).map((genre) => genre.name)
    return genreNames
  }

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
  const fetchGenres = async (url: string) => {
    try {
      const response = await fetch(url)
      const { genres: genreData } = await response.json()
      setGenres(genreData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(`${BASE_URL}${urlParams}?api_key=${API_KEY}${LANGUAGE}`)
  }, [urlParams])
  useEffect(() => {
    fetchGenres(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}${LANGUAGE}`)
  }, [])

  useEffect(() => {
    if (data.length > 0 && !search.term) {
      const urls = data.map((item: movie,) => {
        const media = item.media_type || 'movie' || 'tv'
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


  useEffect(() => {
    const searchUrl = `${BASE_URL}/search/${search.type}?api_key=${API_KEY}${LANGUAGE}&page=1&query=${search.term}&include_adult=false`
    if (search.term) {
      fetchData(searchUrl)
      return
    } else {
      console.log({ data })
      fetchData(`${BASE_URL}${urlParams}?api_key=${API_KEY}${LANGUAGE}`)
    }
  }, [urlParams, search.term])

  const newUrlParams = (newParam: string) => {
    setData([])
    setUrlParams(newParam)
  }


  return (
    <Box as="main" p="2rem" w="100vw">
      <AppHeader search={search} setSearch={setSearch} genres={genres} />
      {trailer.show &&
        <VideoModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} trailer={trailer} setTrailer={setTrailer} />
      }
      <Tabs variant='soft-rounded' colorScheme='green' isFitted>
        <TabList> {TABS.map((key, index) => (
          <Tab key={index} onClick={() => newUrlParams(key.param)}>{key.name}
          </Tab>))}
        </TabList>
        <TabPanels> {loading ?
          <CircularProgress isIndeterminate color='teal.300' mt={5} /> : TABS.map((item, index) => (
            <TabPanel key={index}>
              <SimpleGrid minChildWidth='190px' spacing='20px'> {data.map((item: movie, index) => (
                <Box key={index} >
                  <MovieCard item={item} getGenres={getGenres} setTrailer={setTrailer} />
                </Box>))}
              </SimpleGrid>
            </TabPanel>))}
        </TabPanels>
      </Tabs>

    </Box>
  )
}

export default App
