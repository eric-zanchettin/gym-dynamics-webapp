import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { Card, Text, Image, Divider, Heading, Center, Flex, Icon, Textarea, Tooltip, Avatar, Box, Button } from "@chakra-ui/react";
import { DecodedUserData } from "../../types";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { IoIosPin } from 'react-icons/io';
import { BiCheckSquare, BiMoney, BiPencil, BiTrash } from 'react-icons/bi';
import { PatternInput } from "../../components/Patterns/PatternInput";
import { formatMoney } from "../../utils/formatter";
import { BsStar, BsStarFill } from "react-icons/bs";
interface GymDetailsData {
    name?: string;
    img_src?: string;
    description?: string;
    address?: string;
    cheaper_plan?: number | string;
    User?: {
        email?: string;
    };
    gymComments: [{
        User: {
            email: string;
            name: string;
        };
        stars: number;
        comment: string;
    }],
};

export function GymDetails() {
    const [cookies] = useCookies(['loginToken']);
    const { decodedToken } = useJwt<DecodedUserData>(cookies.loginToken);

    let { gymId } = useParams();
    const navigate = useNavigate();

    const [gymDetails, setGymDetails] = useState<GymDetailsData>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [evalStars, setEvalStars] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchGymDetails = () => {
        if (api.defaults.headers.common['Authorization'] && decodedToken) {
            api.get<GymDetailsData>(`/gyms/${gymId}`)
                .then(response => {
                    if (response.status === 204) throw new Error();

                    setGymDetails(response.data);
                    const alreadyEvaluated = response.data.gymComments.find(gymComment => gymComment.User.email === decodedToken?.email);
                    if (alreadyEvaluated) setIsEvaluated(() => true);
                })
                .catch(() => {
                    toast.error('A academia não existe!');
                    navigate('/', { replace: false })
                    return;
                });
        };
    };

    useEffect(() => {
        fetchGymDetails();
        // eslint-disable-next-line
    }, [navigate, gymId, decodedToken]);

    const handleEditGym = async () => {
        if (!editMode) {
            if (gymDetails) {
                if (Number.isNaN(Number(gymDetails.cheaper_plan))) {
                    gymDetails.cheaper_plan = formatMoney(Number(String(gymDetails?.cheaper_plan).replace(/\D/g, '')) / 100);
                } else {
                    gymDetails.cheaper_plan = formatMoney(Number(gymDetails?.cheaper_plan));
                };
            };

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
        const newGymDetails = { ...gymDetails } as GymDetailsData;
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

    const handleSubmitEvaluation = async () => {
        if (evalStars <= 0) {
            toast.warn('Preencha a avaliação para enviar!');
            return;
        };

        try {
            setIsLoading(() => true);

            const data = {
                email: decodedToken?.email,
                gymId,
                stars: evalStars,
                comment,
            };

            await api.post('/evaluate', data);

            fetchGymDetails();
            toast.success('Avaliação publicada com sucesso!');
        } catch {
            toast.error('Um erro ocorreu ao publicar sua avaliação!');
        } finally {
            setIsLoading(() => false);
        };
    };

    const averageEvaluation = Number(gymDetails?.gymComments.reduce((acc, gymComment) => {
        return acc + gymComment.stars;
    }, 0)) / Number(gymDetails?.gymComments?.length)

    return (
        <>
            <Helmet>
                <title>{`Academia ${gymDetails?.name ?? 'Carregando...'} | Gym Dynamics`}</title>
            </Helmet>
            <Card position="relative" color="primary.500" w="60%" m="8vh auto" bg="secondary.500">
                {(decodedToken?.email === gymDetails?.User?.email) && (
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
                <Box mt={2} w="100%" h={6} bg="primary.600" />
                <Flex flexDir="column" mb={4}>
                    <Heading m="1rem auto 0 auto">Comentários/Avaliações</Heading>
                    <Text textAlign="center" fontSize="1.3rem" fontWeight="bolder">
                        Média de Avaliações: <Box as="span" color={averageEvaluation < 3 || Number.isNaN(averageEvaluation) ? 'red' : 'green'}>{Number.isNaN(averageEvaluation) ? '-' : averageEvaluation}</Box>
                    </Text>
                    {!isEvaluated && (
                        <Box p={4}>
                            <Text mb={2} fontWeight="bolder">Já visitou? O que achou dessa academia? Compartilhe conosco!</Text>
                            <Textarea
                                id="comment"
                                name="comment"
                                placeholder="Deixe um comentário... (Opcional)"
                                bg="white"
                                p={4}
                                maxLength={500}
                                value={comment}
                                onChange={(event) => setComment(event.currentTarget.value)}
                            />
                            <Flex justify="space-between" mt={4}>
                                <Box as="span" fontWeight="bolder">
                                    <Text>
                                        Avaliação:
                                    </Text>
                                    <Flex>
                                        {[1, 2, 3, 4, 5].map(star => {
                                            return (
                                                <Icon
                                                    fontSize="1rem"
                                                    key={star}
                                                    as={star > evalStars ? BsStar : BsStarFill}
                                                    cursor="pointer"
                                                    onClick={() => setEvalStars(star)}
                                                />
                                            );
                                        })}
                                    </Flex>
                                </Box>
                                <Button bg="primary.500" color="secondary.500" isLoading={isLoading} onClick={handleSubmitEvaluation}>Enviar</Button>
                            </Flex>
                        </Box>
                    )}
                    {gymDetails && gymDetails.gymComments.length <= 0 ? (
                        <Text m="0 auto" color="black">Ainda não há comentários, seja o primeiro!</Text>
                    ) : (
                        <>
                            {gymDetails?.gymComments.map(gymComment =>
                                <Box key={gymComment.User.email} bg="none" p={4}>
                                    <Flex alignItems="center" gap={2}>
                                        <Avatar name={gymComment.User.name} />
                                        <Flex flexDir="column" justify="center">
                                            <Heading fontSize="1.5rem">{gymComment.User.name}</Heading>
                                            <Flex align="center">
                                                {[1, 2, 3, 4, 5].map(star => {
                                                    return (
                                                        <Fragment key={star}>
                                                            {star <= gymComment.stars ? <BsStarFill /> : <BsStar />}
                                                        </Fragment>
                                                    );
                                                })}
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Text mt={2}>{gymComment.comment}</Text>
                                </Box>
                            )}
                        </>
                    )}
                </Flex>
            </Card>
        </>
    );
};