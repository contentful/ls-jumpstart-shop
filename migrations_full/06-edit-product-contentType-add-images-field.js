module.exports = function(migration) {
    const product = migration.editContentType("product");

    const images = product
        .createField("images")
        .name("Images")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["mediaWrapper"] }],
        });

    product.editField("image").disabled(true);
};