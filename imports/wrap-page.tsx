import { ApolloProvider } from "@apollo/react-hooks";
import { initApollo } from "./apollo";
import { getDataFromTree } from "@apollo/react-ssr";

export const wrapPage = (
  Component: () => any,
) => {
  const Container = ({ apolloClient }) => {
    console.log('Container');
    return <ApolloProvider client={apolloClient}>
      <Component/>
    </ApolloProvider>;
  };
  
  const Page = ({ apolloState }) => {
    console.log('Page');
    const apolloClient = initApollo(apolloState);
    const container = <Container apolloClient={apolloClient}/>;
    apolloClient.stop();
    return container;
  };
  
  Page.getInitialProps = async () => {
    console.log('Page.getInitialProps');
    const apolloClient = initApollo({});
    await getDataFromTree(<Container apolloClient={apolloClient}/>);
    const apolloState = apolloClient.extract();
    apolloClient.stop();
    return { apolloState };
  }
  
  return Page;
};
