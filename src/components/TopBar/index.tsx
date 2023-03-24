import { useCookies } from "react-cookie";
import { Avatar, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useJwt } from "react-jwt";
import { DecodedUserData } from "../../types";

export function TopBar() {
    const [cookies, , removeCookies] = useCookies(['loginToken']);
    const { decodedToken: decodedUserData } = useJwt<DecodedUserData>(cookies.loginToken);

    return (
        <Flex justify="space-between" align="center" position="fixed" w="100%" h="60px" bg="rgba(255, 255, 255, 0.8)" top={0} zIndex={5}>
            <Flex align="center" gap={4}>
                <Image src="/assets/gym-dynamics-logo.png" mt={1} ml={2} w="80px" />
                <Text fontSize="1.2rem">Seja bem-vindo, {decodedUserData?.name}!</Text>
            </Flex>
            <Menu>
                <MenuButton>
                    <Avatar mr={4} name={decodedUserData?.name} />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => removeCookies('loginToken')}>Sair</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};