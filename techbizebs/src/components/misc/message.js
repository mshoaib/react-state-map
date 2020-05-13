import swal from 'sweetalert';
import API from '../../../src/baseURL';
import UomSearch from '../inv/uom/uomSearchPG';

 

const OnMessage = (message,type) => {
    swal(
        {
            title: '',
            text: message,
            icon: type,
            timer: 2000,
            buttons: false,
        }
      ) }

  
  const OnDeleteMessage = (item,deleteAPIPath) => {
    swal({
        title: "Are you sure?",
        text: "Do you want to delete this record ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            API.delete(`${deleteAPIPath}${item}`,{
                header: {
                  "Content-Type": "uom/json"
                }
              })
              .then(function(response) {

                console.log(response.status);
                
              })
              .catch(function(error) {
                console.log(error);
              });
          swal("Your record has been deleted sucessfully", {
            icon: "success",
          })
        
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }
  
  export   {OnMessage,OnDeleteMessage};

//   And with a third argument, you can add an icon to your alert! 
//   There are 4 predefined ones: 
//   "warning", "error", "success" and "info".

