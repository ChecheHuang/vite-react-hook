import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  updateStart,
  updateSuccess,
  updateError,
} from "@/store/modules/tokenSlice";
import { useAppDispatch } from "@/store/hook";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  avatar: string;
}
function Home() {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const handleUpdate = async () => {
    dispatch(updateStart());
    try {
      dispatch(updateSuccess("token"));
    } catch (err) {
      dispatch(updateError());
    }
  };
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
    <div onClick={handleUpdate}>
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
