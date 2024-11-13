// components/LoginForm.tsx
'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import Spinner from '../Spinner/Spinner';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [clicked,setClicked]=useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClicked(true)
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result && result.ok) {
      // window.location.href = '/IssuePage';
      toast.success('Use Logged in Succesfully');
      router.push("/IssuePage")
    } else {
      setError(result?.error ?? "Failed to sign in")
      toast.error("Invalid Email or Passoword")
    }
    setClicked(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              {clicked?<Spinner/>:"Login"}
           
            </button>
          </div>
        </form>

        {/* Login with Google */}
        <div className="mt-4">
          <button
            onClick={() => signIn("google",{ callbackUrl: '/IssuePage' })}
            className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Login with Google
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <a href="/" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
