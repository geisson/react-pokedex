import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getPokemonsDetails } from './services/getPokemonsDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Favorite } from '@mui/icons-material';
import { FavoriteContext } from '../favorites/contexts/FavoriteContext';

interface PokemonDetailsProps {}

type PokemonQueryParams = {
  name: string;
};

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const navigate = useNavigate();
  const { name } = useParams<PokemonQueryParams>();

  const { favorites, setFavorites } = useContext(FavoriteContext);

  const { data } = useQuery([`getPokemonDetails-${name}`], () => getPokemonsDetails(name!));
  const selectedPokemonDetails = data;

  const addPokemonToFavorite = () => {
    if (!selectedPokemonDetails) return;
    setFavorites([...favorites, selectedPokemonDetails]);
  };

  const removePokemonFromFavorite = () => {
    if (!selectedPokemonDetails) return;
    setFavorites(favorites.filter((poke) => poke.name !== selectedPokemonDetails.name));
  };

  const isFavorite = favorites.some((poke) => poke.name === selectedPokemonDetails?.name);

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
          <IconButton edge='start' color='inherit' aria-label='menu' size='large'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>{name}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              onClick={() => (isFavorite ? removePokemonFromFavorite() : addPokemonToFavorite())}
              aria-label='add to favorites'
            >
              <Favorite color={isFavorite ? 'error' : 'disabled'} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth='lg'>
        <Box mt={2}>
          <img width='100%' height='auto' src={selectedPokemonDetails?.sprites.front_default} alt='' />
        </Box>
        <Typography variant='h2'>{selectedPokemonDetails?.name}</Typography>
        {selectedPokemonDetails?.types.map((type) => (
          <Typography>{type.type.name}</Typography>
        ))}

        <Box style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant='body2'>Espécie: </Typography>
          <Typography>{selectedPokemonDetails?.species.name}</Typography>
        </Box>

        <Box style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography>Altura: </Typography>
          {selectedPokemonDetails?.height}
        </Box>

        <Box style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography>Peso: </Typography>
          <Typography>{selectedPokemonDetails?.weight}</Typography>
        </Box>

        <Box style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography>Habilidades: </Typography>
          <Typography>
            {selectedPokemonDetails?.abilities.map((ability) => (
              <Typography>{ability.ability.name}</Typography>
            ))}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default PokemonDetails;
