/*
transform product entries
add one image to the images field.
link previously created mediaWrapper entry to the images field.



*/

const _ = require("lodash");

module.exports = async function(migration, { makeRequest }) {
    migration.transformEntries({
        contentType: "product",
        from: ["image", "slug"],
        to: ["images"],
        transformEntryForLocale: async function(fromFields, currentLocale) {
            if (currentLocale === "de-DE") {
                return;
            }

            try {
                const slug = _.get(fromFields, "slug['en-US']");
                const mediaWrapperEntries = await makeRequest({
                    method: "GET",
                    url: `/entries?content_type=mediaWrapper&fields.title=${slug}`,
                }); // get mediaWrapper entries with title that matches product slug since slug is unique

                const mediaWrapperItems = _.get(mediaWrapperEntries, "items");

                if (mediaWrapperItems) {
                    let itemArray = [];
                    mediaWrapperItems.map((item) => {
                        const itemId = _.get(item, "sys.id");
                        const derivedMediaWrapper = {
                            sys: { type: "Link", linkType: "Entry", id: itemId },
                        };

                        itemArray.push(derivedMediaWrapper);
                    });

                    return { images: itemArray }; //set images field
                } else {
                    return false;
                }
            } catch (error) {
                console.log("error", error);
                return false;
            }
        },
    });
};