import _ from "lodash";
import Image from "next/image";
const ImageComponent = (props) => {
  const id = _.get(props, "id");
  const image = _.get(props, "image");
  const imgUrl = _.get(image, "fields.file.url");
  const imgAltText = _.get(image, "fields.title");

  if (!image) {
    return "";
  }
  return (
    <div className="w-full h-full flex ">
      <div className="w-full m-auto">
        <img
          className="max-w-full h-auto "
          alt={imgAltText}
          src={imgUrl ? `https:${imgUrl}` : ""}
        />
      </div>
    </div>
  );
};

export default ImageComponent;
