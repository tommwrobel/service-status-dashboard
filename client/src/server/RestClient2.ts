import { Config, HealthCheck } from "../types/types";

const JSON_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const getEnvironmentsConfig = (): Promise<Config> => {
    return new Promise<Config>((resolve, reject) => {
        fetch('/api/envs-config')
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export const getServiceHealthStatus = (appHealthUrl: string): Promise<HealthCheck> => {
    return new Promise<HealthCheck>((resolve, reject) => {
        fetch('/api/send-request', {method: 'POST', headers: JSON_HEADERS, body: JSON.stringify({url: appHealthUrl})})
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export const getServiceInfo = (appInfoUrl: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        fetch('/api/send-request', {method: 'POST', headers: JSON_HEADERS, body: JSON.stringify({url: appInfoUrl})})
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}