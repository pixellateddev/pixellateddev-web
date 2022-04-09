import { useSession } from 'next-auth/react';
import { FC } from 'react';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
    uri: 'http://localhost:4001',
});


const ApolloProviderAuth: FC = ({ children }) => {
    const {data: session} = useSession()
    if (!session) {
        const client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache()
        })
        return (
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        )
    }
    const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: session.accessToken ? `Bearer ${session.accessToken}` : "",
          }
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    })

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )

}

export default ApolloProviderAuth