import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface GymCardProps {
    id: number;
    image: string;
    name: string;
    description: string;
    cheaperPlan: number;
};

export function GymCard({ id, image, name, description, cheaperPlan }: GymCardProps) {
    const [mouseOverFav, setMouseOverFav] = useState<boolean>(false);

    return (
        <Card bg="secondary.400" maxW="sm" minH="xl">
            <CardBody>
                <Image
                    src={image}
                    alt={`Imagem da Academia: ${name}`}
                    borderRadius='lg'
                    h="200px"
                    w="100%"
                    fit="cover"
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md' color="primary.500">{name}</Heading>
                    <Text>{description}</Text>
                    <Text color='primary.500' fontSize='2xl'>
                        R$ {cheaperPlan}
                    </Text>
                </Stack>
            </CardBody>
            <Divider bg="primary.500" />
            <CardFooter>
                <ButtonGroup spacing={48}>
                    <Button variant='solid' colorScheme='primary'>
                        Visualizar
                    </Button>
                    <Icon
                        fontSize="2rem"
                        cursor="pointer"
                        color="primary.500"
                        as={mouseOverFav ? BsHeartFill : BsHeart}
                        onMouseOver={() => setMouseOverFav(true)}
                        onMouseOut={() => setMouseOverFav(false)}
                    />
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};