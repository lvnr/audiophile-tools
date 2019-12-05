"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.Company = nexus_1.objectType({
    name: 'Company',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.website();
    },
});
