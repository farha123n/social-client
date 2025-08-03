import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';


const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    if(loading){
        return (
            <>loading</>
        )
    }
    if(user){
        return children
    }
    return (
        <div>
            <Navigate state={location.pathname} to='/login'></Navigate>
        </div>
    );
};

export default PrivateRoute;