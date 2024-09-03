import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert, Button, Label, Spinner, TextInput, Radio } from 'flowbite-react';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(null);
  
    try {
      const formData = new FormData();
      formData.append('username', data.username.trim());
      formData.append('email', data.email.trim());
      formData.append('location', data.location.trim());
      formData.append('password', data.password.trim());
      formData.append('cnic', data.cnic.trim());
      formData.append('role', role);
  
      if (Array.isArray(data.document) && data.document.length > 0) {
        formData.append('document', data.document[0]);
      }
  
      if (role === 'ngo') {
        formData.append('uniqueId', data.uniqueId.trim());
      }
  
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      });
  
      const responseData = await res.json();
      if (!responseData.success) {
        setLoading(false);
        return setErrorMessage(responseData.message);
      }
  
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setErrorMessage('An error occurred while submitting the form. Please try again later.');
    }
  };
  

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              BEHTER KAL
            </span>
          </Link>
          <p className='text-sm mt-5'>Sign up yourself and get educational rights</p>
        </div>
        <div className="flex-1">
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
  <div>
  <Label value='Select Role' />
    <div className="flex gap-4">
      {['user', 'ngo', 'stakeholder', 'parent'].map((roleOption) => (
        <div key={roleOption}>
          <Radio
            label={roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
            value={roleOption}
            checked={role === roleOption}
            onChange={() => setRole(roleOption)}
          />
          {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
        </div>
      ))}
    </div>
  </div>
  {/* Username */}
  <div>
    <Label value='Your Username' />
    <TextInput type='text' {...register("username", { required: true })} placeholder='Username' />
    {errors.username && <span className="text-red-500">Username is required</span>}
  </div>
  {/* Email */}
  <div>
    <Label value='Your Email' />
    <TextInput type='email' {...register("email", { required: true })} placeholder='Email' />
    {errors.email && <span className="text-red-500">Email is required</span>}
  </div>
  {/* Parentname */}
  <div>
    <Label value='Your Parentname' />
    <TextInput type='text' {...register("parentname", { required: true })} placeholder='Parent Name' />
    {errors.parentname && <span className="text-red-500">Parent name is required</span>}
  </div>
  {/* Location */}
  <div>
    <Label value='Your Location' />
    <TextInput type='text' {...register("location", { required: true })} placeholder='Location' />
    {errors.location && <span className="text-red-500">Location is required</span>}
  </div>
  {/* Password */}
  <div>
    <Label value='Your Password' />
    <TextInput type='password' {...register("password", { required: true })} placeholder='Password' />
    {errors.password && <span className="text-red-500">Password is required</span>}
  </div>
  {/* CNIC */}
  <div>
    <Label value='Your CNIC' />
    <TextInput type='text' {...register("cnic", { required: true })} placeholder='CNIC' />
    {errors.cnic && <span className="text-red-500">CNIC is required</span>}
  </div>
  {/* Contact */}
  <div>
    <Label value='Your Contact' />
    <TextInput type='tel' {...register("contact", { required: true })} placeholder='Contact' />
    {errors.contact && <span className="text-red-500">Contact is required</span>}
  </div>
  {/* Additional fields based on role */}
  {role === 'ngo' && (
    <div>
      <Label value='NGO Unique ID' />
      <TextInput type='text' {...register("uniqueId", { required: true })} placeholder='NGO Unique ID' />
      {errors.uniqueId && <span className="text-red-500">NGO Unique ID is required</span>}
    </div>
  )}
  {/* Submit Button */}
  <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading}>
    {loading ? (
      <>
        <Spinner size='sm' />
        <span className='pl-3'>Loading...</span>
      </>
    ) : (
      'Sign Up'
    )}
  </Button>
  {/* OAuth */}
  <OAuth />
</form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign IN</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
