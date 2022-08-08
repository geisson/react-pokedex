import axios from "axios";
import { PokemonDetail } from "../interfaces/PokemonDetails";
import { getPokemonsDetails } from "./getPokemonsDetails";

export interface PokemonListInterface {
  name: string;
  url: string;
}

interface ListPokemonInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDetail[];
}

export async function listPokemons(): Promise<ListPokemonInterface> {
  const endpoint =`${process.env.REACT_APP_POKEAPI}/pokemon`

  const response = await axios.get<ListPokemonInterface>(endpoint)

  const promiseArr =  response.data.results.map(({name} ) => getPokemonsDetails(name) )

  const resultsPromise = await Promise.all(promiseArr)

  // await 2 segundo to simulate a slow network
  await new Promise((resolve ) => setTimeout(resolve, 2000) )

  return {
    ...response.data,
    results: resultsPromise
  };
}