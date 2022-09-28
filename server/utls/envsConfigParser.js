module.exports.parseEnvsConfig = function (config) {
    const output = {
        envs: []
    }

    const environments = Object.keys(config.envs)

    environments.forEach(env => {
        const envConfig = {
            name: env,
            configUrl: config.envConfigUrl + env,
            services: Object.keys(config.envs[env]).map(serviceName => ({
                name: serviceName,
                branch: config.services[serviceName]?.branch,
                appUrl: config.envs[env][serviceName],
                appHealthUrl: config.envs[env][serviceName] + config.servicePaths.health,
                appInfoUrl: config.envs[env][serviceName] + config.servicePaths.info,
                repositoryUrl: config.services[serviceName].repository + '/commits/branch/' + config.services[serviceName]?.branch,
                jenkinsUrl: config.services[serviceName].jenkins,
                swaggerUrl: config.envs[env][serviceName] + config.servicePaths.swagger
            }))
        }
        output.envs.push(envConfig)
    })

    return output

}