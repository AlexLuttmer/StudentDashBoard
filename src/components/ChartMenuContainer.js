import ChartMenuComponent from "./ChartMenuComponent";

function ChartMenuContainer({
  setCurrentModule,
  setChartStyle,
  setSelectedStudents,
  selectedStudents,
  studentNames,
  studentLinks,
  menuOptions,
}) {
  
  // Menu User Input Handler
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "module") {
      setCurrentModule(parseInt(value));
    } else if (name === "chart-style") {
      setChartStyle(value);
    } else if (name === "student-select") {
      if (selectedStudents.includes(value)) {
        setSelectedStudents((prevSelectedStudents) =>
          prevSelectedStudents.filter((student) => student !== value)
        );
      } else {
        setSelectedStudents((prevSelectedStudents) => [
          ...prevSelectedStudents,
          value,
        ]);
      }
    } else if (name === "check-all-btn") {
      if (selectedStudents.length === studentNames.length) {
        setSelectedStudents([]);
      } else {
        setSelectedStudents(studentNames);
      }
    }
  }

  return (
    <ChartMenuComponent
      handleChange={handleChange}
      studentNames={studentNames}
      selectedStudents={selectedStudents}
      studentLinks={studentLinks}
      menuOptions={menuOptions}
    />
  );
}

export default ChartMenuContainer;
