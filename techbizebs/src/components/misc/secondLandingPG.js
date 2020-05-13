import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    boxShadow: '0 3px 5px 2px rgba(168, 168, 228)',
    textAlign:"left"


  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14
   
  },
  pos: {
    marginBottom: 12,
  },
  lastlogin: {
    paddingTop:20,
    color:"rgba(168, 168, 228)",
    fontSize: 12,
    fontWeight:"bold"
    
  },
  time: {
    fontSize: 12,
    fontWeight:"bold"
    
  },
});


export default function SimpleCard() {



    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth(); //Current month
    var year = new Date().getFullYear(); //Current year
    var cDate = date+'/'+month+'/'+year;
    
    var hour  = new Date().getHours();
    var minute  = new Date().getMinutes();
    var time  = hour+':'+  minute;

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} >
      <CardContent>
        <Typography variant="h6" component="h4">
        Welcome Muhammad Shoaib   

        </Typography>
        <Typography className={classes.time} color="textSecondary" variant="h8" component="h6">
        Local Time Date : {time} - {cDate}
        </Typography>
        <Typography className={classes.lastlogin} color="textSecondary" variant="h8" component="h2" sty>
        Last login : 
        </Typography>
      </CardContent>
    </Card>
  );
}
