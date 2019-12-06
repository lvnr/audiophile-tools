"use strict";
exports.__esModule = true;
var Nexus = require("nexus");
var nexus_prisma_1 = require("nexus-prisma");
var Query = require("./Query");
var Mutation = require("./Mutation");
var User = require("./User");
var Headphone = require("./Headphone");
var Company = require("./Company");
var HeadphoneReview = require("./HeadphoneReview");
var path = require("path");
var photon_1 = require("@prisma/photon");
exports["default"] = Nexus.makeSchema({
    types: [
        Query,
        Mutation,
        Headphone,
        User,
        Company,
        HeadphoneReview,
        photon_1.HeadphoneDriverType,
        photon_1.HeadphoneEnclosure,
        photon_1.HeadphoneDriverMaterial,
        photon_1.HeadphoneCableTerm,
        photon_1.HeadphoneEarpadMaterial,
        photon_1.HeadphoneCategory,
    ],
    plugins: [nexus_prisma_1.nexusPrismaPlugin()],
    outputs: {
        typegen: path.join(__dirname, '../../node_modules/@types/nexus-typegen/index.d.ts')
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/photon',
                alias: 'photon'
            },
            {
                source: require.resolve('../context'),
                alias: 'Context'
            },
        ]
    }
});
