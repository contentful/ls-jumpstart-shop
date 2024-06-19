import _ from "lodash";
import ProductSection from "../components/ProductSection";
import { getEntriesByContentType } from "../lib/helpers";

export default function Home(props) {
  const page = _.get(props, "page");
  const sections = _.get(page, "fields.sections"); // this field is an array of page sections
  const headline = _.get(page, "fields.headline");

  console.log(page); // you can view this object in the console

  return (
    <>
      {/* {JSON.stringify(page)} */}
      <h1 className="font-bold text-2xl mb-4 text-center">{headline}</h1>
      <div className="flex flex-col space-y-4">
        {Array.isArray(sections)
          ? sections.map((section, sectionIndex) => {
              const contentType = _.get(section, "sys.contentType.sys.id");
              const sectionId = _.get(section, "sys.id");
              const fields = _.get(section, "fields");
              if (contentType === "productSection") {
                return (
                  <ProductSection
                    key={sectionId}
                    id={sectionId}
                    fields={fields}
                  />
                );
              }

              if (contentType === "product") {
                return <>{contentType}</>;
              }

              return <></>;
            })
          : ""}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pageEntries = await getEntriesByContentType("landingPage", "home-page");
  let homepageEntry = _.get(pageEntries, "items[0]");

  return {
    props: {
      page: homepageEntry ? homepageEntry : {},
    },
  };
}
