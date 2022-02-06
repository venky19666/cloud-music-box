import {
  makeStyles,
  TextField,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import React from "react";
import FileInput from "../../components/FileInput";
import FetchButton from "../../components/FetchButton";
import { useFetch } from "../../hooks/fetch";

import { ErrorOutlineRounded } from "@material-ui/icons";
import { AuthContext } from "../../hooks/Auth";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 100px)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 500,
    backgroundColor: theme.palette.background.default,
    boxSizing: "border-box",
    overflow: "hidden",
    padding: "100px 50px",
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down("xs")]: {
      width: "calc(100vw - 50px)",
      padding: "75px 0px",
      boxShadow: "none",
    },
    borderRadius: 4,
  },
  formContainer: {
    boxSizing: "inherit",
  },
  buttonWidth: {
    margin: "0px auto",
    display: "block",
    width: 300,
    marginTop: 25,
  },
  errorDialogText: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    padding: "20px 10px",
  }
}));

function artist() {
  const classes = useStyles();
  const inputRef = React.useRef();
  const [nameOption, setNameOption] = React.useState({
    value: "",
    error: false,
    helpingText: "Required!",
  });
  const [fileLabel, setFileLabel] = React.useState("Select profile pic");
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error_message, setError_message] = React.useState("");
  const auth = React.useContext(AuthContext);
  const fetch = useFetch();
  const router = useRouter();
  React.useEffect(() => {
    if (auth.token === "")
      router.push("/login");
  }, [auth]);

  const handleClose = () => {
    setOpen(false);
  };

  const onUploadButtonClick = async () => {
    if (nameOption.value === "") {
      setNameOption((prev) => {
        return {
          ...prev,
          value: "",
          error: true,
        };
      });
      return;
    }

    setLoading(true);
    const formdata = new FormData();
    formdata.append("name", nameOption.value);

    if (inputRef.current.getFile.size>=0) {
      formdata.append("imageURL", inputRef.current.getFile);
    }

    const { data } = await fetch("/upload/artist/data", formdata, {
      headers: {
        "content-type": `multipart/form-data`,
      },
    });
    if (data.status_code === 200) {
      resetForm();
    } else {
      setError_message(data.message);
      setOpen(true);
    }
    setLoading(false);
  };
  const onChangeName = (event) => {
    setNameOption((prev) => {
      return {
        ...prev,
        value: event.target.value,
        error: false,
      };
    });
  };

  const resetForm = () => {
    setNameOption((prev) => {
      return {
        ...prev,
        value: "",
        error: false,
        helpingText: "Required!",
      };
    });
    inputRef.current.reset();
  };

  const onFileChange = (event) => {
    if (
      event.target.files[0] === undefined ||
      event.target.files[0].size <= 0
    ) {
      setFileLabel("Select profile pic");
    } else {
      setFileLabel(event.target.files[0].name);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <TextField
            label="Artist Name"
            variant="outlined"
            error={nameOption.error}
            onChange={onChangeName.bind(this)}
            value={nameOption.value}
            fullWidth={true}
            placeholder="Enter Artist Name"
            helperText={nameOption.helpingText}
          />
          <FileInput
            ref={inputRef}
            onChange={onFileChange.bind(this)}
            label="Select Album art"
            accept=".jpg,.png,.jpeg"
          />
          <FetchButton
            onClick={onUploadButtonClick.bind(this)}
            className={classes.buttonWidth}
            loading={loading}
          >
            Upload
          </FetchButton>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={classes.errorDialogText}>
              <ErrorOutlineRounded color={"error"} fontSize="large" />
              {error_message}
            </div>
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default artist;
