module.exports = function(migration) {
    const category = migration
        .createContentType("category")
        .name("Category")
        .displayField("title");

    const title = category
        .createField("title")
        .name("Title")
        .type("Symbol")
        .required(true);

    const description = category
        .createField("description")
        .name("Description")
        .type("Symbol");
    const image = category
        .createField("image")
        .name("Image")
        .type("Link")
        .linkType("Asset");
};