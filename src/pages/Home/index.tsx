import { Card } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

export function Home() {
    return (
        <>
            <Helmet>
                <title>Home | Gym Dynamics</title>
            </Helmet>
            <Card m={4} mt={20} h="90vh" bg="secondary.500">
            </Card>
        </>
    );
};