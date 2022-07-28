import { nonNull, extendType, stringArg } from "nexus"

export const answerMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createAnswer", {
            type: "Answer",
            args: {
                answer: nonNull(stringArg()),
                question: nonNull(stringArg()),
            },
            async resolve(parent, args, context, info) {
                const { answer, question } = args;
                const creatingAnswer = await context.prisma.answer.create({
                    data: {
                        answer,
                        questionBy: {
                            connect: { id: question }
                        }

                    }
                })

                return creatingAnswer
            }

        })
        t.nonNull.field("updateAnswer", {
            type: "Answer",
            args: {
                answer: nonNull(stringArg()),
                id: nonNull(stringArg()),
            },
            resolve: async (parent, args, context, info) => {
                const { answer, id } = args;
                const userId = context.userId;
                if (!userId) {
                    throw new Error("Not Authorized");
                }
                const answerFound = await context.prisma.answer.findUnique({
                    where: { id }
                })
                if (!answerFound) throw new Error("Answer not Found");
                const updateAnswer = await context.prisma.answer.update({
                    where: { id },
                    data: {
                        answer,
                        createdBy: { connect: { id: userId } }
                    }
                })
                return updateAnswer;
            }
        }),
            t.nonNull.field("deleteAnswer", {
                type: "Answer",
                args: {
                    id: nonNull(stringArg()),
                },
                resolve: async (parent, args, context, info) => {
                    const { id } = args;
                    const userId = context.userId;
                    if (!userId) {
                        throw new Error("Not Authorized");
                    }
                    const answerFound = await context.prisma.answer.findUnique({
                        where: { id }
                    })
                    if (!answerFound) throw new Error("Answer not Found");
                    const deleteAnswer = await context.prisma.answer.delete({
                        where: { id }
                    })
                    return deleteAnswer;
                }
            })
    }
})