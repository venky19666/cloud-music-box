import React from "react";
import { Button, makeStyles, useTheme } from "@material-ui/core";
import clsx from 'clsx';

const useStyles = makeStyles(function (theme) {
  return {
    container: {
      position: "relative",
    },
    progressLogo: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };
});

function FetchButton(props) {
  const theme = useTheme();
  const classes = useStyles();
  return (
      <Button
      className={clsx(classes.container,props.className)}
        onClick={props.onClick}
        variant={"contained"}
        color="primary"
        fullWidth={props.fullWidth}
        size={props.size}
        disabled={props.loading}
      >
        {props.children}
        {props.loading && (
          <svg
            width="100%"
            className={classes.progressLogo}
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              r="32"
              strokeWidth="8"
              stroke={theme.palette.primary.main}
              strokeDasharray="50.26548245743669 50.26548245743669"
              fill="none"
              strokeLinecap="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                keyTimes="0;1"
                values="0 50 50;360 50 50"
              ></animateTransform>
            </circle>
          </svg>
        )}
      </Button>
  );
}

export default FetchButton;
