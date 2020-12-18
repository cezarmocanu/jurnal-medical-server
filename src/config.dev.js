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
  sync: true,
  force:false,
  database: 'jurnalmedical',
  username: 'adminjurnalmedical',
  password: 'password@JurnalMedical',
});

const production = createConfig({
  sync:true,
  force:true,
  production:true,
  database:'d5m0jcs8m1ot73',
  username:'wjfohyptxyemne',
  password:'df4083c61224745dee41a7f554b97b3e18f3acb72300c4d03aa88b1f2d36e1be',
  host:'ec2-54-84-98-18.compute-1.amazonaws.com'

})
module.exports = production;
