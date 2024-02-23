import { expect } from 'chai';
import sinon from 'sinon';
import {
	isDevelopmentEnvironment,
	isDryRun,
	isProductionEnvironment,
	isTestEnvironment,
} from './environment-checkers';
describe('Environment Detection Functions', function () {
	let originalEnv: NodeJS.ProcessEnv;

	this.beforeAll(() => {
		process.env.NODE_ENV = '';
		process.env.DRY_RUN = '';
		originalEnv = { ...process.env };
	});

	beforeEach(() => {
		process.env = originalEnv;
		sinon.stub(process.env, 'NODE_ENV').value('test');
		sinon.stub(process.env, 'DRY_RUN').value('');
	});

	describe('#isProductionEnvironment', function () {
		it('should return true if NODE_ENV is set to "production"', function () {
			sinon.stub(process, 'env').value({ NODE_ENV: 'production' });
			expect(isProductionEnvironment()).to.be.true;
		});

		it('should return false if NODE_ENV is not set to "production"', function () {
			sinon.stub(process, 'env').value({ NODE_ENV: 'development' });
			expect(isProductionEnvironment()).to.be.false;
		});
	});

	describe('#isTestEnvironment', function () {
		it('should return true if NODE_ENV is set to "test"', function () {
			sinon.stub(process, 'env').value({ NODE_ENV: 'test' });
			expect(isTestEnvironment()).to.be.true;
		});

		it('should return false if NODE_ENV is not set to "test"', function () {
			sinon.stub(process, 'env').value({ NODE_ENV: 'production' });
			expect(isTestEnvironment()).to.be.false;
		});
	});

	describe('#isDevelopmentEnvironment', function () {
		it('should return true if NODE_ENV is set to "development"', function () {
			sinon.stub(process, 'env').value({ NODE_ENV: 'development' });
			expect(isDevelopmentEnvironment()).to.be.true;
		});

		it('should return false if NODE_ENV is not set to "development"', function () {
			sinon.stub(process, 'env').value({ NODE_ENV: 'production' });
			expect(isDevelopmentEnvironment()).to.be.false;
		});
	});

	describe('#isDryRun', function () {
		it('should return true if DRY_RUN is set to "Y"', function () {
			sinon.stub(process, 'env').value({ DRY_RUN: 'Y' });
			expect(isDryRun()).to.be.true;
		});

		it('should return false if DRY_RUN is not set to "Y"', function () {
			sinon.stub(process, 'env').value({ DRY_RUN: 'N' });
			expect(isDryRun()).to.be.false;
		});
	});
});
