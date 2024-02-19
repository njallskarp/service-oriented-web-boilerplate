import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Endpoints', () => {
	describe('GET /api/hello_world', () => {
		it('should return Hello, World', (done) => {
			chai.request(app)
				.get('/api/hello_world')
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res).to.be.html;
					expect(res.text).to.equal('<h1>Hello, World</h1>');
					done();
				});
		});
	});

	describe('GET /api/v1/items', () => {
		it('should return a list of items', (done) => {
			chai.request(app)
				.get('/api/v1/items')
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.equal(3);
					expect(res.body).to.deep.include({ name: 'Pencil', id: 1 });
					done();
				});
		});
	});
});
