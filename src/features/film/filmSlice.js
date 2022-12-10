import { createSlice } from "@reduxjs/toolkit";
import { getSingleFilm, getCountry, getFilm, getGenres, searchFilm, getTranslation, getYear } from "./filmApi";

const initialState = {
    films: [],
    countries: [],
    translation: [],
    years: [],
    genres: [],
    film: {},
    filmSearch:[]
};

export const filmSlice = createSlice({
    name: "film",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getFilm.fulfilled, (state, action) => {
            state.films = action.payload.film;
        });

        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload.genres;
        });

        builder.addCase(getCountry.fulfilled, (state, action) => {
            state.countries = action.payload.country;
        });

        builder.addCase(getTranslation.fulfilled, (state, action) => {
            state.translation = action.payload.translation;
        });

        builder.addCase(getYear.fulfilled, (state, action) => {
            state.years = action.payload.years;
        });
        
        builder.addCase(getSingleFilm.fulfilled, (state, action) => {
            state.film = action.payload.oneFilm;
        });

        builder.addCase(searchFilm.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.films = action.payload.film;
        });
    },
});

export default filmSlice.reducer;