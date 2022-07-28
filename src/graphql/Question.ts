import { objectType } from "nexus"
export const Question = objectType({
    name: "Question",
    definition(t) {
        t.nonNull.string("id");
        t.nonNull.string("question");
        t.nonNull.field("category", {
            type: "Category",
            resolve(parent, args, context, info) {
                return context.prisma.question.findUnique({
                    where: { id: parent.id }
                }).category();
            }
        });



    }
})