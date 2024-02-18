/**
 * Configuration for the environment inside the code base. This is the source
 * of truth for what environment variable the code base expects on start-up
 * and what environments are accessible to the runtime.
 * 
 * Follow the steps below to update the environment configuration.
 * 
 * Step 1: Add the variable to the type union
 *     - RequiredEnvironmentVariables, OR
 *     - OptionalEnvironmentVariables
 * 
 * Step 2: Write the description in either
 *     - REQUIRED_ENVIRONMENT_DESCRIPTION, OR
 *     - OptionalEnvironmentVariables
 * 
 * Incorrectly specifying this information can result in compile time errors
 * 
 * Failing to supply required environment variables results in a loud failure
 * when runtime starts.
 */


// START OF CONFIG / REGISTRY
export type RequiredEnvironmentVariables = 'API_PORT';
export type OptionalEnvironmentVariables = 'EXAMPLE';


export const REQUIRED_ENVIRONMENT_DESCRIPTION: RequiredEnvironment =  {
    API_PORT: 'The port rest-api will listen to.',
}

export const OPTIONAL_ENVIRONMENT_DESCRIPTION: OptionalEnvironment =  {
    EXAMPLE: 'This is how you would add and describe an optional variable.',
}
// END OF CONFIG / REGISTRY

// ----------------- DO NOT MODIFY THE CODE BELOW -----------------
export type RequiredEnvironment = Record<RequiredEnvironmentVariables, string>;
export type OptionalEnvironment = {
    [K in OptionalEnvironmentVariables]?: string;
};
export type Environment = RequiredEnvironment & OptionalEnvironment;