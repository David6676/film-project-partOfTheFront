import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFilm, genreSearch, getFilm, getGenres, getTranslation, getYear, searchFilm, searchTranslation, yarsSearch } from "../../features/film/filmApi";
import { Link } from "react-router-dom"
import HomeStyle from "./Home.module.css"
import inputSearch from "./input.module.css"
import delBtn from "./btn.module.css"
import body from "./body.module.css"


export const Home = () => {

  const { films, genres, translation, years } = useSelector((state) => state.film);

  let dispatch = useDispatch()

  const search = async (e) => {
    console.log(e.target.value);
    await dispatch(searchFilm(e.target.value));
  }

  const searchLanguage = async (e) => {
    console.log(e.target.value);
    await dispatch(searchTranslation(e.target.value))
  }

  const searchYear = async (e) => {
    console.log(e.target.value);
    await dispatch(yarsSearch(e.target.value))
  }

  useEffect(() => {
    dispatch(getFilm())
    dispatch(getGenres())
    dispatch(getTranslation())
    dispatch(getYear())
  }, [])


  const deleteF = async (e) => {
    dispatch(deleteFilm(e))
    dispatch(getFilm())
  }

  return (
    <div className={body.bd}>
      <div className={inputSearch.inp}>
        <input onChange={search} type="search" name="" placeholder="Sarch Film..." /><i className="fa-solid fa-magnifying-glass"></i>
        <select onChange={searchLanguage}>
          {
            translation.map((el, index) => {
              return (
                <option value={el.id} key={index}>{el.name}</option>
              )
            })
          }
        </select>
        <select onChange={searchYear}>
          {
            years.map((el, index) => {
              return (
                <option value={el.id} key={index}>{el.name}</option>
              )
            })
          }
        </select>
      </div>
      {
        films.map((film, index) => {
          return (
            <div key={index}>
              <div className={HomeStyle.home}>
                <div>
                  <div className={delBtn.del}>
                    <h1><Link to={`/film/${film.id}`}>{film.name}</Link></h1>
                    <button onClick={deleteF.bind(null, film.id)}><i className="fa-solid fa-trash"></i></button>
                  </div>
                  <h3>Year: {film.year.name}</h3>
                  <h3>Genares: </h3>
                  {
                    film.genres.map((genre, index) => {
                      return (
                        <h3 key={index}>{genre.name}</h3>
                      )
                    })
                  }
                </div>
              </div><br />
            </div>
          )
        })
      }
    </div>
  );
};