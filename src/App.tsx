import { useState, useEffect, createContext, useContext } from "react";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defence: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

const Theme = createContext("");

function usePokemon(): { pokemon: Pokemon[] } {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("/pokemon.json")
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, []);
  return { pokemon };
}

const PokemonList = ({ pokemon }: { pokemon: Pokemon[] }) => {
  const theme = useContext(Theme);
  return (
    <div>
      <div>
        <h1>Theme : {theme}</h1>
      </div>
      {pokemon.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
};



function App() {
  const { pokemon } = usePokemon();
  return (
    <Theme.Provider value="light">
      <PokemonList pokemon={pokemon} />{" "}
    </Theme.Provider>
  );
}

export default App;
