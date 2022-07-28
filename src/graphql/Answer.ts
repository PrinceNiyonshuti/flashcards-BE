import { objectType } from "nexus"
export const Answer = objectType({
    name: "Answer",
    definition(t) {
        t.string("id");
        t.string("answer");
        t.nonNull.field("question", {
            type: "Question",
            resolve(parent, args, context, info) {
                return context.prisma.answer.findUnique({
                    where: { id: parent.id }
                }).questionBy();
            }
        })
    }

})