import {
  ChakraProvider,
} from "@chakra-ui/react"
import Router from "./routes"
import theme from "./styles/extendedTheme"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>
)
