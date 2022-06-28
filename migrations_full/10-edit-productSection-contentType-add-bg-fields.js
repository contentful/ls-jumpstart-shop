/*

add two new fields backgroundColor and textColor

*/

const _ = require("lodash");

module.exports = function(migration) {
    const productSection = migration.editContentType("productSection");

    const backgroundColor = productSection
        .createField("backgroundColor")
        .name("Background Color")
        .type("Symbol")
        .required(true);
    const textColor = productSection
        .createField("textColor")
        .name("Text Color")
        .type("Symbol")
        .required(true);

    /*
                          WidgetNamespace -> app/extension/builtin
                           changeFieldControl("<FIELD_ID>", "<widgetNamespace>", "<widgetId>")

                          "fieldId": "backgroundColor",
                          "widgetId": "40cyMXbiaMkvbiZ5U2VWsx",
                          "widgetNamespace": "app"

                        */

    //
    productSection.changeFieldControl(
        "backgroundColor",
        "app",
        "994A0ojKh6PeX5cEc8Lqo"
    );
    productSection.changeFieldControl(
        "textColor",
        "app",
        "994A0ojKh6PeX5cEc8Lqo"
    );
};