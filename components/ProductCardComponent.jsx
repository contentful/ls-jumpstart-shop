import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import richtextRenderOptions from "../lib/richtextRenderOptions";
import ImageComponent from "./ImageComponent";
import { ContentfulLivePreview } from "@contentful/live-preview";

const DEFAULT_LOCALE = "en-US";

const ProductCardComponent = (props) => {
  const router = useRouter();
  const id = _.get(props, "id");
  const productIndex = _.get(props, "productIndex");
  const fields = _.get(props, "fields");
  const image = _.get(fields, "image");
  const firstImage = _.get(fields, "gallery[0].fields.image");

  const backgroundColor = _.get(props, "colors.backgroundColor");
  const textColor = _.get(props, "colors.textColor");
  const [indexIsOdd, setIndexIsOdd] = useState(false);

  useEffect(() => {
    if (!productIndex % 2 == 0) {
      setIndexIsOdd(true);
    }
    return () => {};
  }, []);

  if (!fields) {
    return "";
  }
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row w-full  overflow-hidden rounded-md shadow-lg">
        <div
          style={{
            backgroundColor: backgroundColor ? backgroundColor : null,
            color: textColor ? textColor : null,
          }}
          className={`w-1/2 bg-blau  p-10  ${indexIsOdd ? "order-last" : ""}  `}
        >
          {firstImage ? (
            <ImageComponent image={firstImage} />
          ) : (
            <ImageComponent image={image} />
          )}
        </div>
        <div
          style={{
            backgroundColor: backgroundColor ? backgroundColor : null,
            color: textColor ? textColor : null,
          }}
          className={`w-1/2 bg-gelb  p-10 flex flex-col items-center `}
        >
          <div className=" h-1/3"></div>
          <div className="flex flex-col space-y-4">
            <h2
              {...ContentfulLivePreview.getProps({
                entryId: id,
                fieldId: "title",
                locale: DEFAULT_LOCALE,
              })}
              className="text-xl font-bold "
            >
              {fields.title}
            </h2>

            <div className="">
              {documentToReactComponents(
                fields.description,
                richtextRenderOptions
              )}
            </div>
            <p className=" text-xl ">${fields.price}</p>
            <button
              onClick={() => router.push(`/products/${fields.slug}`)}
              className=" bg-black text-white hover:bg-neuter rounded shadow-md"
            >
              BUY
            </button>
          </div>

          <div className=" h-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardComponent;
