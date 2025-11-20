// eslint-disable-next-line @typescript-eslint/no-var-requires
const typeorm = require('typeorm');

let config;

try {
  config = require('./src/configs/database/type-orm-configuration');
} catch (e) {
  config = require('./dist/configs/database/type-orm-configuration');
}

const dataSourceOptions = config.TypeOrmConfigurationStatic.staticConfig;

const connection = new typeorm.DataSource(dataSourceOptions);

module.exports = [connection];
