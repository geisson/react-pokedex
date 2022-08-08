import React, { useContext, useEffect, useState } from 'react';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetails';
import { getPokemonsDetails } from '../pokemon/services/getPokemonsDetails';
import { listPokemons, PokemonListInterface } from '../pokemon/services/listPokemons';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { log } from 'console';
import PokedexCard from './components/PokedexCard';
import { useQuery } from '@tanstack/react-query';
import { Delete, Favorite } from '@mui/icons-material';
import { FavoriteContext } from '../favorites/contexts/FavoriteContext';

interface PokedexProps {}

const Pokedex: React.FC<PokedexProps> = () => {
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();
  const { data, isLoading, isRefetching, refetch, isStale } = useQuery(['listPokemons'], listPokemons);

  const favoritesCount = favorites.length;

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu' size='large'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>Pokedex!</Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-haspopup='true'
              onClick={() => navigate('favoritos')}
              color='inherit'
            >
              <Badge badgeContent={favoritesCount} color='secondary'>
                <Favorite />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {isRefetching && <LinearProgress variant='indeterminate' color='secondary' />}

      <Container maxWidth='lg'>
        <div style={{ marginTop: '1em' }}></div>
        {isStale && (
          <Button disabled={isRefetching} variant='outlined' onClick={() => refetch()}>
            Refetch
          </Button>
        )}
        <div style={{ marginTop: '1em' }}></div>

        {!isLoading ? (
          <>
            <Grid container spacing={2}>
              {data?.results.map((pokemon) => (
                <>
                  <Grid item xs={6} lg={3}>
                    <PokedexCard pokemon={pokemon} />
                  </Grid>
                </>
              ))}
            </Grid>
            =
          </>
        ) : (
          <div>
            <CircularProgress />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Pokedex;
