import { Environment } from "./config"
import { readEnvironment } from "./read-process-env"
import { exit } from "process";

enum Environments {
    PRODUCTION = 'production',
    TEST = 'test',
    DEVELOPMENT = 'development'
}

export const isProductionEnvironment = (): boolean => {
    return process.env.NODE_ENV === Environments.PRODUCTION;
}

export const isTestEnvironment = (): boolean => {
    return process.env.NODE_ENV === Environments.TEST;
}

export const isDevelopmentEnvironment = (): boolean => {
    return process.env.NODE_ENV === Environments.TEST
}

const TEST_ENV_FILE_PATH = ".env.test";

export const getEnvironment = (): Environment => {
    // development environment is supplied to NODE_ENV by docker-compose
    if(isDevelopmentEnvironment()){
        return readEnvironment();
    }
    // testing environment reads from an .env.test file
    else if (isTestEnvironment()){
        return readEnvironment(TEST_ENV_FILE_PATH);
    }
    // production environment is supplied by IaC
    else if (isProductionEnvironment()){
        return readEnvironment();
    }
    // exit if environment is unknown
    console.error(`Unknown environment specified ${process.env.NODE_ENV}`);
    exit(1);
}