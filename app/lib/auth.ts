import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import { stripe } from "./stripe";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

// Define a Session type
type Session = {
  user: User;
};

// Define a Token type
type Token = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  // events: {
  //   createUser: async ({ user }) => {
  //     // Create a stripe customer for the user with their email address
  //     await stripe.customers
  //       .create({
  //         email: user.email!,
  //       })
  //       .then(async (customer) => {
  //         // Use the Prisma Client to update the user in the database with their new Stripe customer ID

  //         console.log(customer);

  //         // return prisma.user.update({
  //         //   where: { id: user.id },
  //         //   data: {
  //         //     stripeCustomerId: customer.id,
  //         //   },
  //         // });
  //       });
  //   },
  // },
};
