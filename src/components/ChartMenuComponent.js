import { Link } from "react-router-dom";

function ChartMenuComponent({
  handleChange,
  studentNames,
  selectedStudents,
  studentLinks,
  menuOptions,
}) {

  // Include/Exclude Students from Averaging Checkboxes
  const studentCheckBoxes =
    menuOptions === "avg" ? (
      <div className="student_checkbox_container">
        <p className="menu_text">
          Include/Exclude
          <br />
          Students
        </p>
        <ul className="student_checkbox_ul">
          {studentNames.map((student) => (
            <li className="student_checkbox_li" key={student}>
              <label>
                <input
                  type="checkbox"
                  name="student-select"
                  value={student}
                  onChange={handleChange}
                  checked={selectedStudents.includes(student)}
                />
                {student}
              </label>
            </li>
          ))}
        </ul>
      </div>
    ) : null;
  
  // Check/Uncheck All Student Checkboxes Button
  const checkAllBtn =
    menuOptions === "avg" ? (
      <button className="check_all_btn" name="check-all-btn" onClick={handleChange}>
        Check/Uncheck All
      </button>
    ) : null;  
  
  // Back To Averages Page Button
  const backBtn =
    menuOptions === "stu" ? (
      <button className="back_btn">
        <Link to="/">Back to Averages</Link>
      </button>
    ) : null;
  
  // Menu Options Conditional Styling
  const listOptions =
    menuOptions === "avg" ? "menu_names_container_avg" : "menu_names_container_stu";

  return (
    <div  className="menu_container">
      <div className="menu_dropdown_container">
      <h1 className="menu_title">Chart Menu</h1>
        <p className="menu_text">Select Module</p>
        <select className="menu_dropdown" name="module" onChange={handleChange}>
          <option value="1">Module 1</option>
          <option value="2">Module 2</option>
          <option value="3">Module 3</option>
          <option value="4">Module 4/5/6</option>
        </select>
        <p className="menu_text">Select Chart Style</p>
        <select
          className="menu_dropdown"
          name="chart-style"
          onChange={handleChange}
        >
          <option value="bar">Bar chart</option>
          <option value="line">Line chart</option>
        </select>
      </div>
      <div className={listOptions}>
        {studentCheckBoxes}
        {studentLinks}
      </div>
      <div className="bottom_btn_container">
        {backBtn}
        {checkAllBtn}
      </div>
    </div>
  );
}

export default ChartMenuComponent;
