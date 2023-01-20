import { useEffect, useState } from "react";

import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";

import confetti from "canvas-confetti";

import { Layout } from "../../components/layouts";
import { pokeApi } from "../../api";
import { Pokemon } from "../../interfaces/";
import { localFavorites } from "../../utils";
import { getPokemonInfo } from "../../utils/getPokemonInfo";
import { redirect } from "next/dist/server/api-utils";

interface Props {
  pokemon: Pokemon;
}

export const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 0,
        y: 0,
      },
    });
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 0.5,
        y: 0,
      },
    });
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: 100,
      origin: {
        x: 0.5,
        y: 1,
      },
    });
  };

  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "./no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform={"capitalize"}>
                {" "}
                {pokemon.name}
              </Text>
              <Button
                color={"gradient"}
                ghost={!isInFavorites}
                onPress={onToggleFavorite}
              >
                {isInFavorites ? "En Favoritos" : "Guardar en Favoritos"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={38}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.back_default || "./no-image.png"}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_default || "./no-image.png"}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny || "./no-image.png"}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny || "./no-image.png"}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemon151.map((id) => ({
      params: { id },
    })),

    // fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  // const pokemon = {
  //   id: data.id,
  //   name: data.name,
  //   sprites:data.sprites

  // }

  // return {
  //   props: {
  //     pokemon, //tiene el mismo valor que la variable tecnicamente es pokemon:pokemon
  //   },
  // };
  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};
export default PokemonPage;
