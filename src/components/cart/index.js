import React, { useEffect, useState } from "react";

// Components
import { url } from "../api";

// Css
import "./cart.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useStateValue } from "../../StateProvider";
import swal from "sweetalert";
import { Helmet } from "react-helmet";

const Cart = ({ match }) => {
    const [{ cartLength }, dispatch] = useStateValue();

    const [courses, setCourses] = useState([]);
    const [offer, setOffer] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [wishlistId, setWishlistId] = useState([]);

    const token = localStorage.getItem("pn_en");

    useEffect(() => {
        fetchData();
        fetchWishList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchWishList = async () => {
        try {
            const response = await Axios.get(url + "/wishlist", {
                headers: {
                    Authorization: `Basic ${localStorage.getItem("pn_en")}`,
                },
            });
            const data = response.data.data.map(
                (wishlist) => +wishlist.course_id
            );
            setWishlistId(data);
        } catch (error) {
            console.log(error);
            setWishlistId([]);
        }
    };

    const fetchData = async () => {
        try {
            const response = await Axios.get(url + "/cart", {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            // const data = await response.json();
            console.log(response.data.data, "datas");
            setCourses(response.data.data);
        } catch (error) {
            console.log(error);
            setCourses([]);
        }
    };

    const addtowishlist = async (courseid) => {
        console.log("wishlist");
        await Axios({
            method: "post",
            url: `${url}/wishlist`,
            headers: { Authorization: `Basic ${token}` },
            data: {
                course_id: courseid,
            },
        }).then(function (res) {
            console.log(res.data);
            if (res.data.success === "Added") {
                swal({
                    text: "Added to Wishlist ",
                    icon: "success",
                });
            } else {
                swal({
                    text: "Removed from Wishlist ",
                    icon: "error",
                });
            }
        });
        fetchWishList();
    };

    const calculateTotal = () => {
        return courses
            .filter(
                (filter) => filter.course.price_type.toLowerCase() === "paid"
            )
            .reduce((total, price) => total + Number(price.course.price1), 0);
    };

    const removeCartItem = async (id) => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const postData = {
                    id,
                    quantity: 0,
                };

                try {
                    const response = await Axios.put(`${url}/cart`, postData, {
                        headers: {
                            Authorization: `Basic ${token}`,
                        },
                    });

                    console.log(response.data);
                    dispatch({
                        type: "SET_CART",
                        cartLength: cartLength - 1,
                    });
                    swal("Item removed from the cart", {
                        icon: "success",
                    });
                } catch (e) {
                    console.log(e);
                    swal("Error removing item!", {
                        icon: "warning",
                    });
                }
            }
            fetchData();
        });
    };

    const renderRating = (rating) => {
        let ratingArr = [];
        for (let i = 0; i < rating; i++) {
            ratingArr.push(<span style={{ color: "#00b0f0" }}>&#128970;</span>);
        }
        for (let i = 0; i < 5 - rating; i++) {
            ratingArr.push(<span>&#128970;</span>);
        }
        return ratingArr;
    };

    const mappedData = courses?.map((item, index) => {
        return (
            <div
                key={index}
                className="col-lg-12 all-course-single"
                style={{ padding: "0" }}
            >
                <div className="courses_list_content">
                    <div className="top_courses list">
                        <div className="thumb col- align-content-center">
                            <img
                                className="img-whp"
                                src={item.course.feature_image}
                                alt="t1.jpg"
                                width="140px"
                                height="165px"
                            />
                            <div className="overlay">
                                <div className="icon">
                                    {
                                        (console.log(
                                            wishlistId,
                                            item.course_id
                                        ),
                                        wishlistId?.includes(
                                            +item.course_id
                                        ) ? (
                                            <div
                                                className="heart  is-active"
                                                style={{
                                                    right: "-20px",
                                                    top: "-20px",
                                                }}
                                                onClick={() =>
                                                    addtowishlist(
                                                        item.course_id
                                                    )
                                                }
                                            ></div>
                                        ) : (
                                            <div
                                                className="heart"
                                                style={{
                                                    right: "-20px",
                                                    top: "-20px",
                                                }}
                                                onClick={() =>
                                                    addtowishlist(
                                                        item.course_id
                                                    )
                                                }
                                            ></div>
                                        ))
                                    }
                                </div>
                                <div className="tc_preview_course" href="#">
                                    Preview Course
                                </div>
                            </div>
                        </div>
                        <div className="details col-9 p-0">
                            <div className="tc_content">
                                <h5> {item.course.course_title}</h5>

                                <p>{item.course.short_description}</p>
                            </div>
                            <div className="tc_footer">
                                <ul className="tc_meta float-left fn-414">
                                    <li className="list-inline-item">
                                        <i className="flaticon-profile"></i>
                                    </li>
                                    <li className="list-inline-item">
                                        {item.course.people_count}
                                    </li>
                                    <li className="list-inline-item">
                                        <i className="fas fa-book-open"></i>
                                    </li>
                                    <li className="list-inline-item">
                                        {item.course.lesson_count}
                                    </li>
                                </ul>
                                {item.course.price_type.toLowerCase() ===
                                "paid" ? (
                                    <div className="tc_price float-right fn-414">
                                        Rs {item.course.price1}
                                    </div>
                                ) : (
                                    <div className="tc_price float-right fn-414">
                                        Free
                                    </div>
                                )}
                                <div className="tc_price float-right fn-414">
                                    <span className="total__rating">
                                        ({item.course.rating_count})
                                    </span>
                                </div>
                                <ul className="tc_review float-right fn-414 coursecard__rating">
                                    {renderRating(item.course.rating)?.map(
                                        (rating, i) => (
                                            <li
                                                key={i}
                                                className="list-inline-item"
                                                style={{ fontSize: "30px" }}
                                            >
                                                {rating}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <button className="btn btn-primary mr-2">
                                    View Details
                                </button>
                                <button
                                    className="btn btn-secondary mr-2"
                                    onClick={() => setModalShow(true)}
                                >
                                    <span className="flaticon-share">
                                        {" "}
                                        Share
                                    </span>
                                </button>
                                <button
                                    onClick={() => removeCartItem(item.id)}
                                    className="btn  btn-learning"
                                >
                                    Remove Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div>
            <Helmet>
                <title>Cart | The Pen App</title>
                <meta name="description" content="Cart page" />
            </Helmet>
            <section className="page" style={{ paddingTop: "60px" }}>
                <div className="container" style={{ minHeight: "40vh" }}>
                    <div className="row w-100 m-0">
                        <div
                            className="col-12 col-md-9 mt-2"
                            style={{ padding: "20px 0" }}
                        >
                            <div className="row justify-content-center m-0">
                                <div>
                                    <span style={{ fontSize: "20px" }}>
                                        Items in Cart
                                    </span>
                                </div>
                                {mappedData}
                            </div>
                        </div>
                        <div
                            className="col-12 order-first order-lg-2 col-md-3 mt-2"
                            style={{
                                borderBottom: "1px solid rgba(0, 0, 0, 0.25",
                                padding: "20px 10px",
                            }}
                        >
                            <div>
                                <span style={{ fontWeight: "600" }}>
                                    Total:
                                </span>
                                <span className="price">
                                    Rs. {calculateTotal()}
                                </span>
                                {offer ? (
                                    <>
                                        <span
                                            style={{
                                                textDecoration: "line-through",
                                                marginRight: "5px",
                                            }}
                                        >
                                            Rs. 1600
                                        </span>
                                        <span>56% off</span>
                                    </>
                                ) : null}
                            </div>
                            <div className="mt-3">
                                <Link to="/checkout">
                                    <button
                                        type="button"
                                        className="btn btn-danger check-btn w-100"
                                    >
                                        Checkout
                                    </button>
                                </Link>
                            </div>
                            <div className="mt-2">
                                <form className="d-flex">
                                    <input
                                        type="text"
                                        placeholder="Enter Coupon"
                                        style={{ width: "100%" }}
                                    ></input>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                    >
                                        Apply
                                    </button>
                                </form>
                            </div>
                            {/* <div className="mt-1 coupons">
                                <span
                                    style={{
                                        fontSize: "14px",
                                        marginRight: "10px",
                                    }}
                                    role="img"
                                    aria-label="emo"
                                >
                                    &#x274C;
                                </span>
                                <span
                                    style={{ color: "black", fontSize: "1rem" }}
                                >
                                    XYZ Applied
                                </span>
                            </div> */}
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </section>
        </div>
    );
};

export default Cart;
