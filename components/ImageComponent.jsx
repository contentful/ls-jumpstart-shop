import _ from "lodash";
import Image from "next/legacy/image";
const ImageComponent = (props) => {
  const id = _.get(props, "id");
  const image = _.get(props, "image");
  const imgUrl = _.get(image, "fields.file.url");
  const imgAltText = _.get(image, "fields.title");

  if (!image) {
    return "";
  }
  return (
    <>
      <div className="w-[400px]x overflow-hidden">
        <Image
          src={`https:${imgUrl}?w=1920&h=1080`}
          width={1920}
          height={1080}
          layout="responsive"
          alt={imgAltText}
        />
      </div>
    </>
  );
};

export default ImageComponent;
