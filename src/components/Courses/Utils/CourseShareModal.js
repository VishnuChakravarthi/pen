import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    InstapaperShareButton,
} from "react-share";

function CourseShareModal(props) {
    // console.log(process.env);
    const url = `http://thepenapp.com/course/${props.course.course_id}`;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Share
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className="text-center">
                    Course Title: {props.course.course_title}
                </h4>
                <h4 className="text-center">URL: {url}</h4>
                <div className="d-flex align-items-center justify-content-center">
                    <WhatsappShareButton url={url}>
                        <i
                            className="fab fa-lg fa-whatsapp mr-4"
                            style={{ color: "#4FCE5D" }}
                        ></i>
                    </WhatsappShareButton>
                    <FacebookShareButton url={url}>
                        <i
                            className="fab fa-lg fa-facebook mr-4"
                            style={{ color: "#3b5998" }}
                        ></i>
                    </FacebookShareButton>
                    <TwitterShareButton url={url}>
                        <i
                            className="fab fa-lg fa-twitter mr-4"
                            style={{ color: "#00acee" }}
                        ></i>
                    </TwitterShareButton>
                    <LinkedinShareButton url={url}>
                        <i
                            className="fab fa-lg fa-linkedin mr-4"
                            style={{ color: "#0e76a8" }}
                        ></i>
                    </LinkedinShareButton>
                    <InstapaperShareButton url={url}>
                        <i
                            className="fab fa-lg fa-instagram"
                            style={{ color: "#3f729b" }}
                        ></i>
                    </InstapaperShareButton>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CourseShareModal;
