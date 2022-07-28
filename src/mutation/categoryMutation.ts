import { nonNull, extendType, stringArg } from "nexus";
export const CategoryMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createCategory", {
            type: "Category",
            args: {
                categoryName: nonNull(stringArg()),
                categoryDescription: nonNull(stringArg()),
            },
            async resolve(parent, args, context, info) {
                const { categoryName, categoryDescription } = args;
                const userId = context.userId;
                if (!userId) {
                    throw new Error("Not Authorized");
                }
                const newCategory = await context.prisma.category.create({
                    data: {
                        categoryName,
                        categoryDescription,
                        createdBy: { connect: { id: userId } }
                    },
                })
                return newCategory;
            }

        })
        t.field("updateCategory", {
            type: "Category",
            args: {
                id: nonNull(stringArg()),
                categoryName: nonNull(stringArg()),
                categoryDescription: nonNull(stringArg()),
            },
            resolve: async (parent, args, context, info) => {
                const { categoryName, categoryDescription, id } = args;
                const userId = context.userId;

                if (!userId) {
                    throw new Error("Not Authorized");
                }
                const updatedFound = await context.prisma.category.findUnique({
                    where: { id }
                })
                if (!updatedFound) {
                    throw new Error("Category not found")
                }
                const updatedCategory = await context.prisma.category.update({
                    where: { id },
                    data: {
                        categoryName,
                        categoryDescription,
                        createdBy: { connect: { id: userId } }
                    }
                })
                return updatedCategory;
            }
        })
        t.field("deleteCategory", {
            type: "Category",
            args: {
                id: nonNull(stringArg()),
            },
            async resolve(parent, args, context, info) {
                const { id } = args;

                const userId = context.userId;
                if (!userId) {
                    throw new Error("Not Authorized");
                }
                if (context?.role !== "admin") {
                    throw new Error("Not Authorized")
                }
                const categoryFound = await context.prisma.category.findUnique({
                    where: { id }
                })
                if (!categoryFound) { throw new Error("Category not found") }
                const deletedCategory = await context.prisma.category.delete({
                    where: { id },
                })
                return deletedCategory;
            }
        })
    }
})