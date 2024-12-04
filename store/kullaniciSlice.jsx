import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const kullaniciGiris = createAsyncThunk(
  'kullanici/giris',
  async (veri, thunkAPI) => {
    try {
      const res = await api.post('auth/login', veri);
      if (res.data.success) {
        await AsyncStorage.setItem(
          'taskbuddytoken',
          JSON.stringify(res.data.data.token),
        );
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data.message || 'Login failed.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Server error.');
    }
  },
);

export const kullaniciKaydol = createAsyncThunk(
  'kullanici/kaydol',
  async (veri, thunkAPI) => {
    try {
      const res = await api.post('register', veri);
      if (res.data.success) {
        return res.data.data;
      } else {
        return thunkAPI.rejectWithValue(res.data || 'Registration failed.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {message: 'Server error.'},
      );
    }
  },
);

export const kullaniciSifremiUnuttum = createAsyncThunk(
  'kullanici/unuttum',
  async (veri, thunkAPI) => {
    try {
      const res = await api.post('forgotpassword', veri);
      if (res.data.success) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data || 'Send failed.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {message: 'Server error.'},
      );
    }
  },
);

export const kullaniciCikis = createAsyncThunk(
  'kullanici/cikis',
  async (_, thunkAPI) => {
    try {
      await api.post('logout');
      await AsyncStorage.removeItem('taskbuddytoken');
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Server error.');
    }
  },
);

export const kullaniciProfil = createAsyncThunk(
  'kullanici/profil',
  async (_, thunkAPI) => {
    try {
      const res = await api.post('profile');
      if (res.data.success) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data || 'Send failed.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {message: 'Server error.'},
      );
    }
  },
);

export const kullaniciProfilGuncelle = createAsyncThunk(
  'kullanici/profilguncelle',
  async (veri, thunkAPI) => {
    try {
      const res = await api.post('profileupdate', veri);
      if (res.data.success) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data || 'Update failed.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {message: 'Server error.'},
      );
    }
  },
);

export const kullaniciProfilSifreGuncelle = createAsyncThunk(
  'kullanici/profilsifreguncelle',
  async (veri, thunkAPI) => {
    try {
      const res = await api.post('changepassword', veri);
      if (res.data.success) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data || 'Update failed.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {message: 'Server error.'},
      );
    }
  },
);

export const kullaniciAktivasyon = createAsyncThunk(
  'kullanici/aktivasyon',
  async (veri, thunkAPI) => {
    try {
      const res = await api.post('activation', veri);
      if (res.data.success) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data || 'Activation failed.');
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {message: 'Server error.'},
      );
    }
  },
);

export const kullaniciAktivasyonYenidenGonder = createAsyncThunk(
  'kullanici/aktivasyonYenidenGonder',
  async (veri, thunkAPI) => {
    try {
      const res = await api.post('resendcode', veri);
      if (res.data.success) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(
          res.data || 'Resend activation failed.',
        );
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {message: 'Server error.'},
      );
    }
  },
);

const kullaniciSlice = createSlice({
  name: 'kullanici',
  initialState: {
    veri: {
      created_at: '',
      name: '',
      email: '',
      email_verified_at: '',
      updated_at: '',
      exclude_ips: [],
    },
    yukleniyor: false,
    islem: false,
    hata: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      //giriş
      .addCase(kullaniciGiris.pending, state => {
        state.islem = true;
      })
      .addCase(kullaniciGiris.fulfilled, (state, action) => {
        state.islem = false;
        state.veri = action.payload;
      })
      .addCase(kullaniciGiris.rejected, (state, action) => {
        state.islem = false;
        state.hata = action.payload;
      })
      //kaydol
      .addCase(kullaniciKaydol.pending, state => {
        state.islem = true;
      })
      .addCase(kullaniciKaydol.fulfilled, (state, action) => {
        state.islem = false;
        state.veri = action.payload;
      })
      .addCase(kullaniciKaydol.rejected, (state, action) => {
        state.islem = false;
      })
      //unuttum
      .addCase(kullaniciSifremiUnuttum.pending, state => {
        state.islem = true;
      })
      .addCase(kullaniciSifremiUnuttum.fulfilled, state => {
        state.islem = false;
      })
      .addCase(kullaniciSifremiUnuttum.rejected, (state, action) => {
        state.islem = false;
      })
      //çıkış
      .addCase(kullaniciCikis.pending, state => {
        state.islem = true;
      })
      .addCase(kullaniciCikis.fulfilled, state => {
        state.islem = false;
        state.veri = {};
      })
      .addCase(kullaniciCikis.rejected, (state, action) => {
        state.islem = false;
        state.hata = action.payload;
      })
      //profil
      .addCase(kullaniciProfil.pending, state => {
        state.yukleniyor = true;
      })
      .addCase(kullaniciProfil.fulfilled, (state, action) => {
        state.yukleniyor = false;
        state.veri = action.payload.data;
        console.log(action.payload.data);
      })
      .addCase(kullaniciProfil.rejected, (state, action) => {
        state.yukleniyor = false;
      })
      //profil güncelle
      .addCase(kullaniciProfilGuncelle.pending, state => {
        state.islem = true;
      })
      .addCase(kullaniciProfilGuncelle.fulfilled, (state, action) => {
        state.islem = false;
        state.veri = action.payload.data;
      })
      .addCase(kullaniciProfilGuncelle.rejected, (state, action) => {
        state.islem = false;
      })
      //profil şifre güncelle
      .addCase(kullaniciProfilSifreGuncelle.pending, state => {
        state.islem = true;
      })
      .addCase(kullaniciProfilSifreGuncelle.fulfilled, (state, action) => {
        state.islem = false;
      })
      .addCase(kullaniciProfilSifreGuncelle.rejected, (state, action) => {
        state.islem = false;
      })
      //aktivasyon
      .addCase(kullaniciAktivasyon.pending, state => {
        state.islem = true;
      })
      .addCase(kullaniciAktivasyon.fulfilled, (state, action) => {
        state.islem = false;
      })
      .addCase(kullaniciAktivasyon.rejected, (state, action) => {
        state.islem = false;
      })
      .addCase(kullaniciAktivasyonYenidenGonder.pending, state => {
        state.yukleniyor = true;
      })
      .addCase(kullaniciAktivasyonYenidenGonder.fulfilled, (state, action) => {
        state.yukleniyor = false;
      })
      .addCase(kullaniciAktivasyonYenidenGonder.rejected, (state, action) => {
        state.yukleniyor = false;
      });
  },
});

export default kullaniciSlice.reducer;
