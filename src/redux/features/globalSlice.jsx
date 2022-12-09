import {createSlice} from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'storeGlobal',
  initialState: {
    conditionChildSheet: false,
    secondConditionChildSheet: false,
    dataTransaksiIn: [],
    dataTransaksiOut: [],
    dataStatistikIn: [],
    dataStatistikOut: [],
    dataTagihanIn: [],
    dataTagihanOut: [],
    jumlahDataStatistikIn: 0,
    jumlahDataStatistikOut: 0,
    dataFilter: {
      status: false,
      data: {
        urutan_pemasukan: '',
        urutan_pengeluaran: '',
        tanggal_dari: '',
        tanggal_sampai: '',
        jenis_transaksi: '',
        real_tanggal_dari: '',
        real_tanggal_sampai: '',
      },
    },
    dataFilterTagihan: {
      status: false,
      data: {
        urutan_pemasukan: '',
        urutan_pengeluaran: '',
        tanggal_dari: '',
        tanggal_sampai: '',
        jenis_tagihan: '',
        real_tanggal_dari: '',
        real_tanggal_sampai: '',
      },
    },
  },
  reducers: {
    storeGlobalChildSheet: (state, action) => {
      state.conditionChildSheet = action.payload.condition;
    },
    storeGlobalSecChildSheet: (state, action) => {
      state.secondConditionChildSheet = action.payload.condition;
    },
    storeDataTransaksiIn: (state, action) => {
      state.dataTransaksiIn = action.payload.data;
    },
    storeDataTransaksiOut: (state, action) => {
      state.dataTransaksiOut = action.payload.data;
    },
    storeDataStatistikIn: (state, action) => {
      state.dataStatistikIn = action.payload.data;
    },
    storeDataStatistikOut: (state, action) => {
      state.dataStatistikOut = action.payload.data;
    },
    storeDataTagihanIn: (state, action) => {
      state.dataTagihanIn = action.payload.data;
    },
    storeDataTagihanOut: (state, action) => {
      state.dataTagihanOut = action.payload.data;
    },
    storeJumlahDataStatistikIn: (state, action) => {
      state.jumlahDataStatistikIn = action.payload.data;
    },
    storeJumlahDataStatistikOut: (state, action) => {
      state.jumlahDataStatistikOut = action.payload.data;
    },
    storeDataFilter: (state, action) => {
      state.dataFilter.status = action.payload.status;
      state.dataFilter.data.urutan_pengeluaran =
        action.payload.urutan_pengeluaran;
      state.dataFilter.data.urutan_pemasukan = action.payload.urutan_pemasukan;
      state.dataFilter.data.tanggal_dari = action.payload.tanggal_dari;
      state.dataFilter.data.tanggal_sampai = action.payload.tanggal_sampai;
      state.dataFilter.data.jenis_transaksi = action.payload.jenis_transaksi;
      state.dataFilter.data.real_tanggal_dari =
        action.payload.real_tanggal_dari;
      state.dataFilter.data.real_tanggal_sampai =
        action.payload.real_tanggal_sampai;
    },
    storeDataFilterTagihan: (state, action) => {
      state.dataFilterTagihan.status = action.payload.status;
      state.dataFilterTagihan.data.urutan_pengeluaran =
        action.payload.urutan_pengeluaran;
      state.dataFilterTagihan.data.urutan_pemasukan =
        action.payload.urutan_pemasukan;
      state.dataFilterTagihan.data.tanggal_dari = action.payload.tanggal_dari;
      state.dataFilterTagihan.data.tanggal_sampai =
        action.payload.tanggal_sampai;
      state.dataFilterTagihan.data.jenis_tagihan =
        action.payload.jenis_tagihan;
      state.dataFilterTagihan.data.real_tanggal_dari =
        action.payload.real_tanggal_dari;
      state.dataFilterTagihan.data.real_tanggal_sampai =
        action.payload.real_tanggal_sampai;
    },
  },
});

export const {
  storeGlobalChildSheet,
  storeGlobalSecChildSheet,
  storeDataTransaksiIn,
  storeDataTransaksiOut,
  storeDataFilter,
  storeDataStatistikIn,
  storeDataStatistikOut,
  storeJumlahDataStatistikIn,
  storeJumlahDataStatistikOut,
  storeDataTagihanIn,
  storeDataTagihanOut,
  storeDataFilterTagihan,
} = globalSlice.actions;
export default globalSlice.reducer;
