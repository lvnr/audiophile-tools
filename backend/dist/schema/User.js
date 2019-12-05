"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
exports.User = nexus_1.objectType({
    name: 'User',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.email();
    },
});
