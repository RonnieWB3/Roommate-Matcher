import { Link } from "react-router-dom";
import { Button } from '../components/ui/button.tsx';
import { Input } from '../components/ui/input.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card.tsx';
import { Checkbox } from '../components/ui/checkbox.tsx';
import { LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const csrfToken = getCookie('csrftoken'); // Fetch CSRF token from cookies
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,  // Include CSRF token in headers
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include'  // Include cookies in the request
      });
      if (response.ok) {
        navigate("/home");  // Redirect to the logged-in page
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  
  // Utility function to get CSRF token from cookies
  function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-white p-6 border-b">
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Welcome Back</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex flex-col items-center space-y-3 w-full">
            <label htmlFor="email" className="text-gray-600 text-center w-full">Email</label> 
            <div className="relative w-full">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10 py-3 rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-3 w-full">
            <label htmlFor="password" className="text-gray-600 text-center w-full">Password</label>
            <div className="relative w-full">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 py-3 rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-gray-600">Remember me</label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 p-6">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300" onClick={handleLogin}>
            Login
          </Button>
          <div className="text-sm text-center text-gray-500">
            <Link to="/forgot-password" className="text-indigo-600 hover:underline">
              Forgot your password?
            </Link>
          </div>
          <div className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
