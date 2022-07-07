/*

add a new images field and disable editing for existing image field.

*/

const _ = require("lodash");

module.exports = function(migration) {
    const product = migration.editContentType("product");

    const images = product
        .createField("gallery")
        .name("Gallery")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["mediaWrapper"] }],
        });

    product.editField("image").disabled(true);
};