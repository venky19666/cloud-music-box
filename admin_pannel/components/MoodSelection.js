import { Autocomplete } from "@material-ui/lab";
import React from "react";
import {TextField,Chip} from '@material-ui/core';
import {useFetch} from '../hooks/fetch';
 
const MoodSelection = React.forwardRef((props,ref) => {
  const [values, setValues] = React.useState([]);
  const [optionsList, setOptionList] = React.useState([]);
  const [error,setError] = React.useState(false);
  const [helpingText,setHelpingText] = React.useState(props.required?"Required!":"Optional!");
  const fetch = useFetch();

  React.useEffect(async () => {
    const response = await fetch("/get/mood/list");
    if (Array.isArray(response.data)) {
      setOptionList([...response.data]);
    }
  }, []);

  const validate = () => {
    if(props.required){
      if(values.length===0){
        setError(true);
        return false;
      }
    }
    return true;
  }
  
  const reset = () => {
    setValues([]);
  }

  React.useImperativeHandle(ref,()=>({
    getValue: values,
    validate,
    reset,
  }));

  return (
    <div>
      <Autocomplete
        multiple
        value={values}
        onChange={(event, newValue) => {
          setValues([...newValue]);
        }}
        options={optionsList}
        getOptionLabel={(option) => option.name}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip label={option.name} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Song moods"
            variant="outlined"
            placeholder="Select mood options"
            error={error}
            helperText={helpingText}
          />
        )}
      />
    </div>
  );
})

export default MoodSelection;
