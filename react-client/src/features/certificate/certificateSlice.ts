import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Certificate } from "./certificate.interface";
import { fetchAdd, fetchAll, fetchDelete, fetchEdit } from "./certificateAPI";

export interface CertificateState {
  records: Certificate[];
  status: "idle" | "loading" | "failed";
  error: any;
  loadMore: number;
}

const initialState = {
  records: [],
  status: "idle",
  error: null,
  loadMore: 5,
} as CertificateState;

interface MyKnownError {
  message: string;
  statusCode: number;
}

export const getMoreCertificates = createAsyncThunk(
  "certificate/getMoreCertificates",
  async (data: void, { dispatch, getState, rejectWithValue }) => {
    dispatch(loadingSomething);
    const state = getState() as RootState;
    const offset = state.certificate.records.length;
    const loadMore = state.certificate.loadMore;
    try {
      return (await fetchAll(offset, loadMore)).certificates;
    } catch (err) {
      return rejectWithValue(err as MyKnownError);
    }
  }
);

export const addCertificate = createAsyncThunk(
  "certificate/addCertificate",
  async (newCertificate: Certificate, thunkAPI) => {
    thunkAPI.dispatch(loadingSomething);
    try {
      return await fetchAdd(newCertificate);
    } catch (err) {
      return thunkAPI.rejectWithValue(err as MyKnownError);
    }
  }
);

export const deleteCertificate = createAsyncThunk(
  "certificate/deleteCertificate",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(loadingSomething);
    try {
      await fetchDelete(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err as MyKnownError);
    }
  }
);

export const editCertificate = createAsyncThunk(
  "certificate/editCertificate",
  async (data: Certificate, thunkAPI) => {
    thunkAPI.dispatch(loadingSomething);
    try {
      await fetchEdit(data.id!, data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err as MyKnownError);
    }
  }
);

export const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    loadingSomething: (state, action) => {
      state.status = "loading";
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(getMoreCertificates.fulfilled, (state, action) => {
        state.status = "idle";
        action.payload.forEach((certificate) => {
          if (!state.records.some((r) => r.id === certificate.id))
            state.records.push(certificate);
        });
      })
      .addCase(getMoreCertificates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    bulder
      .addCase(addCertificate.fulfilled, (state, action) => {
        state.status = "idle";
        state.records.push(action.payload);
      })
      .addCase(addCertificate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    bulder
      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.status = "idle";
        if (state.records.some((c) => c.id === action.payload)) {
          const newRecords = state.records.filter(
            (c) => c.id !== action.payload
          );
          state.records = newRecords;
        }
      })
      .addCase(deleteCertificate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    bulder
      .addCase(editCertificate.fulfilled, (state, action) => {
        state.status = "idle";
        const beforeData = state.records.find(
          (c) => c.id === action.payload.id
        );
        if (beforeData) {
          const index = state.records.indexOf(beforeData);
          const newRecords = [
            ...state.records.slice(0, index),
            action.payload,
            ...state.records.slice(index + 1),
          ];
          state.records = newRecords;
        }
      })
      .addCase(editCertificate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectCertificateIds = (state: RootState) =>
  state.certificate.records.map((cer) => cer.id);

export const selectCertificates = (state: RootState) =>
  state.certificate.records;

export const { loadingSomething } = certificateSlice.actions;
export default certificateSlice.reducer;

// export const getCertificate = createAsyncThunk<
//   Certificate | null,
//   number,
//   { state: RootState; rejectValue: MyKnownError }
// >(
//   "certificate/getCertificate",
//   async (id: number, { getState, rejectWithValue }) => {
//     const state = getState();
//     if (selectCacheCertificateIds(state).includes(id)) return null;
//     try {
//       const certificate = await fetchById(id);
//       return certificate;
//     } catch (err) {
//       return rejectWithValue(err as MyKnownError);
//     }
//   }
// );
