module.exports.parseEnvsConfig = function (config) {
  const output = {
    envs: []
  }

  config.envs.forEach(env => {
    const envConfig = {
      name: env,
      configUrl: config.envConfigUrl + env + "/kustomization.yaml",
      services: Object.keys(config.services)
      .sort()
      .map(serviceName => {
        const serviceConfig = config.services[serviceName]
        const serviceUrl = serviceConfig.url.replace('{{ENV}}', env)

        return {
          name: serviceName,
          branch: config.services[serviceName]?.developmentBranch,
          appUrl: serviceUrl,
          appHealthUrl: serviceConfig.health ? serviceConfig.health.replace('{{ENV}}', env) : serviceUrl + config.servicePaths.health,
          appInfoUrl: serviceConfig.info ? serviceConfig.info.replace('{{ENV}}', env) : serviceUrl + config.servicePaths.info,
          repositoryUrl: serviceConfig.repository + '/commits/branch/' + serviceConfig?.developmentBranch,
          jenkinsUrl: serviceConfig.jenkins,
          swaggerUrl: serviceUrl + config.servicePaths.swagger,
          logs: encodeURI(config.envAppLogsUrl.replace('{{APP}}', serviceName).replace('{{ENV}}', env))
        }
      })
    }
    output.envs.push(envConfig)
  })

  return output

}