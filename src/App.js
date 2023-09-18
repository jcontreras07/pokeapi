import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Typography,
  Box
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import { useDebouncedEffect } from "./useDebouncedEffect";
import "./styles.css";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemon, setPokemon] = useState(undefined);

  useDebouncedEffect(
    () => {
      if (!searchQuery) {
        return setPokemon(undefined);
      }

      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
          );
          const data = await response.json();
          setPokemon(data);
        } catch (e) {
          setPokemon(undefined);
        }
      };

      fetchData();
    },
    300,
    [searchQuery]
  );

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="App">
      <TextField
        value={searchQuery}
        onChange={handleChange}
        variant="outlined"
        placeholder="Search Pokemons..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          )
        }}
        fullWidth
      />
      <Box mt={1}>
        {pokemon ? (
          <Card>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {pokemon.name}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography>Pika, pika...</Typography>
        )}
      </Box>
    </div>
  );
};
