import { Center, CircularProgress, Grid, Icon, Text } from "@chakra-ui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MdWarning } from "react-icons/md";
import { FaHeartBroken, FaSadCry } from "react-icons/fa";
import { GymCard } from "../../components/GymCard";
import { AddGymModal } from "../../components/TopBar/AddGymModal";
import { api } from "../../services/api";
import { FavContext } from "../../contexts/FavContext";

interface Gyms {
    id: string;
    name: string;
    img_src: string;
    description: string;
    cheaper_plan: number;
};

export function Home() {
    const { favGyms, favViewOnly } = useContext(FavContext);

    const [gyms, setGyms] = useState<Gyms[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        if (api.defaults.headers.common['Authorization']) {
            setIsError(() => false);
            setIsLoading(() => true);

            api.get('gyms')
                .then(response => setGyms(response.data))
                .catch(() => setIsError(() => true))
                .finally(() => setIsLoading(() => false));
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Home | Gym Dynamics</title>
            </Helmet>
            {isLoading && (
                <Center m="40vh auto" flexDir="column">
                    <CircularProgress isIndeterminate color="secondary.500" />
                    <Text color="secondary.500">Carregando academias...</Text>
                </Center>
            )}
            {isError && (
                <Center m="40vh auto" flexDir="column">
                    <Icon as={MdWarning} color="red" fontSize="2rem" />
                    <Text color="red">Sentimos muito, houve um erro ao listar as academias...</Text>
                </Center>
            )}
            {favGyms.length === 0 && favViewOnly && (
                <>
                    <Center m="40vh auto" flexDir="column" color="secondary.500" gap={2}>
                        <Icon as={FaHeartBroken} fontSize="2rem" />
                        <Text>Você não favoritou nenhuma academia ainda...</Text>
                    </Center>
                </>
            )}
            {gyms.length > 0 || !isLoading || !isError ? (
                <Grid m={4} mt={20} maxH="90vh" gridTemplateColumns={["1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]} gap="24px 0">
                    {gyms.map(gym => {
                        return (
                            <Fragment key={gym.id}>
                                {favViewOnly ? (
                                    <>
                                        {favGyms.indexOf(gym.id) >= 0 && (
                                            <GymCard
                                                gymId={gym.id}
                                                image={gym.img_src}
                                                name={gym.name}
                                                description={gym.description}
                                                cheaperPlan={gym.cheaper_plan}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <GymCard
                                        gymId={gym.id}
                                        image={gym.img_src}
                                        name={gym.name}
                                        description={gym.description}
                                        cheaperPlan={gym.cheaper_plan}
                                    />
                                )
                                }
                            </Fragment>
                        );
                    })}
                </Grid>
            ) : (
                <Center m="40vh auto" flexDir="column">
                    <Icon as={FaSadCry} color="secondary.500" fontSize="2rem" />
                    <Text color="secondary.500" mb={4}>Ainda não há academias... Seja o primeiro a criar uma!</Text>
                    <AddGymModal />
                </Center>
            )}
        </>
    );
};