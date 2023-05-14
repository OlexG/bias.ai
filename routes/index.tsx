import { Head } from "$fresh/runtime.ts";
import Homepage from "../islands/Homepage.tsx";
import Header from "../islands/Header.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>bias.ai</title>
        <link href="index.css" rel="stylesheet" />
      </Head>
      <Header />
      <Homepage />
    </>
  );
}
