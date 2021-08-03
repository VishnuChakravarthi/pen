import React from "react";
import { useEffect } from "react";

function LearningPage({ filetype, coursefile }) {
    useEffect(() => {}, [filetype]);
    return (
        <div>
            {filetype === "video" ? (
                <video
                    title="learning"
                    className="iframe_video custom-iframe-width"
                    src={coursefile}
                    frameBorder="0"
                    allowFullScreen
                    controls
                ></video>
            ) : filetype === "ppt" ? (
                <iframe
                    // src={
                    //     course.course_file
                    // }
                    src={
                        "//docs.google.com/gview?url=" +
                        coursefile +
                        "&embedded=true"
                    }
                    className="pdf__viewer"
                ></iframe>
            ) : (
                <object data={coursefile} className="pdf__viewer"></object>
            )}
        </div>
    );
}

export default LearningPage;
