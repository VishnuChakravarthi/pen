
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  InstapaperShareButton
} from "react-share";


function MyVerticallyCenteredModal(props) {
     const mystyle = {
    cursor:"pointer"
     };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Share</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-center">Course Title: KAILEE GUTKOWSKI V</h4>
        <h4 className="text-center">url: "https://helloworld.com"</h4>
        <div className="d-flex align-items-center justify-content-center">
          <WhatsappShareButton url="https://helloworld.com"><i class="fab fa-lg fa-whatsapp mr-4" style={{color: "#4FCE5D"}}></i></WhatsappShareButton> 
          <FacebookShareButton url="https://helloworld.com"><i class="fab fa-lg fa-facebook mr-4" style={{color: "#3b5998"}}></i></FacebookShareButton>
          <TwitterShareButton url="https://helloworld.com"><i class="fab fa-lg fa-twitter mr-4" style={{color: "#00acee"}}></i></TwitterShareButton>
          <LinkedinShareButton url="https://helloworld.com"><i class="fab fa-lg fa-linkedin mr-4" style={{color: "#0e76a8"}}></i></LinkedinShareButton>
          <InstapaperShareButton url="https://helloworld.com"><i class="fab fa-lg fa-instagram" style={{color: "#3f729b"}}></i></InstapaperShareButton>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal