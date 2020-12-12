const createConfig = ({ port, sync, database, username, password } = {}) => {
  if (!database || !username || !password) {
    throw new Error(
      'CONFIG ERROR ---->\n *Database credidential are not defined corectly, please check config'
    );
  }

  return {
    port: process.env.PORT || port || 8080,
    sync: sync || false,
    database,
    username,
    password,
  };
};

const config = createConfig({
  sync: false,
  force: true,
  database: 'jurnalmedical',
  username: 'adminjurnalmedical',
  password: 'password@JurnalMedical',
});

module.exports = config;
