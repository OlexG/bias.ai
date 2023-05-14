import Upload from "../islands/Upload.tsx";
import Header from "../islands/Header.tsx";
import { Head } from "$fresh/runtime.ts";

export default function UploadPage() {
  return (
    <>
      <Head>
        <title>bias.ai</title>
        <link href="index.css" rel="stylesheet" />
      </Head>
      <Header />
      <Upload />
    </>
  );
}