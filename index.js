
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');

const rootRouter = require('./routes')


const app = new Koa();
app.use(cors());

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 10*1024*1024	// 设置上传文件大小最大限制，默认2M
    }
}));

app.use(rootRouter.routes()).use(rootRouter.allowedMethods())

const port = 8123;
app.listen(port, ()=>{
    console.log(`koa is listening in ${port}`);
})