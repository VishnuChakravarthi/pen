import React from "react";
import Loader from "react-loader-spinner";

function Spinner_old() {
    return (
        <Loader
            type="Bars"
            color="#00BFFF"
            height={100}
            width={100}
            // timeout={3000}
        />
    );
}

export default Spinner_old;
