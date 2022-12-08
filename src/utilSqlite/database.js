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
    time,
  }) {
    return new Promise((resolve, reject) => {
      this.initDb().then(db => {
        db.transaction(async tx => {
          await tx
            .executeSql(
              'INSERT INTO transaksi(id_user, transaksi, jenis_transaksi, kategori, nominal, description, tanggal_transaksi, waktu_transaksi) VALUES(?,?,?,?,?,?,?,?)',
              [
                id_user,
                transaksi,
                jenisTransaksi,
                kategori,
                nominal,
                deskripsi,
                date,
                time,
              ],
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
                  'SELECT * FROM transaksi WHERE id_user = ? AND transaksi = ? ORDER BY id DESC',
                  [id_user, transaksi],
                )
                .then(([tx, res]) => {
                  if (res.rows.length !== 0) {
                    const data = new Array();
                    for (let i = 0; i < res.rows.length; i++) {
                      data.push(JSON.parse(JSON.stringify(res.rows.item(i))));
                    }
                    console.log('data = ' + JSON.stringify(data));
                    resolve(data);
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

  async insertDataTagihan({
    id_user,
    tagihan,
    jenisTagihan,
    kategori,
    nominal,
    deskripsi,
    foto,
    date,
    time,
  }) {
    return new Promise((resolve, reject) => {
      this.initDb().then(db => {
        db.transaction(async tx => {
          await tx.executeSql(
            'CREATE TABLE IF NOT EXISTS tagihan (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), tagihan VARCHAR(15), jenis_tagihan VARCHAR(20), kategori VARCHAR(50), nominal INTEGER(100), description TEXT, foto TEXT, tanggal_transaksi DATE, waktu_transaksi TIME)',
          );
        }).then(async () => {
          db.transaction(async tx => {
            await tx
              .executeSql(
                'INSERT INTO tagihan(id_user, tagihan, jenis_tagihan, kategori, nominal, description, foto, tanggal_transaksi, waktu_transaksi) VALUES(?,?,?,?,?,?,?,?,?)',
                [
                  id_user,
                  tagihan,
                  jenisTagihan,
                  kategori,
                  nominal,
                  deskripsi,
                  foto,
                  date,
                  time,
                ],
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
      });
    });
  }

  async getDataTagihan(id_user, transaksi) {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS tagihan (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), tagihan VARCHAR(15), jenis_tagihan VARCHAR(20), kategori VARCHAR(50), nominal INTEGER(100), description TEXT, foto TEXT, tanggal_transaksi DATE, waktu_transaksi TIME)',
            );
          }).then(async () => {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  'SELECT * FROM tagihan WHERE id_user = ? AND tagihan = ? ORDER BY id DESC',
                  [id_user, transaksi],
                )
                .then(([tx, res]) => {
                  if (res.rows.length !== 0) {
                    const data = new Array();
                    for (let i = 0; i < res.rows.length; i++) {
                      data.push(JSON.parse(JSON.stringify(res.rows.item(i))));
                    }
                    console.log('data = ' + JSON.stringify(data));
                    resolve(data);
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

  async getDataTransaksiWhere(
    id_user,
    transaksi,
    urutan_pemasukan,
    urutan_pengeluaran,
    tanggal_dari,
    tanggal_sampai,
    jenis,
  ) {
    var date_dari = tanggal_dari.split('/');
    var date_sampai = tanggal_sampai.split('/');
    var tgl_dari = date_dari[2] + '-' + date_dari[1] + '-' + date_dari[0];
    var tgl_sampai =
      date_sampai[2] + '-' + date_sampai[1] + '-' + date_sampai[0];
    let qry_jenis = '';
    let operator = 'OR';
    // let temp = "";
    jenis.map((item, index) => {
      qry = ` jenis_transaksi = '${item}' `;
      if (jenis.length - 1 !== index) {
        qry = qry.concat(operator);
      }
      qry_jenis = qry_jenis.concat(qry);
    });
    console.log('jenis = ' + qry_jenis);
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
                  `SELECT * FROM transaksi WHERE id_user = '${id_user}' AND transaksi = '${transaksi}' AND (${qry_jenis}) AND tanggal_transaksi >= '${tgl_dari}' AND tanggal_transaksi <= '${tgl_sampai}' ORDER BY nominal ${
                    transaksi === 'pemasukan'
                      ? urutan_pemasukan.toUpperCase()
                      : urutan_pengeluaran.toUpperCase()
                  }`,
                  [],
                )
                .then(([tx, res]) => {
                  if (res.rows.length !== 0) {
                    const data = new Array();
                    for (let i = 0; i < res.rows.length; i++) {
                      data.push(JSON.parse(JSON.stringify(res.rows.item(i))));
                    }
                    resolve(data);
                  } else {
                    reject(null);
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

  async getDataTransaksiThisWeek(id_user, transaksi) {
    const today = new Date();
    const tanggal =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      (String(today.getDate()).length === 1
        ? '0' + today.getDate()
        : today.getDate());
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
                  `SELECT * FROM transaksi WHERE id_user = '${id_user}' AND transaksi = '${transaksi}' AND (strftime('%W', tanggal_transaksi) = strftime('%W', 'now')) ORDER BY tanggal_transaksi ASC`,
                  [],
                )
                .then(([tx, res]) => {
                  if (res.rows.length !== 0) {
                    const data = new Array();
                    for (let i = 0; i < res.rows.length; i++) {
                      data.push(JSON.parse(JSON.stringify(res.rows.item(i))));
                    }
                    resolve(data);
                  } else {
                    reject(null);
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
