import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from './api';

export const siteListele = createAsyncThunk('goverler/listele', async () => {
  const {data} = await api.get('goverler/listele');
  return data;
});

export const siteGoster = createAsyncThunk(
  'goverler/goster',
  async (site, thunkAPI) => {
    try {
      const res = await api.post(`goverler/goster`, site);
      if (res.data.success) {
        return {
          durum: res.data.data.script_status,
          bilgi: site,
          istatistik: res.data.data.visits,
          message: res.data.message,
        };
      } else {
        return thunkAPI.rejectWithValue(res.data.message || 'Failed.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Server error.');
    }
  },
);

export const siteEkle = createAsyncThunk(
  'goverler/ekle',
  async (site, thunkAPI) => {
    try {
      const res = await api.post('goverler/ekle', site);
      if (res.data.success) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data.message || 'Failed.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Server error.');
    }
  },
);

export const siteGuncelle = createAsyncThunk(
  'goverler/guncelle',
  async (site, thunkAPI) => {
    try {
      const res = await api.put(`goverler/guncelle/${site.id}`, site);
      if (res.data.success) {
        return res.data.data;
      } else {
        return thunkAPI.rejectWithValue(res.data.message || 'Failed.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Server error.');
    }
  },
);

export const siteSil = createAsyncThunk('goverler/sil', async id => {
  await api.delete(`goverler/sil/${id}`);
  return id;
});

const davetiyelerSlice = createSlice({
  name: 'goverler',
  initialState: {
    veriler: [],
    veri: null,
    yukleniyor: false,
    islem: false,
    hata: null,
    filter: null,
    zaman: {label: 'Today', value: 'Today'},
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setZaman: (state, action) => {
      state.zaman = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(siteListele.pending, state => {
        state.yukleniyor = true;
      })
      .addCase(siteListele.fulfilled, (state, action) => {
        state.yukleniyor = false;
        state.veriler = action.payload;
      })
      .addCase(siteListele.rejected, (state, action) => {
        state.yukleniyor = false;
        state.hata = action.error.message;
      })
      .addCase(siteGoster.pending, state => {
        state.yukleniyor = true;
      })
      .addCase(siteGoster.fulfilled, (state, action) => {
        state.yukleniyor = false;
        state.veri = action.payload;
      })
      .addCase(siteGoster.rejected, (state, action) => {
        state.yukleniyor = false;
        state.hata = action.error.message;
        state.veri = {durum: false};
      })
      .addCase(siteEkle.pending, state => {
        state.islem = true;
      })
      .addCase(siteEkle.fulfilled, (state, action) => {
        state.islem = false;
        state.veriler.push(action.payload.data);
        state.veri = {
          bilgi: action.payload.data,
          istatistik: [],
        };
      })
      .addCase(siteEkle.rejected, (state, action) => {
        state.islem = false;
        state.hata = action.error.message;
      })
      .addCase(siteSil.pending, state => {
        state.islem = true;
      })
      .addCase(siteSil.fulfilled, (state, action) => {
        state.islem = false;
        state.veriler = state.veriler.filter(
          item => item.id !== action.payload,
        );
        state.veri = null;
      })
      .addCase(siteSil.rejected, (state, action) => {
        state.islem = false;
        state.hata = action.error.message;
      })
      .addCase(siteGuncelle.pending, state => {
        state.islem = true;
      })
      .addCase(siteGuncelle.fulfilled, (state, action) => {
        state.islem = false;
        const index = state.veriler.findIndex(
          item => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.veriler[index] = action.payload;
        }
        state.veri = {
          bilgi: action.payload,
          istatistik: [],
        };
      })
      .addCase(siteGuncelle.rejected, (state, action) => {
        state.islem = false;
        state.hata = action.error.message;
      });
  },
});

export const {setFilter, setZaman} = davetiyelerSlice.actions;

export default davetiyelerSlice.reducer;
