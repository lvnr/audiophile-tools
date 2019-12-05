"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.Query = nexus_1.queryType({
    definition(t) {
        t.crud.headphone({ alias: 'headphone' });
        t.crud.headphoneReview();
        t.list.field('headphones', {
            type: 'Headphone',
            resolve: (_parent, _args, ctx) => {
                return ctx.photon.headphones.findMany();
            },
        });
        t.list.field('filterHeadphones', {
            type: 'Headphone',
            args: {
                searchString: nexus_1.stringArg({ nullable: true }),
            },
            resolve: (_, { searchString }, ctx) => {
                return ctx.photon.headphones.findMany({
                    where: {
                        OR: [
                            { model: { contains: searchString } },
                        ],
                    },
                });
            },
        });
    },
});
