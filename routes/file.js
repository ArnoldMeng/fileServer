const Router = require('koa-router');
const fs = require('fs');
const path = require('path')
const send = require('koa-send');

router = new Router();

const saveDir = path.join(__dirname, '..', 'uploaded/');

router.post('/upload', async (ctx) => {
    const file = ctx.request.files.file;	// 获取上传文件
    console.log(file)
	const reader = fs.createReadStream(file.path);	// 创建可读流
    const ext = file.name.split('.').pop();		// 获取上传文件扩展名
    const saveName = `${Date.now().toString()}.${ext}`;
    const savePath = path.join(saveDir, saveName);
	const upStream = fs.createWriteStream(savePath);		// 创建可写流
	reader.pipe(upStream);	// 可读流通过管道写入可写流
	return ctx.body = {
        message: 'success',
        name: saveName,
    };
})

router.get('/download/:name', async (ctx, next) => {
    const name = ctx.params.name;
    const filePath = path.join(saveDir, name);
    console.log(name, saveDir, filePath);
    ctx.attachment(filePath);
    await send(ctx, name, { root: saveDir });
})

module.exports = router;