import { Flex, Image, Box, Center, Text } from "@chakra-ui/react";

interface LoginCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

export function LoginCard({ title, subtitle, children }: LoginCardProps) {
    return (
        <Flex
            m="4vh auto 0 auto"
            w="80%"
            minH="80vh"
            bg="secondary.400"
            borderRadius="1em"
        >
            <Image src="/assets/gym-login.jpeg" w="34vw" borderRadius="1em 0 0 1em" />
            <Box as="section" w="100%">
                <Center mt="10vh" flexDir="column">
                    <Image w="14em" src="/assets/gym-dynamics-logo.png" />
                    <Text mt={4} fontSize="2em">{title}</Text>
                    <Text>{subtitle}</Text>
                </Center>
                {children}
            </Box>
        </Flex>
    );
};