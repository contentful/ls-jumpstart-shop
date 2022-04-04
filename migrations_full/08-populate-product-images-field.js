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
                });

                const mediaWrapperItems = _.get(mediaWrapperEntries, "items");

                if (mediaWrapperItems) {
                    let itemArray = [];
                    mediaWrapperItems.map((item) => {
                        const itemId = _.get(item, "sys.id");
                        const derivedMediaWrapper = {
                            sys: { type: "Link", linkType: "Entry", id: itemId },
                        };

                        console.log("firs", derivedMediaWrapper);
                        itemArray.push(derivedMediaWrapper);

                        // return {
                        //     sys: { type: "Link", linkType: "Array", items: [itemId] },
                        // };
                    });

                    return { images: itemArray };
                } else {
                    return false;
                }
            } catch (error) {
                console.log("error", error);
                return false;
            }

            return false;
        },
    });
};