import { Application, Router } from 'https://deno.land/x/oak@v12.6.1/mod.ts'
import { bundle } from 'https://deno.land/x/emit@0.31.4/mod.ts'
import { load } from 'https://deno.land/x/eszip@v0.55.4/loader.ts'

const app = new Application()
const router = new Router()

router.get(`/x/:mod(.*@.*)`, async (ctx) => {
  const mod = ctx.params.mod
  const url = new URL('https://deno.land/x/' + mod)
  const { code } = await bundle(url, { load })

  ctx.response.headers.append(
    'Content-Type',
    'application/javascript; charset=utf-8',
  )
  ctx.response.headers.append('Access-Control-Allow-Origin', '*')
  ctx.response.body = code
})

router.get(`/`, (ctx) => {
  ctx.response.redirect('https://github.com/youpy/deno-emit-proxy')
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })
