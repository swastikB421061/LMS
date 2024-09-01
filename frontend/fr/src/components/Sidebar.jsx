import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  // Fetch authenticated user
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  // Check if user is authenticated
  const isAuthenticated = authUser !== undefined;
  
  // Logout mutation
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Logout failed");
        }
        console.log("Logout successful:", data.message);
      } catch (error) {
        console.error("Logout Error:", error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/"); // Redirect after logout
    },
  });

  // Handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    logout(); // Trigger mutation
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => setShow((prevShow) => !prevShow);

  return (
    <>
      {isAuthenticated && (
        <>
          <nav className={`sidebar ${show ? "show" : ""}`}>
            <div className="links">
              <TiHome onClick={() => navigate("/")} />
              <RiLogoutBoxFill onClick={handleLogout} />
            </div>
          </nav>

          <div className="wrapper">
            <GiHamburgerMenu className="hamburger" onClick={toggleSidebar} />
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
