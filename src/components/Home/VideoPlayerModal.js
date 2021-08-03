import React from "react";
import Modal from "@material-ui/core/Modal";
import ReactPlayer from "react-player/lazy";

function VideoPlayerModal({ open, setVideoPlayModal }) {
    return (
        <Modal
            open={open}
            onClose={() => setVideoPlayModal(false)}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* <iframe></iframe> */}
            <p className="video__modal">
                <ReactPlayer
                    className="react-player"
                    url="https://www.youtube.com/embed/fqMOX6JJhGo"
                    width="100%"
                    height="100%"
                    // playing
                    controls
                />

                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/fqMOX6JJhGo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            </p>
            {/*  */}
        </Modal>
    );
}

export default VideoPlayerModal;
