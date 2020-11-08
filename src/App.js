import axios from 'axios';
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=100&nat=us")
      .then(({ data }) => {
        setUsers(data.results)
        setFilteredUsers(data.results)
      });
  }, []);

  const handleFilter = val => {
    //get a filtered array based on users array and the typed val
    const filtered = users.filter(user => {
      return user.name.first.toLowerCase().includes(val) || user.name.last.toLowerCase().includes(val) || user.phone.includes(val)
    });
    //set the users state to the filtered array of values
    setFilteredUsers(filtered)
  }


  return (
    <>
      <div className="jumbotron">
        <h1 style={{ textAlign: "center" }}>Employee Directory</h1>
      </div>
      <input onChange={(event) => handleFilter(event.target.value.toLowerCase())} className="form-control mb-5" style={{ margin: "auto", width: "50%" }} placeholder="Search an employee" />
      <div className="container">
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => <tr>
              <th scope="row"><img src={user.picture.thumbnail} /></th>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
