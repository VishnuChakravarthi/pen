import React, { useState, useEffect } from "react";
import NavMain from "./Nav";
import Card from "react-bootstrap/Card";
import Footer from "../components/Footer";
import axios from "axios";
import { url } from "../components/api"
import './syllabus.css';

function Sylabus(props) {
  const [milestoneData, setMilestoneData] = useState();
  useEffect(() => {
    const milestoneRender = async () => {

      try {

        const response = await fetch(`${url}/syllabus/1`)
        var data = await response.json();
       // if((!milestoneData||(milestoneData.length!=data.length))&&(data))
        setMilestoneData(data.data)
        
      } catch (e) {
       // if(!milestoneData)
        setMilestoneData([])
      }

    }
    milestoneRender();
  },[])
  const shadow = {
    boxShadow: "0px 1px 13px 1px rgba(0,0,0,0.03)",
  };
  const shadow1 = {
    boxShadow: `  inset 0 0 30px rgba(55, 84, 170,0),
    inset 0 0 20px rgba(255, 255, 255,0),
    7px 7px 15px rgba(55, 84, 170,.15),
    -7px -7px 20px rgba(255, 255, 255,1),
    inset 0px 0px 4px rgba(255, 255, 255,.2)`,
    marginRight: "1rem",
    paddingBottom: "1rem",
    borderRadius: "15px",
    border: "0.5px solid #93deff",
    // background: "#323643",
  };
  const shadow2 = {
    boxShadow: `  inset 0 0 30px rgba(55, 84, 170,0),
    inset 0 0 20px rgba(255, 255, 255,0),
    7px 7px 15px rgba(55, 84, 170,.15),
    -7px -7px 20px rgba(255, 255, 255,1),
    inset 0px 0px 4px rgba(255, 255, 255,.2)`,
    marginRight: "1rem",
    paddingBottom: "1rem",
    borderRadius: "15px",
    border: "0.5px solid #606470",
    // background: "#93deff",
  };

  const milestoneRender = () => {



    if (milestoneData && milestoneData.length > 0) {
      var milestoneComponent = milestoneData.map((data, index) => {
        return (
          <Card
            className="p-2 col-sm-6 col-lg-3 m-2 "
            style={(index % 1 == 0) ? shadow1 : shadow2}
          >
            <Card.Body className="">
              <h3 className="text-center ">{data.title}</h3>
              <Card.Text>
                <p >
                  {data.description}
                </p>
                
              </Card.Text>
              
            </Card.Body>
            <ul class="mb0 p-3" >
                  <li >
                    <a href="#">
                      <span class="flaticon-appointment mr-3"></span>{" "}
                      {data.duration}
                    </a>
                  </li>
                  <li >
                    <a href="#">
                      <span class="flaticon-clock mr-3"></span>
                      {(data.modules)?data.modules:"Not assigned"}
                    </a>
                  </li>
                  <li >
                    <a href="#">
                      <span class="fas fa-pen mr-3"></span>
                      {(data.project)?data.project:"Not assigned"}
                    </a>
                  </li>
                </ul>
          </Card>
        )
      })
    }
    

    return  <div className="row justify-content-center">
        {milestoneComponent}
      </div>
  }

  return (
    <React.Fragment>
      {/* <NavMain /> */}
      <React.Fragment>
        <section class="our-pricing" style={{paddingTop: "90px"}}>
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <div class="main-title text-center mb-0">

                  <h1 class="mt0">Sylabus</h1>
                </div>
              </div>
            </div>
            {milestoneRender()}
          </div>
        </section>
      </React.Fragment>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default Sylabus;
