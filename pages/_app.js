import "../styles/globals.css";
import "@contentful/live-preview/style.css";
import MainLayout from "../layouts/MainLayout";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

function MyApp({ Component, pageProps }) {
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableLiveUpdates={true}
      enableInspectorMode={true}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ContentfulLivePreviewProvider>
  );
}

export default MyApp;
