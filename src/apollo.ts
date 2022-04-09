import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
    uri: 'http://localhost:4001',
});

// export const setAuthHeader = (token: string) => {
//     console.log('setting Header')
//     const authLink = setContext((_, { headers }) => {
//         return {
//           headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : "",
//           }
//         }
//     });
//     client.setLink(authLink.concat(httpLink))
// }

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})


export default client