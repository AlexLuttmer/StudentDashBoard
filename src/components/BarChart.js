import { GetWindowSize, GetChartStylingVariables } from "../utils/chart_utils";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryGroup, VictoryLegend, VictoryTheme, VictoryLabel } from "victory";

function BarChart({ chartData }) {

  // Chart Sizing Variables
  const { windowWidth, windowHeight } = GetWindowSize();
  const { chartFontSize, barWidth, barOffset, legendFontSize } = GetChartStylingVariables();

  // Chart Legend / "No Students Selected" Indicator
  let legendText;
  let xAxisColour;
  if (chartData.length === 0) {
    legendText = [{ name: "No Students Selected!", symbol: { fill: "black" } }];
    xAxisColour = "black";
  } else {
    legendText = [
      { name: "Difficulty Factor", symbol: { type: "square", fill: "yellow" } },
      { name: "Fun Factor", symbol: { type: "square", fill: "green" } },
    ];
    xAxisColour = "white";
  }

  return (
    <div className="chart_container">
      <VictoryChart
        theme={VictoryTheme.material}
        width={windowWidth * 1.8}
        height={windowHeight * 2.1}
        padding={{ bottom: 315, top: 50, left: 85, right: 50 }}
      >
        <VictoryAxis
          dependentAxis
          tickValues={["1", "2", "3", "4", "5"]}
          style={{
            tickLabels: {
              fontSize: chartFontSize,
              fill: "white",
              fontFamily: "Bahnschrift",
              fontStyle: "italic"
            },
            axis: {
              stroke: "white"
            }
          }}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              fontSize: chartFontSize,
              fill: xAxisColour,
              fontFamily: "Bahnschrift",
              fontStyle: "italic"
            },
            axis: {
              stroke: "white"
            }
          }}
          tickLabelComponent={<VictoryLabel angle={-25} textAnchor="end" />}
        />
        <VictoryGroup offset={barOffset}>
          <VictoryBar
            data={chartData}
            x="les_code"
            y="dif_fac"
            barWidth={barWidth}
            style={{ data: { fill: "yellow" } }}
          />
          <VictoryBar
            data={chartData}
            x="les_code"
            y="fun_fac"
            barWidth={barWidth}
            style={{ data: { fill: "green" } }}
          />
        </VictoryGroup>
      </VictoryChart>
      <div className="chart_legend">
        <VictoryLegend
          x={155}
          height={15}
          orientation="horizontal"
          data={legendText}
          style={{
            labels: {
              fontSize: legendFontSize,
              fontFamily: "Bahnschrift",
              fontStyle: "italic",
              fill: "white"
            },
            parent: {
              fill: "white"
            }
          }}
        />
      </div>
    </div>
  );
}

export default BarChart;
