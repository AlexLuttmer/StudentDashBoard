import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import ChartContainer from "./ChartContainer";
import ChartMenuContainer from "./ChartMenuContainer";

import { getStudentBarChartData, getStudentLineChartData } from "../utils/data_utils";

function StudentPage({ studentData, selectedStudents, setSelectedStudents, studentNames }) {

  // Menu Options State Variables
  const [currentModule, setCurrentModule] = useState(1);
  const [chartStyle, setChartStyle] = useState("bar");

  // Using Student Name as Parameter
  const { name } = useParams();

  // Links to Individual Student Pages
  const studentLinks = (
    <div className="student_button_container">
      <p className="menu_text">View Student<br />Data</p>
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
      return getStudentBarChartData(studentData, name, currentModule);
    } else if (chartStyle === "line") {
      return getStudentLineChartData(studentData, name, currentModule);
    }
  };

  // Menu Options Conditional Rendering Prop
  const menuOptions = "stu";

  return (
    <div className="main_page">
      <div className="display_container">
        <h1 className="chart_title">{name}'s Assessments</h1>
        <ChartContainer 
          chartStyle={chartStyle} 
          chartData={chartData} 
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

export default StudentPage;
