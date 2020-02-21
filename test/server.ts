import 'zone.js/dist/zone-node';
import 'core-js/es/reflect';
 import 'core-js/stable/reflect'; 
 import 'core-js/features/reflect';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { provideModuleMap, MODULE_MAP } from '@nguniversal/module-map-ngfactory-loader';


// The Express app is exported so that it can be used by serverless Functions.
const app = express();
const distFolder = join(process.cwd(), 'dist/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
const port = process.env.PORT || 4000;

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
  providers: [
    {
      provide: MODULE_MAP,
      useValue: 'lazy'
    }
  ]
}));

app.set('view engine', 'html');
app.set('views', distFolder);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(indexHtml, { req });
});
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});