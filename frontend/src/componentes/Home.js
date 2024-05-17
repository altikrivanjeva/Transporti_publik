import React from "react";
//import { Link } from "react-router-dom";
import "./home.css"; // Make sure the path matches where you save your CSS file
//import bgImage from "./bg.png"; // Import the image

function Home() {
  return (
    <div className="home">
      <div className="search-container">
        <table>
          <tbody>
            <tr>
              <td>
                <label>Start Location:</label>
                <select>
                  <option value="location1">Location 1</option>
                  <option value="location2">Location 2</option>
                  <option value="location3">Location 3</option>
                </select>
              </td>
              <td>
                <label>End Location:</label>
                <select>
                  <option value="location1">Location 1</option>
                  <option value="location2">Location 2</option>
                  <option value="location3">Location 3</option>
                </select>
              </td>
              <td>
                <button className="search-button">Search</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default Home;
