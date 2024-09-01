import React, { useContext, useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Form from "./Form";

const Dashboard = () => {

  const queryClient = useQueryClient();

   

 



  const handle=async(id)=>{
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Your Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
      showCancelButton: true,
      
    });
    if (text) {
      setinfo((prevState) => ({ ...prevState, [id]: true }));

      Swal.fire(text);
    }
    
    
    console.log(text);
    setmessage(text);
  }

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const user = authUser;

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            {/* <img src="/doc.png" alt="docImg" /> */}
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>{user && `${user.fullName}`} </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>permission status</p>
            <h3>{user.permission}</h3>
            <h5>{user.mess}</h5>
          </div>
          <div className="thirdBox">
            <p>Leave Period</p>
            <h3>{user.from}</h3>
            <p>to</p>
            <h3>{user.to}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Apply...</h5>
          <Form/>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
