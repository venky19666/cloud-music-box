import { Box, Grid, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import FileInput from '../../components/FileInput'
import FetchSelect from '../../components/FetchSelect'
import FetchButton from '../../components/FetchButton'
import clsx from 'clsx';
import { useFetch } from '../../hooks/fetch';
import AlbumNameSelect from '../../components/AlbumNameSelect'
import {Autocomplete} from '@material-ui/lab'
import MoodSelection from '../../components/MoodSelection'
import { useRouter } from 'next/router'
import { AuthContext } from '../../hooks/Auth'

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
    }
  }
})

function song(props) {
  const classes = useStyles();
  const fetch = useFetch();
  const router = useRouter();
  const auth = React.useContext(AuthContext);
  const albumNameRef = React.useRef();
  const [songName,setSongName] = React.useState({
    value: '',
    error: false,
    helpingText: "Required!"
  });
  const fileRef = React.useRef();
  const singersRef = React.useRef();
  const lyricitsRef = React.useRef();
  const moodRef = React.useRef();

  const [loading, setLoading] = React.useState(false);


  const albumsFetchFuntion = fetch.bind(this, "/get/album/by/name");
  const artistFetchFuntion = fetch.bind(this, "/get/artist/by/name");

  React.useEffect(() => {
    if (auth.token === "")
      router.push("/login");
  }, [auth]);

  const onUploadButtonClick = async () => {
    if (!albumNameRef.current.validate()){
      return;
    }
    if(songName.value===""){
      setSongName((prev)=>{
        return {
          ...prev,
          error: true,
        }
      });
      return;
    }
    if(!fileRef.current.validate()){
      return;
    }
    if(!singersRef.current.validate()){
      return;
    }
    if(!lyricitsRef.current.validate()){
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("albumId",albumNameRef.current.getValue.id);
    formData.append("songName",songName.value);
    formData.append("audioFile",fileRef.current.getFile);
    formData.append("singers", singersRef.current.getValues().map((item) => item.id));
    formData.append("lyricits", lyricitsRef.current.getValues().map((item) => item.id));
    formData.append("moodData", moodRef.current.getValue.map((item) => item.id));
    
    try{
      const response = await fetch("/upload/song/data/", formData, {
        headers: {
          "content-type": `multipart/form-data`,
        },
      });
      if(response.data.status_code ===200){
        setSongName(prev=>({...prev,value: ''}));
        fileRef.current.reset();
        singersRef.current.reset();
        lyricitsRef.current.reset();
        moodRef.current.reset();
      }
    }catch(error){

    }
    setLoading(false);
  }

  const onChangeSongName = (event) => {
    setSongName((prev) => ({ ...prev, value: event.target.value}));
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container className={classes.formContainer} justify={"center"}>
          <Grid className={clsx(classes.formItem, classes.formItemFullWidth)} item >
            <Box >
              <AlbumNameSelect
                fetchFunction={albumsFetchFuntion.bind(this)}
                ref={albumNameRef} label="Album Name" 
                required
                placeholder="Select album to upload!"
              />
            </Box>
          </Grid>
          <Grid className={clsx(classes.formItem, classes.formItemFullWidth)} >
            <Box>
              <TextField
                id="date"
                label="Song Name"
                fullWidth={true}
                value={songName.value}
                variant="outlined"
                onChange={onChangeSongName.bind(this)}
                helperText={songName.helpingText}
                error={songName.error}
              />
            </Box>
          </Grid>
          <Grid className={clsx(classes.formItem, classes.formItemFullWidth)} >
            <Box>
              <FileInput
                ref={fileRef}
                label="Select song file"
                accept=".mp3,.mpeg"
                required
              />
            </Box>
          </Grid>
          <Grid item className={clsx(classes.formItem, classes.formItemFullWidth)}>
            <Box>
              <FetchSelect
                label="Singers"
                required
                ref={singersRef}
                fetchFunction={artistFetchFuntion.bind(this)}
              />
            </Box>
          </Grid>
          <Grid item className={clsx(classes.formItem, classes.formItemFullWidth)}>
            <Box>
              <FetchSelect
                ref={lyricitsRef}
                required
                label="Lyricist"
                fetchFunction={artistFetchFuntion.bind(this)}
              />
            </Box>
          </Grid>
          <Grid item className={clsx(classes.formItem, classes.formItemFullWidth)}>
            <Box>
              <MoodSelection
                ref={moodRef}
               />
            </Box>
          </Grid>
          <Grid item className={clsx(classes.formItem)}>
            <FetchButton loading={loading} onClick={onUploadButtonClick.bind(this)} fullWidth={true}>
              Upload
            </FetchButton>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default song
