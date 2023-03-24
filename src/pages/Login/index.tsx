import { Center, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { LoginCard } from "../../components/LoginCard";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function Login() {
    return (
        <>
            <Helmet>
                <title>Login | Gym Dynamics</title>
            </Helmet>
            <LoginCard title="Olá, seja bem-vindo!" subtitle="Faça Login ou crie uma conta para continuar.">
                <Tabs colorScheme="primary" variant="soft-rounded">
                    <Center mt={8}>
                        <TabList mb="0 !important">
                            <Tab id='login'>Login</Tab>
                            <Tab id='resgister'>Registre-se</Tab>
                        </TabList>
                    </Center>

                    <TabPanels>
                        <TabPanel>
                            <LoginForm />
                        </TabPanel>
                        <TabPanel>
                            <RegisterForm />
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </LoginCard>
        </>
    );
};