export declare type ServiceStatus = "Unknown" | "Success" | "Failed";

export type Service = {
    name: string,
    branch: string,
    appUrl: string,
    appHealthUrl: string,
    appInfoUrl: string,
    repositoryUrl: string,
    swaggerUrl: string,
    jenkinsUrl: string
}

export type Environment = {
    name: string,
    configUrl: string,
    services: Service[]
}

export type Config = {
    envs: Environment[]
}

export type HealthCheck = {
    success: boolean,
    body?: Object,
    error?: Object
}
