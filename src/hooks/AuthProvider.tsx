
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
            const accessToken = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            if (accessToken) {

                axios.get('https://localhost:7095/api/Auth/GetAuth', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(function () {

                    setIsAuthenticated(true);
                       user && setUser(JSON.parse(user))
                       setIsLoading(false);

                    })
                    .catch(function (error) {
                            localStorage.clear();

                            setIsAuthenticated(false);
                            setUser(undefined);
                        console.log(error);
                    })
                    .finally(function () {
                                        setIsLoading(false);
                    });
            }else{
                setIsLoading(false);
                setIsAuthenticated(false);
            }

        }, [])

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