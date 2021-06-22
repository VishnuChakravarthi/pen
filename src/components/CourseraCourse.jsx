import React, { useState } from "react";
import Navbar from "./Nav";
import ReactPlayer from "react-player";
import "./course.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import CourseVid from './courseVid';
import Syllabus from './Sylabus';
import Asses from "./Asses";
import Leaderboard from "./Leaderboard";
import Discussion from "./Discussion";

function CourseraCourse() {
    
    const [lesson, setLesson] = useState("");
    const[dark,setDark]=useState("false");
    const[searchKeyWord,setSearchKeyWord]=useState("");
    const[searchtoggle,setSearchToggle]=useState(false);
    const[errorDictionary,setErrorDictionary]=useState("")
    const[courseUrl,setCourseUrl]=useState(["https://www.youtube.com/watch?v=ysz5S6PUM-U","https://www.youtube.com/watch?v=HWTF-oi70e4","https://www.youtube.com/watch?v=pBD1C5JxRho"])
    const[i,setI]=useState(0)
    const[meaning,setMeaning]=useState([])
    const[video,setVideo]=useState(courseUrl[i])
    const [Div, setDiv] = useState(0)
    const openLessonsFn = (e, name) => {
        setLesson(name);
    };
    const toggleDark=()=>{
        if(dark=="true"){
            setDark("false")
        }
        else{
            setDark("true")
        }
    }
    const changeVideo=(val)=>{
        setVideo(courseUrl[i-val])
        setI(i-val);
    }
    const getDefinition= (word)=>{
        
        
       return axios.get(`https://api.wordnik.com/v4/word.json/${word}/definitions?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`)
.then(response =>{
    return response.data;
})
.catch(err => {
    setErrorDictionary("Too much of request.")
    throw err;
});
        
    }
    const search=()=>{
        setSearchToggle(true)
        var word=searchKeyWord.toLowerCase().trim();
        if(word==="") return;
        var definition=[];
        getDefinition(word).then(data=>{
            data.forEach(d=>{
                if(d.text) {
                    data=d.text.split("<xref>")
                    data=data.join("")
                    data=data.split("</xref>")
                    data=data.join("")
                    data=data.split("(")
                    data=data.join("")
                    data=data.split(")")
                    data=data.join("")
                    data=data.split(/\<.*\>/)
                    data=data.join("")
                     definition.push(data)
                    
                }
            })
            setMeaning(definition);
        }).then(suc=>{
            setMeaning(definition)
            setErrorDictionary("");
        }).catch(err=>{
            setMeaning([])
            
            if(err.message.match(/404/))
            setErrorDictionary("Meaning not Found. Try Other.")
            else if(err.message.match(/429/))
            setErrorDictionary("Too much of request.")
            else
            setErrorDictionary(err.message)
        })
        

    }

    const searchInput=(event)=>{
        if(event.target.value)
        setErrorDictionary(null);
        setSearchToggle(false);
        setMeaning([])
        setSearchKeyWord(event.target.value)
        
    }
    return (
        <React.Fragment>
            <Navbar option={"only-title"} dark={dark} style={{
                        backgroundColor: (dark=="true")?'grey':'white'}}/>
            <React.Fragment>
                <div className="container-fluid" style={{paddingTop: "81px"}}>
                    <div className="row">
                        <div
                            className="col-sm-2 pl-0 pr-0"
                            style={{ background: (dark=="true")&&"black", height: "89.9vh", position: "fixed"}}
                        >
                            <ul className="mt-4 ul-course-left">
                                <a onClick={()=>{setDiv(0)}}>
                                    <li className="li-course-left">
                                        <span style={{color:(dark=="true")&&"grey"}}>Home</span>
                                    </li>
                                </a>
                                <a onClick={()=>{setDiv(1)}}>
                                    <li className="li-course-left">
                                        <span style={{color:(dark=="true")&&"grey"}}>Syllabus</span>
                                    </li>
                                </a>
                                <a onClick={()=>{setDiv(2)}}>
                                    <li className="li-course-left">
                                        <span style={{color:(dark=="true")&&"grey"}}>Assesments</span>
                                    </li>
                                </a>
                                <a onClick={()=>{setDiv(3)}}>
                                    <li className="li-course-left">
                                        <span style={{color:(dark=="true")&&"grey"}}>Progress Bar</span>
                                    </li>
                                </a>
                                <a onClick={()=>{setDiv(4)}}>
                                    <li className="li-course-left">
                                        <span style={{color:(dark=="true")&&"grey"}}>Discussion</span>
                                    </li>
                                </a>
                                <li style={{paddingLeft:"25px"}}>
                                <span>
                                    <input type="checkbox" class="checkbox" id="chk" />
                                    <label class="label" for="chk" onClick={toggleDark} style={{width: "26px", height: "15px", padding: "2px"}}>
                                        <i style={{fontSize: "11px"}} class="fas fa-sm fa-moon"></i>
                                        <i style={{fontSize: "11px"}} class="fas fa-sm fa-sun"></i>
                                        <div class="ball" style={{width: "11px", height: "11px"}}></div>
                                    </label>
                                </span>
                                </li>
                                <li>
                                    <Card style={{backgroundColor:(dark=="true")&&"black"}} >
                                        <Card.Body className="" style={{textAlign:"center"}}>

                                        <h3 style={{color:(dark=="true")?"white":"black",textAlign: "left"}}>Glossary</h3>
                                                <div className="row">
                                                    <div className="col-sm-10">
                                                        <input name="searchKeyWord" value={searchKeyWord} onKeyDown={e=>{(e.keyCode==13)&&search()}} onChange={searchInput} className="form-control" style={{backgroundColor:(dark=="true")?"grey":"white",color:(dark=="true")?"white":"black", width: "100%", padding: "0 10px"}} placeholder="Enter the word to search">
                                                        </input>
                                                    </div>
                                                    <div className="col-sm-2 pl-0">
                                                        <a onClick={search}><i class="fas fa-search " style={{marginTop:"10px"}} ></i></a>
                                                    </div>
                                                </div>
                                            {(searchtoggle==true&&meaning[0])&&<div style={{textAlign:"left",marginTop:"10px",fontWeight:"normal"}}>
                                                {(meaning[0])&&`1)${meaning[0]}`}<br></br>
                                                {(meaning[1])&&`2)${meaning[1]}`}<br></br>
                                                {(meaning[2])&&`3)${meaning[2]}`}
                                                </div>}
                                                {(searchtoggle==true&&errorDictionary!="")&&<div>
                                                {errorDictionary}
                                                </div>}
                                        </Card.Body>
                                        </Card>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="offset-sm-2 col-sm-10"
                            style={{ background: (dark=="true")&&"black" }}
                        >
                            {(Div==0)? <CourseVid />: ''}
                            {(Div==1)? <Syllabus />: ''}
                            {(Div==2)? <Asses />: ''}
                            {(Div==3)? <Leaderboard />: ''}
                            {(Div==4)? <Discussion />: ''}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </React.Fragment>
    );
}

export default CourseraCourse;
