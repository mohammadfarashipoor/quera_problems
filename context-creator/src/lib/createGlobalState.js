import {createContext, useContext, useEffect, useState} from "react";

export const createGlobalState = (instructions) => {
  const ComponentsContext = createContext();
  let stateName = ""


  function destructurState(object){
    for (const stateKey in object) {
      if(typeof object[stateKey] !== "function"){
        stateName = stateKey
      }
    }
  }
  destructurState(instructions())

  const ComponentsProvider = ({children}) => {
    const [setter, setSetter] = useState(instructions()[stateName]);
    const [state, setState] = useState(instructions(setSetter));

    useEffect(() => {
      setState({...state,[stateName]:setter})
    }, [setter]);

    return (
      <ComponentsContext.Provider value={state}>
        {children}
      </ComponentsContext.Provider>
    );
  };

  const useGlobalState = () => {
    const context = useContext(ComponentsContext);
    if (context === undefined) {
      throw new Error(`${stateName} must be used within a StateProvider`);
    }
    return context;
  };

  return [ComponentsProvider, useGlobalState];
}
