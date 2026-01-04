
import React from "react";
import UserTable from "./UserTable";
import { mockClients } from "../types/mock-data/mockClients";
import { Client } from "../types/Client";

const UsersPage: React.FC = () => {
  const users: Client[] = mockClients; // later replace with API

  const handleAction = (client: Client) => {
    console.log("Action clicked for:", client.orgName);
  };

  return (
    <div className="p-4">
      <h3 className="mb-3">Clients</h3>

      <UserTable
        users={users}
        showAction={false} // or true if needed
      />
    </div>
  );
};

export default UsersPage;
