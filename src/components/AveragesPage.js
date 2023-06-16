import { useState } from "react";
import { Link } from "react-router-dom";

import ChartContainer from "./ChartContainer";
import ChartMenuContainer from "./ChartMenuContainer";

import { getAveragesLineChartData, getAveragesBarChartData } from "../utils/data_utils";

function AveragesPage({ studentData, studentNames }) {

  // Menu Options State Variables
  const [currentModule, setCurrentModule] = useState(1);
  const [chartStyle, setChartStyle] = useState("bar");
  const [selectedStudents, setSelectedStudents] = useState(studentNames);

  // Links to Individual Student Pages
  const studentLinks = (
    <div className="student_button_container">
      <p className="menu_text">
        View Student
        <br />
        Data
      </p>
      <ul className="student_button_ul">
        {studentNames.map((student) => (
          <li key={student} className="student_button_li">
            <Link to={`/${student}`}>
              <button className="student_button">{student}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  
  // Chart Style Conditional Rendering
  const chartData = () => {
    if (chartStyle === "bar") {
      return getAveragesBarChartData(studentData, selectedStudents, currentModule);
    } else if (chartStyle === "line") {
      return getAveragesLineChartData(studentData, selectedStudents, currentModule);
    }
  };

  // Menu Options Conditional Rendering Prop
  const menuOptions = "avg";

  return (
    <div className="main_page">
      <div className="display_container">
        <h1 className="chart_title">Student Assessments Averages</h1>
        <ChartContainer
          chartData={chartData} 
          chartStyle={chartStyle} 
        />
      </div>
        <ChartMenuContainer
          setCurrentModule={setCurrentModule}
          setChartStyle={setChartStyle}
          setSelectedStudents={setSelectedStudents}

          selectedStudents={selectedStudents}
          studentNames={studentNames}
          studentLinks={studentLinks}
          
          menuOptions={menuOptions}
        />
    </div>
  );
}

export default AveragesPage;
