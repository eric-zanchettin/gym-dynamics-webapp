import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { GymCard } from "../../components/GymCard";
import { api } from "../../services/api";

interface Gyms {
    id: string;
    name: string;
    img_src: string;
    description: string;
    cheaper_plan: string;
};

export function Home() {
    const [gyms, setGyms] = useState<Gyms[]>([]);

    useEffect(() => {
        api.get('gyms')
            .then(response => setGyms(response.data));
    }, []);

    return (
        <>
            <Helmet>
                <title>Home | Gym Dynamics</title>
            </Helmet>
            <Grid m={4} mt={20} maxH="90vh" gridTemplateColumns={["1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]} gap="24px 0">
                {gyms.map(gym => {
                    return (
                        <GymCard
                            key={gym.id}
                            gymId={gym.id}
                            image={gym.img_src}
                            name={gym.name}
                            description={gym.description}
                            cheaperPlan={Number(gym.cheaper_plan)}
                        />
                    );
                })}
            </Grid>
        </>
    );
};