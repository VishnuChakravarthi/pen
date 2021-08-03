import React from "react";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Axios from "axios";
import swal from "sweetalert";
import { url } from "../../api";
import { useState } from "react";

function BookmarkModal({
    open,
    setOpen,
    modalType,
    videoTime,
    currentSyllabus,
    match,
}) {
    const [key, setKey] = useState("");
    const [bookmarkName, setBookmarkName] = useState("");
    const [error, setError] = useState(false);

    const token = localStorage.getItem("Token");

    const addBookmark = async (type) => {
        if (type === "video") {
            // setKey((key) => videoTime);
            var postData = {
                lesson_id: match.params.lesson_id,
                type: type,
                bookmark_name: bookmarkName,
                key: videoTime,
            };
            if (bookmarkName === "") {
                setError(true);
                return;
            }
        } else {
            var postData = {
                lesson_id: match.params.lesson_id,
                type: type,
                bookmark_name: bookmarkName,
                key,
            };
            if (bookmarkName === "" || key === "") {
                setError(true);
                return;
            }
        }

        console.log(currentSyllabus);
        console.log(postData);
        try {
            const response = await Axios.post(
                `${url}/bookmark/${currentSyllabus}`,
                postData,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(response.data);
            setKey("");
            setBookmarkName("");
            setOpen(false);
            swal("Bookmark added successfully", {
                icon: "success",
            });
        } catch (e) {
            swal("Bookmark not added", {
                icon: "warning",
            });
        }
    };

    const body = (
        <div>
            <h3>Add a Bookmark</h3>
            {modalType === "ppt" ? (
                <div className="bookmark__input">
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={bookmarkName}
                        onChange={(e) => setBookmarkName(e.target.value)}
                        onFocus={() => setError(false)}
                    />
                    <TextField
                        label="Slide No"
                        variant="outlined"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        onFocus={() => setError(false)}
                    />
                    {error ? (
                        <p style={{ color: "red" }}>
                            Please fill all the field
                        </p>
                    ) : null}

                    <button onClick={() => addBookmark("ppt")}>
                        Add Bookmark
                    </button>
                </div>
            ) : null}
            {modalType === "pdf" ? (
                <div className="bookmark__input">
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={bookmarkName}
                        onChange={(e) => setBookmarkName(e.target.value)}
                        onFocus={() => setError(false)}
                    />
                    <TextField
                        label="Page No"
                        variant="outlined"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        onFocus={() => setError(false)}
                    />
                    {error ? (
                        <p style={{ color: "red" }}>
                            Please fill all the field
                        </p>
                    ) : null}

                    <button onClick={() => addBookmark("pdf")}>
                        Add Bookmark
                    </button>
                </div>
            ) : null}
            {modalType === "video" ? (
                <div className="bookmark__input">
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={bookmarkName}
                        onChange={(e) => setBookmarkName(e.target.value)}
                        onFocus={() => setError(false)}
                    />
                    <div>
                        Time: <strong>{videoTime}</strong>
                    </div>
                    {error ? (
                        <p style={{ color: "red" }}>
                            Please fill the title field
                        </p>
                    ) : null}
                    <button onClick={() => addBookmark("video")}>
                        Add Bookmark
                    </button>
                </div>
            ) : null}
        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="bookmark__modal"> {body}</div>
            </Modal>
        </div>
    );
}

export default BookmarkModal;
