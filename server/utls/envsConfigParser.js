module.exports.parseEnvsConfig = function (config) {
    const output = {
        envs: []
    }

    config.envs.forEach(env => {
        const envConfig = {
            name: env,
            configUrl: config.envConfigUrl + env,
            services: Object.keys(config.services)
            .sort()
            .map(serviceName => ({
                name: serviceName,
                branch: config.services[serviceName]?.branch,
                appUrl: config.services[serviceName].url.replace('{{ENV}}', env),
                appHealthUrl: config.services[serviceName].url.replace('{{ENV}}', env) + config.servicePaths.health,
                appInfoUrl: config.services[serviceName].url.replace('{{ENV}}', env) + config.servicePaths.info,
                repositoryUrl: config.services[serviceName].repository + '/commits/branch/' + config.services[serviceName]?.branch,
                jenkinsUrl: config.services[serviceName].jenkins,
                swaggerUrl: config.services[serviceName].url.replace('{{ENV}}', env) + config.servicePaths.swagger,
                logs: encodeURI(config.envAppLogsUrl.replace('{{APP}}', serviceName).replace('{{ENV}}', env))
            }))
        }
        output.envs.push(envConfig)
    })

    return output

}