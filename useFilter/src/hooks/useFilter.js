import {useLocation, useNavigate} from "react-router-dom";
import FormType from "../constants/FormType";
import {useEffect, useState} from "react";

export const EQUAL_SIGN = "~";
export const AND_SIGN = "+";
export const ARRAY_SEPARATOR = "--";


// ! You can use this utils
function parseUrl(url) {
    return url
        ?.replace("?", "")
        ?.split(AND_SIGN)
        ?.filter((v) => v)
        ?.reduce((acc, cur) => {
            const [key, value] = cur.split(EQUAL_SIGN);
            return {...acc, [key]: decodeURIComponent(value)};
        }, {});
}

function stringifyUrl(data) {
    if (data) {
        return Object.entries(data)
            ?.filter(([k, v]) => k && v)
            ?.reduce((acc, [key, val], idx) => {
                return `${acc}${
                    idx === 0 ? "" : AND_SIGN
                }${key}${EQUAL_SIGN}${encodeURIComponent(val)}`;
            }, "?")?.replaceAll("%2C", ARRAY_SEPARATOR);
    }
}

// TODO: complete this hook
function useFilter() {

    const [filterState, setState] = useState({})
    const location = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        navigate(stringifyUrl(filterState))
    }, [filterState]);

    useEffect(() => {
        parseUrl(location.search)
    }, [location.search]);


    function onChange(e, name, type) {
        const {value} = e.target
        if (type === FormType.CHECKBOX_GROUP) {
            if (filterState[name]) {
                //If array filterState[name] exist
                if (filterState[name].includes(+value)) {
                    //If value exist in array filterState[name]
                    const checkBoxArray = filterState[name].filter((item) => item !== +value)
                    if (!checkBoxArray.length) {
                        //If array filterState[name] is empty delete filterState[name]
                        let obj = {...filterState}
                        delete obj[name]
                        setState(obj)
                    } else {
                        // add new array checkBoxArray filtered (no item clicked)
                        setState({...filterState, [name]: checkBoxArray})
                    }
                } else {
                    //If value does not exist in array filterState[name] add to filterState[name]
                    setState({...filterState, [name]: [...filterState[name], +value]})
                }
            } else {
                //if not checked for first value add to filterState
                setState({...filterState, [name]: [+value]})
            }
        }
        else if (type === FormType.CHECKBOX) {
            if (!filterState[name]) {
                //if not checked add to filterState
                setState({...filterState, [name]: +value})
            } else {
                //if checked delete of filterState
                let obj = {...filterState}
                delete obj[name]
                setState(obj)
            }
        } else {
            //other Form Type
            setState({...filterState, [name]: value})
        }
    }

    function onClear(name) {
        setState({...filterState, [name]: ''})
    }

    function onClearAll() {
        setState({})
    }

    return {filterState, setState, onChange, onClear, onClearAll};
}

export default useFilter;