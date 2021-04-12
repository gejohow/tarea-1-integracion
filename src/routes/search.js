const KoaRouter = require('koa-router');

const router = new KoaRouter();
const fetch = require('node-fetch');

const fetchCharacters = async (name, start) => {
  const res = name.replace(/ /g, '+');
  const url = `https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${res}&limit=10&offset=${start}`;
  const response = await fetch(url);
  return response.json();
};

const fetchCharacter = async (name) => {
  const res = name.replace(/ /g, '+');
  const url = `https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${res}`;
  const response = await fetch(url);
  return response.json();
};

const fetchQuotes = async (name) => {
  const res = name.replace(/ /g, '+');
  const url = `https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${res}`;
  const response = await fetch(url);
  return response.json();
};

router.get('character', '/:name', async (ctx) => {
  const {
    name,
  } = ctx.params;
  const character = await fetchCharacter(name);
  const quotes = await fetchQuotes(name);
  await ctx.render('/character', {
    character,
    quotes,
  });
});

router.get('search', '/', async (ctx) => {
  const { search } = ctx.request.query;
  let start = 0;
  const characters = await fetchCharacters(search, start);
  const final = [];
  final.push(characters);
  let finished = Boolean();
  if (characters.length === 10) {
    while (!finished) {
      start += 10;
      // eslint-disable-next-line no-await-in-loop
      const next = await fetchCharacters(search, start);
      console.log(start);
      if (!next.length) {
        finished = true;
      } else {
        final.push(next);
      }
    }
  }
  console.log(final);
  await ctx.render('search', {
    search,
    final,
  });
});

module.exports = router;
