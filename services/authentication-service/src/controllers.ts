import { Request, Response, NextFunction } from 'express';
import * as env from './environment';
import { HttpError, StatusCodes } from '@packages/http-utils';
import jwt from 'jsonwebtoken';
import { providers } from './provider-registry';

type ProviderTypeUnion = keyof typeof providers;

export const helloWorld = (req: Request, res: Response) => {
	res.send('<h1>Hello, World</h1>');
};

export const handleAuthRedirect = (req: Request, res: Response) => {
	const provider = req.params.provider;
	const authProvider = providers[provider as ProviderTypeUnion];
	res.redirect(authProvider.getAuthUrl());
};

export const handleAuthCallback = async (req: Request, res: Response) => {
	const provider = req.params.provider;
	const authProvider = providers[provider as ProviderTypeUnion];
	const tokenData = await authProvider.getToken(req.query.code as string).catch((e) => {
		throw new HttpError(StatusCodes.FORBIDDEN, 'Unable to authenticate with code');
	});

	const decodedUserData = jwt.decode(tokenData.idToken);

	// TODO: upsert the user

	// TODO: create session

	// TODO: create access & refresh tokens

	// TODO: set cookies

	res.redirect(`${env.values.WEB_APP_URL}/auth/success`);
};
