import { HttpError, StatusCodes } from '@packages/http-utils';
import { type Request, type Response, type NextFunction } from 'express';
import { providers } from './provider-registry';
import * as env from './environment';

/**
 * Middleware to ensure that the provider specified in the request parameters is valid.
 * It checks if the provider exists in the `providers` registry. If the provider does not
 * exist, it throws an HttpError with a 404 status code. If the provider is valid, it calls
 * the next middleware in the stack.
 *
 * @param req - The Express request object, containing the client's request information.
 * @param res - The Express response object, for sending a response to the client.
 * @param next - The callback function to pass control to the next middleware function.
 * @throws {HttpError} - Throws an error if the provider parameter is missing or invalid.
 */
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

/**
 * Global error handling middleware for Express applications. It logs the error stack
 * and redirects the user to a generic error page. This middleware function is intended
 * to catch and handle any uncaught errors that occur during request processing.
 *
 * @param err - The HttpError object representing the error that occurred.
 * @param req - The Express request object, containing the client's request information.
 * @param res - The Express response object, used to redirect the client to the error page.
 * @param next - The callback function to pass control to the next middleware function. Not used here but required by Express' error handling middleware signature.
 */
export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
	console.error(err.stack);
	res.redirect(`${env.values.WEB_APP_URL}/auth/error`);
};
