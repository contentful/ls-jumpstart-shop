/*

delete the image field!

*/

const _ = require("lodash");

module.exports = function(migration) {
    const product = migration.editContentType("product");

    product.deleteField("image");
};