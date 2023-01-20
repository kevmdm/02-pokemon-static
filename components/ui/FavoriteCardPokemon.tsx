import { Card } from "@nextui-org/react";

import React, { FC } from "react";
import { useRouter } from 'next/router';

interface Props {
  id: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ id }) => {

  const  router = useRouter()
  const onFavoriteClicked = () => {
    router.push(`/pokemon/${id}`);
  };
  return (
    <Card
      isHoverable
      isPressable
      onClick={onFavoriteClicked}
      css={{ padding: 10 }}
    >
      <Card.Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        width={"100%"}
        height={"140px"}
      />
    </Card>
  );
};
