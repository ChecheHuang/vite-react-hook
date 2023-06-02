import React, { useState, useEffect } from "react";
import axios from "axios";

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
