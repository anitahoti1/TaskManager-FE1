
import axios from "axios";
import { useContext, createContext, useState, PropsWithChildren, Dispatch, SetStateAction, useEffect } from "react";

interface AuthContextType {
    user: any | undefined;
    setUser: Dispatch<SetStateAction<any | undefined>>;
    isLoading: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<any | undefined>>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<any | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");

    if (!token || !userString) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
    }

    const localUser = { ...JSON.parse(userString), roles };
    setUser(localUser);
    setIsAuthenticated(true);

    axios.get('https://localhost:7095/api/Auth/GetAuth', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(() => {
    })
    .catch((error) => {
        console.error("Unauthorized access:", error);
        localStorage.clear();
        setUser(undefined);
        setIsAuthenticated(false);
    })
    .finally(() => {
        setIsLoading(false);
    });
}, []);


    return (
        <AuthContext.Provider value={{ user, setUser, isLoading,isAuthenticated,setIsAuthenticated,}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};