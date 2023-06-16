import { GetWindowSize, GetChartStylingVariables } from "../utils/chart_utils";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryGroup, VictoryLegend, VictoryTheme, VictoryLabel } from "victory";

function LineChart({ chartData }) {

  // Chart Sizing Variables
  const { windowWidth, windowHeight } = GetWindowSize();
  const { chartFontSize, strokeWidth, legendFontSize } = GetChartStylingVariables();

  // Chart Legend / "No Students Selected" Indicator
  let legendText;
  if (chartData.les_codes.length === 1) {
    legendText = [{ name: "No Students Selected!", symbol: { fill: "black" } }];
  } else {
    legendText = [
      { name: "Difficulty Factor", symbol: { fill: "yellow" } },
      { name: "Fun Factor", symbol: { fill: "green" } }
    ];
  }

  return (
    <div className="chart_container">
      <VictoryChart
        theme={VictoryTheme.material}
        width={windowWidth * 2.2}
        height={windowHeight * 2.4}
        padding={{ bottom: 315, top: 50, left: 80, right: 50 }}
      >
        <VictoryAxis
          dependentAxis
          tickValues={["", "1", "2", "3", "4", "5"]}
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
          tickValues={chartData.les_codes}
          style={{
            tickLabels: {
              fontSize: chartFontSize,
              fill: "white",
              fontFamily: "Bahnschrift"
            },
            axis: {
              stroke: "white"
            }
          }}
          tickLabelComponent={<VictoryLabel angle={-25} textAnchor="end" />}
        />
        <VictoryGroup>
          <VictoryLine
            data={chartData.dif_fac}
            style={{ data: { stroke: "yellow", strokeWidth: strokeWidth } }}
          />
          <VictoryLine
            data={chartData.fun_fac}
            style={{ data: { stroke: "green", strokeWidth: strokeWidth } }}
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

export default LineChart;
