import {useEffect, useRef, useState,} from "react";
import {useOutsideAlerter} from "../utilitis/ClickOut";
import axios from "axios"

function SelectBox() {
    const [topicList, setTopicList] = useState([])
    const [focused, setFocused] = useState(false)
    const refInputTopic = useRef(null)
    const refBoxTopic = useRef(null)
    // useEffect(async () => {
    //     await fetchTopicList({target: {value: ""}})
    // }, []);

    const closeStyle = {
        padding: 0,
        height: 0,
        overflow: "hidden",
    };
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
    useOutsideAlerter(refBoxTopic, onFocus, onBlur)

    async function fetchTopicList(e) {
        await axios.get('http://127.0.0.1:8000/', {params: {search: e.target.value}}).then((res) => {
                setTopicList(res?.data?.data?.matchedTechs)
            }
        )
        // const urlGet = 'http://127.0.0.1:8000/?' + (new URLSearchParams({search: e.target.value})).toString()
        // await fetch(urlGet,
        //     {
        //         method: "GET",
        //     }).then(response => response.json())
        //     .then(data =>setTopicList(data?.data?.matchedTechs)).catch(e => console.log(e))

    }

    function clickOnTopic(name) {
        refInputTopic.current.value = name
        onBlur()
    }

    return (
        <div className="c-box" ref={refBoxTopic}>
            <input onChange={(e) => fetchTopicList(e)}
                   ref={refInputTopic}
                   className="tpc"
                   placeholder="topic" type="text"/>
            <div className={topicList.length !== 0 && focused ? 'c-selectbox' : closeStyle}>
                {focused && topicList.map(({id, name}) => (
                    <div className="item" key={id} onClick={() => clickOnTopic(name)}>
                        <label htmlFor={id}>{name}</label>
                        <input type="radio" name="" id={id}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectBox;
