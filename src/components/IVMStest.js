import Axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useState } from "react";

function IVMStest() {
    const [files, setFiles] = useState([]);

    const upload = async () => {
        const fd = new FormData();
        fd.append("signature", files[0]);
        await Axios.patch(
            `http://ec2-65-2-119-137.ap-south-1.compute.amazonaws.com:4030/api/email-verify-vms11/skill-source-edit`,
            fd,
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2WEUxSWF3aHV0blVvR0FDZUw5Ul9kQXJhcE5XY05Cck52Z2lSQmhfRTE4In0.eyJleHAiOjE2MjM5MTIwNDksImlhdCI6MTYyMzA0ODA0OSwianRpIjoiNTAxNDk1NDEtM2YzNS00M2RkLTg3NjAtYzYzMzVkNTY4NDczIiwiaXNzIjoiaHR0cHM6Ly9lYzItNjUtMi0xMTktMTM3LmFwLXNvdXRoLTEuY29tcHV0ZS5hbWF6b25hd3MuY29tOjg0NDMvYXV0aC9yZWFsbXMvdm1zLW1pY3Jvc2VydmljZXMiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTYzNDU2MzUtZGY1Ni00YzQ4LTljZjQtMWMwMDNkZTE4MzhjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidm1zLW1pY3Jvc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIzYTg4NTAyOC05Zjc5LTQ4MGQtYjYyYy1lZGI0MDU2MmEyY2EiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vZWMyLTY1LTItMTE5LTEzNy5hcC1zb3V0aC0xLmNvbXB1dGUuYW1hem9uYXdzLmNvbSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNraWxsLXNvdXJjZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InZtcy1taWNyb3NlcnZpY2UiOnsicm9sZXMiOlsic2tpbGwtc291cmNlIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6IjRiZTY2MmIwLTQxZjktNGFmYi1iOTAxLTQ4YWU4ZmRhNWIwYyIsImVtYWlsIjoibnZpc2hudWNoYWtyYXZhcnRoaTEwMEBnbWFpbC5jb20ifQ.NWSLS_Ge3GyulDVHgqg52uBJbiorjUQaB8JNMWEWBrjl4A3CXEgTwrI1AV7zZKOk1YTBDZNN7jMKcT_9LxWknIHvKzFurgOYa4cPE3qHX9vgrmPC8jSex-q9UyT6b86hzw_xfjW-VWOnyfxSQsQDvU3F94bANByfDwkJdzNvzBamjgwTXns-KOSwlH_DE4kauoW1d4Q3LDVPXGrdkuISemGrXGuaISu2jhKJS-F79WN6UQC9q1T_SdaPZeOeouVwXVJ3SzkNh8jnHlEIq12Kcy9Zi6IA0jEeOTc2tEhodqgvRDN8hovRFI8VWyyIL8EIqoTcqBMeTpODCvIastViwA`,
                },
            }
        ).then((result) => {
            console.log(result);
        });
    };

    return (
        <div>
            <DropzoneArea onChange={(file) => setFiles(file)} />
            <button onClick={() => upload()}>Submit</button>
        </div>
    );
}

export default IVMStest;
