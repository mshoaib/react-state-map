import swal from "sweetalert";
import API from "./baseURL.js";

export const onDelete = (url, callback) => {
  if (window.confirm("Are You Sure Want To Delete This Role") === true) {
    API.delete(url, {
      header: {
        "Content-Type": "application/json",
      },
    })
      .then(function(response) {
        if (response.status === 200) swal("Record Deleted!", "", "success");
        callback();
      })
      .catch(function(error) {
        console.log(error);
        if (
          error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 403 ||
          error.response.status === 404 
        ) {
          swal("Deletion Failed!", error.message, "error");
        }
      });
  } else {
    return;
  }
};


export const fetchData = (url,setState) => {
  API.get(url,{
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      setState(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};