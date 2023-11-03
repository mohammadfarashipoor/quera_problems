// import {} from "react-router-dom";
import FormType from "../constants/FormType";

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
      return { ...acc, [key]: decodeURIComponent(value) };
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
      }, "?");
  }
}

// TODO: complete this hook
function useFilter() {
  const filterState = {};

  const setState = (s) => {};
  function onChange(e, name, type) {}

  function onClear(name) {}
  function onClearAll() {}
  return { filterState, setState, onChange, onClear, onClearAll };
}

export default useFilter;
