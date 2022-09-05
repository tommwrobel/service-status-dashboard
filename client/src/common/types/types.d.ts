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
    services: ServiceType[]
}

export type Config = {
    envs: EnvType[]
}

export type HealthCheck = {
    success: boolean,
    body?: Object,
    error?: Object
}
