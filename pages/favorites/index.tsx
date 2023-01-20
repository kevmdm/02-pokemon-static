import { useEffect, useState } from "react";

import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { FavoriteList, NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { Card, Container, Grid } from "@nextui-org/react";


export const Favorites: NextPage = ({}) => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons);
  }, []);

  return (
    <Layout title="Pokemon - Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoriteList favoritePokemons={favoritePokemons} />
      )}
    </Layout>
  );
};
export default Favorites;
