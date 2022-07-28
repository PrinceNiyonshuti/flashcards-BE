import { extendType } from "nexus"
export const CategoryQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("allCategories", {
            type: "Category",
            resolve(parent, args, context, info) {
                return context.prisma.category.findMany({})
            }
        })
    }
})