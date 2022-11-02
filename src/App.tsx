import { useState } from 'react'
import { Box,  CircularProgress, Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure } from '@chakra-ui/react'
import { TABS } from './constants'
import { AppHeader, MovieCard, VideoModal } from './components'
import { movie } from './types'
import { newUrlParams, getGenres } from './utils'
import { useData, useGenres } from './hooks'
import './app.css'

function App() {
  const [urlParams, setUrlParams] = useState<string>('/trending/all/day')
  const { data, loading, search, setSearch, setData } = useData(urlParams)
  const { genres } = useGenres()
  const [trailer, setTrailer] = useState({ show: false, url: '' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box as="main" p="2rem" w="100vw" h="100vh" overflow="hidden">
      <AppHeader search={search} setSearch={setSearch} genres={genres} />
      {trailer.show && <VideoModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} trailer={trailer} setTrailer={setTrailer} />}
      <Tabs variant='soft-rounded' colorScheme='green' isFitted>
        <TabList> {TABS.map((key, index) => (<Tab key={index} onClick={() => newUrlParams(key.param, setData, setUrlParams)}>{key.name} </Tab>))} </TabList>
        <TabPanels> {loading
          ? <CircularProgress isIndeterminate color='teal.300' mt={5} />
          : TABS.map((item, index) => (
            <TabPanel key={index}>
              <div className="movie-carousel"> {data.map((item: movie, index) => (
                <div key={index} className="movie-card"> <MovieCard item={item} getGenres={getGenres} setTrailer={setTrailer} genres={genres} /> </div>))}
              </div>
            </TabPanel>))}
        </TabPanels>
      </Tabs>
    </Box>
  )
}
export default App
