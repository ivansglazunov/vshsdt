import { ApolloProvider } from "@apollo/react-hooks";
import { initApollo } from "./apollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { PassportProvider } from './packages/passports/react';
import Cookie from 'js-cookie';
import { Provider } from "./packages/analitics";
import analiticsConfig from './analitics.config';

export const wrapPage = (
  Component: () => any,
) => {
  const Container = ({ apolloClient, token }) => {
    return <ApolloProvider client={apolloClient}>
      <PassportProvider defaultToken={token}>
        <Provider
          {...analiticsConfig}
        >
          <Component/>
        </Provider>
      </PassportProvider>
    </ApolloProvider>;
  };
  
  const Page = ({ apolloState, token }) => {
    const apolloClient = initApollo(apolloState, token);
    const container = <Container apolloClient={apolloClient} token={token}/>;
    apolloClient.stop();
    return container;
  };
  
  Page.getInitialProps = async ({ req }) => {
    const token = req && req.cookies ? req.cookies.token : undefined;
    const apolloClient = initApollo({}, token);
    await getDataFromTree(<Container apolloClient={apolloClient} token={token}/>);
    const apolloState = apolloClient.extract();
    apolloClient.stop();
    return { apolloState, token };
  }
  
  return Page;
};
