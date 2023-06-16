// Data Filter and Splitter Functions

function filterByModule(data, module_number) {
  return data.filter((lesson) => {
    if (module_number === 2) {
      return lesson.les_code === "SCRUM" || lesson.les_code.startsWith("W2");
    } else if (
      module_number === 4 &&
      (lesson.les_code.startsWith("W4") ||
        lesson.les_code.startsWith("W5") ||
        lesson.les_code.startsWith("W6"))
    ) {
      return lesson;
    } else if (lesson.les_code.startsWith("W" + module_number)) {
      return lesson;
    } else {
      return null
    }
  });
}

function filterByStudent(data, student_name) {
  return data.filter((lesson) => {
    return lesson.stu_name === student_name;
  });
}

function splitByLesson(data) {
  const lessonCodeSet = new Set();
  data.forEach((entry) => {
    lessonCodeSet.add(entry.les_code);
  });
  return Array.from(lessonCodeSet).map((code) => {
    return data.filter((entry) => entry.les_code === code);
  });
}

// Averages Calculator

function calcAverages(data) {
  const averagesArray = data.map((lessonArray) => {
    const funAverage =
      lessonArray
        .map((entry) => entry.fun_fac)
        .reduce((total, currentValue) => total + currentValue, 0) /
      lessonArray.length;
    const difAverage =
      lessonArray
        .map((entry) => entry.dif_fac)
        .reduce((total, currentValue) => total + currentValue, 0) /
      lessonArray.length;
    const { les_code } = lessonArray[0];
    return {
      les_code,
      dif_avg: difAverage,
      fun_avg: funAverage,
    };
  });
  return averagesArray;
}

// Chart Data Getter Functions

function getStudentBarChartData(data, student_name, module_number) {
  let moduleData = filterByModule(data, module_number);
  let studentData = filterByStudent(moduleData, student_name);
  let chartData = studentData.map((entry) => {
    return {
      les_code: entry.les_code,
      dif_fac: entry.dif_fac,
      fun_fac: entry.fun_fac,
    };
  });
  return chartData;
}

function getStudentLineChartData(data, student_name, module_number) {
  let moduleData = filterByModule(data, module_number);
  let studentData = filterByStudent(moduleData, student_name);
  let lessonCodes = [];
  let difFactors = [0];
  let funFactors = [0];
  studentData.forEach((entry) => {
    lessonCodes.push(entry.les_code);
    difFactors.push(entry.dif_fac + 1);
    funFactors.push(entry.fun_fac + 1);
  });
  return {
    les_codes: lessonCodes,
    dif_fac: difFactors,
    fun_fac: funFactors,
  };
}

function getAveragesLineChartData(data, selectedStudents, module_number) {
  const moduleData = filterByModule(data, module_number);
  const selectedData = moduleData.filter((entry) =>
    selectedStudents.includes(entry.stu_name)
  );
  const selectionAverages = calcAverages(splitByLesson(selectedData));
  const lessonCodes = [];
  const difFactors = [null];
  const funFactors = [null];
  selectionAverages.forEach((entry) => {
    lessonCodes.push(entry.les_code);
    difFactors.push(parseFloat(entry.dif_avg.toFixed(2)) + 1);
    funFactors.push(parseFloat(entry.fun_avg.toFixed(2)) + 1);
  });
  const xAxisValues =
    selectedStudents.length === 0 ? [""] : lessonCodes
  return {
    les_codes: xAxisValues,
    dif_fac: difFactors,
    fun_fac: funFactors,
  };
}

function getAveragesBarChartData(data, selectedStudents, module_number) {

  const moduleData = filterByModule(data, module_number);
  const selectedData = moduleData.filter((entry) =>
    selectedStudents.includes(entry.stu_name)
  );
  const datasplitByLesson = splitByLesson(selectedData);
  const selectionAverages = calcAverages(datasplitByLesson);
  const chartData = selectionAverages.map((entry) => ({
    les_code: entry.les_code,
    dif_fac: parseFloat(entry.dif_avg.toFixed(2)),
    fun_fac: parseFloat(entry.fun_avg.toFixed(2)),
  }));
  return chartData;
}

export {
  getStudentBarChartData,
  getStudentLineChartData,
  getAveragesLineChartData,
  getAveragesBarChartData,
};
