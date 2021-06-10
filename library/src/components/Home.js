import React from "react";
import { fbauth } from "../firebase";
import Authors from "./Authors";
import Books from "./Books";

const Home = () => {
  return (
    <div>
      <Books />
      <Authors />
      <h1>Home</h1>
      <p>
        <button onClick={() => fbauth.signOut()}>SignOut</button>
      </p>
    </div>
  );
};
export default Home;
