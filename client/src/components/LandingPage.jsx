import React from "react";
import { Link } from "react-router-dom";
import "../stayle/LandingPage.css"
export default function LandingPage() {
  return (
    <div className="landing">
      <div className="tituloLan">
        <h1>Bienvenidos</h1>
        <Link to="/home">
        <button>Home</button>
        </Link>
        </div>
    </div>
  );
}
