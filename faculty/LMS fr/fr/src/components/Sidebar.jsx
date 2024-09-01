import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

import { MdHistory } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const isAuthenticated=authUser;
  const queryClient=useQueryClient();

  const {mutate}=useMutation({
    mutationFn:async()=>{
      try {
        const res=await fetch("/api/auth/logout",{
          method:"POST",
        })
        const data=await res.json();
        if(!res.ok){
          throw new Error(data.error || "Something went wrong");

        }

      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["authUser"]});
    }
  })

  const handleLogout = async (e) => {
      e.preventDefault();
      mutate();
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };

  const gotoHistory = () => {
    navigateTo("/history");
    setShow(!show);
  };

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <MdHistory onClick={gotoHistory} />

          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={(e) => 
          setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
