"use strict";
import chalk from "chalk";
import { createRequire } from "module";
const require = createRequire(
    import.meta.url);
const contentful = require("contentful-management");
const spaceImport = require("contentful-import");
const exportFile = require("./space-export/space.json");
const inquirer = require("inquirer");

// const chalk = require("chalk");
const path = require("path");
const { writeFileSync } = require("fs");

console.log(`
  To set up this project you need to provide your Space ID
  and the belonging API access tokens.

  You can find all the needed information in your Contentful space under:

  ${chalk.yellow(
    `app.contentful.com ${chalk.red("->")} Space Settings ${chalk.red(
      "->"
    )} API keys`
  )}

  The ${chalk.green("Content Management API Token")}
    will be used to import and write data to your space.

  The ${chalk.green("Content Delivery API Token")}
    will be used to retrieve published content items.

    The ${chalk.green("Content Preview API Token")}
    will be used to retrieve published and unpublished content items.

  Ready? Let's do it! 🎉
`);

const questions = [
  {
    name: "spaceId",
    message: "Your Space ID",
    validate: (input) =>
      /^[a-z0-9]{12}$/.test(input) ||
      "Space ID must be 12 lowercase characters",
  },
  {
    name: "accessToken",
    message: "Your Content Delivery API access token",
  },
  {
    name: "previewToken",
    message: "Your Content Preview API access token",
  },
  {
    name: "managementToken",
    message: "Your Content Management API access token",
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    console.log("Writing config file...");
    const spaceId = answers.spaceId ? answers.spaceId : "";
    const accessToken = answers.accessToken ? answers.accessToken : "";
    const previewToken = answers.previewToken ? answers.previewToken : "";
    const previewSecret = answers.previewSecret ? answers.previewSecret : "";
    const env = "master";
    const managementToken = answers.managementToken
      ? answers.managementToken
      : ""
      ? answers.managementToken
      : "";

    const fileContents =
      [
        `NEXT_PUBLIC_SPACE_ID='${spaceId}'`,
        `NEXT_PUBLIC_DELIVERY_TOKEN='${accessToken}'`,
        `NEXT_PUBLIC_PREVIEW_TOKEN='${previewToken}'`,
        `CMA_TOKEN='${managementToken}'`,
        `NEXT_PUBLIC_PREVIEW_SECRET='testing'`,
        `NEXT_PUBLIC_ENVIRONMENT='${env}'`,
      ].join("\n") + "\n";

    writeFileSync(".env", fileContents, "utf8");

    return { spaceId, managementToken, accessToken, env };
  })
  .then((managementConfig) => {
    const spaceId = managementConfig.spaceId ? managementConfig.spaceId : "";
    const managementToken = managementConfig.managementToken
      ? managementConfig.managementToken
      : "";
    const accessToken = managementConfig.accessToken
      ? managementConfig.accessToken
      : "";

    const envId = managementConfig.env ? managementConfig.env : "master";

    // console.log(managementConfig);
    if (spaceId && managementToken) {
      const client = contentful.createClient({
        // This is the access token for this space. Normally you get the token in the Contentful web app
        accessToken: managementToken,
      });

      (async () => {
        try {
          const contentfulSpace = await client.getSpace(spaceId);
          const environment = await contentfulSpace.getEnvironment(envId);
          const entries = await environment.getEntries();

          // delete entries
          console.log(chalk.red(`Deleting!  entries`));
          for (const entry of entries.items) {
            if (entry.isPublished()) {
              console.log(`Unpublishing entry "${entry.sys.id}"`);
              await entry.unpublish();
            }
            await entry.delete();
          }

          // delete content types
          const contentTypes = await environment.getContentTypes();
          let totalContentTypes = contentTypes.total;
          console.log(
            chalk.red(`Deleting! ${totalContentTypes} content types`)
          );
          console.log(contentTypes);
          for (const contentType of contentTypes.items) {
            if (contentType.isPublished()) {
              console.log(`Unpublishing content type "${contentType.sys.id}"`);
              await contentType.unpublish();
            }
            await contentType.delete();
          }

          // import to space
          await spaceImport({
            spaceId: spaceId,
            managementToken: managementToken,
            environmentId: envId,
            content: exportFile,
          });
        } catch (error) {
          console.log(chalk.red(`An error occured!`), error);
        }

        //   end
      })();
    } else {
      console.log(
        `Missing Management token! '
            )} Please Try Again ${chalk.red("ERROR")} .`
      );
    }
  });