"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nexus = require("nexus");
const nexus_prisma_1 = require("nexus-prisma");
const Query = require("./Query");
const Mutation = require("./Mutation");
const User = require("./User");
const Headphone = require("./Headphone");
const Company = require("./Company");
const HeadphoneReview = require("./HeadphoneReview");
const path = require("path");
const photon_1 = require("@prisma/photon");
exports.default = Nexus.makeSchema({
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
        typegen: path.join(__dirname, '../../node_modules/@types/nexus-typegen/index.d.ts'),
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/photon',
                alias: 'photon',
            },
            {
                source: require.resolve('../context'),
                alias: 'Context',
            },
        ],
    },
});
