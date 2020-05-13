import React ,{useState} from 'react';
import { useForm } from 'react-hook-form'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Erp from '../img/erp-image.jpg';
import { login } from '../redux/actions/auth';
import API from '../baseURL';
import { Redirect , useHistory } from 'react-router-dom';
import {OnMessage} from "../components/misc/message";
import { user_login } from '../actions/userActions'; 
import { useDispatch } from 'react-redux';





function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Software Developed by'}
      <Link color="inherit" href="https://techbiz.com.pk/">
        Techbiz Solutions (Pvt) Ltd
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Erp})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 

export default function SignInSide(props) {
  
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch();
  const classes = useStyles();


  const onSubmit = (data) => {
    console.log(data);

    API.post("/login", data, {
      header: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
    	console.log("user login  page) ",response.data);  

      dispatch(user_login(response.data));
      props.history.push('/landingpg');
    })
    .catch((error) => {
      if (
				error.response.status === 400 ||
				error.response.status === 403 ||
				error.response.status === 404
			) {
				OnMessage("Invalid Email or Password", "error");
			}
      return;
    });
  




    
              };
  return (

  
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              // autoComplete="email"
              autoFocus
              inputRef={register({ required: true, maxLength: 255 })}

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({ required: true, maxLength: 255 })}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}