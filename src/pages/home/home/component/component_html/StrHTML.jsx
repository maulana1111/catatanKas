import React, {useState} from 'react';
import ModalEmpty from './ModalEmpty';
import {
  svg_notes,
  logo,
  SvgGayaHidup,
  SvgHiburan,
  SvgInstant,
  SvgMakananMinuman,
  SvgTransfer,
  SvgTunai,
} from './assets/ItemSVG';
import {useSelector} from 'react-redux';

const HtmlGenerate = ({onReturn}) => {
  const itemPemasukan = new Array();
  const itemPengeluaran = new Array();

  const HtmlHead = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            * {
                padding: 0;
                margin: 0;
            }
            .logo {
                width: 10%;
                margin: auto;
                margin-top: 20px;
            }
            .header {
                height: 230px;
                width: 100%;
                background-color: red;
                background-image: linear-gradient(white 10%, #FFD16C 100%);
            }
            .top {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-right: 30px;
                margin-left: 30px;
            }
            .item {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: 20px;
                margin-bottom: 10px;
            }
            .flex {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .body {
                margin-right: 30px;
                margin-left: 30px;
            }
            .total {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: 20px;
                margin-bottom: 10px;
            }
            .hr1 {
                border-bottom: 2px solid black;
            }
            .hr2 {
                border-bottom: 2px solid #DBA42D;
            }
            .hr3 {
                width: 90%;
                border-bottom: 2px solid black;
                margin: auto;
            }
            .bottom {
                width: 100%;
                height: 155px;
                background-color: #FFE6B1;
            }
            @media print {
                .pagebreak { page-break-before: always; } /* page-break-after works, as well */
            }
        </style>
    </head>
    <body>`;

  const HtmlHeader = `<div class="header">
    <div class="logo">
    ${logo}
    </div>
    <div class="top">
        <div class='left_top' style="margin-top: 100px;">
            <h1>Laporan Keuanganmu Minggu Ini</h1>
            <p>Laporan:</p>
            <p>12 Oktober 2022 - 17 Oktober 2022</p>
        </div>
        <div class='right_top'>
        ${svg_notes}
        </div>
    </div>
    </div>`;

  const HtmlFooter = `
<div class="bottom">
    <div style="width:10%; margin:auto; padding-top: 20px;">
      ${svg_notes}
    </div>
    <br>
    <div class="hr3"></div>
    <br>
    <h2 style="text-align: center; color: #795B1B;">Catatan Kas 2022</h2>
</div>`;

  const HTMLTop = `
    ${HtmlHead}
      <body> `;

  const HTMLBottom = `
  </body>
</html>`;

  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const {
    dataTransaksiIn,
    dataTransaksiOut,
    jumlahDataTransaksiIn,
    jumlahDataTransaksiOut,
    dataUser,
  } = useSelector(state => state.globalStm);

  const total = jumlahDataTransaksiIn - jumlahDataTransaksiOut;

  dataTransaksiIn.map(item => {
    let strItem = ``;
    let strIcon = '';
    let state = item.jenis_transaksi;
    if (state === 'transfer') {
      strIcon += SvgTransfer;
    }
    if (state === 'instant') {
      strIcon += SvgInstant;
    }
    if (state === 'tunai') {
      strIcon += SvgTunai;
    }
    if (state === 'hiburan') {
      strIcon += SvgHiburan;
    }
    if (state === 'gaya_hidup') {
      strIcon += SvgGayaHidup;
    }
    if (state === 'makanan&minuman') {
      strIcon += SvgMakananMinuman;
    }
    strItem = `<br>
    <div class="flex">
        <div class="flex">
            <div style="margin-right: 10px;"></div>
            ${strIcon}
            <h3>${state}</h3>
        </div>
        <div>
            <h3 style="color: #31CE5D;">+ ${ChangeRupiah(item.nominal)}</h3>
        </div>
    </div>`;
    itemPemasukan.push(strItem);
  });

  dataTransaksiOut.map(item => {
    let strItem = ``;
    let strIcon = '';
    let state = item.jenis_transaksi;
    if (state === 'transfer') {
      strIcon += SvgTransfer;
    }
    if (state === 'instant') {
      strIcon += SvgInstant;
    }
    if (state === 'tunai') {
      strIcon += SvgTunai;
    }
    if (state === 'hiburan') {
      strIcon += SvgHiburan;
    }
    if (state === 'gaya_hidup') {
      strIcon += SvgGayaHidup;
    }
    if (state === 'makanan&minuman') {
      strIcon += SvgMakananMinuman;
    }
    strItem = `<br>
    <div class="flex">
        <div class="flex">
            <div style="margin-right: 10px;"></div>
            ${strIcon}
            <h3>${state}</h3>
        </div>
        <div>
            <h3 style="color: #FF5942;">- ${ChangeRupiah(item.nominal)}</h3>
        </div>
    </div>`;
    itemPengeluaran.push(strItem);
  });

  const htmlTopSecPemasukan = `
  <!-- HTMLTop -->
    ${HtmlHeader}
    <div class="body">
      <div class="item">
          <h1>Total Rekap</h1>
          <h1>${ChangeRupiah(total)}</h1>
      </div>
      <div class="hr1"></div>
      <br>
      <h2>Detail Rekap</h2>
      <br>
      <div class="item">
          <h3>Pemasukan</h3>
          <h3>+ ${ChangeRupiah(jumlahDataTransaksiIn)}</h3>
    </div>`;

  const htmlTopSecPengeluaran = `
    <!-- HTMLTop -->
      ${HtmlHeader}
      <div class="body">
        <div class="item">
            <h1>Total Rekap</h1>
            <h1>${ChangeRupiah(total)}</h1>
        </div>
        <div class="hr1"></div>
        <br>
        <h2>Detail Rekap</h2>
        <br>
        <div class="item">
            <h3>Pengeluaran</h3>
            <h3>- ${ChangeRupiah(jumlahDataTransaksiOut)}</h3>
      </div>`;

  const htmlBottomSec = `
      <br>
      <div class="hr2"></div>
      <br>
      <p style="color: #777986; margin-bottom: 10px;">Pemilik</p>
      <h1>${dataUser.data.nama_user}</h1>
      <br>
      <!-- <div class="hr2"> -->
      </div>          
    ${HtmlFooter}
    <!-- pagebreak-->
  <!-- HTMLBottom -->
`;

  const TagPageBreak = '<!-- <div class="pagebreak"></div> -->';

  let HTMLItem = ``;

  let condition1 = true;
  let StrHTMLRes = '';
  StrHTMLRes += HTMLTop;
  let j = 0;
  let i = 0;

  while (condition1 === true) {
    let StrHtmlResItem = '';
    j += 6;
    for (let k = i; k < j; k++) {
      StrHtmlResItem += itemPemasukan[k];
      i++;
      if (itemPemasukan[i] === null) {
        break;
      }
    }
    StrHTMLRes += htmlTopSecPemasukan;
    StrHTMLRes += StrHtmlResItem;
    StrHTMLRes += htmlBottomSec;
    StrHTMLRes += TagPageBreak;
    if (i > itemPemasukan.length) {
      condition1 = false;
    }
  }

  let condition2 = true;
  let a = 0;
  let b = 0;

  while (condition2 === true) {
    let StrHtmlResItem = '';
    a += 6;
    for (let k = b; k < a; k++) {
      StrHtmlResItem += itemPengeluaran[k];
      b++;
      if (itemPengeluaran[b] === null) {
        break;
      }
    }
    StrHTMLRes += htmlTopSecPengeluaran;
    StrHTMLRes += StrHtmlResItem;
    StrHTMLRes += htmlBottomSec;
    StrHTMLRes += TagPageBreak;
    if (i > itemPengeluaran.length) {
      condition2 = false;
    }
  }

  StrHTMLRes += HTMLBottom;

  txtTry = 'testo';
  // return txtTry;
  onReturn(txtTry);
};

export default HtmlGenerate;
