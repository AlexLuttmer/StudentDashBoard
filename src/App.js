import { Routes, Route } from "react-router-dom";

import AveragesPage from "./components/AveragesPage";
import StudentPage from "./components/StudentPage";

import { studentData, studentNames } from "./data/student_data";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AveragesPage studentData={studentData} studentNames={studentNames} />
        }
      />
      <Route
        path="/:name"
        element={
          <StudentPage studentData={studentData} studentNames={studentNames} />
        }
      />
    </Routes>
  );
}

export default App;
