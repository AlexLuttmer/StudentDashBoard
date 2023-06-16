import BarChart from "./BarChart";
import LineChart from "./LineChart";

function ChartContainer({ chartData, chartStyle }) {

  // Chart Style Conditional Rendering
  const chartToDisplay = () => {
    if (chartStyle === "bar") {
      return <BarChart chartData={chartData()} />;
    } else if (chartStyle === "line") {
      return <LineChart chartData={chartData()} />;
    }
  };

  return <>{chartToDisplay()}</>;
}

export default ChartContainer;
