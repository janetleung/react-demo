var Koa = require('koa')
var fs = require('fs')

var app = new Koa()

app.use(async (ctx, next) => {
  let {url} = ctx.request
  if (url.indexOf('/dist/') !== -1) {
    let slashIndex = url.lastIndexOf('/')
    let filename = url.substring(slashIndex)
    let fileType = url.substring(url.lastIndexOf('.') + 1)
    let file = fs.readFileSync(`./dist/${filename}`, 'utf8')
    ctx.type = `text/${fileType}`
    ctx.body = file
  } else {
    let html = fs.readFileSync('./dist/index.html', 'utf8')
    ctx.body = html
  }
})

app.listen(3000)
console.log('listening....')
