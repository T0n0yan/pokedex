# Created By T0n0yan

## Pokedex

### A Pokedex is an application that allows users to browse and explore information about various Pokemon species.

This particular Pokedex application is built using HTML, SCSS, JavaScript, React.js, TypeScript, Redux Toolkit, and Ant
Design.

### Features

* Pokemon Search: Users can search for specific Pokemon by name .

### Pokemon Details:

* The application provides detailed information about each Pokemon, including its type, abilities, stats, and evolution
  chain.
* Filtering: Users can filter Pokemon based on their type, allowing for easy categorization and exploration.
* Sorting: Pokemon can be sorted by name, number, or any other relevant criteria.

### Responsive Design:

* The application is designed to be responsive and accessible on various devices.

### Technologies Used:

* Frontend: JavaScript, React.js, TypeScript
* State Management: Redux Toolkit
* UI Framework: Ant Design
* React Spinners
* Styling: SCSS (Sass)
* API Call: Axios

## Installation

Clone the repository: `git clone`

> <https://github.com/T0n0yan/pokedex.git>

Install dependencies: `npm install`

Start the application: `npm start`



> Live -  <https://pokemon-t0n0yan.vercel.app/>

## APIs

Here are some APIs that can be helpful if you need to find additional data or integrate additional functionality into
the project.
I have done the research to find and incorporate these APIs, and I hope they prove useful to you.

To fetch Pokémon information from the PokeAPI,
you can use the following endpoint: `https://pokeapi.co/api/v2/pokemon?limit=1&offset=1`,
where `<limit>` determines the number of Pokémon you want to retrieve.
By specifying the limit, you can control how many Pokémon are fetched from the API.
Each Pokémon will come with detailed information like this one :

```
{
abilities:(2) [{…}, {…}]
base_experience:64
forms:[{…}]
game_indices:(20) [{…}, {…}, {…} ...]
height:7
held_items:[]
id:1
is_default:true
location_area_encounters:"https://pokeapi.co/api/v2/pokemon/1/encounters"
moves:(

(80) [{…},{…} ....]
    name:"bulbasaur"
    order:1
    past_types:[]
    species:{
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
    }
    sprites:{
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    back_female: null,
    back_shiny:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
    back_shiny_female: null,
    front_default:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', …
    }
    stats:(6) [{…}, {…}, {…}, {…}, {…}, {…}]
    types:(2) [{…}, {…}]weight:69
    }
```

The API endpoint `https://pokeapi.co/api/v2/type` returns an object with properties such as `count` (total count of
Pokémon types), `next` (next page URL), `previous` (previous page URL), and `results` (an array of Pokémon types with
their respective names and URLs).

```
{
count:20
next:null
previous:null
results:Array(20)
0:{name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/'}:
1{name: 'fighting', url: 'https://pokeapi.co/api/v2/type/2/'}
2: {name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/'}
3: {name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/'}
4: {name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/'}
5: {name: 'rock', url: 'https://pokeapi.co/api/v2/type/6/'}
6: {name: 'bug', url: 'https://pokeapi.co/api/v2/type/7/'}
7: {name: 'ghost', url: 'https://pokeapi.co/api/v2/type/8/'}
8: {name: 'steel', url: 'https://pokeapi.co/api/v2/type/9/'}
9: {name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/'}
10: {name: 'water', url: 'https://pokeapi.co/api/v2/type/11/'}
11: {name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/'}
12: {name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/'}
13: {name: 'psychic', url: 'https://pokeapi.co/api/v2/type/14/'}
14: {name: 'ice', url: 'https://pokeapi.co/api/v2/type/15/'}
15: {name: 'dragon', url: 'https://pokeapi.co/api/v2/type/16/'}
16: {name: 'dark', url: 'https://pokeapi.co/api/v2/type/17/'}
17: {name: 'fairy', url: 'https://pokeapi.co/api/v2/type/18/'}
18: {name: 'unknown', url: 'https://pokeapi.co/api/v2/type/10001/'}
19: {name: 'shadow', url: 'https://pokeapi.co/api/v2/type/10002/'}
}
```

### Single pokemon information

```
{
  "abilities": [
  "id": 1,
  "name": "bulbasaur",
  "order": 1,
  "species": {
    "name": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
  },
  "sprites": {
    "other": {
      "dream_world": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
        "front_female": null
      },
      "home": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
        "front_female": null,
        "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png",
        "front_shiny_female": null
      },
      "official-artwork": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png"
      }
    }
  },
  "versions": {
    "generation-i": {},
    "generation-ii": {},
    "generation-iii": {},
    "generation-iv": {},
    "generation-v": {}
  },
  "stats": [
    {
      "base_stat": 45,
      "effort": 0,
      "stat": {
        "name": "hp",
        "url": "https://pokeapi.co/api/v2/stat/1/"
      }
    },
    {
      "base_stat": 49,
      "effort": 0,
      "stat": {
        "name": "attack",
        "url": "https://pokeapi.co/api/v2/stat/2/"
      }
    },
    {
      "base_stat": 49,
      "effort": 0,
      "stat": {
        "name": "defense",
        "url": "https://pokeapi.co/api/v2/stat/3/"
      }
    },
    {
      "base_stat": 65,
      "effort": 1,
      "stat": {
        "name": "special-attack",
        "url": "https://pokeapi.co/api/v2/stat/4/"
      }
    },
    {
      "base_stat": 65,
      "effort": 0,
      "stat": {
        "name": "special-defense",
        "url": "https://pokeapi.co/api/v2/stat/5/"
      }
    },
    {
      "base_stat": 45,
      "effort": 0,
      "stat": {
        "name": "speed",
        "url": "https://pokeapi.co/api/v2/stat/6/"
      }
    }
  ],
 "types": [
    {
      "slot": 1,
      "type": {
        "name": "grass",
        "url": "https://pokeapi.co/api/v2/type/12/"
      }
    },
    {
      "slot": 2,
      "type": {
        "name": "poison",
        "url": "https://pokeapi.co/api/v2/type/4/"
      }
    }
  ]
  "weight": 69
}

```

### I have already done the research and incorporated these APIs into the project, and we hope they prove useful to you.

Feel free to explore the provided APIs to access additional data or enhance your Pokedex application further.

## Disclaimer

This Pokedex application is not affiliated with or endorsed by The Pokémon Company International or Nintendo. Pokémon is
a registered trademark of The Pokémon Company International.
