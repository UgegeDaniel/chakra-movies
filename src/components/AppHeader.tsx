import { Box, VStack, HStack, Image, Spacer, Button, Heading, Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'
import logo from "../assets/download.png"
import SearchFilter from './SearchFilter'
import { HeaderProps } from '../types'
const AppHeader: React.FC<HeaderProps> = ({ search, setSearch, genres }) => {
    return (
        <VStack justifyContent="space-between" alignItems='center'>
            <HStack p='2' minWidth='max-content'>
                <Image src={logo} borderRadius='full' boxSize='30px' />
                <Heading size='md'>Chakra Movies</Heading>
            </HStack> <Spacer />
            <SearchFilter setSearch={setSearch} search={search} />
            <Box m={2}>
                <Menu>
                    <MenuButton px={4} py={2} transition='all 0.2s' borderRadius='md' borderWidth='1px' _hover={{ bg: 'teal.400' }}
                        _expanded={{ bg: 'teal.500' }} _focus={{ boxShadow: 'outline' }} as={Button} rightIcon={ 
                        <FaChevronDown color='teal' />} variant='soft-rounded'> Genres </MenuButton>
                    <MenuList> {genres.map((item, index) => (<MenuItem key={index}>{item.name}</MenuItem>))} </MenuList>
                </Menu>
            </Box>
        </VStack>
    )
}
export default AppHeader