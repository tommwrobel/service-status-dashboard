export enum ServiceStatus {
    Unknow = 'Unknow',
    Success = 'Success',
    Failed = 'Failed',
}

export type ServiceType = {
    name: string,
    branch: string,
    appUrl: string,
    appHealthUrl: string,
    appInfohUrl: string,
    repositoryUrl: string,
    swaggerUrl: string,
    jenkinsUrl: string
}

export type EnvType = {
    name: string,
    configUrl: string,
    services: ServiceType[]
}

export type ConfigType = {
    envs: EnvType[]
}

export type HealthCheck = {
    success: boolean,
    body?: Object,
    error?: Object
}

