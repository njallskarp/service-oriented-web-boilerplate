import { Request, Response, NextFunction } from 'express';
import { GoogleAuthProvider } from './oauth-providers/google/google-auth-provider';
import { HttpError, StatusCodes } from '@packages/http-utils';

const providers = {
	google: new GoogleAuthProvider(),
};

type ProviderTypeUnion = keyof typeof providers;

export const helloWorld = (req: Request, res: Response) => {
	res.send('<h1>Hello, World</h1>');
};

export const errorHandler = (
	err: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	const message = err.message || 'Something went wrong on the server.';
	res.status(statusCode).send({ statusCode, message });
};

export const handleAuthRedirect = (req: Request, res: Response) => {
	const provider = req.params.provider;
	if (!(provider in providers)) {
		throw new HttpError(
			StatusCodes.NOT_FOUND,
			"'provider' parameter misisng"
		);
	}
	if (!(provider in providers)) {
		throw new HttpError(
			StatusCodes.NOT_FOUND,
			`'${provider}' is not a valid provider`
		);
	}
	const authProvider = providers[provider as ProviderTypeUnion];
	res.redirect(authProvider.getAuthUrl());
};

export const handleAuthCallback = async (req: Request, res: Response) => {
	const provider = req.params.provider;
	if (!(provider in providers)) {
		throw new HttpError(
			StatusCodes.NOT_FOUND,
			"'provider' parameter misisng"
		);
	}
	if (!(provider in providers)) {
		throw new HttpError(
			StatusCodes.NOT_FOUND,
			`'${provider}' is not a valid provider`
		);
	}
	const authProvider = providers[provider as ProviderTypeUnion];
	const tokens = await authProvider
		.getToken(req.query.code as string)
		.catch(() => {
			throw new HttpError(
				StatusCodes.FORBIDDEN,
				'Unable to authenticate with code'
			);
		});

	// TODO: handle tokens
	res.status(StatusCodes.OK).send({
		message: 'Authentication successful',
	});
};
