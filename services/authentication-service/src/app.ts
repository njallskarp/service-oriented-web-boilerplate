import express from 'express';
import expressListRoutes from 'express-list-routes';
import * as env from './environment';
import { handleAuthCallback, handleAuthRedirect, helloWorld } from './controllers';
import { ensureValidProvider, errorHandler } from './middleware';

const app = express();

app.get('/hello_world', helloWorld);
app.get('/auth/:provider', [ensureValidProvider], handleAuthRedirect);
app.get('/auth/:provider/callback', [ensureValidProvider], handleAuthCallback);

expressListRoutes(app);

if (env.isDryRun()) {
	console.log('Dry run complete. Exiting...');
	process.exit(0);
} else {
	app.listen(env.values.API_PORT, () => {
		console.log(`\nExpress listening on port: ${env.values.API_PORT}`);
	});
}

app.use(errorHandler);

export default app;
