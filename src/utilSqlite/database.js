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

  async insertDataTransaksi({
    id_user,
    transaksi,
    jenisTransaksi,
    kategori,
    nominal,
    deskripsi,
    date,
    time
  }) {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS transaksi (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), transaksi VARCHAR(15), jenis_transaksi VARCHAR(20), kategori VARCHAR(50), nominal INTEGER(100), description TEXT, tanggal_transaksi DATE, waktu_transaksi TIME)',
            );
          }).then(async () => {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  'INSERT INTO transaksi(id_user, transaksi, jenis_transaksi, kategori, nominal, description, tanggal_transaksi, waktu_transaksi) VALUES(?,?,?,?,?,?,?,?)',
                  [id_user, transaksi, jenisTransaksi, kategori, nominal, deskripsi, date, time],
                )
                .then(([tx, res]) => {
                  if (res) {
                    console.log('Success Inserted = ' + res);
                    resolve(res);
                  } else {
                    resolve(null);
                  }
                });
            }).then(() => {
              this.closeDatabase(db);
            });
          });
        })
        .catch(er => {
          console.log(er);
          // reject(er);
        });
    });
  }

  async getDataTransaksi(id_user, transaksi) {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS transaksi (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), transaksi VARCHAR(15), jenis_transaksi VARCHAR(20), kategori VARCHAR(50), nominal INTEGER(100), description TEXT, tanggal_transaksi DATE, waktu_transaksi TIME)',
            );
          }).then(async () => {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  'SELECT * FROM transaksi WHERE id_user = ? AND transaksi = ? ORDER BY jenis_transaksi ASC',
                  [id_user, transaksi],
                )
                .then(([tx, res]) => {
                  if (res.rows.length !== 0) {
                    // const data = JSON.parse(JSON.stringify(res.rows.item(0)));
                    // console.log("data data = "+JSON.stringify(res.rows.item()));
                    const data = new Array();
                    for(let i = 0; i < res.rows.length; i++)
                    {
                      data.push(JSON.parse(JSON.stringify(res.rows.item(i))));
                    }
                    resolve(data);
                  } else {
                    resolve(null);
                    // console.log("data data err");
                  }
                });
            }).then(() => {
              this.closeDatabase(db);
            });
          });
        })
        .catch(er => {
          console.log(er);
          // reject(er);
        });
    });
  }

  async getDataUser(id_user) {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), nama_user VARCHAR(30), email VARCHAR(30), foto VARCHAR(255))',
            );
          })
            .then(async () => {
              db.transaction(async tx => {
                await tx
                  .executeSql('SELECT * FROM user WHERE id_user = ?', [id_user])
                  .then(([tx, res]) => {
                    if (res.rows.length !== 0) {
                      const row = JSON.parse(JSON.stringify(res.rows.item(0)));
                      const data_user = {
                        id_user: row.id_user,
                        nama_user: row.nama_user,
                        foto: row.foto,
                        email: row.email,
                        user_logged_in: true,
                      };
                      resolve(data_user);
                    }
                  });
              }).then(() => {
                this.closeDatabase(db);
              });
            })
            .catch(er => {
              console.log(er);
              // reject(er);r
            });
        })
        .catch(er => {
          console.log(er);
          // reject(er);
        });
    });
  }

  async addDataUser({id_user, nama_user, email, foto}) {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(async db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), nama_user VARCHAR(30), email VARCHAR(30), foto VARCHAR(255))',
            );
          }).then(() => {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  'INSERT INTO user(id_user, nama_user, email, foto) VALUES(?, ?, ?, ?)',
                  [id_user, nama_user, email, foto],
                  (tx, res) => {
                    if (res) {
                      console.log('Success Inserted = ' + res);
                      resolve(res);
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
          });
        })
        .catch(err => {
          console.log('err = ' + err);
          reject(err);
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
