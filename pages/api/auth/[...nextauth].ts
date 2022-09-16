import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

const clientId = process.env.GITHUB_ID || ''
const clientSecret = process.env.GITHUB_SECRET || ''
const secret = process.env.JWT_SECRET || ''

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({ clientId, clientSecret })
	],
	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token
			}
			return token
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken
			return session
		}
	},
	pages: {
		signIn: '/auth/signin',
		error: '/auth/signin'
	},
	secret
}

export default NextAuth(authOptions)