import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import swal from "sweetalert";
import { url } from "../../../../api";

import { useStateValue } from "../../../../../StateProvider";

import "./Result.css";
import history from "../../../../../history";
import Axios from "axios";

function ResultDisplay({ match }) {
    const [{ result }, dispatch] = useStateValue();
    const token = localStorage.getItem("pn_en");

    const course_id = match.params.course_id;

    const backToAssessments = () => {
        history.replace(`/learn/${course_id}/assessment`);
    };

    console.log(result);

    useEffect(() => {
        if (result.length) {
            (async () => {
                await Axios.post(
                    `${url}/result`,
                    {
                        assessment_id: match.params.asses_id,
                        score: renderTotal(),
                    },
                    {
                        headers: {
                            Authorization: `Basic ${token}`,
                        },
                    }
                ).then((_) => {
                    swal(
                        renderTotal() > 20
                            ? {
                                  text: `You have cleared with ${renderTotal()}%`,
                                  icon: "success",
                              }
                            : {
                                  text: `You need more practice. Your score is ${renderTotal()}`,
                                  icon: "error",
                              }
                    );
                });
            })();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderTotal = () => {
        return result.reduce((total, num) => total + num, 0);
    };

    return (
        <section className="m-auto" style={{ width: "60%" }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question No.</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="right">Marks awarded</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.map((res, i) => (
                            <TableRow key={i} className="result__tablerow">
                                <TableCell component="th" scope="row">
                                    {i + 1}
                                </TableCell>
                                <TableCell align="left">
                                    {res === 0 ? (
                                        <p style={{ color: "red", margin: 0 }}>
                                            Wrong
                                        </p>
                                    ) : (
                                        <p
                                            style={{
                                                color: "green",
                                                margin: 0,
                                            }}
                                        >
                                            Correct
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell align="right">{res}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell
                                component="th"
                                scope="row"
                                className="result__total"
                            >
                                Total
                            </TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell
                                align="right"
                                className="result__totalval"
                            >
                                {renderTotal()}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <button className="result__backbtn" onClick={backToAssessments}>
                Go back to assessments
            </button>
        </section>
    );
}

export default ResultDisplay;
