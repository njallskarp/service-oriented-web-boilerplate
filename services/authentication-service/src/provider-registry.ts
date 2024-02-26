import { GoogleAuthProvider } from './oauth-providers';

/**
 * A registry of available authentication providers for the application. This object maps
 * provider names to their corresponding instances. Each provider is an instance of a class
 * that implements the `AuthProvider` interface, providing methods for authentication
 * processes such as generating authentication URLs, exchanging authorization codes for tokens,
 * and retrieving user profile information from the provider's servers.
 *
 * Currently supported providers:
 * - google: An instance of `GoogleAuthProvider` for Google OAuth2 authentication.
 */
export const providers = {
	google: new GoogleAuthProvider(),
};
