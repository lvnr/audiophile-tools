"use strict";
exports.__esModule = true;
var nexus_1 = require("nexus");
exports.Query = nexus_1.queryType({
    definition: function (t) {
        t.crud.headphone({ alias: 'headphone' });
        t.crud.headphoneReview();
        t.list.field('headphones', {
            type: 'Headphone',
            resolve: function (_parent, _args, ctx) {
                return ctx.photon.headphones.findMany();
            }
        });
        t.list.field('filterHeadphones', {
            type: 'Headphone',
            args: {
                searchString: nexus_1.stringArg({ nullable: true })
            },
            resolve: function (_, _a, ctx) {
                var searchString = _a.searchString;
                return ctx.photon.headphones.findMany({
                    where: {
                        OR: [
                            { model: { contains: searchString } },
                        ]
                    }
                });
            }
        });
    }
});
