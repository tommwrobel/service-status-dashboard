export declare type ServiceStatus = "Unknown" | "Success" | "Failed";

export type Service = {
    name: string;
    branch: string;
    appUrl: string;
    appHealthUrl: string;
    appInfoUrl: string;
    repositoryUrl: string;
    swaggerUrl: string;
    jenkinsUrl: string;
};

export type Environment = {
    name: string;
    configUrl: string;
    services: Service[];
};

export type Config = {
    envs: Environment[];
};

export type HealthCheck = {
    success: boolean;
    body?: Object;
    error?: Object;
};

export type ServiceInfoResponse = {
    success: boolean;
    body?: ServiceInfo;
    error?: Object;
};

export type ServiceInfo = {
    git: GitInfo;
    build: BuildInfo;
};

export type GitInfo = {
    branch: string;
    commit: CommitInfo;
};

export type CommitInfo = {
    id: string;
    time: string;
};

export type BuildInfo = {
    artifact: string;
    name: string;
    time: string;
    version: string;
    group: string;
};

export type Nullable<T> = null | T;
export type Maybe<T> = T | undefined;
