import { useState } from "react";
import { Button, Flex, FormControl, FormLabel, Grid, Icon, Text } from "@chakra-ui/react";
import { MdArrowBack, MdEmail, } from "react-icons/md";
import { LoginCard } from "../../components/LoginCard";
import { Link } from "react-router-dom";
import { PatternInput } from "../../components/Patterns/PatternInput";
import { Helmet } from "react-helmet";

export function ForgotPassword() {
    const [email, setEmail] = useState<string>('');
    const [confirmEmail, setConfirmEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCaptureEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleResetPassword();
        };
    };

    const handleResetPassword = () => {
        setIsLoading(() => true);

        setIsLoading(() => false);
    };

    return (
        <>
            <Helmet>
                <title>Esqueci a Senha | Gym Dynamics</title>
            </Helmet>
            <LoginCard title="Esqueceu sua senha?" subtitle="Sem problemas, preencha os dados que vamos lhe ajudar.">
                <Grid as="form" m="2em auto" w="55%" gap="2em">
                    <FormControl>
                        <FormLabel htmlFor="email">E-mail</FormLabel>
                        <PatternInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Digite seu E-mail..."
                            icon={MdEmail}
                            onKeyDown={handleCaptureEnterKey}
                            value={email}
                            onChange={(event) => setEmail(event.currentTarget.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="confirm-email">Confirme seu E-mail</FormLabel>
                        <PatternInput
                            id="confirm-email"
                            name="confirm-email"
                            type="password"
                            placeholder="Confirme o E-mail digitado..."
                            icon={MdEmail}
                            onKeyDown={handleCaptureEnterKey}
                            value={confirmEmail}
                            onChange={(event) => setConfirmEmail(event.currentTarget.value)}
                        />
                    </FormControl>
                    <Button
                        colorScheme="primary"
                        color="secondary.500"
                        size="lg"
                        isLoading={isLoading}
                        onClick={handleResetPassword}
                    >
                        Recuperar Senha
                    </Button>
                    <Flex mt={2} align="center" gap={1} transition="0.2s" _hover={{ color: 'primary.500' }}>
                        <Icon as={MdArrowBack} fontSize="1.2rem" />
                        <Link to="/login" replace>
                            <Text>Voltar para Login</Text>
                        </Link>
                    </Flex>
                </Grid>
            </LoginCard>
        </>
    );
};