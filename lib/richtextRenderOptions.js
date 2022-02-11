import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

const Bold = ({ children }) => (
  <span className="font-bold text-blue-500"> {children} </span>
);
const Heading1 = ({ children }) => (
  <div className="mb-4">
    <span className="text-4xl md:text-6xl font-bold text-white">
      {" "}
      {children}{" "}
    </span>{" "}
  </div>
);

const Heading2 = ({ children }) => (
  <div className="mb-4">
    <span className="text-3xl md:text-5xl font-bold text-white">
      {" "}
      {children}{" "}
    </span>{" "}
  </div>
);
const Parag = ({ children }) => (
  <div className="mb-4 ">
    <p className=""> {children} </p>{" "}
  </div>
);

const HyperLNK = ({ node, children }) => {
  const URI = _.get(node, "data.uri");
  return (
    <span className="text-4xlx md:text-6xlx text-blue-200 font-bold">
      {" "}
      <a href={URI} target="_blank" rel="noreferrer">
        {" "}
        {/* {URI} */} {children}{" "}
      </a>{" "}
    </span>
  );
};
const CustomView = () => {
  return <></>;
};

const richtextRenderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold> {text} </Bold>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => {
      return <Heading1> {children} </Heading1>;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <Heading2> {children} </Heading2>;
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <Parag> {children} </Parag>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return <HyperLNK node={node}> {children} </HyperLNK>;
    },
  },
};

export default richtextRenderOptions;
