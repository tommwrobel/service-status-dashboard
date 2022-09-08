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

export interface Environment {
    name: string;
    configUrl: string;
    services: Service[];
};

export interface Config {
    envs: Environment[];
};

export interface HealthCheck {
    success: boolean;
    body?: Object;
    error?: Object;
};

export interface ServiceInfoResponse {
    success: boolean;
    body?: ServiceInfo;
    error?: Object;
};

export interface ServiceInfo {
    git: GitInfo;
    build: BuildInfo;
};

export interface GitInfo {
    branch: string;
    commit: CommitInfo;
};

export interface CommitInfo {
    id: string;
    time: string;
};

export interface BuildInfo {
    artifact: string;
    name: string;
    time: string;
    version: string;
    group: string;
};

export interface ExampleInfo {
    id: number;
    name: string;
};

export type Nullable<T> = null | T;
export type Maybe<T> = T | undefined;
