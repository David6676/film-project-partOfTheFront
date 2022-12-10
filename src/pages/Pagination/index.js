import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFilm } from "../../features/film/filmApi";
import { BASE_URL } from "../../Lib";
import Next from "./PrevNext.module.css";

export const PaginatedItems = () => {
  const { films } = useSelector((state) => state.film);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFilm());
  }, []);

  const [currentItems, setCurrentItems] = useState([]);
  console.log(currentItems);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 1;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(films.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(films.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, films]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % films.length;
    setItemOffset(newOffset);
  };

  const thisFilm = (id) => {
    navigate(`/film/${id}`);
    console.log(id);
  };

  return (
    <div className={Next.prevNext}>
      <div>
        <br />
        {currentItems.map((el, index) => {
          return (
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <img
                  src={BASE_URL + "/film_photo/" + el.photo_url}
                  alt=""
                  width={150}
                  height={150}
                />
              </div>
              <button onClick={thisFilm.bind(null, el.id)}>{el.name}</button>
            </div>
          );
        })}
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};
