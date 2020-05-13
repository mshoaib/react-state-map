export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";



export const login1 = user => {
    console.log('Autheticatio : '+user[0].username);
    return{
    type: LOGIN,
    payload: user
    }

};

export const logout = () =>{
    return{
        type:LOGOUT
    };
};

