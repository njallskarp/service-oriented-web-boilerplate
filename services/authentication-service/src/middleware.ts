import { HttpError, StatusCodes } from '@packages/http-utils';
import { type Request, type Response, type NextFunction } from 'express';
import { providers } from './provider-registry';
import * as env from './environment';

export const ensureValidProvider = (req: Request, res: Response, next: NextFunction): void => {
	const provider = req.params.provider;
	if (!(provider in providers)) {
		throw new HttpError(StatusCodes.NOT_FOUND, "'provider' parameter misisng");
	}
	if (!(provider in providers)) {
		throw new HttpError(StatusCodes.NOT_FOUND, `'${provider}' is not a valid provider`);
	}
	next();
};

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
	console.error(err.stack);
	res.redirect(`${env.values.WEB_APP_URL}/auth/error`);
};
