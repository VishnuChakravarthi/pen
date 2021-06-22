import Axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useStateValue } from "../../StateProvider";
import { url } from "../api";
import Spinner from "../utils/Spinner_old";
import "./checkout.css";
import history from "../../history";
import { Helmet } from "react-helmet";

function Checkout() {
    const [courses, setCourses] = useState([]);
    const [formValue, setFormValue] = useState({});
    const [spinner, setSpinner] = useState(false);

    const [{}, dispatch] = useStateValue();

    const token = localStorage.getItem("Token");

    useEffect(() => {
        fetchCartData();
        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchCartData = async () => {
        setSpinner(true);
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
            // setCourses([]);
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await Axios.get(url + "/my-profile", {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });
            // const data = await response.json();
            console.log(response.data.data, "datas");
            const res = response.data.data;
            setFormValue({
                name: res.name,
                country: res.country,
                email: res.email,
                street: res.street,
                state: res.state,
                pincode: res.pincode,
                city: res.city,
                phoneno: res.phoneno,
            });
        } catch (error) {
            console.log(error);
            // setCourses([]);
        }
        setSpinner(false);
    };

    console.log(formValue);

    const calculateTotal = () => {
        return courses
            .filter(
                (filter) => filter.course.price_type.toLowerCase() === "paid"
            )
            .reduce((total, price) => total + Number(price.course.price1), 0);
    };

    const purchase = async () => {
        for (let i = 0; i < courses.length; i++) {
            const postData = {
                course_id: courses[i].course.course_id,
                pack: 0,
                price: courses[i].course.price1,
                points: 0,
            };
            try {
                const response = await Axios.post(`${url}/purchase`, postData, {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                });

                console.log(response.data);
            } catch (e) {
                console.log(e);
                return swal({
                    text: "Purchase unsuccessful",
                    icon: "error",
                });
            }
        }
        dispatch({
            type: "SET_CART",
            cartLength: 0,
        });
        swal({
            text: "Purchase successful",
            icon: "success",
        });
        return history.push("/courses");
    };

    return (
        // <div>
        <>
            <Helmet>
                <title>Checkout | The Pen App</title>
                <meta name="description" content="Profile page" />
            </Helmet>
            <section className="shop-checkouts">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8 col-xl-8">
                            <div className="checkout_form">
                                <div className="checkout_coupon ui_kit_button">
                                    <h4 className="mb15">Billing Details</h4>
                                    <form
                                        className="form2"
                                        id="coupon_form"
                                        name="contact_form"
                                    >
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputName">
                                                        Name *
                                                    </label>
                                                    <input
                                                        id="form_name"
                                                        name="form_name"
                                                        className="form-control"
                                                        required="required"
                                                        type="text"
                                                        value={formValue.name}
                                                        onChange={(e) =>
                                                            setFormValue({
                                                                ...formValue,
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="my_profile_select_box form-group">
                                                    <label htmlFor="exampleFormControlInput9">
                                                        Country *
                                                    </label>
                                                    <br />
                                                    <input
                                                        id="form_name5"
                                                        name="form_name5"
                                                        className="form-control"
                                                        // placeholder="Country"
                                                        required="required"
                                                        type="text"
                                                        value={
                                                            formValue.country
                                                        }
                                                        onChange={(e) =>
                                                            setFormValue({
                                                                ...formValue,
                                                                country:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputName3">
                                                        Street address *
                                                    </label>
                                                    <input
                                                        id="form_name4"
                                                        name="form_name4"
                                                        className="form-control mb10"
                                                        // placeholder="House number and street name"
                                                        required="required"
                                                        type="text"
                                                        value={formValue.street}
                                                        onChange={(e) =>
                                                            setFormValue({
                                                                ...formValue,
                                                                street: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputName4">
                                                        Postcode / ZIP *
                                                    </label>
                                                    <input
                                                        id="form_name6"
                                                        name="form_name6"
                                                        className="form-control"
                                                        required="required"
                                                        type="number"
                                                        value={
                                                            formValue.pincode
                                                        }
                                                        onChange={(e) =>
                                                            setFormValue({
                                                                ...formValue,
                                                                pincode:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputName5">
                                                        Town / City *
                                                    </label>
                                                    <input
                                                        id="form_name7"
                                                        name="form_name7"
                                                        className="form-control"
                                                        required="required"
                                                        type="text"
                                                        value={formValue.city}
                                                        onChange={(e) =>
                                                            setFormValue({
                                                                ...formValue,
                                                                city: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPhone">
                                                        Phone *
                                                    </label>
                                                    <input
                                                        id="form_phone"
                                                        name="form_phone"
                                                        className="form-control"
                                                        required="required"
                                                        type="number"
                                                        value={
                                                            formValue.phoneno
                                                        }
                                                        onChange={(e) =>
                                                            setFormValue({
                                                                ...formValue,
                                                                phoneno:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail">
                                                        Your Email
                                                    </label>
                                                    <input
                                                        id="form_email"
                                                        name="form_email"
                                                        className="form-control required email"
                                                        required="required"
                                                        type="email"
                                                        value={formValue.email}
                                                        onChange={(e) =>
                                                            setFormValue({
                                                                ...formValue,
                                                                email: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="col-sm-12">
                                            <div className="form-group mb0">
                                                <label
                                                    className="ai_title"
                                                    htmlFor="exampleInputTextArea"
                                                >
                                                    Additional Information
                                                </label>
                                                <p>Order notes (optional)</p>
                                                <textarea
                                                    id="form_message"
                                                    name="form_message"
                                                    className="form-control required"
                                                    rows="7"
                                                    placeholder="Notes about your order, e.g. special notes htmlFor delivery."
                                                    required="required"
                                                ></textarea>
                                            </div>
                                        </div> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-4 mb-5">
                            <div className="order_sidebar_widget mb30">
                                <h4 className="title">Your Order</h4>
                                <ul>
                                    <li className="subtitle">
                                        <p>
                                            Product{" "}
                                            <span className="float-right">
                                                Total
                                            </span>
                                        </p>
                                    </li>
                                    {courses?.map((course, i) => (
                                        <li key={i}>
                                            <p>
                                                {course.course.course_title}
                                                <span className="float-right">
                                                    ₹{" "}
                                                    {course.course.price_type.toLowerCase() ===
                                                    "paid"
                                                        ? course.course.price1
                                                        : 0}
                                                </span>
                                            </p>
                                        </li>
                                    ))}
                                    {/* // <li>
                                //     <p>
                                //         Seo Books x 1{" "}
                                //         <span className="float-right">
                                //             $99.00
                                //         </span>
                                //     </p>
                                // </li> */}
                                    <li className="subtitle">
                                        <p>
                                            Subtotal{" "}
                                            <span className="float-right">
                                                Subtotal
                                            </span>
                                        </p>
                                    </li>
                                    <li className="subtitle">
                                        <p>
                                            Total{" "}
                                            <span className="float-right totals color-orose">
                                                ₹ {calculateTotal()}
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="payment_widget">
                                <div className="ui_kit_checkbox style2">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck80"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheck80"
                                        >
                                            Direct bank transfer
                                        </label>
                                    </div>
                                    {/* <div className="bt_details">
                                    <p>
                                        Make your payment directly into our bank
                                        account. Please use your Order ID as the
                                        payment reference.Your order will not be
                                        shipped until the funds have cleared in
                                        our account.
                                    </p>
                                </div> */}
                                    {/* <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck82"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customCheck82"
                                    >
                                        Check payments
                                    </label>
                                </div> */}
                                    {/* <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck83"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customCheck83"
                                    >
                                        Cash on delivery
                                    </label>
                                </div> */}
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customCheck84"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheck84"
                                        >
                                            PayPal{" "}
                                            <img
                                                className="pr15"
                                                src="images/paypal.png"
                                                alt="..."
                                                width="60px"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="ui_kit_button payment_widget_btn">
                                <button
                                    type="button"
                                    className="btn dbxshad btn-lg btn-thm3 circle btn-block"
                                    onClick={purchase}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {spinner ? (
                <div className="loader">
                    <Spinner />
                </div>
            ) : null} */}
            </section>
        </>
        // </div>
    );
}

export default Checkout;
