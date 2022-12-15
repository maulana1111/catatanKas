import React, {useState} from 'react';
import ModalEmpty from './ModalEmpty';
// import HtmlGenerate from './StrHTML';
import {useSelector} from 'react-redux';

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

async function GeneratePDFTagihan(
  dataTagihanIn,
  dataTagihanOut,
  totalPemasukan,
  totalPengeluaran,
  dataUser,
  dataFilterTagihan,
) {
  let itemPemasukan = new Array();
  let itemPengeluaran = new Array();
  let total = totalPemasukan - totalPengeluaran;

  let HtmlHead = `<!DOCTYPE html>
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
            .openItem{
              width: 100%;
              height: 250px;
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

  let HtmlHeader = `<div class="header">
    <div class="logo">
    ${logo}
    </div>
    <div class="top">
        <div class='left_top' style="margin-top: 100px;">
            <h1>Laporan</h1><h1>Tagihan</h1>
            <p>Laporan:</p>
            <p>${
              dataFilterTagihan.status === false
                ? 'Sekarang'
                : dataFilterTagihan.data.tanggal_dari +
                  ' - ' +
                  dataFilterTagihan.data.tanggal_sampai
            }</p>
        </div>
        <div class='right_top'>
        ${svg_notes}
        </div>
    </div>
    </div>`;

  let HtmlFooter = `
      <div class="bottom">
          <div style="width:10%; margin:auto; padding-top: 20px;">
            ${logo}
          </div>
          <br>
          <div class="hr3"></div>
          <br>
          <h2 style="text-align: center; color: #795B1B;">Catatan Kas 2022</h2>
      </div>`;

  let HTMLBottom = `
      </body>
    </html>`;

  let ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  dataTagihanIn &&
    dataTagihanIn.map(item => {
      let strItem = ``;
      let strIcon = '';
      let state = item.jenis_tagihan;
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
              <h3 style="margin-left: 20px">${state}</h3>
          </div>
          <div>
              <h3 style="color: #31CE5D;">+ ${ChangeRupiah(item.nominal)}</h3>
          </div>
      </div>`;
      itemPemasukan.push(strItem);
    });

  dataTagihanOut &&
    dataTagihanOut.map(item => {
      let strItem = ``;
      let strIcon = '';
      let state = item.jenis_tagihan;
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
              <h3 style="margin-left: 20px">${state}</h3>
          </div>
          <div>
              <h3 style="color: #FF5942;">- ${ChangeRupiah(item.nominal)}</h3>
          </div>
      </div>`;
      itemPengeluaran.push(strItem);
    });

  let htmlTopSecPemasukan = `
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
            <h3>+ ${ChangeRupiah(totalPemasukan)}</h3>
      </div>`;

  let htmlTopSecPengeluaran = `
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
              <h3>- ${ChangeRupiah(totalPengeluaran)}</h3>
        </div>`;

  let htmlBottomSec = `
        <br>
        <div class="hr2"></div>
        <br>
        <p style="color: #777986; margin-bottom: 10px;">Pemilik</p>
        <h1>${dataUser.data.nama_user}</h1>
        <br>
        <!-- <div class="hr2"> -->
        </div>
      ${HtmlFooter}
  `;

  let TagPageBreak = '<div class="pagebreak"></div>';

  let strOpenItem = `<div class="openItem">`;
  let strCloseItem = `</div>`;

  let HTMLItem = ``;

  let condition1 = true;
  let StrHTMLRes = '';
  StrHTMLRes += HtmlHead;
  let j = 0;
  let i = 0;

  while (condition1 === true) {
    if (itemPemasukan.length > 0) {
      let StrHtmlResItem = '';
      j += 6;
      for (let k = i; k < j; k++) {
        StrHtmlResItem += itemPemasukan[k];
        i++;
        if (itemPemasukan.length === i) {
          break;
        }
      }
      StrHTMLRes += htmlTopSecPemasukan;
      StrHTMLRes += strOpenItem;
      StrHTMLRes += StrHtmlResItem;
      StrHTMLRes += strCloseItem;
      StrHTMLRes += htmlBottomSec;
      StrHTMLRes += TagPageBreak;
      if (i >= itemPemasukan.length) {
        condition1 = false;
      }
    } else {
      StrHTMLRes += htmlTopSecPemasukan;
      StrHTMLRes += strOpenItem;
      StrHTMLRes += strCloseItem;
      StrHTMLRes += htmlBottomSec;
      // StrHTMLRes += TagPageBreak;
      condition1 = false;
    }
  }

  let condition2 = true;
  j = 0;
  i = 0;

  while (condition2 === true) {
    if (itemPengeluaran.length > 0) {
      let StrHtmlResItem = '';
      j += 6;
      for (let k = i; k < j; k++) {
        StrHtmlResItem += itemPengeluaran[k];
        i++;
        if (itemPengeluaran.length === i) {
          break;
        }
      }
      StrHTMLRes += htmlTopSecPengeluaran;
      StrHTMLRes += strOpenItem;
      StrHTMLRes += StrHtmlResItem;
      StrHTMLRes += strCloseItem;
      StrHTMLRes += htmlBottomSec;
      StrHTMLRes += TagPageBreak;
      if (i >= itemPengeluaran.length) {
        condition2 = false;
      }
    } else {
      StrHTMLRes += htmlTopSecPengeluaran;
      StrHTMLRes += strOpenItem;
      StrHTMLRes += strCloseItem;
      StrHTMLRes += htmlBottomSec;
      // StrHTMLRes += TagPageBreak;
      condition2 = false;
    }
  }
  StrHTMLRes += HTMLBottom;

  // return HtmlGenerate()
  // let res = HtmlGenerate();
  return StrHTMLRes;
}

export default GeneratePDFTagihan;
