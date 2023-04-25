import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { Card, Text } from "@chakra-ui/react";
import { DecodedUserData } from "../../types";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";

export function GymDetails() {
    const [cookies] = useCookies(['loginToken']);
    const { decodedToken } = useJwt<DecodedUserData>(cookies.loginToken);

    let { gymId } = useParams();
    const navigate = useNavigate();

    const [gymDetails, setGymDetails] = useState<any>({});

    useEffect(() => {
        api.get(`/gyms/${gymId}`)
            .then(response => setGymDetails(response.data))
            .catch(() => {
                toast.error('A academia não existe!');
                navigate('/', { replace: false })
            });
    }, [navigate, gymId]);

    return (
        <>
            <Helmet>
                <title>{`Academia ${gymDetails?.name} | Gym Dynamics`}</title>
            </Helmet>
            <Card mt={24} bg="secondary.500">
                <Text>{gymDetails?.name}</Text>
                {decodedToken?.email === gymDetails?.User?.email && ('Deletar')}
            </Card>
        </>
    );
};