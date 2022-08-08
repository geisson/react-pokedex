import axios from 'axios';
import { PokemonDetail } from '../interfaces/PokemonDetails';

export async function getPokemonsDetails(name: string): Promise<PokemonDetail> {
  const endpoint = `${process.env.REACT_APP_POKEAPI}/pokemon/${name}`;

  const response = await axios.get<PokemonDetail>(endpoint);

  // await 2 segundo to simulate a slow network
  await new Promise((resolve ) => setTimeout(resolve, 2000) )

  return response.data;
}
