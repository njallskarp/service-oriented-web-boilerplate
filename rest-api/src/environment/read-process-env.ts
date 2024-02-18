import { Environment, OptionalEnvironmentVariables, REQUIRED_ENVIRONMENT_DESCRIPTION, OPTIONAL_ENVIRONMENT_DESCRIPTION, RequiredEnvironmentVariables } from "./config"
import { exit } from "process";
import dotenv from "dotenv";


const getRequiredEnvValue = (key: RequiredEnvironmentVariables): string => {
    if(!(key in process.env)){
        console.error(`Stopping process. Please add '${key}' (${REQUIRED_ENVIRONMENT_DESCRIPTION[key as RequiredEnvironmentVariables]}) to your environment.`)
        exit(1)
    }
    return process.env[key] as string;
}


const getOptionalEnvValue = (key: OptionalEnvironmentVariables): string | undefined => {
    if(!(key in process.env)){
        console.warn(`Optional environment variable  not found: '${key}' (${REQUIRED_ENVIRONMENT_DESCRIPTION[key as RequiredEnvironmentVariables]}).`)
    }
    return process.env[key];
}


export const readEnvironment = (envFilePath: string | undefined = undefined): Environment => {

    if(envFilePath){
        dotenv.config({
            path: envFilePath
        })
    }
    
    const output: Partial<Environment> = {};

    for(const key in REQUIRED_ENVIRONMENT_DESCRIPTION){
        output[key as RequiredEnvironmentVariables] = getRequiredEnvValue(key as RequiredEnvironmentVariables);
    }

    for(const key in OPTIONAL_ENVIRONMENT_DESCRIPTION){
        output[key as OptionalEnvironmentVariables] = getOptionalEnvValue(key as OptionalEnvironmentVariables);
    }

    return output as Environment;
}