import React from 'react'
import Welcome from '../Common/Welcome'
import { Chart } from "react-google-charts";
export default function Dashboard() {

  const data = [
    ["Hritik", "Baliram", "Abhishek", "Profit"],
    ["2020", 1000, 100, 200],
    ["2021", 1170, 460, 250],
    ["2022", 660, 5, 300],
    ["2023", 1030, 540, 350],
  ];
 var date =  new Date().toString().split(" ")

  const options = {
    chart: {
      title: "Appointments Data",
      subtitle: `Appontments Overview from: Jan-2022 to ${date[1]}-${date[3]}`,
    },
  };
  return (
    <>
      <Welcome>
          <div className="row">
             <h2>Dashboard</h2>
             <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={data}
                options={options}
              />
          </div>
      </Welcome>
    </>
  )
}
