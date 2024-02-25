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
});
