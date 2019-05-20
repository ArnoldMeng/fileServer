const Router = require('koa-router');

const fileRouter = require('./file');
const pageRouter = require('./page');

const router = new Router();

router.use('/file', fileRouter.routes(), fileRouter.allowedMethods());
router.use('/dashboard', pageRouter.routes(), pageRouter.allowedMethods());

module.exports = router;


