import { useCookies } from "react-cookie";
import { Avatar, Flex, HStack, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useJwt } from "react-jwt";
import { DecodedUserData } from "../../types";
import { AddGymModal } from "./AddGymModal";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useContext } from "react";
import { FavContext } from "../../contexts/FavContext";

export function TopBar() {
    const { favViewOnly, handleFavViewOnly } = useContext(FavContext);

    const [cookies, , removeCookies] = useCookies(['loginToken']);
    const { decodedToken: decodedUserData } = useJwt<DecodedUserData>(cookies.loginToken);

    const handleLogout = () => {
        removeCookies('loginToken', { path: '/' });
    };

    return (
        <Flex justify="space-between" align="center" position="fixed" w="100%" h="60px" bg="rgba(255, 255, 255, 0.8)" top={0} zIndex={5}>
            <Flex align="center" gap={4}>
                <Link to="/">
                    <Image src="/assets/gym-dynamics-logo.png" mt={1} ml={2} w="80px" />
                </Link>
                <Text fontSize="1.2rem">Seja bem-vindo, {decodedUserData?.name}!</Text>
            </Flex>
            <HStack>
                <Flex flexDir="column" align="center" mr={2} color="primary.500" cursor="pointer" onClick={handleFavViewOnly}>
                    <Icon as={favViewOnly ? BsHeartFill : BsHeart} />
                    <Text>Favoritos</Text>
                </Flex>
                <AddGymModal />
                <Menu>
                    <MenuButton>
                        <Avatar mr={4} name={decodedUserData?.name} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem _hover={{ bg: 'primary.400' }}>Preferências</MenuItem>
                        <MenuItem _hover={{ bg: 'primary.400' }} onClick={handleLogout}>Sair</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    );
};