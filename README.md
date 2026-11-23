# João & Isabella

Página romântica estática criada para o GitHub Pages.

## Visualizar localmente

Com Node.js instalado:

```powershell
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((q,r)=>{let p='.'+decodeURIComponent(new URL(q.url,'http://localhost').pathname);if(p==='./')p='./index.html';let f=path.resolve(p);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end('Not found')}else{let e=path.extname(f).toLowerCase(),m={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpeg':'image/jpeg','.jpg':'image/jpeg','.png':'image/png'};r.writeHead(200,{'Content-Type':m[e]||'application/octet-stream'});r.end(d)}})}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'))"
```

Depois abra `http://127.0.0.1:4173`.

## Estrutura

- `index.html`: conteúdo e estrutura da história
- `assets/css/styles.css`: visual, responsividade e animações
- `assets/js/main.js`: estrelas, revelações e celebração
- `assets/images`: fotos usadas pela página

## Publicar no GitHub Pages

1. Faça commit e push da branch `main`.
2. Abra **Settings > Pages** no repositório.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha `main` e a pasta `/ (root)`.
5. Aguarde a publicação em `https://jhunhoff.github.io/`.

Esta página não utiliza backend, banco de dados ou processo de build.