import sqlite from 'react-native-sqlite-storage';

sqlite.DEBUG(true);
sqlite.enablePromise(true);

const database_name = 'catatan_kas.db';
const database_version = '1.0';
const database_displayname = 'Catatan Kas SQLite Database';
const database_size = 200000;

export default class Database {
  async initDb() {
    let db;
    return new Promise(async resolve => {
      console.log('Plugin integrity check....');
      sqlite
        .echoTest()
        .then(async () => {
          console.log('Integrity check passed ...');
          console.log('Opening database ...');
          await sqlite
            .openDatabase(
              database_name,
              database_version,
              database_displayname,
              database_size,
            )
            .then(DB => {
              db = DB;
              console.log('Database OPEN');
              resolve(db);
            })
            .catch(err => {
              console.log('error = ' + err);
            });
        })
        .catch(() => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  async getDataUser() {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, nama_user VARCHAR(30))',
            );
          })
            .then(async () => {
              db.transaction(async tx => {
                await tx
                  .executeSql('SELECT * FROM user', [])
                  .then(([tx, res]) => {
                    if (res.rows.length !== 0) {
                      // console.log('res = ' + JSON.stringify(res.rows.item(0)));
                      const row = res.rows.item(0);
                      const {nama_user} = row;
                      const data_user = {
                        nama_user: nama_user,
                        user_logged_in: true,
                      };
                      resolve(data_user);
                      // this.closeDatabase(db);
                    }
                  });
              }).then(() => {
                this.closeDatabase(db);
              });
            })
            .catch(er => {
              console.log(er);
            });
        })
        .catch(er => {
          console.log(er);
        });
    });
  }

  async addDataUser(data) {
    console.log('nama = ' + data.nama);
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(async db => {
          resolve('hit');
          db.transaction(async tx => {
            await tx
              .executeSql(
                'INSERT INTO user (nama_user) VALUES (?)',
                [data.nama],
                (tx, res) => {
                  if (res) {
                    console.log('Success Inserted = ' + res);
                    return res;
                  }
                },
              )
              .catch(err => {
                console.log('error when insert user = ' + err);
              });
          })
            .then(() => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log('err 1 = ' + JSON.stringify(err));
            });
        })
        .catch(err => {
          console.log('err = ' + err);
        });
    });
  }

  async closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }
}
