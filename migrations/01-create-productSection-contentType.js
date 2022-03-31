module.exports = function(migration) {
    const productSection = migration
        .createContentType("productSection")
        .name("Product Section")
        .displayField("title");

    const internalName = productSection
        .createField("internalName")
        .name("Internal Name")
        .type("Symbol");

    const title = productSection
        .createField("title")
        .name("Title")
        .type("Symbol")
        .required(true);

    const products = productSection
        .createField("products")
        .name("Products")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["product"] }],
        });
};