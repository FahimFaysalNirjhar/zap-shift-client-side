import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user, LogOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInceptors = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;

      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);

        const statusCode = error?.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          LogOut()
            .then(() => {
              navigate("/login");
            })
            .catch((err) => console.error(err));
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInceptors);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, LogOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
