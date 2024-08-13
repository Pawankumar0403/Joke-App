import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for fetching jokes
const fetchJoke = createAsyncThunk(
    "jokes/jokeCategory",
    async function (category) {
        return axios
            .get(`https://api.chucknorris.io/jokes/random?category=${category}`)
            .then(function (result) {
                console.log(result.data.value);
                return result.data.value;
            })
            .catch(function (errmsg) {
                return <h3 style={{color:"red",textAlign:"center"}}>Unavailable Data Does not found.<br/> Available List: animal, career, celebrity, dev, explicit, fashion, food, history,<br/> money, movie, music, political, religion, science, sport, travel</h3>
            });
    }
);

// Initial state
const initialState = {
    joke: "No Joke",
    loading: false, // New property for loading state
};

// Slice
const jokeSlice = createSlice({
    name: "joke",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJoke.pending, (state) => {
                state.loading = true; // Set loading to true when request is pending
                console.log("Loading....");
            })
            .addCase(fetchJoke.fulfilled, (state, action) => {
                state.joke = action.payload;
                state.loading = false; // Set loading to false when request is fulfilled
            })
            .addCase(fetchJoke.rejected, (state, action) => {
                state.joke = action.payload;
                state.loading = false; // Set loading to false when request is rejected
            });
    },
});

export default jokeSlice;

export { fetchJoke };
