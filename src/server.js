const http = require('http');
const os = require('os');

const HEADLINE    = 'Hello from OpenShift';
const ENVIRONMENT = process.env.ENVIRONMENT || 'local';
const COLOR       = process.env.COLOR || '#0b6e4f';
const inCluster   = Boolean(process.env.KUBERNETES_SERVICE_HOST);
const VERSION     = process.env.npm_package_version || '0.0.0';

http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200); return res.end('ok');
  }

  const podLine = inCluster
    ? `<p style="opacity:.6;font-size:.85rem;font-family:monospace">Pod: ${os.hostname()}</p>`
    : '';

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<!DOCTYPE html><html><head><meta charset="utf-8">
    <meta http-equiv="refresh" content="5"><title>Demo App - ${ENVIRONMENT}</title></head>
    <body style="margin:0;height:100vh;display:flex;align-items:center;
                 justify-content:center;background:${COLOR};color:#fff;
                 font-family:Helvetica,Arial,sans-serif;text-align:center">
      <div>
        <p style="font-size:3.5rem;font-weight:800;margin:0;text-transform:uppercase;
                  letter-spacing:-0.02em">${ENVIRONMENT}</p>
        <h1 style="font-size:1.6rem;font-weight:300;margin:1rem 0 .5rem">${HEADLINE}</h1>
        <p style="font-size:1rem;opacity:.85;margin:0 0 2rem">version ${VERSION}</p>
        ${podLine}
      </div>
    </body></html>`);
}).listen(8080, () => console.log('listening on 8080'));
