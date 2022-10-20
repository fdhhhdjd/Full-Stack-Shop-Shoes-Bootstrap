import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import STORAGES from "../../../utils/storage";
import {
  Lazy_Loading_Image,
  Loading_Button,
  Message_Auth,
  Rating,
  SwaleMessage,
  useDebounce,
} from "../../imports/General_Global_Import";

const Products = () => {
  const { loading, result_product, error } = useSelector((state) => ({
    ...state.Products_user,
  }));
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);

  //*Pagination
  const [currentPage, setcurrentPage] = useState(1);

  const [itemsPerPage, setitemsPerPage] = useState(12);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const currentItems = debouncedValue
    ? result_product
    : result_product && result_product.slice(indexOfFirstItem, indexOfLastItem);

  //* render product
  const renderData = (data, index) => {
    return (
      <React.Fragment>
        {data &&
          data
            .filter((value, index) => {
              if (debouncedValue === "") {
                return value;
              } else if (
                value?.name.toLowerCase().includes(debouncedValue.toLowerCase())
              ) {
                return value;
              }
            })
            .map((product, index) => {
              return (
                <div
                  className="shop col-lg-4 col-md-6 col-sm-6"
                  key={product._id}
                >
                  <div className="border-product">
                    <Link to={`/product/${product._id}`}>
                      <div className="shopBack">
                        {product.image && (
                          <Lazy_Loading_Image url={product?.image.url} />
                        )}
                      </div>
                    </Link>

                    <div className="shoptext">
                      <p>
                        <Link to={`/product/${product._id}`}>
                          {STORAGES.except(product.name, 25)}
                        </Link>
                      </p>

                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                      <h3>${product.price}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
      </React.Fragment>
    );
  };

  useEffect(() => {
    setSearch(debouncedValue);
    if (!debouncedValue) {
      return;
    }
  }, [debouncedValue]);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const pages = [];
  if (!debouncedValue) {
    for (
      let i = 1;
      i <= Math.ceil(result_product && result_product.length / itemsPerPage);
      i++
    ) {
      pages.push(i);
    }
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={` page-link  ${currentPage == number ? "active1" : null}`}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}>&hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip;</li>;
  }

  const handleLoadMore = () => {
    if (itemsPerPage === result_product && result_product.length) {
      return SwaleMessage("It's over, my friend 😄", "error");
    }
    setitemsPerPage(itemsPerPage + 3);
  };
  return (
    <React.Fragment>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading_Button />
                  </div>
                ) : error ? (
                  <Message_Auth variant="alert-danger">{error}</Message_Auth>
                ) : (
                  <>{renderData(currentItems)}</>
                )}

                <nav className="float-end mt-4" aria-label="Page navigation">
                  <ul className="pagination  justify-content-center">
                    <li className="page-item disabled ">
                      <button
                        onClick={handlePrevbtn}
                        disabled={currentPage == pages[0] ? true : false}
                        id="page-link"
                      >
                        Previous
                      </button>
                    </li>
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}
                    <li className="page-item">
                      <button
                        id="page-link"
                        onClick={handleNextbtn}
                        disabled={
                          currentPage == pages[pages.length - 1] ? true : false
                        }
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
                <nav className="float-end mt-4" aria-label="Page navigation">
                  <ul className="pagination  justify-content-center">
                    <li className="page-item">
                      {itemsPerPage > result_product?.length ? (
                        ""
                      ) : (
                        <button className="page-link" onClick={handleLoadMore}>
                          Load More
                        </button>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Products;
