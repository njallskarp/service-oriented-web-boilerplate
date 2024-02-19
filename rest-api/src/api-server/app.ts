import express from 'express';
import expressListRoutes from 'express-list-routes';
import * as env from '@env/environment';

const app = express();

app.get('/api/hello_world', (req, res) => {
	res.send('<h1>Hello, World</h1>');
});

app.get('/api/v1/items', (req, res) => {
	res.send([
		{
			name: 'Pencil',
			id: 1,
		},
		{
			name: 'Apple',
			id: 2,
		},
		{
			name: 'T-shirt',
			id: 3,
		},
	]);
});

console.log('Express Routes:');
expressListRoutes(app);

app.listen(env.values.API_PORT, () => {
	console.log(`\nExpress listening on port: ${env.values.API_PORT}`);
});
