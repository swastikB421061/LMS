import React, { useContext, useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [application, setapplication] = useState([]);
  const [message, setmessage] = useState("");
  const [info, setinfo] = useState({});
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/list");
        const data = await res.json();
        console.log(data);
        setapplication(data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ( {Lid, status,message} ) => {
      try {
        console.log({Lid,status,message});
        const res = await fetch(`/api/list/${Lid}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ status,message }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
      } catch (error) {
        throw new Error(data.error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
  });

  const handleUpdateStatus = async (Lid, status) => {
    if (status === "Pending") return;
    console.log(Lid,status,message);
    const form={
        Lid:Lid,
        status:status,
        message:message
    }
    mutate(form);

    //     try {
    //       const { data } = await axios.put(
    //         `http://localhost:4000/api/v1/application/update/${appointmentId}`,
    //         { status },
    //         { withCredentials: true }
    //       );
    //       setlist((prevlist) =>
    //         prevlist.map((application) =>
    //           application._id === appointmentId
    //             ? { ...application, status }
    //             : application
    //         )
    //       );
    //       toast.success(data.message);
    //     } catch (error) {
    //       toast.error(error.response.data.message);
    //     }
  };

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
  const admin = authUser;

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            {/* <img src="/doc.png" alt="docImg" /> */}
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>{admin && `${admin.username}`} </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Applications</p>
            <h3>{application.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Faculty</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Applications</h5>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {application && application.length > 0 ? (
                application.map((application) => (
                  <tr key={application._id}>
                    <td>{`${application.collegeID} ${application.fullName}`}</td>
                    <td>{application.from}</td>
                    <td>{application.to}</td>
                    <td>{application.purpose}</td>
                    <td>
                      <button className={info[application._id]?"afprev":"prev"} onClick={(e)=>{
              
                        e.preventDefault();
                        handle(application._id);
                      }}
                      >Add Message</button>
                      <select
                        className={
                          application.status === "Pending"
                            ? "value-pending"
                            : application.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={application.status}
                        onChange={(e) =>
                          handleUpdateStatus(application._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td>No Data</td></tr>
              )}
            </tbody>
          </table>

          {}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
