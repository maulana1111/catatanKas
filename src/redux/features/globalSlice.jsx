import {createSlice} from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'storeGlobal',
  initialState: {
    conditionChildSheet: false,
    secondConditionChildSheet: false,
    dataTransaksiIn: [],
    dataTransaksiOut: [],
    dataFilter:{
      status: false,
      data: {
        urutan_pemasukan: '',
        urutan_pengeluaran: '',
        tanggal_dari: '',
        tanggal_sampai: '',
        jenis_transaksi: '',
        real_tanggal_dari: '',
        real_tanggal_sampai: ''
      }
    }
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
    storeDataFilter: (state, action) => {
      state.dataFilter.status = true;
      state.dataFilter.data.urutan_pengeluaran = action.payload.urutan_pengeluaran;
      state.dataFilter.data.urutan_pemasukan = action.payload.urutan_pemasukan;
      state.dataFilter.data.tanggal_dari = action.payload.tanggal_dari;
      state.dataFilter.data.tanggal_sampai = action.payload.tanggal_sampai;
      state.dataFilter.data.jenis_transaksi = action.payload.jenis_transaksi;
      state.dataFilter.data.real_tanggal_dari = action.payload.real_tanggal_dari;
      state.dataFilter.data.real_tanggal_sampai = action.payload.real_tanggal_sampai;
    }
  },
});

export const {
  storeGlobalChildSheet,
  storeGlobalSecChildSheet,
  storeDataTransaksiIn,
  storeDataTransaksiOut,
  storeDataFilter
} = globalSlice.actions;
export default globalSlice.reducer;
