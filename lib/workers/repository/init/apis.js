const { initPlatform } = require('../../../platform');
const { detectSemanticCommits } = require('./semantic');

function assignPlatform(config) {
  logger.debug('assignPlatform');
  initPlatform(config.platform);
  return config;
}

async function getPlatformConfig(config) {
  const platformConfig = await platform.initRepo(
    config.repository,
    config.token,
    config.endpoint
  );
  return {
    ...config,
    ...platformConfig,
  };
}

async function initApis(input, token) {
  let config = { ...input, token };
  config = await assignPlatform(config);
  config = await getPlatformConfig(config);
  config = await detectSemanticCommits(config);
  return config;
}

module.exports = {
  initApis,
};
