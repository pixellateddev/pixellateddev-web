import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import client from '../../../apollo';
import { LOGIN } from '../../../graphql/auth';

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials: any) {
                const {data: {login}} = await client.mutate({mutation: LOGIN, variables: credentials})
                const {token, tokenType, user} = login
                return {
                    ...user,
                    token
                }          
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user}) => {
            if (user) {
                token.accessToken = user.token
            }
            return token
        },

        session: async ({ session, token, user }) => {
            if (token) {
                session.accessToken = token.accessToken
            }
            return session
        }
    }
})