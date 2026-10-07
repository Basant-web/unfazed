import {
  Search,
  UserPlus,
  MoreVertical,
  CalendarDays,
  FileText,
  X
} from "lucide-react";

import { useEffect, useState } from "react";

import "../css/clients.css";


function Clients({ onClientSelect }) {

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [sortBy, setSortBy] = useState("name");

  const [clients, setClients] = useState([]);

  const [unassignedClients, setUnassignedClients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showAddClient, setShowAddClient] = useState(false);

  const [assigningClient, setAssigningClient] = useState(null);


  // =================================
  // GET ASSIGNED CLIENTS
  // =================================

  async function getClients() {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/clients",
        {
          method: "GET",

          headers: {
            Authorization: token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setClients(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  }


  // =================================
  // GET UNASSIGNED CLIENTS
  // =================================

  async function getUnassignedClients() {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/clients/unassigned",
        {
          method: "GET",

          headers: {
            Authorization: token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setUnassignedClients(data);

    } catch (error) {

      console.log(error);

    }
  }


  // =================================
  // OPEN ADD CLIENT
  // =================================

  async function openAddClient() {

    setShowAddClient(true);

    await getUnassignedClients();

  }


  // =================================
  // ASSIGN CLIENT
  // =================================

  async function assignClient(clientId) {

    try {

      setAssigningClient(clientId);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/clients/${clientId}/assign`,
        {
          method: "PUT",

          headers: {
            Authorization: token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(
          data.message || "Unable to assign client"
        );

        return;
      }


      // Refresh client list

      await getClients();

      await getUnassignedClients();


    } catch (error) {

      console.log(error);

      alert("Unable to connect to server");

    } finally {

      setAssigningClient(null);

    }

  }



  // =================================
  // LOAD CLIENTS
  // =================================

  useEffect(() => {

    getClients();

  }, []);


  // =================================
  // SEARCH ASSIGNED CLIENTS
  // =================================

  const filteredClients = clients
  .filter((client) => {

    const matchesSearch = client.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      client.status === statusFilter;

    return matchesSearch && matchesStatus;

  })
  .sort((a, b) => {

    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "lastSession") {
      return new Date(b.lastSession || 0) -
             new Date(a.lastSession || 0);
    }

    return 0;
  });

  // =================================
  // CLIENT STATISTICS
  // =================================

  const activeClients = clients.filter(
    (client) => client.status === "active"
  );


  const newThisMonth = clients.filter((client) => {

    if (!client.createdAt) {
      return false;
    }

    const createdDate = new Date(
      client.createdAt
    );

    const currentDate = new Date();

    return (
      createdDate.getMonth() === currentDate.getMonth() &&
      createdDate.getFullYear() === currentDate.getFullYear()
    );

  });


  return (

    <section className="clientsPage">


      {/* =================================
          HEADER
      ================================= */}

      <div className="clientsHeader">

        <div>

          <p className="dashboardGreeting">
            Practice
          </p>

          <h1>
            Clients
          </h1>

          <p className="clientsSubtitle">
            Manage your clients and their therapy records.
          </p>

        </div>


        <button
          className="addClientButton"
          onClick={openAddClient}
        >

          <UserPlus />

          Add Client

        </button>

      </div>


      {/* =================================
          CLIENT SUMMARY
      ================================= */}

      <div className="clientStats">

        <div className="clientStatCard">

          <span>
            Total Clients
          </span>

          <strong>
            {clients.length}
          </strong>

        </div>


        <div className="clientStatCard">

          <span>
            Active Clients
          </span>

          <strong>
            {activeClients.length}
          </strong>

        </div>


        <div className="clientStatCard">

          <span>
            New This Month
          </span>

          <strong>
            {newThisMonth.length}
          </strong>

        </div>

      </div>


      {/* =================================
          CLIENT LIST
      ================================= */}

      <div className="clientsPanel">


        {/* SEARCH */}

        <div className="clientsToolbar">

          <div className="clientSearch">

            <Search />

            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />


          </div>
              <div className="drop">
         <select
  className="clientStatusFilter"
  value={statusFilter}
  onChange={(event) =>
    setStatusFilter(event.target.value)
  }
>
  <option value="all">All Status</option>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</select>

<select
  className="clientSortFilter"
  value={sortBy}
  onChange={(event) =>
    setSortBy(event.target.value)
  }
>
  <option value="name">Sort by Name</option>
  <option value="lastSession">Sort by Last Session</option>
</select>
</div>
        </div>


        {/* TABLE */}

        {!loading && (

          <div className="clientsTableWrapper">

            <table className="clientsTable">

              <thead>

                <tr>

                  <th>
                    Client
                  </th>

                  <th>
                    Contact
                  </th>

                  <th>
                    Sessions
                  </th>

                  <th>
                    Last Session
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Tags
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredClients.map((client) => (

                  <tr key={client._id}>


                    {/* CLIENT */}

                    <td>

                      <button
  className="clientNameButton"
  onClick={() => onClientSelect(client)}
>
  <div className="clientName">

    <div className="clientAvatar">
      {client.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
      }
    </div>

    <div>
      <strong>
        {client.name}
      </strong>

      <span>
        Client
      </span>
    </div>

  </div>
</button>

                    </td>


                    {/* CONTACT */}

                    <td>

                      <div className="clientContact">

                        <span>
                          {client.email}
                        </span>

                        <span>
                          {client.phone || "No phone number"}
                        </span>

                      </div>

                    </td>


                    {/* SESSIONS */}

                    <td>

                      <span className="sessionCount">
                        {client.sessions || 0}
                      </span>

                    </td>


                    {/* LAST SESSION */}

                    <td>

                      <span className="lastSession">

                        {client.lastSession || "No sessions"}

                      </span>

                    </td>

                    


                    {/* STATUS */}

                    <td>

                      <span
                        className={
                          client.status === "active"
                            ? "clientStatusActive"
                            : "clientStatusInactive"
                        }
                      >

                        {client.status === "active"
                          ? "Active"
                          : "Inactive"
                        }

                      </span>

                    </td>

                    <td>
  <div className="clientTags">
    {client.tags && client.tags.length > 0 ? (
      client.tags.map((tag, index) => (
        <span className="clientTag" key={index}>
          {tag.name}
        </span>
      ))
    ) : (
      <span className="noTags">No tags</span>
    )}
  </div>

                </td>


                    {/* ACTION */}

                    <td>

                      <button className="clientAction" onClick={() => onClientSelect(client)} >

                        <MoreVertical />

                      </button>

                    </td>



                  </tr>

                ))}


                {filteredClients.length === 0 && (

                  <tr>

                    <td
                      colSpan="6"
                      className="noClients"
                    >

                      No clients found.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =================================
          QUICK ACTIONS
      ================================= */}

      <div className="clientQuickActions">

        <button>

          <CalendarDays />

          Schedule Session

        </button>


        <button>

          <FileText />

          Create SOAP Note

        </button>

      </div>


      {/* =================================
          ADD CLIENT MODAL
      ================================= */}

      {showAddClient && (

        <div className="clientModalOverlay">

          <div className="clientModal">


            {/* MODAL HEADER */}

            <div className="clientModalHeader">

              <div>

                <h2>
                  Add Client
                </h2>

                <p>
                  Select a registered client to add to your practice.
                </p>

              </div>


              <button
                className="clientModalClose"
                onClick={() => setShowAddClient(false)}
              >

                <X />

              </button>

            </div>


            {/* CLIENT LIST */}

            <div className="unassignedClientList">


              {unassignedClients.length === 0 && (

                <div className="noUnassignedClients">

                  <UserPlus />

                  <h3>
                    No clients available
                  </h3>

                  <p>
                    There are no unassigned clients at the moment.
                  </p>

                </div>

              )}


              {unassignedClients.map((client) => (

                <div
                  className="unassignedClient"
                  key={client._id}
                >


                  <div className="unassignedClientInfo">

                    <div className="clientAvatar">

                      {client.name
                        .split(" ")
                        .map(word => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                      }

                    </div>


                    <div>

                      <strong>
                        {client.name}
                      </strong>

                      <span>
                        {client.email}
                      </span>

                    </div>

                  </div>


                  <button
                    className="assignClientButton"
                    disabled={assigningClient === client._id}
                    onClick={() =>
                      assignClient(client._id)
                    }
                  >

                    {assigningClient === client._id
                      ? "Adding..."
                      : "Add"
                    }

                  </button>


                </div>

              ))}


            </div>

          </div>

        </div>

      )}

    </section>

  );

}


export default Clients;