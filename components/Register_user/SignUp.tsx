'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';


interface UserType {
  name: string;
  email: string;
  age: number;
  gender: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<UserType>();
  const router =useRouter()
  const [clicked,setClicked]=useState(false)
  

  // Watch the password field to compare it with confirmPassword
  const password = watch("password");

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    setClicked(true)
    try {
      console.log('muba is',data)
      const response = await axios.post('/api/Register', {
        name: data.name,
        age: Number(data.age),
        email: data.email,
        gender: data.gender,
        password: data.password,
      });
      console.log('User registered successfully:', response.data);
      toast.success('User registered successfully');
      router.push("/LoginFormPage")
    } catch (error) {
      toast.error('User already Exist');
      console.error('Error registering user:', error);
    }
    setClicked(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
              {...register("name", {
                required: "Name is required",
                maxLength: { value: 20, message: "Name can't exceed 20 characters" },
                pattern: { value: /^[A-Za-z]+$/i, message: "Name can only contain letters" }
              })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          {/*password field*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              className={`mt-1 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters long" }
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              className={`mt-1 block w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === password || "Passwords do not match"
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Age Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Age:</label>
            <input
              type="number"
              className={`mt-1 block w-full p-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "Age must be at least 18" },
                max: { value: 99, message: "Age cannot exceed 99" }
              })}
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
          </div>

          {/* Gender Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender:</label>
            <select
              className={`mt-1 block w-full p-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              {/* <option value="other">Other</option> */}
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
             {clicked?<Spinner/>: "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
