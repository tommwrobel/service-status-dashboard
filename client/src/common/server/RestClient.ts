import { ConfigType, ErrorHealthCheck, SuccessHealthCheck } from "../../react-app-env";

export const getEnvironmentsConfig = (): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(getConfig()), Math.random() * 2000)
    })
}

export const getServiceHealthStatus = (appHealthUrl: string): Promise<any> => {
    return new Promise<any>((resolve) => {
        setTimeout(() => resolve(getHealth()), Math.random() * 1000)
    })
}

export const getServiceInfo = (appInfoUrl: string): Promise<any> => {
    return new Promise((resolve) => {
            setTimeout(() => resolve(getInfo()), Math.random() * 1000)
    })
}


function getConfig(): ConfigType {
    return {
        "envs": [
            {
                "name": "environment1",
                "configUrl": "https://bitbucket.org/exampleai/environments/src/main/qa/qa-environment1",
                "services": [
                    {
                        "name": "file-manager",
                        "branch": "develop",
                        "appUrl": "https://file-manager.qa-environment1example.com",
                        "appHealthUrl": "https://file-manager.qa-environment1example.com/meta/health",
                        "appInfohUrl": "https://file-manager.qa-environment1example.com/meta/info",
                        "repositoryUrl": "https://bitbucket.org/exampleai/file-manager/commits/branch/develop",
                        "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/file-manager",
                        "swaggerUrl": "https://file-manager.qa-environment1example.com/swagger-ui/index.html#"
                    },
                    {
                        "name": "payment-gateway",
                        "branch": "master",
                        "appUrl": "https://payment-gateway.qa-environment1example-payroll-02example.com",
                        "appHealthUrl": "https://payment-gateway.qa-payroll-02example.com/meta/health",
                        "appInfohUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
                        "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
                        "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
                        "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
                    },
                    {
                        "name": "onboarding",
                        "branch": "master",
                        "appUrl": "https://payment-gateway.qa-environment1example-onboarding-02example.com",
                        "appHealthUrl": "https://payment-gateway.qa-payroll-02example.com/meta/health",
                        "appInfohUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
                        "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
                        "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
                        "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
                    },
                    {
                        "name": "notification-api",
                        "branch": "master",
                        "appUrl": "https://payment-gateway.qa-notification-02example.com",
                        "appHealthUrl": "https://payment-gateway.qa-payroll-02example.com/meta/health",
                        "appInfohUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
                        "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
                        "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
                        "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
                    },
                    {
                        "name": "document-manager",
                        "branch": "master",
                        "appUrl": "https://payment-gateway.qa-payroll-document.com",
                        "appHealthUrl": "https://payment-gateway.qa-payroll-02example.com/meta/health",
                        "appInfohUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
                        "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
                        "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
                        "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
                    },
                    {
                        "name": "card-management-system",
                        "branch": "master",
                        "appUrl": "https://payment-gateway.qa-payroll-card.com",
                        "appHealthUrl": "https://payment-gateway.qa-payroll-02example.com/meta/health",
                        "appInfohUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
                        "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
                        "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
                        "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
                    },
                ]
            },
            {
                "name": "qa-environment2",
                "configUrl": "https://bitbucket.org/exampleai/environments/src/main/qa/qa-environment2",
                "services": [
                    {
                        "name": "payment-gateway",
                        "branch": "master",
                        "appUrl": "https://payment-gateway.qa-environment2-payroll-02example.com",
                        "appHealthUrl": "https://payment-gateway.qa-payroll-02example.com/meta/health",
                        "appInfohUrl": "https://payment-gateway.qa-payroll-02example.com/meta/info",
                        "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
                        "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
                        "swaggerUrl": "https://payment-gateway.qa-payroll-02example.com/swagger-ui/index.html#"
                    },
                    {
                        "name": "file-manager",
                        "branch": "develop",
                        "appUrl": "https://file-manager.qa-payroll-02example.com",
                        "appHealthUrl": "https://file-manager.qa-payroll-02example.com/meta/health",
                        "appInfohUrl": "https://file-manager.qa-payroll-02example.com/meta/info",
                        "repositoryUrl": "https://bitbucket.org/exampleai/file-manager/commits/branch/develop",
                        "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/file-manager",
                        "swaggerUrl": "https://file-manager.qa-payroll-02example.com/swagger-ui/index.html#"
                    }
                ]
            },
            {
                "name": "qa-environment3",
                "configUrl": "https://bitbucket.org/exampleai/environments/src/main/qa/qa-environment3",
                "services": [
                    {
                        "name": "payment-gateway",
                        "branch": "master",
                        "appUrl": "https://payment-gateway.qa-environment3example.com",
                        "appHealthUrl": "https://payment-gateway.qa-environment3example.com/meta/health",
                        "appInfohUrl": "https://payment-gateway.qa-environment3example.com/meta/info",
                        "repositoryUrl": "https://bitbucket.org/exampleai/payment-gateway/commits/branch/master",
                        "jenkinsUrl": "https://jenkins.example.ai/job/applications/job/payment-gateway",
                        "swaggerUrl": "https://payment-gateway.qa-environment3example.com/swagger-ui/index.html#"
                    }
                ]
            }
        ]
    }
}

function getHealth(): SuccessHealthCheck | ErrorHealthCheck {
    const ok = {
        success: true, body: {
            "status": "UP",
            "groups": [
                "liveness",
                "readiness"
            ]
        }
    }
    const error = {success: false, error: {"message": "service unavailable"}}
    return getRandomItem([ok, error])
}

function getInfo() {
    const ok = {
        success: true, body: {
            "git": {
                "branch": "develop",
                "commit": {
                    "id": "ee88" + Math.floor(Math.random() * 10000),
                    "time": new Date().toISOString()
                }
            },
            "build": {
                "artifact": "application",
                "name": "application",
                "time": "2022-08-29T11:41:54.530Z",
                "version": "1.0-SNAPSHOT",
                "group": "com.example"
            }
        }
    }
    const error = {success: false, error: {"message": "service unavailable"}}
    return getRandomItem([ok, error])
}

function getRandomItem(items: any[]) {
    return items[Math.floor(Math.random() * items.length)];
}