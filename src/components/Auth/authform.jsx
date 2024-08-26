"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { IconUser, IconLock, IconBrandGoogle, IconBrandGithub, IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import './AuthForm.css'; // Custom CSS

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const router = useRouter(); // Using useRouter for navigation

  const onSubmit = data => {
    console.log(data);
    // Handle form submission (e.g., API call)
  };

  // Custom password validation
  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long"
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: "Password must contain uppercase letters, lowercase letters, numbers, and special characters."
    }
  };

  // Function to handle back navigation
  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <div className="auth-container">
      <motion.div
        className="form-wrapper"
        initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotate: 10 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <button className="back-button" onClick={handleBack}>
          <IconArrowLeft size={24} className="icon" />
          <span className="sr-only">Back</span>
        </button>

        <h1 className="title">WelCome</h1>

        <AnimatePresence>
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="subtitle">Login</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                  <label className="label">
                    <IconUser className="icon" /> Username
                  </label>
                  <div className={`line-input ${errors.username ? 'input-error' : ''}`}>
                    <input
                      type="text"
                      className="input"
                      {...register('username', { required: "Username is required" })}
                    />
                  </div>
                  {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>

                <div className="input-group">
                  <label className="label">
                    <IconLock className="icon" /> Password
                  </label>
                  <div className={`line-input ${errors.password ? 'input-error' : ''}`}>
                    <input
                      type="password"
                      className="input"
                      {...register('password', passwordValidation)}
                    />
                  </div>
                  {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>

                <button
                  type="submit"
                  className="submit-button"
                >
                  Login
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="subtitle">Signup</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                  <label className="label">
                    <IconUser className="icon" /> Username
                  </label>
                  <div className={`line-input ${errors.username ? 'input-error' : ''}`}>
                    <input
                      type="text"
                      className="input"
                      {...register('username', { required: "Username is required" })}
                    />
                  </div>
                  {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>

                <div className="input-group">
                  <label className="label">
                    <IconLock className="icon" /> Password
                  </label>
                  <div className={`line-input ${errors.password ? 'input-error' : ''}`}>
                    <input
                      type="password"
                      className="input"
                      {...register('password', passwordValidation)}
                    />
                  </div>
                  {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>

                <div className="input-group">
                  <label className="label">Confirm Password</label>
                  <div className={`line-input ${errors.confirmPassword ? 'input-error' : ''}`}>
                    <input
                      type="password"
                      className="input"
                      {...register('confirmPassword', {
                        validate: value =>
                          value === watch('password') || "Passwords don't match"
                      })}
                    />
                  </div>
                  {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                </div>

                <button
                  type="submit"
                  className="submit-button"
                >
                  Signup
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="social-login">
          <button className="social-button google">
            <IconBrandGoogle className="social-icon" />
            Login with Google
          </button>
          <button className="social-button github">
            <IconBrandGithub className="social-icon" />
            Login with GitHub
          </button>
        </div>

        <p className="switch-text">
          {isLogin ? (
            <>
              Don't have an account? 
              <button className="switch-link" onClick={() => setIsLogin(false)}> Signup</button>
            </>
          ) : (
            <>
              Already have an account? 
              <button className="switch-link" onClick={() => setIsLogin(true)}> Login</button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
