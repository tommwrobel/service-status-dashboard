import { TableDataRow } from "../components/AutoTable/AutoTableTypes";

export type ServiceStatus = "UP" | "DOWN" | undefined;
export type DataStatus = "success" | "error" | "loading" | "idle" | undefined;
export type BranchType = "release" | "develop" | "feature" | "bugfix" | "other";

export type Nullable<T> = null | T;
export type Maybe<T> = T | undefined;

export interface Service extends TableDataRow {
    name: string,
    branch: string,
    appUrl: string,
    appHealthUrl: string,
    appInfoUrl: string,
    repositoryUrl: string,
    swaggerUrl: string,
    jenkinsUrl: string,
    status?: ServiceStatus,
    buildInfo?: ServiceInfo,
};

export interface ServiceRow extends Service {
    statusDataStatus?: DataStatus,
    buildInfoDataStatus?: DataStatus,
    refreshServiceData?: () => void,
}

export interface Environment {
    name: string,
    configUrl: string,
    services: Service[],
};

export interface Config {
    envs: Environment[],
};

export interface HealthCheck {
    success: boolean,
    body?: object,
    error?: object,
};

export interface ServiceInfoResponse {
    success: boolean,
    body?: ServiceInfo,
    error?: object,
};

export interface ServiceInfo {
    git: GitInfo,
    build: BuildInfo,
};

export interface GitInfo {
    branch: string,
    commit: CommitInfo,
};

export interface CommitInfo {
    id: string,
    time: string,
};

export interface BuildInfo {
    artifact: string,
    name: string,
    time: string,
    version: string,
    group: string,
};
