import React from 'react'
import Navigation from '../components/navigation';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import SecondLandingPG from '../components/misc/secondLandingPG';
import UOM from '../components/inv/uom/uomSearchPG';
import Icgt from '../components/inv/icgt/icgtSearchPG';
import Icg from '../components/inv/icg/icgSearchPG';
import Ic from '../components/inv/ic/icSearchPG';
import Isc from '../components/inv/isc/iscSearchPG';
import Item from '../components/inv/item/itemSearchPG';
import Application from '../components/sem/Application/ApplicationSearch';
import Users from '../components/sem/Users/UsersSearch';
import Roles from '../components/sem/Roles/RolesSearch';
import UserRoles from '../components/sem/User_Roles/UserRolesSearch';
import RolesModules from '../components/sem/Roles_Modules/RolesModulesSearch';
import RolesForms from '../components/sem/Roles_Forms/RolesFormsSearch';
import PurchaseOrder from '../components/pms/PurchaseOrders/POSearch';
import Supplier from '../components/pms/supplier/supplierSearchPG';










import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import secondLandingPG from '../components/misc/secondLandingPG';

//import Icgt from '../components/inv/icgt';



//Sample List for Demonstration, later will be fetched from redux store

const formSelector = (form_name) => {


    switch (form_name) {

        /* *********** Security Module *********** */
        case 'Application':
            return <Application />

        case 'Users':
            return <Users />

        case 'Roles':
            return <Roles />

        case 'User Roles':
            return <UserRoles />

        case 'Roles Modules':
            return <RolesModules />

        case 'Roles Forms':
            return <RolesForms />


        /* *********** Inventory Module *********** */
        case 'Unit of Measurement':
            return <UOM />

        case 'Item Category Group Type':
            return <Icgt />

        case 'Item Category Group':
            return <Icg />

        case 'Item Category':
            return <Ic />

        case 'Item Sub Category':
            return <Isc />

        case 'Item':
            return <Item />

     /* *********** Purchase Module *********** */
     case 'Purchase Order':
        return <PurchaseOrder />


      case 'Supplier':
            return <Supplier />
    
      
        case 'SecondLandingPG':
            return<SecondLandingPG />


        default:
            return <SecondLandingPG />;
    }
};



// Sidebar and Search Styling to be done
const MainContent = (props) => {

    const { formSelected } = useSelector(state => state.user);




    console.log("Main content : ", props);

    return (
        <div style={{ padding: '10px' }}>
            <Grid container>
                <Grid item xs={2}>
                    <Navigation module_name={props} />
                </Grid>
                <Grid item xs={10}>
                    {
                        formSelector(formSelected)
                    }


                </Grid>
            </Grid>
        </div>
    )
}

export default MainContent