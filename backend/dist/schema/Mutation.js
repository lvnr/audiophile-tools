"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.Mutation = nexus_1.mutationType({
    definition(t) {
        t.crud.createOneUser({ alias: 'signupUser' });
        t.crud.createOneHeadphone();
        t.crud.deleteOneHeadphone();
        t.crud.updateOneHeadphone();
        t.crud.createOneCompany();
        t.crud.updateOneCompany();
        t.crud.deleteOneCompany();
        t.crud.createOneHeadphoneReview();
        t.crud.updateOneHeadphoneReview();
        t.crud.deleteOneHeadphoneReview();
        t.crud.deleteManyHeadphoneReview();
        // t.field('createHeadphone', {
        //   type: 'Headphone',
        //   args: {
        //     model: stringArg({ nullable: false }),
        //     companyName: stringArg({ nullable: false }),
        //   },
        //   resolve: (_, { model, companyName }, ctx) => {
        //     return ctx.photon.headphones.create({
        //       data: {
        //         model,
        //         company: {
        //           connect: { name: companyName },
        //         },
        //       },
        //     })
        //   },
        // })
        // t.field('createHeadphoneReview', {
        //   type: 'HeadphoneReview',
        //   args: {
        //     reviewer: stringArg({ nullable: false }),
        //     headphoneModel: stringArg({ nullable: false }),
        //   },
        //   resolve: (_, { reviewer, headphoneModel }, ctx) => {
        //     return ctx.photon.headphones.create({
        //       data: {
        //         reviewer,
        //         headphone: {
        //           connect: { model: headphoneModel },
        //         },
        //       },
        //     })
        //   },
        // })
        // t.field('publish', {
        //   type: 'Post',
        //   nullable: true,
        //   args: {
        //     id: idArg(),
        //   },
        //   resolve: (_, { id }, ctx) => {
        //     return ctx.photon.posts.update({
        //       where: { id },
        //       data: { published: true },
        //     })
        //   },
        // })
    },
});
