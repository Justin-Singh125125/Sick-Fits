const Mutations = {
    async createItem(parent, args, ctx, info) {
        const item = await ctx.db.mutation.createItem({
            data: {
                ...args
            }
        }, info);

        return item;
    },

    updateItem(parent, args, ctx, info) {
        //first take a copy of the updates
        const updates = { ...args };
        //remove the id from the updates
        delete updates.id;
        //run the update method, this is found in generated prisma 
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info);
    },

};

module.exports = Mutations;
