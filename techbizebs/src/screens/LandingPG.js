import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import AdminImage from '../img/admin-module.png';
import Secmage from '../img/security_module.jpg';
import InventoryImage from '../img/inventory_module.jpg';
import PurchaseImage from '../img/ecommerce.jpg';
import SalesImage from '../img/sales.jpg';
import FinanceImage from '../img/finance.jpg';

import { useSelector, useDispatch } from 'react-redux';
import { select_module, select_toolbar ,select_form} from '../actions/userActions';




const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const LandingPG = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { modules } = useSelector(state => state.user);

  const changeHandler = (module_name) => {
    console.log(module_name)
    const module = modules.filter(module => module.Module_Name === module_name)

    dispatch(select_module(module[0].Module_ID))
 dispatch(select_form(null));
 dispatch(select_toolbar(false));
    props.history.push('/maincontent');

  }

  return (

    <div style={{ paddingTop: 20, paddingLeft: 20 }}>

      <Grid container spacing={0}>

        {/* *************  Admin Module ********************   */}
        <Grid item xs={4} >
          <Card Card className={classes.root}   >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={AdminImage}
                title="Administration"
              />
              <CardContent style={{height:40}} >
                <Typography gutterBottom variant="h5" component="h2">
                  Administration
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={!modules.some(module => module.Module_Name === "Admin Module")}
              >
                Enter
        </Button>
              <Button size="small" color="primary">
                Learn More
        </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* *************  Security Module ********************   */}

        <Grid item xs={4}>
          <Card Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Secmage}
                title="Contemplative Reptile"
              />
              <CardContent style={{height:40}}>
                <Typography gutterBottom variant="h5" component="h2">
                  Security
          </Typography>

              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary"
                disabled={!modules.some(module => module.Module_Name === "Security Module")}
                onClick={() => changeHandler("Security Module")}
              >
                Enter
        </Button>
              <Button size="small" color="primary">
                Learn More
        </Button>
            </CardActions>
          </Card>
        </Grid>


        {/* *************  Inventory Module ********************   */}


        <Grid item xs={4}>
          <Card Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={InventoryImage}
                title="Contemplative Reptile"
              />
              <CardContent style={{height:40}}>  
                <Typography gutterBottom variant="h5" component="h2" >
                  Inventory
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small"
                color="primary"
                disabled={!modules.some(module => module.Module_Name === "Inventory Module")}
                onClick={() => changeHandler("Inventory Module")}>

                Enter
        </Button>
              <Button size="small" color="primary">
                Learn More
        </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>


      {/* *************  Purchasing Module ********************   */}
      <Grid container spacing={0} style={{ paddingTop: 50 }}>
        <Grid item xs={4}>
          <Card Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={PurchaseImage}
                title="Contemplative Reptile"
              />
              <CardContent style={{height:40}}>
                <Typography gutterBottom variant="h5" component="h2">
                  Purchasing
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={!modules.some(module => module.Module_Name === "Purchase Module")}
                onClick={() => changeHandler("Purchase Module")}>
              
                Enter
        </Button>
              <Button size="small" color="primary">
                Learn More
        </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* *************  Sales Module ********************   */}


        <Grid item xs={4}>
          <Card Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={SalesImage}
                title="Contemplative Reptile"
              />
              <CardContent style={{height:40}}>
                <Typography gutterBottom variant="h5" component="h2">
                  Sales
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={!modules.some(module => module.Module_Name === "Admin Module")}
              >
                Enter
        </Button>
              <Button size="small" color="primary">
                Learn More
        </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* *************  Finance Module ********************   */}

        <Grid item xs={4}>
          <Card Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={FinanceImage}
                title="Contemplative Reptile"
              />
              <CardContent style={{height:40}}>
                <Typography gutterBottom variant="h5" component="h2">
                  Finance
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={!modules.some(module => module.Module_Name === "Admin Module")}
              >
                Enter
        </Button>
              <Button size="small" color="primary">
                Learn More
        </Button>
            </CardActions>
          </Card>
        </Grid>



      </Grid>



    </div>


  );
}

export default LandingPG;