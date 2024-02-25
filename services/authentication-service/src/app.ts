import express from 'express';
import expressListRoutes from 'express-list-routes';
import * as env from './environment';
import { errorHandler, handleAuthCallback, handleAuthRedirect, helloWorld } from './controllers';
import { HttpError } from '@packages/http-utils';

const app = express();

app.use(errorHandler);

app.get('/api/hello_world', helloWorld);
app.get('/auth/:provider', handleAuthRedirect);
app.get('/auth/:provider/callback', handleAuthCallback);

expressListRoutes(app);

if (env.isDryRun()) {
	console.log('Dry run complete. Exiting...');
	process.exit(0); 
} else {
	app.listen(env.values.API_PORT, () => {
		console.log(`\nExpress listening on port: ${env.values.API_PORT}`);
	});
}

export default app;
