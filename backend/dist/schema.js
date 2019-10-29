"use strict";
exports.__esModule = true;
var nexus_prisma_1 = require("nexus-prisma");
var nexus_1 = require("nexus");
var User = nexus_1.objectType({
    name: 'User',
    definition: function (t) {
        t.model.id();
        t.model.name();
        t.model.email();
        t.model.posts({
            pagination: false
        });
    }
});
var Post = nexus_1.objectType({
    name: 'Post',
    definition: function (t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.title();
        t.model.content();
        t.model.published();
        t.model.author();
    }
});
var Query = nexus_1.objectType({
    name: 'Query',
    definition: function (t) {
        t.crud.post({
            alias: 'post'
        });
        t.list.field('feed', {
            type: 'Post',
            resolve: function (_parent, _args, ctx) {
                return ctx.photon.posts.findMany({
                    where: { published: true }
                });
            }
        });
        t.list.field('filterPosts', {
            type: 'Post',
            args: {
                searchString: nexus_1.stringArg({ nullable: true })
            },
            resolve: function (_, _a, ctx) {
                var searchString = _a.searchString;
                return ctx.photon.posts.findMany({
                    where: {
                        OR: [
                            { title: { contains: searchString } },
                            { content: { contains: searchString } },
                        ]
                    }
                });
            }
        });
    }
});
var Mutation = nexus_1.objectType({
    name: 'Mutation',
    definition: function (t) {
        t.crud.createOneUser({ alias: 'signupUser' });
        t.crud.deleteOnePost();
        t.field('createDraft', {
            type: 'Post',
            args: {
                title: nexus_1.stringArg({ nullable: false }),
                content: nexus_1.stringArg(),
                authorEmail: nexus_1.stringArg()
            },
            resolve: function (_, _a, ctx) {
                var title = _a.title, content = _a.content, authorEmail = _a.authorEmail;
                return ctx.photon.posts.create({
                    data: {
                        title: title,
                        content: content,
                        published: false,
                        author: {
                            connect: { email: authorEmail }
                        }
                    }
                });
            }
        });
        t.field('publish', {
            type: 'Post',
            nullable: true,
            args: {
                id: nexus_1.idArg()
            },
            resolve: function (_, _a, ctx) {
                var id = _a.id;
                return ctx.photon.posts.update({
                    where: { id: id },
                    data: { published: true }
                });
            }
        });
    }
});
exports.schema = nexus_1.makeSchema({
    types: [Query, Mutation, Post, User],
    plugins: [nexus_prisma_1.nexusPrismaPlugin()],
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@generated/photon',
                alias: 'photon'
            },
            {
                source: require.resolve('./context'),
                alias: 'Context'
            },
        ]
    }
});
