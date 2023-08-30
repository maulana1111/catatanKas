import sqlite from 'react-native-sqlite-storage';

sqlite.DEBUG(true);
sqlite.enablePromise(true);

const database_name = 'catatan_kas.db';
const database_version = '1.0';
const database_displayname = 'Catatan Kas SQLite Database';
const database_size = 200000;
const createFromLocation = 2;

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
              // createFromLocation
              // 2
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
                    // console.log("data = "+res);
                    const data = new Array();
                    for (let i = 0; i < res.rows.length; i++) {
                      data.push(JSON.parse(JSON.stringify(res.rows.item(i))));
                    }
                    console.log('data = ' + JSON.stringify(data));
                    resolve(data);
                  } else {
                    resolve(null);
                  }
                })
                .catch(err => {
                  console.log('err when query data = ' + err);
                });
            })
              .then(() => {
                this.closeDatabase(db);
              })
              .catch(err => {
                console.log('err when get data = ' + err);
              });
          });
        })
        .catch(er => {
          reject(er);
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
            'CREATE TABLE IF NOT EXISTS tagihan (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), tagihan VARCHAR(15), jenis_tagihan VARCHAR(20), kategori VARCHAR(50), nominal INTEGER(100), description TEXT, foto TEXT, tanggal_tagihan DATE, waktu_tagihan TIME)',
          );
        }).then(async () => {
          db.transaction(async tx => {
            await tx
              .executeSql(
                'INSERT INTO tagihan(id_user, tagihan, jenis_tagihan, kategori, nominal, description, foto, tanggal_tagihan, waktu_tagihan) VALUES(?,?,?,?,?,?,?,?,?)',
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

  async deleteDataTagihan(id) {
    return new Promise((resolve, reject) => {
      this.initDb().then(db => {
        db.transaction(async tx => {
          await tx
            .executeSql(`DELETE FROM tagihan WHERE id = ${id}`)
            .then(([tx, res]) => {
              resolve('success');
            })
            .catch(err => {
              reject('error');
            });
        }).then(() => {
          this.closeDatabase(db);
        });
      });
    });
  }

  async deleteDataTransaksi(id) {
    return new Promise((resolve, reject) => {
      this.initDb().then(db => {
        db.transaction(async tx => {
          await tx
            .executeSql(`DELETE FROM transaksi WHERE id = ${id}`)
            .then(([tx, res]) => {
              resolve('success');
            })
            .catch(err => {
              reject('error');
            });
        }).then(() => {
          this.closeDatabase(db);
        });
      });
    });
  }

  async getDataTagihan(id_user, tagihan) {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS tagihan (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), tagihan VARCHAR(15), jenis_tagihan VARCHAR(20), kategori VARCHAR(50), nominal INTEGER(100), description TEXT, foto TEXT, tanggal_tagihan DATE, waktu_tagihan TIME)',
            );
          }).then(async () => {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  'SELECT * FROM tagihan WHERE id_user = ? AND tagihan = ? ORDER BY id DESC',
                  [id_user, tagihan],
                )
                .then(([tx, res]) => {
                  if (res.rows.length !== 0) {
                    const data = new Array();
                    for (let i = 0; i < res.rows.length; i++) {
                      data.push(JSON.parse(JSON.stringify(res.rows.item(i))));
                    }
                    // console.log('data = ' + JSON.stringify(data));
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

  async getDataTagihanWhere(
    id_user,
    tagihan,
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
    let operator = 'OR';
    let qry_jenis = '';
    // let temp = "";
    if (Object.is(jenis, null)) {
      qry_jenis += 'AND (';
      jenis.map((item, index) => {
        qry_jenis += ` jenis_tagihan = '${item}' `;
        if (jenis.length - 1 !== index) {
          qry_jenis += operator;
        }
        qry_jenis += ')';
      });
    }
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS tagihan (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), tagihan VARCHAR(15), jenis_tagihan VARCHAR(20), kategori VARCHAR(50), nominal INTEGER(100), description TEXT, foto TEXT, tanggal_tagihan DATE, waktu_tagihan TIME)',
            );
          }).then(async () => {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  `SELECT * FROM tagihan WHERE id_user = '${id_user}' AND tagihan = '${tagihan}' ${qry_jenis} AND tanggal_tagihan >= '${tgl_dari}' AND tanggal_tagihan <= '${tgl_sampai}' ORDER BY nominal ${
                    tagihan === 'pemasukan'
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
    if (Object.is(jenis, null)) {
      qry_jenis += 'AND (';
      jenis.map((item, index) => {
        qry_jenis += ` jenis_tagihan = '${item}' `;
        if (jenis.length - 1 !== index) {
          qry_jenis += operator;
        }
        qry_jenis += ')';
      });
    }
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
                  `SELECT * FROM transaksi WHERE id_user = '${id_user}' AND transaksi = '${transaksi}' ${qry_jenis} AND tanggal_transaksi >= '${tgl_dari}' AND tanggal_transaksi <= '${tgl_sampai}' ORDER BY nominal ${
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
                  console.log(
                    `data transaksi in = ${transaksi}` + JSON.stringify(res),
                  );
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

  async getDataUserById(id_user) {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), nama_user VARCHAR(30), email VARCHAR(30), foto VARCHAR(255), link_foto VARCHAR(255), user_logged_in VARCHAR(6))',
            );
          })
            .then(async () => {
              db.transaction(async tx => {
                await tx
                  .executeSql(
                    'SELECT * FROM user WHERE id_user = ?',
                    [id_user],
                  )
                  .then(([tx, res]) => {
                    if (res.rows.length !== 0) {
                      resolve(true);
                    } else {
                      resolve(null);
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

  async getDataUser() {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), nama_user VARCHAR(30), email VARCHAR(30), foto VARCHAR(255), link_foto VARCHAR(255), user_logged_in VARCHAR(6))',
            );
          })
            .then(async () => {
              db.transaction(async tx => {
                await tx
                  .executeSql(
                    'SELECT * FROM user WHERE user_logged_in = ?',
                    ["true"],
                  )
                  .then(([tx, res]) => {
                    data_user = {};
                    if (res.rows.length !== 0) {
                      const row = JSON.parse(JSON.stringify(res.rows.item(0)));
                      console.log("dataaa = "+JSON.stringify(row));
                      data_user = {
                        id_user: row.id_user,
                        nama_user: row.nama_user,
                        foto: row.foto,
                        email: row.email,
                        user_logged_in: row.user_logged_in,
                        link_foto: row.link_foto,
                      };
                      resolve(data_user);
                    } else {
                      resolve(null);
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

  async doLoginUser(id_user) {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(async db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), nama_user VARCHAR(30), email VARCHAR(30), foto VARCHAR(255), link_foto VARCHAR(255), user_logged_in VARCHAR(6))',
            );
          }).then(() => {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  'UPDATE user SET user_logged_in = ? WHERE id_user = ?',
                  ["true", id_user],
                  (tx, res) => {
                    if (res) {
                      console.log('Success updated = ' + JSON.stringify(res));
                      resolve(res);
                    }
                  },
                )
                .catch(err => {
                  // console.log();
                  reject('error when logout user = ' + err);
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

  async doLogoutUser(id_user) {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(async db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), nama_user VARCHAR(30), email VARCHAR(30), foto VARCHAR(255), link_foto VARCHAR(255), user_logged_in VARCHAR(6))',
            );
          }).then(() => {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  'UPDATE user SET user_logged_in = ? WHERE id_user = ?',
                  ["false", id_user],
                  (tx, res) => {
                    if (res) {
                      console.log('Success updated = ' + JSON.stringify(res));
                      resolve(res);
                    }
                  },
                )
                .catch(err => {
                  // console.log();
                  reject('error when logout user = ' + err);
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

  async addDataUser({id_user, nama_user, email, foto, link_foto, user_logged_in}) {
    return new Promise((resolve, reject) => {
      this.initDb()
        .then(async db => {
          db.transaction(async tx => {
            await tx.executeSql(
              'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, id_user VARCHAR(40), nama_user VARCHAR(30), email VARCHAR(30), foto VARCHAR(255), link_foto VARCHAR(255), user_logged_in VARCHAR(6))',
            );
          }).then(() => {
            db.transaction(async tx => {
              await tx
                .executeSql(
                  'INSERT INTO user(id_user, nama_user, email, foto, link_foto, user_logged_in) VALUES(?, ?, ?, ?, ?, ?)',
                  [id_user, nama_user, email, foto, link_foto, user_logged_in],
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
