import { useState } from 'react'
import { Box, CircularProgress, Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure, HStack } from '@chakra-ui/react'
import { TABS } from './constants'
import { AppHeader, MovieCard, VideoModal } from './components'
import { movie } from './types'
import { newUrlParams } from './utils'
import { useData, useGenres } from './hooks'
import './app.css'

function App() {
  const [urlParams, setUrlParams] = useState<string>('/trending/all/day')
  const [genreId, setGenreId] = useState<number | null>(null)
  const { data, loading, search, setSearch, setData } = useData(urlParams, genreId)
  const { genres } = useGenres()
  const [trailer, setTrailer] = useState({ show: false, url: '' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box as="main" p="1rem" w="100vw" h="100vh" overflow="hidden" >
      <AppHeader search={search} setSearch={setSearch} genres={genres} setGenreId={setGenreId} genreId={genreId} />
      {trailer.show && <VideoModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} trailer={trailer} setTrailer={setTrailer} />}
      <Tabs variant='soft-rounded' colorScheme={"red" || "green"} isFitted>
        <HStack maxWidth="100vw" margin="auto 0.5rem">
          <TabList> {TABS.map((key, index) => (<Tab key={index} onClick={() => newUrlParams(key.param, setData, setUrlParams)} fontSize="xs">{key.name}</Tab>))} </TabList>
        </HStack>
        <TabPanels> {loading
          ? <CircularProgress isIndeterminate color='teal.300' mt={5} />
          : TABS.map((item, index) => (
            <TabPanel key={index}>
              <div className="movie-carousel"> {data.map((item: movie, index) => (
                <div key={index} className="movie-card"> <MovieCard item={item} setTrailer={setTrailer} genres={genres} /> </div>))}
              </div>
            </TabPanel>))}
        </TabPanels>
      </Tabs>
    </Box>
  )
}
export default App
