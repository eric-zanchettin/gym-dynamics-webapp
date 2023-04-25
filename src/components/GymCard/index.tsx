import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

interface GymCardProps {
    gymId: string;
    image: string;
    name: string;
    description: string;
    cheaperPlan: number;
};

export function GymCard({ gymId, image, name, description, cheaperPlan }: GymCardProps) {
    const navigate = useNavigate();

    const [mouseOverFav, setMouseOverFav] = useState<boolean>(false);

    const handleViewGym = () => {
        navigate(`/gym/${gymId}`, { replace: false });
    };

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
                        {cheaperPlan <= 0 ? 'Valor não informado' : `R$ ${cheaperPlan}/mês`}
                    </Text>
                </Stack>
            </CardBody>
            <Divider bg="primary.500" />
            <CardFooter>
                <ButtonGroup spacing={48}>
                    <Button variant='solid' colorScheme='primary' onClick={handleViewGym}>
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