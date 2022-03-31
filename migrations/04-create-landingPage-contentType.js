module.exports = function(migration) {
    const landingPage = migration
        .createContentType("landingPage")
        .name("Landing Page")
        .displayField("title");

    const title = landingPage
        .createField("title")
        .name("Title")
        .type("Symbol")
        .required(true);

    const slug = landingPage
        .createField("slug")
        .name("Slug")
        .type("Symbol")
        .required(true);

    landingPage.changeFieldControl("slug", "builtin", "slugEditor");

    const headline = landingPage
        .createField("headline")
        .name("Headline")
        .type("Symbol")
        .required(true);

    const sections = landingPage
        .createField("sections")
        .name("Sections")
        .type("Array")
        .items({
            type: "Link",
            linkType: "Entry",
            validations: [{ linkContentType: ["productSection"] }],
        });
};