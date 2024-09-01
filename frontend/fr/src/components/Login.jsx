import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const [form, setform] = useState({
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async ({ username:collegeID, password }) => {
      // console.log(username,password);
      try {
        const res = await axios.post("/api/auth/login", 
         { collegeID, password },
        );
        
        console.log(res);

        if (res.error) {
          Swal.fire({
            icon: "error",
            title: "Invalid id or password",
            showConfirmButton: false,
            timer: 1500,
          });
          throw new Error(data.error);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      console.log("here");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {},
  });

  const handleInput = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <>
      <section className="container form-component">
        {/* <img src="/logo.png" alt="logo" className="logo" /> */}
        <h1 className="form-title">WELCOME TO IIIT Bh</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleInput}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">{isPending ? "Loading..." : "Login"}</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
