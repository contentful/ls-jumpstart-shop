import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";

const MediaWrapper = (props) => {
  console.log("MediaWrapper", props);
  const entryId = _.get(props, "sys.id");
  const classes = _.get(props, "classes");
  const contentType = _.get(props, "sys.contentType.sys.id");
  const entryTitle = _.get(props, "fields.name")
    ? _.get(props, "fields.name")
    : _.get(props, "fields.internalName");
  const fields = _.get(props, "fields");
  const asset = _.get(fields, "asset");

  const assetUrl = _.get(asset, "fields.file.url");
  const assetWidth = _.get(asset, "fields.file.details.image.width");
  const assetHeight = _.get(asset, "fields.file.details.image.height");
  const assetType = _.get(asset, "fields.file.contentType");

  const [isImage, setIsImage] = useState(false);
  useEffect(() => {
    try {
      if (assetType.startsWith("image")) {
        setIsImage(true);
      }
    } catch (error) {}

    return () => {
      setIsImage(false);
    };
  }, [assetType]);
  if (!entryId) {
    return "..";
  }
  return (
    <div className="relative w-full h-full min-w-full  p-2 overflow-hidden">
      {isImage ? (
        <div className="">
          {false ? (
            <Image
              src={`https:${assetUrl}`}
              alt=""
              title=""
              width="100%"
              height="100%"
            />
          ) : (
            ""
          )}

          <div className="flex justify-center h-full">
            <div className="rounded-lg   max-w-sm ">
              <img
                // class="rounded-t-lg h-[300px]"
                className={`${classes} `}
                src={`https:${assetUrl}`}
                alt=""
              />
            </div>
          </div>

          {false ? (
            <div className="w-full  h-full flex flex-col items-center">
              <img
                //   className=""
                className={`${classes} `}
                src={`https:${assetUrl}`}
                //   width="100%"
                //   height="100%"
              />
              {/* <Image
                  src={`https:${assetUrl}`}
                    layout="responsive"
                    objectFit="contain"
                  className={""}
                  width="100%"
                  height="100%"
                    width={assetWidth ? assetWidth : 200}
                    height={assetHeight ? assetHeight : 200}
                /> */}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MediaWrapper;
