import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE={
    boutiques:[],
    loading:false,
    error:null
}

export const fetchBoutiques=createAsyncThunk("boutiques/fetchBoutiques",async(url)=>{
    const response=await axios.get(url)
    return response.data
})

const boutiqueSlice=createSlice({
    name:"boutique",
    initialState:INITIAL_STATE,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBoutiques.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchBoutiques.fulfilled,(state,action)=>{
            state.boutiques=action.payload
            state.loading=false
        })
        .addCase(fetchBoutiques.rejected,(state,action)=>{
            state.error=action.error.message
            state.loading=false
        })
    }
})

export default boutiqueSlice.reducer