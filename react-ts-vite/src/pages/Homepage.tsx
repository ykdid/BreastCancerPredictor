import { useState,useContext } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";

export default function HomePage() {
  const { login } = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen)
    setIsSignupOpen(false)
  }

  const toggleSignup = () => {
    setIsSignupOpen(!isSignupOpen)
    setIsLoginOpen(false)
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8082/api/Auth/login", {
        email: loginData.email,
        hashPassword: loginData.password,
      });
      if (response.data.isSuccess) {
        toast.success("Login successful!");
        login(response.data.token);
        navigate("/make-prediction"); 
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleSignup = async () => {
    try {
      if (signupData.password !== signupData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      const response = await axios.post("http://localhost:8082/api/Auth/register", {
        userName: signupData.username,
        email: signupData.email,
        hashPassword: signupData.password,
      });
      if (response.data.isSuccess) {
        toast.success("Signup successful!");
        toggleSignup();
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="/">
         <img className='w-6' src="/favicon.png" alt="" />
          <span className="ml-2 text-lg font-bold">BreastCancerPredictor</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={toggleLogin}>Login</DropdownMenuItem>
              <DropdownMenuItem onSelect={toggleSignup}>Sign up</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main className="flex-1">
      <section className="w-full py-12 md:py-8 lg:py-32 xl:py-36 flex justify-center items-center">
        <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-4">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to 
                </h1>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-pink-500">
                Breast Cancer Predictor
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Empowering early detection and prevention through advanced AI-driven breast cancer prediction.
                </p>
            </div>
            <div className="space-x-4">
                <Button onClick={toggleSignup}>Get Started</Button>
                <Button variant="outline" onClick={() => navigate('/learn-more')}>Learn More</Button>
            </div>
            </div>
        </div>
    </section>
        <section className="w-full py-12 md:py-24 lg:py-30 bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Our Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <CloudIcon className="h-10 w-10" />
                <h3 className="text-xl font-bold">AI-Powered Analysis</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Utilize cutting-edge machine learning algorithms for accurate predictions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <LockIcon className="h-10 w-10" />
                <h3 className="text-xl font-bold">Secure & Private</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Your health data is encrypted and protected with the highest security standards.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <BarChartIcon className="h-10 w-10" />
                <h3 className="text-xl font-bold">Comprehensive Reports</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Receive detailed, easy-to-understand reports on your breast health.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-8 rounded-lg w-96 lg:w-[350px]">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <Input className="mb-4" type="email" placeholder="Email" value={loginData.email} 
      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}/>
            <Input className="mb-4" type="password" placeholder="Password"value={loginData.password} 
      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            <Button className="w-full" onClick={handleLogin}>Login</Button>
            <Button variant="link" className="mt-2" onClick={(toggleLogin)}>Close</Button>
          </div>
        </div>
      )}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96 lg:w-[350px]">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <Input className="mb-4" type="text" placeholder="Username" value={signupData.username} 
      onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}/>
            <Input className="mb-4" type="email" placeholder="Email" value={signupData.email} 
      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}/>
            <Input className="mb-4" type="password" placeholder="Password" value={signupData.password} 
      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
    />
            <Input className="mb-4" type="password" placeholder="Confirm Password"value={signupData.confirmPassword} 
      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
    /> 
            <Button className="w-full"onClick={handleSignup}>Sign Up</Button>
            <Button variant="link" className="mt-2" onClick={toggleSignup}>Close</Button>
            <Button variant="link" className="mt-2" onClick={toggleLogin}>Already have an account? Log in</Button>
          </div>
        </div>
      )}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 BreastCancerPredictor. All rights reserved by Yusuf KAYA</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer> 
    </div>
  )
}

// function MedicalIcon(props: React.SVGProps<SVGSVGElement>) {
//     return (
//       <svg
//         {...props}
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M8 20h8" />
//         <path d="M12 4v16" />
//         <path d="M20 8h-8" />
//         <path d="M8 16h8" />
//         <path d="M8 12h8" />
//       </svg>
//     );
//   }
  
  function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    );
  }
  
  function LockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  
  function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
      </svg>
    );
  }

