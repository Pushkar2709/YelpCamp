import User, { Users } from '@/models/User'
import { PassportLocalModel } from 'mongoose'
import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials", 
            credentials: {
                username: {
                    label: "Username", 
                    type: "text", 
                    placeholder: "Your Username"
                }, 
                password: {
                    label: "Password", 
                    type: "password", 
                    placeholder: "Your Password"
                }
            }, 
            async authorize(credentials, req) {

                if (credentials) {
                    const res = await (User as PassportLocalModel<Users>).authenticate()(credentials?.username, credentials?.password);
                    if (res.user) {
                        return res.user;
                    }
                }
                return null;
            }
        })
    ]
}