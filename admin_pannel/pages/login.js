import React from "react";
import {
  makeStyles,
  Button,
  Dialog,
  DialogContent, 
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import InputField from "../components/InputField";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import FetchButton from "../components/FetchButton";
import Axios from "axios";
import { AuthContext } from "../hooks/Auth";
import { ErrorOutlineRounded } from "@material-ui/icons";
import {useRouter} from 'next/router'
const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 128px)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 500,
    margin: "0 auto",
    backgroundColor: theme.palette.background.default,
    boxSizing: "border-box",
    overflow: "hidden",
    padding: "100px 50px",
    [theme.breakpoints.down("xs")]: {
      width: "calc(100vw - 50px)",
      padding: "75px 25px",
    },
    boxShadow: theme.shadows[5],
    borderRadius: 4,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
  },
  forgotButton: {
    marginLeft: "auto",
    marginBottom: 10,
  },
  errorDialogText: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    padding: "20px 10px",
  }
}));

function login() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const auth = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [error_message,setError_message] = React.useState('');
  const router = useRouter();
  React.useEffect(() => {
    if (auth.token !== "")
      router.push("/");
  }, [auth]);
  

  const handleClose = () => {
    setOpen(false);
  };

  const formFields = [
    {
      label: "Username",
      placeholder: "Enter Username",
      required: true,
      type: "text",
      icon: <AccountCircleRoundedIcon />,
      validation: function (value) {
        if (
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            value
          )
        ) {
          return { status: true };
        } else {
          return { status: false, msg: "Invalid Username!" };
        }
      },
      ref: React.useRef(),
      initialValue: "test@test.com",
    },
    {
      label: "Password",
      placeholder: "Enter Password",
      required: true,
      icon: <LockRoundedIcon />,
      type: "password",
      ref: React.useRef(),
      initialValue:"Ben10@520520"
    },
  ];

  React.useEffect(function () {
  }, [])

  const onSignClick = async function () {
    setLoading(true);
    const isOk = formFields.every(function (item, index) {
      return item.ref.current.validate();
    });
    if (isOk) {
      const { data, status } = await Axios.post(process.env.NEXT_PUBLIC_BASE_URL+"/login", {
        username: formFields[0].ref.current.value,
        password: formFields[1].ref.current.value,
        device_code: "This is sample where increase after some time.",
      });
      console.log(data);
      if (data.status_code === 200) {
        localStorage.setItem("user-cache", JSON.stringify({ access_token: data.access_token, token: data.token }));
        auth.updateAuth("ALL",{ access_token: data.access_token, token: data.token });
      }else{
        setError_message(data.message);
        setOpen(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <form>
          <div className={classes.formContainer}>
            {formFields.map(function (item, index) {
              return (
                <InputField
                  key={index.toString()}
                  icon={item.icon}
                  label={item.label}
                  placeholder={item.placeholder}
                  required={item.required}
                  validation={item.validation}
                  type={item.type}
                  ref={item.ref}
                  initialValue={item.initialValue}
                />
              );
            })}
            <div className={classes.forgotButton}>
              <Button onClick={()=>{
                
              }} size="small">forgot password?</Button>
            </div>
            <div className={classes.loginButton}>
              <FetchButton
                onClick={onSignClick.bind(this)}
                fullWidth={true}
                loading={loading}
              >
                Sign
              </FetchButton>
            </div>
          </div>
        </form>
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



export default login;
