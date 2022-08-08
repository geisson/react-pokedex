import React, { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Grid } from '@mui/material';
import PokedexCard from '../../pokedex/components/PokedexCard';
import { FavoriteContext } from './FavoriteContext';

interface FavoritesScreenProps {}

const FavoritesScreen: React.FC<FavoritesScreenProps> = () => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu' size='large'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>Pokemons Favoritos</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth='lg'>
        <div style={{ marginTop: '1em' }}>
          <Grid container spacing={2}>
            {favorites.map((pokemon) => (
              <>
                <Grid item xs={6} lg={3}>
                  <PokedexCard pokemon={pokemon} />
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default FavoritesScreen;
