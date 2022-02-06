import { Box, Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import FileInput from "../../components/FileInput";
import FetchSelect from "../../components/FetchSelect";
import FetchButton from "../../components/FetchButton";
import clsx from "clsx";
import { useFetch } from "../../hooks/fetch";
import { useRouter } from "next/router";
import { AuthContext } from "../../hooks/Auth";


const useStyles = makeStyles(function (theme) {
  return {
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxSizing: "border-box",
    },
    container: {
      width: 500,
      backgroundColor: theme.palette.background.default,
      margin: "30px auto",
      padding: "30px 50px",
      boxShadow: theme.shadows[5],
      [theme.breakpoints.down("xs")]: {
        width: "calc(100vw - 50px)",
        padding: "30px 10px",
        boxShadow: "none",
      },
      borderRadius: 4,
      margin: "20px auto",
    },
    formContainer: {
      backgroundColor: theme.palette.background.paper,
    },
    formItem: {
      boxSizing: "border-box",
      margin: "10px 10px",
      width: "calc(50% - 20px)",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        padding: "5px 10px",
      },
    },
    formItemFullWidth: {
      boxSizing: "border-box",
      margin: "10px 10px",
      width: "calc(100% - 20px)",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        padding: "5px 10px",
      },
    },
  };
});

function album(props) {
  const classes = useStyles();
  const auth = React.useContext(AuthContext);
  const fetch = useFetch();
  const router = useRouter();
  React.useEffect(() => {
    if (auth.token === "")
      router.push("/login");
  }, [auth]);

  const [name, setName] = React.useState({
    value: "",
    error: false,
    message: "Required!",
  });
  const [releaseDate, setReleaseDate] = React.useState({
    value: "",
    error: false,
    message: "Required!",
  });
  const albumArtRef = React.useRef();
  const composerRef = React.useRef();
  const castRef = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const artistFetchFuntion = fetch.bind(this, "/get/artist/by/name");

  const getTodayDate = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  };

  React.useEffect(() => {
    setReleaseDate((prev) => {
      return {
        ...prev,
        value: getTodayDate(),
      };
    });
  }, []);

  const onUploadButtonClick = async () => {
    if (name.value === "") {
      setName((prev) => {
        return {
          ...prev,
          error: true,
          message: "Required!",
        };
      });
      return;
    }
    if (releaseDate.value === "") {
      setReleaseDate((prev) => {
        return {
          ...prev,
          error: true,
          message: "Required!",
        };
      });
      return;
    }
    if (!albumArtRef.current.validate()) {
      return;
    }
    if (!composerRef.current.validate()) {
      return;
    }
    if (!castRef.current.validate()) {
      return;
    }
    setLoading(true);
    const formdata = new FormData();
    formdata.append("albumName", name.value);
    formdata.append("releaseData", releaseDate.value);
    formdata.append("albumArtImage", albumArtRef.current.getFile);
    formdata.append(
      "composers",
      composerRef.current.getValues().map((item) => item.id)
    );
    formdata.append(
      "casts",
      castRef.current.getValues().map((item) => item.id)
    );
    try {
      const response = await fetch("/upload/album/data/", formdata, {
        headers: {
          "content-type": `multipart/form-data`,
        },
      });
      if (response.data.status_code === 200) {
        setName((prev) => {
          return {
            ...prev,
            error: false,
            message: "Required!",
            value: "",
          };
        });
        setReleaseDate((prev) => {
          return {
            ...prev,
            value: getTodayDate(),
          };
        });
        albumArtRef.current.reset();
        composerRef.current.reset();
        castRef.current.reset();
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const onChangeName = (event) => {
    setName((prev, data = event.target.value) => {
      return {
        ...prev,
        value: data,
        error: false,
      };
    });
  };

  const onChangeReleaseData = (event) => {
    setReleaseDate((prev, date = event.target.value) => {
      return {
        ...prev,
        value: date,
        error: false,
      };
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container className={classes.formContainer} justify={"center"}>
          <Grid
            className={clsx(classes.formItem, classes.formItemFullWidth)}
            item
          >
            <Box>
              <TextField
                fullWidth={true}
                variant="outlined"
                label="Album Name"
                placeholder="Enter Album Name"
                onChange={onChangeName.bind(this)}
                error={name.error}
                value={name.value}
                helperText={name.message}
              />
            </Box>
          </Grid>
          <Grid className={clsx(classes.formItem, classes.formItemFullWidth)}>
            <Box>
              <TextField
                id="date"
                label="Date of Release"
                fullWidth={true}
                variant="outlined"
                value={releaseDate.value}
                onChange={onChangeReleaseData.bind(this)}
                helperText={releaseDate.message}
                error={releaseDate.error}
                type="date"
                InputLabelProps={{}}
              />
            </Box>
          </Grid>
          <Grid className={clsx(classes.formItem, classes.formItemFullWidth)}>
            <Box>
              <FileInput
                ref={albumArtRef}
                label="Select Album art"
                accept=".jpg,.png,.jpeg"
                required
              />
            </Box>
          </Grid>
          <Grid
            item
            className={clsx(classes.formItem, classes.formItemFullWidth)}
          >
            <Box>
              <FetchSelect
                label="Composer"
                required
                ref={composerRef}
                fetchFunction={artistFetchFuntion.bind(this)}
              />
            </Box>
          </Grid>
          <Grid
            item
            className={clsx(classes.formItem, classes.formItemFullWidth)}
          >
            <Box>
              <FetchSelect
                ref={castRef}
                required
                label="Cast"
                fetchFunction={artistFetchFuntion.bind(this)}
              />
            </Box>
          </Grid>
          <Grid item className={clsx(classes.formItem)}>
            <FetchButton
              loading={loading}
              onClick={onUploadButtonClick.bind(this)}
              fullWidth={true}
            >
              Upload
            </FetchButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default album;
