import { useState } from "react";
import { Button, FormControl, FormLabel, Grid, } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import { PatternInput } from "../../components/Patterns/PatternInput";

export function RegisterForm() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCaptureEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleRegister();
        };
    };

    const handleRegister = async () => {
        if (name === '' || email === '' || password === '') {
            toast.warn('Favor preencher todos os campos!');
            return;
        };

        setIsLoading(() => true);

        console.log(name, email, password);

        setIsLoading(() => false);
    };

    return (
        <Grid as="form" m="0 auto" w="55%" gap="2em">
            <FormControl>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <PatternInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Digite seu nome completo..."
                    icon={MdPerson}
                    onKeyDown={handleCaptureEnterKey}
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <PatternInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite o seu melhor E-mail..."
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
                onClick={handleRegister}
            >
                Criar conta
            </Button>
        </Grid>
    );
}