import {useState, useEffect} from "react";
import { debounce } from "lodash";

// Using Window Size for Chart Dimensions
function GetWindowSize() {
  const [windowSize, setWindowSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }, 200); 

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// Using Window Size for Chart Inline Styling
function GetChartStylingVariables() {
    let { windowWidth } = GetWindowSize()
    
    let chartFontSize;
    let barWidth;
    let strokeWidth;
    let barOffset;
    let legendFontSize;

    if (windowWidth <= 1024) {
      chartFontSize = 26
      legendFontSize = 8;
      barWidth = 28
      strokeWidth = 6
      barOffset = 28
  } else if (windowWidth <= 1280) {
      chartFontSize = 26
      legendFontSize = 7;
      barWidth = 36
      strokeWidth = 10
      barOffset = 35
    } else if (windowWidth <= 1366) {
      chartFontSize = 30
      legendFontSize = 7;
      barWidth = 36
      strokeWidth = 12
      barOffset = 36
    } else if (windowWidth <= 1440) {
      chartFontSize = 34
      legendFontSize = 7.5;
      barWidth = 40
      strokeWidth = 14
      barOffset = 40
    } else {
      chartFontSize = 32
      legendFontSize = 5.5;
      strokeWidth = 14
      barWidth = 40
      barOffset = 40.25
    }

    return {chartFontSize, barWidth, strokeWidth, barOffset, legendFontSize}
}




export {GetWindowSize, GetChartStylingVariables}