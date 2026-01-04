import React, { useEffect, useState } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: string;
  password?: string;
  passwordConfirmed?: boolean;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div className="p-4">No user data found. Please login.</div>;
  }

  return (
    <div className="profile-page p-4">
      <h3>Profile Information</h3>
      <div className="card shadow p-3 mt-3">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default Profile;
