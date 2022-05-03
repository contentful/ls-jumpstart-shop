module.exports = function(migration) {
    const product = migration
        .createContentType("product")
        .name("Product")
        .description("for adding products")
        .displayField("internalName");
    const internalName = product
        .createField("internalName")
        .name("Internal Name")
        .type("Symbol");

    const title = product
        .createField("title")
        .name("Title")
        .type("Symbol")
        .required(true);
    const slug = product
        .createField("slug")
        .name("Slug")
        .type("Symbol")
        .required(true);

    product.changeFieldControl("slug", "builtin", "slugEditor");

    const categories = product
        .createField("categories")
        .name("Categories")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["category"] }],
        });

    const description = product
        .createField("description")
        .name("Description")
        .type("RichText")
        .validations([{
                enabledNodeTypes: [
                    "heading-1",
                    "heading-2",
                    "heading-3",
                    "heading-4",
                    "heading-5",
                    "heading-6",
                    "ordered-list",
                    "unordered-list",
                    "hr",
                    "blockquote",
                    "embedded-entry-block",
                    "embedded-asset-block",
                    "hyperlink",
                    "entry-hyperlink",
                    "asset-hyperlink",
                    "embedded-entry-inline",
                ],
            },
            {
                enabledMarks: ["bold", "italic", "underline", "code"],
            },
        ]);

    const price = product
        .createField("price")
        .name("Price")
        .type("Number")
        .required(true);

    const image = product
        .createField("image")
        .name("Image")
        .type("Link")
        .linkType("Asset")
        .required(true);
};