/*
transformEntriesToType from product to mediaWrapper
-derive a mediaWrapper entry from an existing image in product.
-use the product slug as title to make entries unique unique

*/

const _ = require("lodash");

module.exports = function(migration) {
    migration.transformEntriesToType({
        sourceContentType: "product",
        targetContentType: "mediaWrapper",
        from: ["image", "slug"],
        shouldPublish: true,
        updateReferences: false,
        removeOldEntries: false,
        identityKey: function(fields) {
            try {
                const slug = _.get(fields, "slug['en-US']");
                if (slug) {
                    return slug;
                }
            } catch (error) {}
        },
        transformEntryForLocale: function(fromFields, currentLocale) {
            // fromFields is the product fields.

            try {
                const oldImageId = _.get(fromFields, "image['en-US'].sys.id"); // id of existing image

                const slug = _.get(fromFields, "slug['en-US']");
                if (oldImageId && slug) {
                    const derivedAsset = {
                        sys: { type: "Link", linkType: "Asset", id: oldImageId },
                    }; //new asset with image id (oldImageId)

                    let returnedObject = {};
                    returnedObject.title = slug;
                    returnedObject.altText = "no altText"; // laziness :)
                    returnedObject.asset = derivedAsset;

                    return returnedObject;
                }

                return false;
            } catch (error) {
                return false;
            }
        },
    });
};