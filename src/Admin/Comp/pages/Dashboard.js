import React from 'react'
import Welcome from '../Common/Welcome'
import { Chart } from "react-google-charts";
export default function Dashboard() {

  const data = [
    ["Task", "Hours per Day"],
    ["Success", 11],
    ["Pending", 2],
    ["Inprogress", 2],
  ];
 var date = new Date().toString().split(" ")
 const options = {
  title: "My Daily Activities",
  is3D: true,
};
  return (
    <>
      <Welcome>
          <div className="row">
             <h2>Dashboard</h2>
             <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
          </div>
      </Welcome>
    </>
  )
}
