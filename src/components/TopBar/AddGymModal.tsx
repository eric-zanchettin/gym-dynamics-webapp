import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Icon,
    FormControl,
    FormLabel,
    VStack,
    Textarea,
} from '@chakra-ui/react'
import { useState } from 'react';
import { useCookies } from 'react-cookie'
import { MdAddCircle } from 'react-icons/md'
import { useJwt } from 'react-jwt';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { DecodedUserData } from '../../types';
import { PatternInput } from '../Patterns/PatternInput'

export function AddGymModal() {
    const [cookies] = useCookies(['loginToken']);
    const { decodedToken } = useJwt<DecodedUserData>(cookies.loginToken);

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [gymName, setGymName] = useState<string>('');
    const [imgSrc, setImgSrc] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [planValue, setPlanValue] = useState<string>('R$ 0,00');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClose = () => {
        setGymName('');
        setImgSrc('');
        setDescription('');
        setAddress('');
        setPlanValue('R$ 0,00');
        onClose();
    };

    const handleCreateGym = async () => {
        if (gymName === '' || imgSrc === '' || description === '' || address === '') {
            toast.warn('Preencha todos os campos!');
            return;
        };

        setIsLoading(() => true);

        try {
            const data = {
                name: gymName,
                imgSrc,
                description,
                address,
                planValue: (Number(planValue.replace(/\D/g, '')) / 100),
                userEmail: decodedToken?.email,
            };

            const gym = await api.post('/gyms', data);
            toast.success(`Academia "${gymName}" criada com sucesso!`);
            handleClose();
            navigate(`/gym/${gym.data}`, { replace: false });
        } catch {
            toast.error('Um erro ocorreu ao criar a Academia!');
        } finally {
            setIsLoading(() => false);
        };
    };

    const handleChangePlanValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.currentTarget.value.replace(/\D/g, ''));
        const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);

        setPlanValue(formattedValue);
    };

    return (
        <>
            <Button
                id="submit"
                colorScheme="primary"
                color="secondary.500"
                size="lg"
                onClick={onOpen}
                leftIcon={<Icon fontSize="1.5rem" as={MdAddCircle} />}
            >
                Adicionar
            </Button>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar Academia</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack gap={2}>
                            <FormControl>
                                <FormLabel htmlFor="gym-name">Nome da Academia</FormLabel>
                                <PatternInput id="gym-name" name="gym-name" type="text" value={gymName} onChange={(event) => setGymName(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="img-src">URL da Imagem</FormLabel>
                                <PatternInput id="img-src" name="img-src" type="text" value={imgSrc} onChange={(event) => setImgSrc(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="description">Descrição da Academia</FormLabel>
                                <Textarea
                                    id="description"
                                    name="description"
                                    variant="filled"
                                    _focus={{ bg: "#EDF2F7" }}
                                    focusBorderColor="primary.500"
                                    size="lg"
                                    value={description}
                                    onChange={(event) => setDescription(event.currentTarget.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="address">Endereço</FormLabel>
                                <PatternInput id="address" name="address" type="text" value={address} onChange={(event) => setAddress(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="plan-value">Valor do plano mais Barato</FormLabel>
                                <PatternInput id="plan-value" name="plan-value" type="text" value={planValue} onChange={handleChangePlanValue} />
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button isDisabled={isLoading} variant="ghost" mr={3} onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button isLoading={isLoading} colorScheme="primary" color="secondary.500" onClick={handleCreateGym}>
                            Criar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}