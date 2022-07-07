import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import _ from "lodash";
import Head from "next/head";
import ImageComponent from "../../components/ImageComponent";
import ImageGallery from "../../components/ImageGallery";
import { getEntriesByContentType } from "../../lib/helpers";
import richtextRenderOptions from "../../lib/richtextRenderOptions";

const ProductPage = (props) => {
  console.log("static props", props);
  const product = _.get(props, "product.items[0]");
  const contentType = _.get(product, "sys.contentType.sys.id");
  const productId = _.get(product, "sys.id");
  const fields = _.get(product, "fields");
  const title = _.get(product, "fields.title");
  const image = _.get(product, "fields.image");
  const gallery = _.get(product, "fields.gallery"); //new gallery field

  return (
    <div className="relative h-full ">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="p-20 flex flex-col space-y-4 h-screenx items-center">
        {gallery ? (
          <ImageGallery gallery={gallery} />
        ) : (
          <div className="w-full rounded shadow-xl">
            <ImageComponent image={image} />
          </div>
        )}

        <h1 className="text-3xl mb-4 font-bold">{title}</h1>
        <p className=" text-xl text-blau">${fields.price}</p>
        <div className="">
          {documentToReactComponents(fields.description, richtextRenderOptions)}
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const productEntries = await getEntriesByContentType("product");

  let paths = [];
  if (productEntries) {
    try {
      paths = productEntries.items.map((entry) => {
        const slugVal = _.get(entry, "fields.slug");
        return { params: { slug: slugVal } };
      });
    } catch (error) {}
  }

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = _.get(context, "params.slug");
  const product = await getEntriesByContentType("product", slug);

  return {
    props: { product },
  };
}

export default ProductPage;
