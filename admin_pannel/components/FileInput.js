import { makeStyles,Button } from '@material-ui/core'
import clsx from 'clsx';
import React from 'react'

const useStyles = makeStyles(theme=>({
  container:{
    position: "relative",
    display: "inline-flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
    lineHeight: "1.75em",
    "&:hover fieldset": {
      borderWidth: 1,
      borderColor: "rgb(0,0,0)",
    },
    "& #reset-button": {
      visibility: "hidden"
    },
    "&:hover #reset-button": {
      visibility: "visible",
    }
  },
  label: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
    pointerEvents: "none",
    transform: "translate(14px, 20px) scale(1)",
    color: "rgba(0, 0, 0, 0.54)",
    padding: 0,
    fontSize: "1rem",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    lineHeight: 1,
    letterSpacing: "0.00938em",
    transition: "all 300ms -50ms",
  }, 
  inputRoot: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    backgroundColor: theme.palette.background.default,
    padding: "9px 9px 9px 9px",
  },
  input: {
    zIndex: 1,
    font: "inherit",
    color: "currentColor",
    width: "100%",
    border: "none",
    height: "1.1876em",
    margin: 0,
    display: "block",
    minWidth: 0,
    background: "none",
    boxSizing: "content-box",
    outline: "none",
    padding: "9.5px 4px",
    "&:focus": {
      outline: "none",
      border: "none",
    },
    width: 0,
    minWidth: 30,
    flexGrow: 1,
  },
  hideLegend: {
    width: "auto",
    height: "11px",
    display: "block",
    padding: 0,
    fontSize: "1em",
    maxWidth: "0.01px",
    textAlign: "left",
    transition: "max-width 50ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    visibility: "hidden",
  },
  focusLabel: {
    color: theme.palette.primary.main,
    transform: "translate(9px, -8px) scale(0.75)",
  },
  focusLegend: {
    maxWidth: "1000px",
    transition: "max-width 100ms cubic-bezier(0.0,0,0.2,1) 50ms",
  },
  focusFieldSet: {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
  fieldset: {
    position: "absolute",
    top: -5,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.23)",
  },
  helpingText: {
    fontSize: ".75rem",
    padding: 0,
    margin: 0,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: "1.66",
    marginTop: 3,
    letterSpacing: "0.03333em",
    color: theme.palette.grey[600],
    marginLeft: "14px",
    marginRight: "14px",
  },
  errorClass: {
    borderColor: false ? theme.palette.grey[400] : theme.palette.error.main,
    color: false ? theme.palette.grey[600] : theme.palette.error.main,
  },
  buttonStyle: {
    zIndex: 1,
  },
  file: {
    display: "none",
  }
}))


const FileInput = React.forwardRef((props,ref)=>{
  const classes = useStyles();
  const [error,setError] = React.useState(false);
  const [inputValue,setInputValue] = React.useState('');
  const fileInputRef = React.useRef();
  const [file,setFile] = React.useState({});
  const [helpingText, setHelpingText] = React.useState(props.required?"Required!":"Optional!");

  const openExpoler = () => {
    if (document.createEvent) {
      let newEvent = document.createEvent("MouseEvents");
      newEvent.initEvent("click", true, false);
      fileInputRef.current.dispatchEvent(newEvent);
    }
  }

  const onChangeFileInput = (event) => {
    setError(false);
    if (event.target.files[0]){
      const fileSelected = event.target.files[0];
      setInputValue(fileSelected.name);
      setFile(fileSelected);
      return;
    }
    setInputValue("");
    setFile({});
    if(props.required){
      console.log("erroring")
      setError(true);
    }
    return;
  }

  const validate = () => {
    if(props.required){
      if(file.name===undefined){
        setError(true);
        return false;
      }
    }
    return true;
  }

  const reset = () => {
    setFile({});
    setInputValue('');
  }

  React.useImperativeHandle(ref,()=>({
    getFile: file,
    validate,
    reset,
  }))

  return (
    <div>
      {/* <div className={clsx(classes.container, props.error === true && classes.errorClass,props.className)}>
        <input onChange={onChangeFileInput.bind(this)} accept={props.accept} ref={ref} className={classes.file} type="file" />
        <label className={clsx(classes.label, props.error === true && classes.errorClass)}>{props.label}</label>
        <Button color="primary" onClick={openExpoler.bind(this)} variant="contained" className={classes.buttonStyle}>Choose File</Button>
      </div>
      <p className={clsx(classes.helpingText, props.error === true && classes.errorClass)}>
        {props.helpingText}
      </p> */}
      <div className={classes.root}>
        <div
          className={clsx(classes.container)}
        >
          <label
            className={clsx(
              classes.label, error && classes.errorClass,
              (inputValue.length > 0) && classes.focusLabel
            )}
          >
            {props.label}
          </label>
          <div className={classes.inputRoot}>
            <input
              type="text"
              className={classes.input}
              value={inputValue}
              readOnly={true}
              onClick={openExpoler.bind(this)}
            />
            <input 
              onChange={onChangeFileInput.bind(this)} 
              accept={props.accept} 
              ref={fileInputRef} 
              className={classes.file} 
              type="file"
            />
            <Button color="primary" onClick={openExpoler.bind(this)} variant="contained" className={classes.buttonStyle}>Choose File</Button>
            <fieldset
              className={clsx(classes.fieldset, error && classes.errorClass)}
            >
              <legend
                className={clsx(
                  classes.hideLegend, props.error && classes.errorClass,
                  (inputValue.length > 0) && classes.focusLegend
                )}
              >
                <span>{props.label}</span>
              </legend>
            </fieldset>
          </div>
        </div>
        <p className={clsx(classes.helpingText, error === true && classes.errorClass)}>
          {helpingText}
        </p>
      </div>
    </div>
  )
})

export default FileInput
