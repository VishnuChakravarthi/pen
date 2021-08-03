import React from "react";

function CoursePagination({ pageNumbers, currentPage, changePage }) {
    return (
        <div>
            <div className="col-lg-12 mt50">
                <div className="mbp_pagination">
                    <ul className="page_navigation">
                        {currentPage > 1 ? (
                            <li className="page-item">
                                <div
                                    className="page-link"
                                    onClick={() => changePage(currentPage - 1)}
                                >
                                    {" "}
                                    <span className="flaticon-left-arrow"></span>{" "}
                                    Prev
                                </div>
                            </li>
                        ) : null}
                        {pageNumbers?.map((number) => (
                            <li
                                className="page-item"
                                key={number}
                                id={number}
                                onClick={() => changePage(number)}
                            >
                                <div className="page-link">{number}</div>
                            </li>
                        ))}
                        {currentPage <= pageNumbers.length - 1 ? (
                            <li className="page-item">
                                <div
                                    className="page-link"
                                    onClick={() => changePage(currentPage + 1)}
                                >
                                    Next{" "}
                                    <span className="flaticon-right-arrow-1"></span>
                                </div>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CoursePagination;
