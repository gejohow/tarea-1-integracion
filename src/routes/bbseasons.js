const KoaRouter = require('koa-router');
const fetch = require('node-fetch');

const router = new KoaRouter();

function checkAvailability(arr, val) {
  return arr.some((arrVal) => val === arrVal);
}

const fetchEpisodes = async () => {
  const url = 'https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad';
  const response = await fetch(url);
  return response.json();
};

router.get('bbseasons', '/', async (ctx) => {
  const episodes = await fetchEpisodes();
  const seasons = [];
  episodes.forEach((episode) => {
    // eslint-disable-next-line eqeqeq
    if (!checkAvailability(seasons, episode.season)) {
      seasons.push(episode.season);
    }
  });
  await ctx.render('/bbseasons', {
    seasons,
  });
});

router.get('bbepisodes', '/:season', async (ctx) => {
  const episodes = await fetchEpisodes();
  const filtered = [];
  const {
    season,
  } = ctx.params;
  episodes.forEach((episode) => {
    // eslint-disable-next-line eqeqeq
    if (episode.season === season) {
      filtered.push(episode);
    }
  });
  await ctx.render('/bbepisodes', {
    season,
    filtered,
    series: 'Breaking Bad',
  });
});

router.get('bbepisode', '/:season/:episode', async (ctx) => {
  const episodes = await fetchEpisodes();
  const filtered = [];
  const {
    season,
    episode,
  } = ctx.params;
  episodes.forEach((chapter) => {
    // eslint-disable-next-line eqeqeq
    if (episode == chapter.episode && season == chapter.season) {
      filtered.push(chapter);
    }
  });
  await ctx.render('/episode', {
    season,
    episode,
    filtered,
    series: 'Breaking Bad',
  });
});

/* router.get('saulcharacter', '/:season/:episode/:name', async (ctx) => {
  const {
    name,
  } = ctx.params;
  const character = await fetchCharacter(name);
  const quotes = await fetchQuotes(name);
  await ctx.render('/character', {
    character,
    quotes,
    series: 'Breaking Bad',
  });
}); */

module.exports = router;
