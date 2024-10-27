import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE={
    styles:[],
    loading:false,
    error:null
}
export const fetchStyles=createAsyncThunk("styles/fetchStyles",async(url)=>{
    const response=await axios.get(url)
    return response.data
})

const styleSlice=createSlice({
    name:"styles",
    initialState:INITIAL_STATE,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchStyles.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchStyles.fulfilled,(state,action)=>{
            state.loading=false
            state.styles=action.payload
        })
        .addCase(fetchStyles.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})

export default styleSlice.reducer