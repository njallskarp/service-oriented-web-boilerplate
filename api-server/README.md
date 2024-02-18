
## Prisma quickstart 
[LINK](https://www.prisma.io/docs/getting-started/quickstart)

## Prisma CLI install
```shell
npm install -g prisma
```

## Install Postgres (mac)

```shell
brew install postgresql
```

## Start Posgres (mac)
```shell
brew services start postgresql
```

## Create a DB
```shell
createdb myproject
```

## Access PSQL shell
```shell
psql -d myproject
```

## Connection String
Usually something like

`postgresql://user:password@localhost:5432/myproject`

## Run migrations in dev environment
```shell
npx prisma migrate dev --name init
```

## Run Prisma UI
```shell
npx prisma studio
```