# Example Util

This is an example of a package that can be reused across services.

## Build

To build the package run the following command:

```shell
yarn build
```

## How to include in services

To include this package in a service, add the following line to your package.json under dependencies

```json
{
	"dependencies": {
		"@packages/example-util": "*"
	}
}
```

Then ensure that you `cd` into the service from the root of the monorepo.

```shell
cd services/<name-of-service>
```

Lastly run `yarn` in order to install the dependency

```shell
yarn
```
