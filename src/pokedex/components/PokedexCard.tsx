import { Card, CardHeader, IconButton, CardMedia, CardActions } from '@mui/material';

import Chip from '@mui/material/Chip';
import { Favorite } from '@mui/icons-material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetails';
import { FavoriteContext } from '../../favorites/contexts/FavoriteContext';

interface PokedexCardProps {
  pokemon: PokemonDetail;
}

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const { favorites, setFavorites } = useContext(FavoriteContext);

  const history = useNavigate();
  function handleClick() {
    history(`/pokemon/${pokemon.name}`);
  }

  const addPokemonToFavorite = () => {
    setFavorites([...favorites, pokemon]);
  };

  const removePokemonFromFavorite = () => {
    setFavorites(favorites.filter((poke) => poke.name !== pokemon.name));
  };

  const isFavorite = favorites.some((poke) => poke.name === pokemon.name);

  return (
    <>
      <Card>
        <CardMedia
          style={{ height: 0, paddingTop: '56.25%' }}
          image={pokemon.sprites.front_default}
          title='Paella dish'
          onClick={handleClick}
        />
        <CardHeader
          title={pokemon.name}
          subheader={pokemon.types.map((type) => (
            <Chip label={type.type.name} variant='outlined' />
          ))}
        />
        <CardActions disableSpacing>
          <IconButton
            onClick={() => (isFavorite ? removePokemonFromFavorite() : addPokemonToFavorite())}
            aria-label='add to favorites'
          >
            <Favorite color={isFavorite ? 'error' : 'disabled'} />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default PokedexCard;
