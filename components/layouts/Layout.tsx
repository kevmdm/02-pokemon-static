import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC, FunctionComponent, ReactElement } from "react";
import { Navbar } from "../ui";

interface IProps {
  children?: ReactElement | ReactElement[];
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<IProps> = ({ children, title }) => {
  console.log(origin);
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Kevin Mijares" />
        <meta name="description" content="informacion sobre el pokemon" />
        <meta name="keywords" content={`${title}, Pokemon, Pokedex`} />
        <meta
          property="og:title"
          content={`Informacion sobre ${title}, pokemon, pokedex`}
        />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
