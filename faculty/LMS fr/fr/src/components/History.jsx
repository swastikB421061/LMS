import React, { useState } from 'react'
import {useQuery, useQueryClient } from "@tanstack/react-query";


const History = () => {
  const [application, setapplication] = useState([]);

  const {data}=useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/list/last");
        const data = await res.json();
        console.log(data);
        setapplication(data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false
  }
);
  return (
    <>
     <section className="dashboard page">
        <div className="banner">
          
        </div>
        <div className="banner">
          <h5>Previous Applications</h5>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Permission</th>
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
                    <td>{application.permission}</td>

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
  )
}

export default History