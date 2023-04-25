import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { Card, Text, Image, Divider, Heading, Center, Flex, Icon, Textarea, Tooltip } from "@chakra-ui/react";
import { DecodedUserData } from "../../types";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { IoIosPin } from 'react-icons/io';
import { BiCheckSquare, BiMoney, BiPencil, BiTrash } from 'react-icons/bi';
import { PatternInput } from "../../components/Patterns/PatternInput";
import { formatMoney } from "../../utils/formatter";
interface GymDetailsData {
    name?: string;
    img_src?: string;
    description?: string;
    address?: string;
    cheaper_plan?: number | string;
    User?: {
        email?: string;
    };
};

export function GymDetails() {
    const [cookies] = useCookies(['loginToken']);
    const { decodedToken } = useJwt<DecodedUserData>(cookies.loginToken);

    let { gymId } = useParams();
    const navigate = useNavigate();

    const [gymDetails, setGymDetails] = useState<GymDetailsData>();
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        if (api.defaults.headers.common['Authorization']) {
            api.get(`/gyms/${gymId}`)
                .then(response => {
                    if (response.status === 204) throw new Error();

                    setGymDetails(response.data)
                })
                .catch(() => {
                    toast.error('A academia não existe!');
                    navigate('/', { replace: false })
                    return;
                });
        };
    }, [navigate, gymId]);

    const handleEditGym = async () => {
        if (!editMode) {
            setEditMode(true);
        } else {
            setEditMode(false);

            try {
                const data = {
                    id: gymId,
                    name: gymDetails?.name,
                    img_src: gymDetails?.img_src,
                    description: gymDetails?.description,
                    address: gymDetails?.address,
                    cheaper_plan: Number(String(gymDetails?.cheaper_plan).replace(/\D/g, '')) / 100
                };

                await api.put(`/gyms`, data);
                toast.success('Academia editada com sucesso!');
            } catch {
                toast.error('Houve um erro ao editar a Academia e as atualizações não foram aplicadas!');
            };
        };
    };

    const handleChangeGymDetails = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: ('name' | 'img_src' | 'description' | 'address' | 'cheaper_plan')) => {
        const newGymDetails = { ...gymDetails };
        if (key !== "cheaper_plan") {
            newGymDetails[key] = event.currentTarget.value;
        } else {
            newGymDetails[key] = formatMoney(Number(event.currentTarget.value.replace(/\D/g, '')) / 100);
        };

        setGymDetails(newGymDetails);
    };

    const handleDeleteGym = async () => {
        try {
            await api.delete(`/gyms?gymId=${gymId}`);
            toast.success('Academia deletada com sucesso!');
            navigate('/');
            return;
        } catch {
            toast.error('Um erro ocorreu ao deletar esta Academia!');
        };
    };

    return (
        <>
            <Helmet>
                <title>{`Academia ${gymDetails?.name ?? 'Carregando...'} | Gym Dynamics`}</title>
            </Helmet>
            <Card position="relative" color="primary.500" w="60%" m="8vh auto" bg="secondary.500">
                {decodedToken?.email === gymDetails?.User?.email && (
                    <Flex>
                        <Icon position="absolute" as={!editMode ? BiPencil : BiCheckSquare} fontSize="2rem" cursor="pointer" color="primary.500" right={12} top={2} onClick={handleEditGym} />
                        <Icon position="absolute" as={BiTrash} fontSize="2rem" cursor="pointer" color="red" right={2} top={2} onClick={handleDeleteGym} />
                    </Flex>
                )}
                <Image src={gymDetails?.img_src} w="60%" m="24px auto" borderRadius="2rem" />
                {editMode && (
                    <PatternInput mb={4} id="img-src" name="img-src" value={gymDetails?.img_src} onChange={(event) => handleChangeGymDetails(event, 'img_src')} />
                )}
                <Center>
                    {!editMode ? (
                        <Heading>Academia {gymDetails?.name}</Heading>
                    ) : (
                        <PatternInput w="50%" m="0 auto" id="gym-name" name="gym-name" type="text" value={gymDetails?.name} onChange={(event) => handleChangeGymDetails(event, 'name')} />
                    )}
                </Center>
                <Divider mt={4} />
                {!editMode ? (
                    <Text p="1rem" fontSize="1.2rem" color="black">{gymDetails?.description}</Text>
                ) : (
                    <Textarea
                        id="description"
                        name="description"
                        variant="filled"
                        _focus={{ bg: "#EDF2F7" }}
                        focusBorderColor="primary.500"
                        size="lg"
                        value={gymDetails?.description}
                        onChange={(event) => handleChangeGymDetails(event, 'description')}
                    />
                )}
                <Flex p="1rem" fontSize="1.2rem" fontWeight="bolder" justify="space-between">
                    <Flex align="center" gap={2}>
                        <Icon as={BiMoney} />
                        {!editMode ? (
                            <>
                                {String(gymDetails?.cheaper_plan).replace(/\D/g, '') === '0' ? (
                                    <Text>Valor do plano não informado</Text>
                                ) : (
                                    <Text>Plano: R$ {String(gymDetails?.cheaper_plan).replace('R$ ', '')}/mês</Text>
                                )}
                            </>
                        ) : (
                            <PatternInput id="plan-value" name="plan-value" type="text" value={gymDetails?.cheaper_plan} onChange={(event) => handleChangeGymDetails(event, 'cheaper_plan')} />
                        )}
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Icon as={IoIosPin} />
                        {!editMode ? (
                            <Tooltip hasArrow label={(gymDetails?.address?.length ?? 0) > 60 && gymDetails?.address}>
                                <Text>Localização: {gymDetails?.address?.substring(0, 60)}{(gymDetails?.address?.length ?? 0) > 60 && '...'}</Text>
                            </Tooltip>
                        ) : (
                            <PatternInput id="address" name="address" type="text" value={gymDetails?.address} onChange={(event) => handleChangeGymDetails(event, 'address')} />
                        )}
                    </Flex>
                </Flex>
                <Divider mt={2} />
                <Flex flexDir="column" mb={4}>
                    <Heading m="1rem auto">Comentários</Heading>
                    <Text m="0 auto" color="black">Ainda não há comentários, seja o primeiro!</Text>
                </Flex>
            </Card>
        </>
    );
};