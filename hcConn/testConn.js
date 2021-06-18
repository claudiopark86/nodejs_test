var hana = require('@sap/hana-client');
var conn = hana.createConnection();
var key;
var conn_params = {
  serverNode  : '2533a236-5b48-4671-8208-c47a4a343e22.hana.canary-eu10.hanacloud.ondemand.com:443',
  uid         : 'dbadmin',
  pwd         : 'Sap12345',
//  sslCryptoProvider: 'commoncrypto',
  sslValidateCertificate: true,
  encrypt: true
};

conn.connect(conn_params, function(err) {
  if (err) throw err;

  conn.exec('SELECT CURRENT_TIMESTAMP FROM DUMMY;', function (err, result) {
    if (err) throw err;
    console.log('Row: ', result);  
  })
  conn.exec('SELECT CURRENT_CONNECTION FROM DUMMY;', function (err, result) {
    if (err) throw err;
    console.log('Row: ', result);  
  })
  conn.exec('SELECT * FROM M_HOST_INFORMATION WHERE KEY IN (\'container\',\'build_branch\');', function (err, result) {
    if (err) throw err;
    console.log('Row: ', result);  
  })
  conn.exec('SELECT * FROM M_CONNECTIONS WHERE CONNECTION_ID = CURRENT_CONNECTION', function (err, result) {
    if (err) throw err;
    console.log('Row: ', result);  
  })  

});
conn.disconnect();