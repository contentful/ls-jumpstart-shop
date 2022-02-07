import Head from "next/head";
import Link from "next/link";

const MainLayout = (props) => {
  return (
    <>
      <Head>
        <title>Jumpstart Shop</title>
      </Head>

      <div className="mt-4 p-2 bg-blau text-white">
        <Link href="/">
          <a>Nav</a>
        </Link>
      </div>

      <main>
        <div className="h-screenx py-20 px-60"> {props.children}</div>
      </main>
      <div className="mt-4 p-2 bg-blau text-white">
        <a
          href="https://training.contentful.com"
          target="_blank"
          rel="noreferrer"
        >
          Contentful Learning Services
        </a>
      </div>
    </>
  );
};

export default MainLayout;
