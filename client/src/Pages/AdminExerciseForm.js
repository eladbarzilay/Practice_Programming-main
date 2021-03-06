import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useContext } from "react";
import { UserContext } from "../App";

export default function Exercise() {
    const [isHide, setIsHide] = useState(false);
    const [LanguageData, setLanguageData] = useState([])
    const context = useContext(UserContext)
    const modelExersice ={
        icon: "",
        title: "",
        details: "",
        status: "",
        exec_type: [""],
        difficulty: "",
        tags: [],
        prog_lang: "",
        dev_time: "",
        content: { content: "", sources: [{ name: "", url: "" }] },
        solution: ""
    }
    const [ExecriseData, setExecriseData] = useState(modelExersice)

    const [Execrise, setExecrise] = useState({
        icon: "",
        title: "",
        details: "",
        status: "",
        exec_type: "",
        difficulty: "",
        tags: [],
        prog_lang: "",
        dev_time: "",
        content: { content: "", sources: [{ name: "", url: "" }] },
        solution: ""
    })

    const params = useParams()

    useEffect(getExercise, [params.id]);

    function getExercise() {

        axios.get('https://exercide-site.herokuapp.com/Lang')
            .then(result => {
                setLanguageData(result.data)
            })

            if (params.id)
        axios.get(`https://exercide-site.herokuapp.com/exercise/${params.id}`)
            .then(result => {
                setExecriseData(result.data.exercise[0])
            })
    }

    function ChangeInput(e) {
        const input = { ...ExecriseData }

        const filter = e.target.name
        if (filter == "content") {
            input.content.content = e.target.value

        } else if (filter === "tags") {
            input.tags = e.target.value.split(',')
        }
        else {
            input[filter] = e.target.value
        }
        setExecriseData(input)
    }


    function UpdateExercise(e) {
        e.preventDefault()
        console.log(ExecriseData);
        if (params.id) {
            axios.put(`https://exercide-site.herokuapp.com/exercise/${params.id}`, ExecriseData, { headers: { "Authorization": context.token } })
                .then((res) => { console.log(res.data) }).catch((err) => console.log(err))
        }
        else {
            axios.post(`https://exercide-site.herokuapp.com/exercise`, ExecriseData, { headers: { "Authorization": context.token } })
                .then((res) => { console.log(res.data) }).catch((err) => console.log(err))
                setExecriseData(modelExersice)
        }
    }


    function itSubmit() {

        setTimeout(() => setIsHide(true), 10);
        return setTimeout(() => setIsHide(false), 1500);

    }





    return (<div className="ExecriseDetails">
        {ExecriseData ? <form onSubmit={UpdateExercise}>
            <h2>?????????? ??????????</h2><br />
            <div >
                <div className="FormUpdate">
                    <input type='text' value={ExecriseData.title} onChange={ChangeInput} name="title" id="title" />
                    <label htmlFor="title">  :??????????</label>
                </div>

                <div className="FormUpdate">
                    <input type='text' value={ExecriseData.details} onChange={ChangeInput} name="details" id="details" />
                    <label htmlFor="details">  :??????????</label>
                </div>

                <div className="FormUpdate">
                    <select name="exec_type"   className="selectSearch" onChange={ChangeInput} >
                        <option > ?????? ?????? ??????????</option>
                        <option value="short">??????</option>
                        <option value="rolling">????????????</option>
                        <option value="tutorial" >??????????</option>
                    </select>
                </div>
                <div className="FormUpdate">
                    <select name="status" className="selectSearch" onChange={ChangeInput} >
                        <option value=""> ?????? ?????????? ??????????</option>
                        <option value="draft">??????????</option>
                        <option value="publish">????????</option>
                        <option value="deleted" >??????</option>
                    </select>
                </div>
                <div className="FormUpdate">
                    <select name="difficulty" className="selectSearch" onChange={ChangeInput}>
                        <option value=""> ?????? ???????? ????????</option>
                        <option value='easy'>????</option>
                        <option value='medium'>????????????</option>
                        <option value='hard'>??????</option>
                    </select>
                </div>
                <div className="FormUpdate">
                    <select name="prog_lang" className="selectSearch" onChange={ChangeInput} >
                        <option value=""> ?????? ?????? ??????????</option>
                        {LanguageData.map(v => <option value={v._id} key={v._id}>{v.prog_lang}</option>)}
                    </select>
                </div>
                <div class="FormUpdate">  
                    <div><input type={`text`} id={`tags`} name='tags' value={ExecriseData.tags} onChange={ChangeInput} />
                    <label htmlFor='tags'>??????????</label></div>

                </div>
            </div>
            <h4>???????? ????????????</h4>
            <textarea value={ExecriseData.content.content} onChange={ChangeInput} name="content" />
            <h4>?????????? ????????????</h4>
            <textarea value={ExecriseData.solution} onChange={ChangeInput} name="solution" />

            {isHide ? <div className="Popup"><strong>???????????? ???????? ????????????</strong></div> : null}
            <input type='submit' className="buttonInsideAdmin" value='???????? ??????????' onClick={itSubmit} />
        </form> : <div className="Loader"><Loader /></div>}

    </div>


    )
}