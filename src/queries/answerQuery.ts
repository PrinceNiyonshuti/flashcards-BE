import { extendType, intArg, nonNull, stringArg, } from "nexus"
export const AnswerQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("allAnswer", {
            type: "Answer",
            args: {
                skip: intArg({ default: 0 }),
                take: intArg({ default: 10 })
            },
            resolve(parent, args, context, info) {
                return context.prisma.answer.findMany({

                    skip: args?.skip as number | undefined,
                    take: args?.take as number | undefined
                })
            }
        }),
            t.nonNull.list.nonNull.field("AllAnswerByQuestion", {
                type: "Answer",
                args: {
                    questionId: nonNull(stringArg()),
                    skip: intArg({ default: 0 }),
                    take: intArg({ default: 10 })
                },
                async resolve(parent, args, context, info) {

                    const answesss = await context.prisma.answer.findMany({
                        where: {
                            questionBy: {
                                id: args?.questionId
                            }
                        },
                    })
                    return answesss;
                }
            })
    }
})