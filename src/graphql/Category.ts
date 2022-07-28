import { objectType } from "nexus"

export const Category = objectType({
    name: "Category",
    definition(t) {
        t.nonNull.string("id")
        t.nonNull.string("categoryName")
        t.nonNull.string("categoryDescription")
        t.nonNull.field("user", {
            type: "User",
            resolve(parent, args, context, info) {
                return context.prisma.category.findUnique({
                    where: { id: parent.id }
                })
                .createdBy();
            }
        })
    }
})