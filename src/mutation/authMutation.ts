import { APP_SECRET } from "../utils/auth";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { nonNull, extendType, stringArg } from "nexus";
export const AuthMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("login", {
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(parent, args, context, info) {
                const user = await context.prisma.user.findUnique({
                    where: { email: args.email },
                });
                if (!user) {
                    throw new Error("No user Found");
                }
                const valid = await bcrypt.compare(args.password, user.password);
                if (!valid) {
                    throw new Error("Invalid Password");
                }
                const token = jwt.sign({ userId: user.id, role: user.role }, APP_SECRET);
                return { token, user };
            },
        });
        t.field("signup", {
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                firstName: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                userName: nonNull(stringArg()),
                role: nonNull(stringArg()),
            },
            async resolve(parent, args, context, info) {
                const { email, password, firstName, lastName, userName } = args;
                const passwordHash = await bcrypt.hash(password, 10);
                const currentUser = await context.prisma.user.findUnique({ where: { email: email } })
                if (currentUser?.userName) throw new Error("UserName already exists");
                if (currentUser?.email) throw new Error("Email already exists");
                const user = await context.prisma.user.create({
                    data: {
                        email,
                        password: passwordHash,
                        firstName,
                        lastName,
                        userName,
                        role: args.role,
                    }
                })

                const token = jwt.sign({ userId: user.id, role: user.role }, APP_SECRET);
                return { token, user };
            }
        })
    },
});


