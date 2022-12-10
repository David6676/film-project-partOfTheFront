import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { addFeedback, andStarAdd, getSingleFilm } from "../../features/film/filmApi";
import ReactStars from "react-rating-stars-component";
import { BASE_URL } from "../../Lib";
import FilmStyle from "./FilmStyle.module.css"
import desDiv from "./descriptionDiv.module.css"
import LeftDiv from "./BigLeftDiv.module.css"
import RightDiv from "./BigRightDiv.module.css"
import VideoDiv from "./VideoDiv.module.css"
import MidleDiv from "./MidleDiv.module.css"
import LittleFilmStyle from "./LittleFilmStyle.module.css"

export const FilmPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const { film } = useSelector((state) => state.film);

    useEffect(() => {
        dispatch(getSingleFilm(id))
    }, [])


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const add = async (data) => {
        data.filmId = id
        await dispatch(addFeedback(data))
        reset()
    }

    const starValue = async (e) => {
        let data = {
            filmId: id,
            star: e
        }
        await dispatch(andStarAdd(data))
    }

    return (
        <>
            {"id" in film &&
                <div className={FilmStyle.style}>
                    <div className={LittleFilmStyle.LFS}>
                        <div className={MidleDiv.Md}>
                            <div className={LeftDiv.Ld}>
                                <h1>{film.name}{
                                    film && <ReactStars
                                        count={5}
                                        onChange={starValue}
                                        size={30}
                                        activeColor="#ffd700"
                                    />
                                }</h1>

                                <h2>Country: {film.country.name}</h2>
                                <h2>Actors: {film.actors}</h2>
                                <h2>Producer: {film.producer}</h2>
                                <h2>Year: {film.year.name}</h2>
                                <h2>Translation: {film.translation.name}</h2>
                                <h2>Duration: {film.time}</h2>
                                {film.genres.map((genre, index) => {
                                    return (
                                        <h2 key={index}>{genre.name}</h2>
                                    )
                                })
                                }
                                <br />
                                <div className={desDiv.desdiv}>{film.description}</div><br />
                                <form onSubmit={handleSubmit(add)}>
                                    <textarea name="text" cols="25" rows="4" placeholder="Feedback"
                                        {...register("text", { required: true })}>
                                        {errors.text && <p style={{ color: "red" }}>Please enter Feedback</p>}
                                    </textarea>
                                    <button>Save</button>
                                    <div>

                                    </div>
                                </form>
                            </div>
                            <div className={RightDiv.Rd}>
                                <div>
                                    {film.photo_url && <img src={BASE_URL + "/film_photo/" + film.photo_url} alt="" />}
                                </div>
                            </div>
                        </div><br />

                        <div className={VideoDiv.Vd}>
                            {film.video_url && <video controls>
                                <source src={BASE_URL + "/film_video/" + film.video_url} type="video/mp4" />
                            </video>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}