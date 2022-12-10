import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFilm, getCountry, getGenres, getTranslation, getYear } from '../../features/film/filmApi'
import { useEffect } from "react";
import AddFilmStyle from "./AddFilm.module.css"
import AddFilmDiv from "./AddFilmDiv.module.css"
import FileStyle from "./file.module.css"
import BigAddFilmDiv from "./BigAddFilmDiv.module.css"
import { PaginatedItems } from "../Pagination";

export const AddFilm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { genres, countries, translation, years } = useSelector((state) => state.film);

    useEffect(() => {
        dispatch(getYear())
        dispatch(getGenres())
        dispatch(getTranslation())
        dispatch(getCountry())
    }, [])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const add = async (data) => {
        data.photo_url = data.photo_url[0]
        data.video_url = data.video_url[0]
        data.genres = JSON.stringify(data.genres)

        let form = new FormData()
        for (let i in data) {
            form.append(i, data[i])
        }
        await dispatch(addFilm(form))
        reset()
        navigate("/home")  
    }


    return (
        <div className={BigAddFilmDiv.bafd}>
            <div className={AddFilmStyle.addFilm}>
                <form onSubmit={handleSubmit(add)} >
                    <h2>Add Film <i className="fa-solid fa-film"></i></h2><br />
                    <div className={AddFilmDiv.d1}>
                        <div>
                            <input type="text"
                                {...register("name", { required: true })} placeholder="Movie Name" />
                            {errors.name && <p style={{ color: "red" }}>Please enter name</p>}
                        </div>
                        <div>
                            <input type="text"
                                {...register("producer", { required: true })} placeholder="Producer" />
                            {errors.producer && <p style={{ color: "red" }}>Please enter Producer</p>}
                        </div>
                        <div>
                            <input type="text"
                                {...register("actors", { required: true })} placeholder="Actors" />
                            {errors.actors && <p style={{ color: "red" }}>Please enter Actors</p>}
                        </div>
                        <div>
                            <input type="time"
                                {...register("time", { required: true })} placeholder="Time"
                            />
                            {errors.time && <p style={{ color: "red" }}>Please enter Time  </p>}
                        </div>
                    </div><br />
                    <div>
                        <textarea cols="100" rows="5"
                            {...register("description", { required: true })} placeholder="Description">
                            {errors.description && <p style={{ color: "red" }}>Please enter Description</p>}
                        </textarea>
                    </div>
                    <div className={AddFilmDiv.d1}>
                        <div>
                            <p>Genres <i className="fa-solid fa-arrow-down"></i></p>
                            <select multiple
                                {...register("genres", { required: true })}>
                                {genres.map((genre, index) => {
                                    return (
                                        <option value={genre.id} key={index}>{genre.name}</option>
                                    )
                                })}
                            </select>
                            {errors.genres && <p style={{ color: "red" }}>Please enter Genres</p>}
                        </div>
                        <div>
                            <p>Years <i className="fa-solid fa-arrow-down"></i></p>
                            <select
                                {...register("year", { required: true })}
                            >
                                {years.map((el, i) => {
                                    return (
                                        <option value={el.id} key={i}>{el.name}</option>
                                    )
                                })}
                            </select>
                            {errors.year && <p style={{ color: "red" }}>Please enter Year</p>}
                        </div>
                        <div>
                            <p>Country <i className="fa-solid fa-arrow-down"></i></p>
                            <select
                                {...register("country", { required: true })}>
                                {countries.map((country, index) => {
                                    return (
                                        <option value={country.id} key={index}>{country.name}</option>
                                    )
                                })}
                            </select>
                            {errors.country && <p style={{ color: "red" }}>Please enter Country </p>}
                        </div>
                        <div>
                            <p>Translation<i className="fa-solid fa-arrow-down"></i></p>
                            <select
                                {...register("translation", { required: true })}>
                                {translation.map((el, i) => {
                                    return (
                                        <option value={el.id} key={i}>{el.name}</option>
                                    )
                                })}
                            </select>
                            {errors.translation && <p style={{ color: "red" }}>Please enter Translation  </p>}

                        </div>
                        <div className={FileStyle.file} >
                            <div>Photo<i className="fa-solid fa-arrow-right"></i>
                                <input type="file"
                                    {...register("photo_url", { required: true })} accept="image/*" />
                                {errors.photo_url && <p style={{ color: "red" }}>Please enter photo</p>}
                            </div>
                            <div>Video<i className="fa-solid fa-arrow-right"></i>
                                <input type="file"
                                    {...register("video_url", { required: true })} accept="video/*" />
                                {errors.video_url && <p style={{ color: "red" }}>Please enter video</p>}
                            </div>
                        </div>
                    </div><br />
                    <button>Add</button><br />
                </form>
            </div>
            <PaginatedItems/>
        </div>
    )
};