import { toast } from "react-hot-toast";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  loginUser,
  signupUser,
} from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null; // User can be a User object or null
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>; // Removed email parameter as it's not needed here
};

const AuthContext = createContext<UserAuth | undefined>(undefined); // Use undefined instead of null

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch user data from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);



  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await signupUser(name, email, password); // Assuming this returns the response directly
      if (data) {
        console.log(data);
        toast.success("Signup successful! You can now log in.");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };
  


  const login = async (email: string, password: string) => {
    try {
      const res = await loginUser(email, password); // Assuming this returns the response directly
      console.log(res.data.token);
      console.log(res.data.user.email);
      console.log(res.data.user.name);
      console.log(res.data.user);
      if (res) {
        
        // Set user state
        setUser({ email: res.data.user.email, name : res.data.user.name });
        setIsLoggedIn(true);
        
        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };
  

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Updated the hook to return undefined instead of null
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
