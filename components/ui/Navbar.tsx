import { Container, Link, Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0rem 1.2rem",
        backgroundColor: theme?.colors.gray50.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png"
        alt="banner pokemon"
        width={75}
        height={75}
      />

      <NextLink href="/" passHref>
        <Container direction="row" display="flex">
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3 css={{paddingTop:"15px"}}>
            okémon
          </Text>
        </Container>
      </NextLink>

      <Spacer css={{ flex: 1 }} />
      <NextLink href={"/favorites"}>
        <Text color="white" h3>
          Favoritos
        </Text>
      </NextLink>
    </div>
  );
};
