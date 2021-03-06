const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    async deleteItem(parent, args, ctx, info) {
        const where = { id: args.id };
        //find the item
        const item = await ctx.db.query.item({ where }, `{id, title}`)
        //check if they own that item or have permission
        //delete it
        return ctx.db.mutation.deleteItem({ where }, info);

    },

    async signup(parent, args, ctx, info) {
        //lowercase the email
        args.email = args.email.toLowerCase();
        //has user password
        const password = await bcrypt.hash(args.password, 10);

        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: { set: ["USER"] },
            },
        }, info)

        //create the jwt token for user
        const token = jwt.sign({ userID: user.id }, process.env.APP_SECRET);
        //set the jwt as a cookie on the response
        ctx.response.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        //return the user to the browser
        return user;
    },

};

module.exports = Mutations;
