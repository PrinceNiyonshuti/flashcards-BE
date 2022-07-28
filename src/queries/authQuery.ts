import { extendType } from "nexus"
export const AuthQuery = extendType({
    type: "Query",
    definition(m) {
        m.nonNull.list.nonNull.field("allUsers", {
            type: "User",
            resolve: async (parent, args, context, info) => {
                const userId = context.userId;

                if (!userId) {
                    throw new Error("Not Authorized");
                }
                if (context.role !== "admin") {
                    throw new Error("you don't have permission to access this");
                }
                return context.prisma.user.findMany({})
            }
        })
    }
})