import { extendType } from "nexus"
export const QuestionQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("allQuestion", {
            type: "Question",
            resolve(parent, args, context, info) {
                return context.prisma.question.findMany({})
            }
        })
    }
})