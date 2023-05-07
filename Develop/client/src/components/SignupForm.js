import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from "react-router-dom";
import { ADD_USER } from '../utils/mutations';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      console.log(data);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="card">
      <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
      <div className="card-body">
        {data ? (
          <p>
            Success! You may now head{' '}
            <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                className="form-control"
                placeholder="Enter your username"
                name="username"
                type="text"
                id="username"
                value={userFormData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input
                className="form-control"
                placeholder="Enter your email address"
                name="email"
                type="email"
                id="email"
                value={userFormData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input
                className="form-control"
                placeholder="Enter your password"
                name="password"
                type="password"
                id="pwd"
                value={userFormData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary btn-block"
            >
              Submit
            </button>
          </form>
        )}
        {error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
