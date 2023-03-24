import {
  ChakraProvider,
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { TopBar } from "./components/TopBar"
import Router from "./routes"
import theme from "./styles/extendedTheme"

export function App() {
  const [cookies] = useCookies(['loginToken']);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (cookies.loginToken) {
      setLoggedIn(() => true);
    } else {
      setLoggedIn(() => false);
    };
  }, [cookies]);

  return (
    <ChakraProvider theme={theme}>
      {loggedIn && (<TopBar />)}
      <Router />
    </ChakraProvider>
  );
};