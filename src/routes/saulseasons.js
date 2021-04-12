const KoaRouter = require('koa-router');
const fetch = require('node-fetch');

const router = new KoaRouter();

function checkAvailability(arr, val) {
  return arr.some((arrVal) => val === arrVal);
}

const fetchEpisodes = async () => {
  const url = 'https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul';
  const response = await fetch(url);
  return response.json();
};

router.get('saulseasons', '/', async (ctx) => {
  const episodes = await fetchEpisodes();
  const seasons = [];
  episodes.forEach((episode) => {
    // eslint-disable-next-line eqeqeq
    if (!checkAvailability(seasons, episode.season)) {
      seasons.push(episode.season);
    }
  });
  await ctx.render('/saulseasons', {
    seasons,
  });
});

router.get('saulepisodes', '/:season', async (ctx) => {
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
  await ctx.render('/saulepisodes', {
    season,
    filtered,
    series: 'Better Call Saul',
  });
});

router.get('saulepisode', '/:season/:episode', async (ctx) => {
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
    series: 'Better Call Saul',
  });
});

module.exports = router;
