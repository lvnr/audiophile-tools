"use strict";
exports.__esModule = true;
var nexus_1 = require("nexus");
exports.Company = nexus_1.objectType({
    name: 'Company',
    definition: function (t) {
        t.model.id();
        t.model.name();
        t.model.website();
    }
});
