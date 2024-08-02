import { createContext,useContext,useReducer } from "react";
import { Navigate,useLocation } from "react-router-dom";

/*store*/

const initialState = {auth:false,email:"",jwtToken:""};
const authContext = createContext(initialState);



export function reducer(state,action)
{
    switch(action.type)
    {
        case 'login':
            return {auth: true, email: action.payload.email,jwtToken: action.payload.jwtToken };
        case 'logout':
            return { auth: false, email:"",jwtToken: "" };
        default:
            throw new Error();
    }
}

/* auth provider */
export function AuthProvider({children})
{
    const [authed,dispatch] = useReducer(reducer,initialState);

    return <authContext.Provider value={[authed,dispatch]}>{children}</authContext.Provider>
}

/* own auth consume hook */
export default function AuthConsumer()
{
    return useContext(authContext);
}


export function RequireAuth({children})
{
    const [authed,dispatch]= AuthConsumer();
    const location = useLocation();
    return authed.auth === true ? (children):<Navigate to={'/'} replace state={{path:location.pathname}}></Navigate>
}