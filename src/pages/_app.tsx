import { ChakraProvider } from "@chakra-ui/react";
import ReactQueryProvider from "../providers/ReactQueryProvider";

import theme from "../theme";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ReactQueryProvider>
  );
}

export default MyApp;
