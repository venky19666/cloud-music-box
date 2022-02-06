import {
  Avatar,
  Chip,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  NoSsr,
  TextField,
} from "@material-ui/core";
import {
  ArrowDownwardOutlined,
  ArrowDropDown,
  ArrowDropUp,
  CheckRounded,
  Close,
  CloseRounded,
  DeleteOutline,
  DeleteRounded,
  HighlightOffOutlined,
} from "@material-ui/icons";
import { useAutocomplete } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
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
  containerHover: {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
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
    display: "inline-flex",
    alignItems: "center",
    flexWrap: "wrap",
    verticalAlign: "middle",
    backgroundColor: theme.palette.background.default,
    padding: "9px 65px 9px 9px",
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
  inputEndrosement: {
    position: "absolute",
    top: "calc(50% - 14px)",
    right: 10,
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
  chip: {
    margin: "3px",
    zIndex: 10,
  },
  listContainer: {
    width: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
    zIndex: theme.zIndex.modal,
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    left: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
  listWrapper: {
    padding: 10,
    maxHeight: "200px",
    overflowY: "auto",
  },
  noOptions: {
    paddingLeft: 9,
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
  }
}));

const FetchSelect = React.forwardRef(function (props,ref) {
  const classes = useStyles();
  const [options, setOptions] = React.useState([
  ]);
  const [inputValue, setInput] = React.useState("");
  const [allOptions, setAllOptions] = React.useState([
  ]);
  const [focus, setFocus] = React.useState(false);
  const inputFieldRef = React.useRef();
  const selectedOption = React.useRef();
  const remainOption = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
  const fetchShedule = React.useRef(null);
  const [error,setError] = React.useState(false);
  const [helpingText,setHelpingText] = React.useState(props.required?"Required!":"Optional!");


  const onFocused = () => {
    setFocus(true);
    setOpen(true);
    setError(false);
  };

  const remainOptionPostion = React.useCallback(() => {
    if (selectedOption.current) {
      const postion = selectedOption.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // console.log(windowHeight - postion.bottom);
      if (windowHeight - postion.bottom >= 220) {
        return {
          top: "100%",
        };
      }
    }
    return {
      bottom: "100%",
    };
  }, [options, allOptions, open, selectedOption]);

  const onBlured = () => {
    setInput('');
    setFocus(false);
  };
  const optionOnDelte = (index) => {
    console.log("removing", index);
    setOptions((prev, id = index) => {
      return prev.filter((item, num) => num !== id);
    });
    inputFieldRef.current.focus();
  }

  const addOptionToOptions = (item) => {
    inputFieldRef.current.focus();
    setOptions((prev, data = item) => {
      return [...prev, data];
    })
  }

  const openDropDown = () => {
    setOpen(true);
  }

  const closeDropDown = () => {
    setOpen(false);
    setAllOptions([]);
  }

  const getValues = () => {
    return options;
  }

  const validate = () => {
    if(props.required!==undefined && props.required===true){
      if(options.length===0){
        setError(true);
        return false;
      }
    }
    return true;
  }

  const reset = () => {
    setOptions([]);
  }

  const fetchData = async (input_data)=>{
    if(typeof props.fetchFunction === "function"){
      setLoading(true);
      const response = await props.fetchFunction({ name: input_data});
      if(response.data.status_code!==403){
        setAllOptions(response.data);
      }
      else{
        console.log(response);
      }
    }
    setLoading(false);
  };

  const onInputChange = function (event) {
    setInput(event.target.value);
    clearTimeout(fetchShedule.current);
    fetchShedule.current = setTimeout(fetchData.bind(this, event.target.value), 500);
  };


  React.useImperativeHandle(ref,()=>({
    openDropDown,
    closeDropDown,
    getValues,
    validate,
    reset
  }));

  return (
    <ClickAwayListener onClickAway={closeDropDown.bind(this)}>
      <div className={classes.root}>
        <div
          ref={selectedOption}
          className={clsx(classes.container, focus && classes.containerHover)}
        >
          <label
            className={clsx(
              classes.label,error && classes.errorClass,
              (focus || options.length > 0) && classes.focusLabel
            )}
          >
            {props.label}
          </label>
          <div className={classes.inputRoot}>
            {options.map((option, index) => {
              return (
                <Chip
                  avatar={<Avatar alt={option.name} src={option.imageURL}></Avatar>}
                  clickable
                  key={index.toString()}
                  onDelete={optionOnDelte.bind(this, index)}
                  label={option.name}
                  deleteIcon={<HighlightOffOutlined />}
                  className={classes.chip}
                />
              );
            })}
            <input
              ref={(inpl) => {
                inputFieldRef.current = inpl;
              }}
              type="text"
              className={classes.input}
              value={inputValue}
              onFocus={onFocused.bind(this)}
              onBlur={onBlured.bind(this)}
              onChange={onInputChange.bind(this)}
            />

            <fieldset
              className={clsx(classes.fieldset, error && classes.errorClass, focus && classes.focusFieldSet)}
            >
              <legend
                className={clsx(
                  classes.hideLegend, props.error && classes.errorClass,
                  (focus || options.length > 0) && classes.focusLegend
                )}
              >
                <span>{props.label}</span>
              </legend>
            </fieldset>
          </div>
          <div className={classes.inputEndrosement}>
            {!loading && <IconButton style={focus?{visibility: "visible"}:{}} id="reset-button" onClick={reset.bind(this)} size="small">
              <Close />
            </IconButton>}
            {loading &&
              <CircularProgress size={16} />}
            <IconButton
              onClick={() => {
                setOpen(!open);
                if (!open) inputFieldRef.current.focus();
              }}
              size="small"
            >
              {open ? <ArrowDropUp /> : <ArrowDropDown />}
            </IconButton>
          </div>
          {open && (
            <div
              ref={remainOption}
              style={remainOptionPostion()}
              className={classes.listContainer}
            >
              {allOptions.length === 0 && (
                <div className={classes.noOptions}>
                  <p>{loading? "Loading...":"No options"}</p>
                </div>
              )}
              {allOptions.length > 0 ? (
                <List className={classes.listWrapper}>
                  {allOptions.map((option, index) => {
                    return (
                      <ListItem
                        onClick={addOptionToOptions.bind(this, option)}
                        button
                        dense
                        disabled={options.findIndex((item) => item.id === option.id) !== -1}
                        key={index.toString()}
                      >
                        <ListItemAvatar>
                          <Avatar alt={option.name} src={option.imageURL}></Avatar>
                        </ListItemAvatar>
                        <ListItemText>{option.name}</ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              ) : null}
            </div>
          )}
        </div>
        <p className={clsx(classes.helpingText, error === true && classes.errorClass)}>
          {helpingText}
        </p>
      </div>
    </ClickAwayListener>
  );
})

export default FetchSelect;
