import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  avatar: string;
}
function Home() {
  const [users, setUsers] = useState<User[]>([]);
   useEffect(() => {
     axios
       .get<{ users: User[] }>("/api/users")
       .then((response) => {
         setUsers(response.data.users);
       })
       .catch((error) => {
         console.log(error);
       });
   }, []);
  return (
    <div >
      Home
      <Link to="/login">登入</Link>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <div>{user.name}</div>
            <div>{user.age}</div>
            <div>{user.email}</div>
            <img src={user.avatar} alt={user.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
