import { IconButton, InputBase, makeStyles, useTheme } from "@material-ui/core";
import {
  VisibilityOffRounded,
} from "@material-ui/icons";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: "all 300ms",
  },
  focuesContainer: {
    borderColor: theme.palette.primary.main,
  },
  inputBaseContainer: {
    flexGrow: 1,
    position: "relative",
  },
  inputBase: {
    fontSize: 20,
  },
  leftIcon: {
    fontSize: 25,
    color: theme.palette.text.primary,
    transition: "all 300ms",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightIcon: {
    fontSize: 25,
    color: theme.palette.text.primary,
    transition: "all 300ms",
  },
  labelTextView: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    transition: "all 300ms",
    fontWeight: "bold",
    userSelect: "none",
  },
  labelFocusOut: {
    transform: "scale(0.75)",
    top: -15,
    backgroundColor: theme.palette.background.paper,
    fontWeight: "bold",
    transition: "all 300ms",
    height: "auto",
    padding: "0px 5px"
  },
  labelText: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  focused: {
    color: theme.palette.primary.main,
  },
  helpTextView: {
    margin: 0,
    padding: "5px 0px",
    fontSize: 12,
    marginLeft: 20,
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
      padding: "2.5px 0px",
    },
  },
  errorColor: {
    color: theme.palette.error.light,
    borderColor: theme.palette.error.light,
  },
  marginLeftInput: {
    marginLeft: 10,
  },
  marginTopStyle: {
    top: -8,
  }
}));

const InputField = React.forwardRef(function (props, ref) {
  const styles = useStyles();

  const [focus, setFocus] = React.useState(false);
  const [empty, setEmpty] = React.useState(true);
  const inputRef = React.useRef();
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [text, setText] = React.useState(
    props.required ? "Required!" : "Optional!"
  );
  const [visible, setVisible] = React.useState(
    props.type === "password" ? false : true
  );

  React.useImperativeHandle(ref, function () {
    return {
      value,
      validate,
    };
  });

  React.useEffect(function () {
    setValue(props.initialValue)
    if (inputRef.current.children[0].value.length !== 0) setEmpty(false);
  }, [value]);

  const validate = function () {
    if (props.required === true) {
      if (value === "") {
        setError(true);
        setText("Required!");
        return false;
      } else {
        if (
          props.validation !== undefined &&
          typeof props.validation === "function"
        ) {
          const { status, msg } = props.validation(value);
          if (!status) {
            setText(msg || "Invalid!");
            setError(true);
            return false;
          }
        }
      }
    }
    return true;
  };

  return (
    <div className={clsx(styles.root, props.className)}>
      <div
        className={clsx(
          styles.container,
          focus && styles.focuesContainer,
          error && styles.errorColor
        )}
      >
        {props.icon !== undefined && (
          <IconButton
            className={clsx(
              styles.leftIcon,
              focus && styles.focused,
              error && styles.errorColor
            )}
          >
            {props.icon}
          </IconButton>
        )}
        <div
          className={clsx(
            styles.inputBaseContainer,
            props.icon === undefined && styles.marginLeftInput
          )}
        >
          <InputBase
            ref={inputRef}
            value={value}
            fullWidth={true}
            placeholder={focus ? props.placeholder : ""}
            type={visible ? "text" : "password"}
            onChange={function (event) {
              setValue(event.target.value);
            }}
            onBlur={(event) => {
              if (event.currentTarget.value.length === 0) setEmpty(true);
              setFocus(false);
            }}
            onFocus={(event) => {
              setError(false);
              setEmpty(false);
              setFocus(true);
            }}
            className={styles.inputBase}
          />
          <div
            onClick={() => {
              console.log(inputRef.current.children[0].value);
              inputRef.current.children[0].focus();
            }}
            className={clsx(
              styles.labelTextView,
              !empty && styles.labelFocusOut,
              focus && styles.focused,
              error && styles.errorColor
            )}
          >
            <div className={clsx(styles.labelText, props.leftIcon === undefined && styles.marginTopStyle, props.rightIcon === undefined && styles.marginTopStyle)}>{props.label}</div>
          </div>
        </div>
        {props.type === "password" && (
          <IconButton
            onClick={() => {
              setVisible(!visible);
            }}
            className={clsx(
              styles.rightIcon,
              focus && styles.focused,
              error && styles.errorColor
            )}
          >
            {visible ? <VisibilityRoundedIcon /> : <VisibilityOffRounded />}
          </IconButton>
        )}
      </div>
      <p className={clsx(styles.helpTextView, error && styles.errorColor)}>
        {text}
      </p>
    </div>
  );
});

export default InputField;
