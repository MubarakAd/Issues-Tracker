'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Callout } from '@radix-ui/themes';
import { RxInfoCircled } from "react-icons/rx";
import Spinner from '../Spinner/Spinner';
import type { Issue } from '@prisma/client';
import toast from 'react-hot-toast';


interface Input {
  title: string;
  description: string;
}

const Issue= ({issue}:{issue?:Issue}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Input>({
    });
    

  const router = useRouter();
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);


  const onSubmit: SubmitHandler<Input> = async (data) => {
    setSubmitted(true);

    try {
      const endpoint = '/api/issues';
      if (issue){
        const res = await axios.patch(`/api/issues/${issue.id}`, data);
        reset();
        toast.success('Issue Updated Successfully');
        router.back()
        router.refresh()
      }
      else{
        const res = await axios.post(endpoint, {
          ...data,
          userId:2
        });
        reset();
        console.log(res);
        
        toast.success('Issue Submitted Successfully');
        router.push('/showIssuePage');
       
      }
      

      // console.log("Issue data:", res.data);
      
    } catch (error: any) {
      console.log("Submission error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-16 space-y-4">
      {error && (
        <Callout.Root className="flex space-x-3 w-full max-w-lg bg-red-500 p-4 rounded-md">
          <RxInfoCircled className='text-2xl text-white' />
          <Callout.Text className="text-white text-center">
            {error}
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 space-y-6 mt-4"
      >
        
        <h2 className="text-2xl font-semibold text-center text-gray-700">
        {!issue? 'Submit an Issue':"Update an Issue"}
        </h2>
        
        <div>
          <input 
            className="w-full border border-gray-300 rounded-md p-2" 
            placeholder="Title" 
            defaultValue={issue?.title}
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
            placeholder="Description…"
            defaultValue={issue?.description} 
            rows={5}
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        
        <button
          type="submit"
          disabled={submitted}
          className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex justify-center items-center"
        >
          {submitted?  <Spinner />:(!issue? 'Submit an Issue':"Update an Issue")}
        </button>
      </form>
    </div>
  );
};

export default Issue;
