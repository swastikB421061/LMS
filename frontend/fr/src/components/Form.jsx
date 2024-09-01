import React, { useState } from "react";
import "./Form.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const DateForm = () => {
    
  const queryClient = useQueryClient();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const user = authUser;

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    purpose: "",
  });


  const { mutate } = useMutation({
    mutationFn: async ( {from,to,purpose} ) => {
      try {
        console.log({from,to,purpose});
        const res = await fetch(`/api/auth/update/${user._id}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({from,to,purpose}),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
      } catch (error) {
        throw new Error(data.error);
      }
    },
    onSuccess: () => {
      alert("applied");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });


  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formattedTomorrow = tomorrow.toISOString().split("T")[0];
  console.log(formattedTomorrow);


  const validateDates = () => {
    const { from, to } = formData;
    const fromdate = new Date(from);
    const todate = new Date(to);

    if (fromdate < tomorrow || todate < fromdate) {
          
          alert("Enter valid data");
          return false;
    }
    return true;
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);
    const error = validateDates();
    if(error){
        mutate(formData);
    }

    setFormData({
      from: "",
      to: "",
      purpose: "",
    });
  };

  return (
    <div className="formsub">
          <form onSubmit={handleSubmit} className="form-container">
     <div className="main-m">
     <div className="m1">
        <div className="form-group">
          <label htmlFor="from">From Date:</label>
          <input
            type="date"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="to">To Date:</label>
          <input
            type="date"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="m2">
        <div className="form-group">
          <label htmlFor="purpose">Purpose:</label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Enter the purpose"
            required
          />
        </div>
      </div>
     </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
    </div>
  
  );
};

export default DateForm;
