import React from "react";
import { Table } from "react-bootstrap";
import { Client } from "../types/Client";

import { Link } from "react-router-dom";

interface Props {
  users: Client[];
  showAction?: boolean;
  actionLabel?: string;
  onActionClick?: (client: Client) => void;
}

const UserTable: React.FC<Props> = ({ users, showAction, actionLabel, onActionClick }) => {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Organisation</th>
          <th>Email</th>
          <th>Client Type</th>
          {showAction && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {users.map((c) => (
          <tr key={c.id}>
            <td>
              <Link to={`/client-profile/${c.id}`} state={c}>
                {c.orgName}
              </Link>
            </td>
            <td>{c.contactEmail}</td>
            <td>{c.clientType}</td>

            {showAction && (
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onActionClick?.(c)}
                >
                  {actionLabel}
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
