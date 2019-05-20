const Router = require('koa-router');

router = new Router();

router.get('/', async (ctx) => {

	return ctx.body = 'upload';
})

module.exports = router;