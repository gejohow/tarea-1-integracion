const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const bbseasons = require('./routes/bbseasons');
const saulseasons = require('./routes/saulseasons');
const search = require('./routes/search');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    charactersPath: ctx.router.url('search'),
    showCharacterPath: (name) => ctx.router.url('character', { name }),
  });
  return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/bbseasons', bbseasons.routes());
router.use('/saulseasons', saulseasons.routes());
router.use('/search', search.routes());

module.exports = router;
