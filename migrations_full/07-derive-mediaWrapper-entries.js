const _ = require("lodash");

module.exports = function(migration) {
    migration.transformEntriesToType({
        sourceContentType: "product",
        targetContentType: "mediaWrapper",
        from: ["image", "slug"],
        shouldPublish: true,
        updateReferences: true,
        removeOldEntries: false,
        identityKey: function(fields) {
            const slug = _.get(fields, "slug['en-US']");
            return slug;
        },
        transformEntryForLocale: function(fromFields, currentLocale) {
            const oldImageId = _.get(fromFields, "image['en-US'].sys.id");

            const slug = _.get(fromFields, "slug['en-US']");
            const derivedAsset = {
                sys: { type: "Link", linkType: "Asset", id: oldImageId },
            };

            if (oldImageId && slug && derivedAsset) {
                try {
                    let returnedObject = {};
                    returnedObject.title = slug;
                    returnedObject.altText = "no altText";
                    returnedObject.asset = derivedAsset;

                    return returnedObject;
                } catch (error) {
                    return false;
                }
            }
            return false;
        },
    });
};