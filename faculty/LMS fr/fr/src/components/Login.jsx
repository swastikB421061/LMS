import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const [form, setform] = useState({
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async ({ username, password }) => {
      // console.log(username,password);
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        console.log(res);

        if (!res.ok) {
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
        <p>Only Admins Are Allowed To Access These Resources!</p>
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
