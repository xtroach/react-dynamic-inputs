let lastId = 0;
const getID = function(prefix='id') {
    lastId++;
    return `${prefix}${lastId}`;
}

export default DynamicInputs = (props)=>{   
    function DynamicInput(stateInputProps){
        const [state,setState] = useState(stateInputProps.statesArray[stateInputProps.stateIndex])
        const handleBlur = (e) =>{
            if (e.target.value){
                const newStateArray = [...stateInputProps.statesArray]
                newStateArray[stateInputProps.stateIndex] = state;
                stateInputProps.setStatesArray(newStateArray)  
            }else{
                const newStateArray = stateInputProps.statesArray.slice(0,stateInputProps.stateIndex).concat(stateInputProps.statesArray.slice(stateInputProps.stateIndex+1))
                stateInputProps.setStatesArray(newStateArray)
            }
        }
        const handleChange = (e)=>{
            setState(e.target.value)
        }

        const id = getID();
        const output = <input type="text" id={id}
        onBlur={handleBlur} onKeyDown={(e)=>{if(e.key === "Enter"){handleBlur(e)}}} onChange={handleChange} value={state||""}/>
        const wrap = (children)=>{
            if (!props.label)
                return <div>children</div>

        return <div><label style={{display: "block"}}htmlFor={id}>{props.label(stateInputProps.stateIndex)}</label>{children}</div>
        }
        return wrap(output)
    }


    
    const stateInputs = []
    for(let i=0; i<props.statesArray.length+1; i++){
        stateInputs.push(<DynamicInput  statesArray={props.statesArray} setStatesArray={props.setStatesArray} key={i} stateIndex={i} />)
    }

return (stateInputs)
}