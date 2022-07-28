import { nonNull, extendType, stringArg } from "nexus"


export const QuestionMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createQuestion", {
            type: "Question",
            args: {
                question: nonNull(stringArg()),
                category: nonNull(stringArg())

            },
            resolve: async (parent, { question, category }, context, info) => {
                const userId = context.userId;
                if (!userId) {
                    throw new Error("Not Authorized");
                }
                const categoryFound = await context.prisma.category.findUnique({
                    where: { id: category }
                })
                if (!categoryFound) throw new Error("Category not Found");
                return context.prisma.question.create({
                    data: {
                        question,
                        category: {
                            connect: {
                                id: category
                            }
                        }
                    }
                })
            }

        });
        t.nonNull.field("updateQuestion", {
            type: "Question",
            args: {
                question: nonNull(stringArg()),
                id: nonNull(stringArg()),
                category: nonNull(stringArg())
            },
            resolve: async (parent, args, context, info) => {
                const { question, id, category } = args;
                const userId = context.userId;
                const questionFound = await context.prisma.question.findUnique({
                    where: { id }
                })
                if (!questionFound) throw new Error("no Question found")
                if (!userId) {
                    throw new Error("Not Authorized");
                }
                const updatequestion = await context.prisma.question.update({
                    data: {
                        question,
                        category: {
                            connect: {
                                id: category
                            }
                        }
                    }
                })
                return {
                    updatequestion
                }
            }

        }),

            t.nonNull.field("deleteQuestion", {
                type: "Question",
                args: {
                    id: nonNull(stringArg()),
                },
                async resolve(parent, args, context, info) {
                    const { id } = args;

                    const userId = context.userId;
                    if (!userId) {
                        throw new Error("Not Authorized");
                    }
                    const questionFound = await context.prisma.question.findUnique({
                        where: { id }
                    })
                    if (!questionFound) { throw new Error("Question not found") }
                    const deletedQuestion = await context.prisma.question.delete({
                        where: { id },
                    })
                    return deletedQuestion;
                }

            })
    }
})
