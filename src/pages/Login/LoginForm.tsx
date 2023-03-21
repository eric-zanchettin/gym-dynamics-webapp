import { useState } from "react";
import { Button, Flex, FormControl, FormLabel, Grid, Icon, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { MdArrowForward, MdEmail, MdLock } from 'react-icons/md';
import { Link } from "react-router-dom";
import { PatternInput } from "../../components/Patterns/PatternInput";

export function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCaptureEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleLogin();
        };
    };

    const handleLogin = async () => {
        if (email === '' || password === '') {
            toast.warn('Favor preencher todos os campos!');
            return;
        };

        setIsLoading(() => true);

        console.log(email, password);

        setIsLoading(() => false);
    };

    return (
        <Grid as="form" m="0 auto" w="55%" gap="2em">
            <FormControl>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <PatternInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite o E-mail usado para criar sua conta..."
                    icon={MdEmail}
                    onKeyDown={handleCaptureEnterKey}
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <PatternInput
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Informe sua senha..."
                    icon={MdLock}
                    onKeyDown={handleCaptureEnterKey}
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                />
            </FormControl>
            <Button
                colorScheme="primary"
                color="secondary.500"
                size="lg"
                isLoading={isLoading}
                onClick={handleLogin}
            >
                Entrar
            </Button>
            <Flex mt={2} align="center" gap={1} transition="0.2s" _hover={{ color: 'primary.500' }}>
                <Link to="/forgot-password" replace>
                    <Text>Esqueceu sua Senha?</Text>
                </Link>
                <Icon as={MdArrowForward} fontSize="1.2rem" />
            </Flex>
        </Grid>
    );
}