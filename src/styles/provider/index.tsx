import { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';

import theme from 'src/styles/theme';

export const withChakraProvider = (AppComponent: React.FC<AppProps>) => {
  return function WrappedComponent(props: AppProps) {
    return (
      <ChakraProvider resetCSS theme={theme}>
        <AppComponent {...props} />
      </ChakraProvider>
    );
  };
};
