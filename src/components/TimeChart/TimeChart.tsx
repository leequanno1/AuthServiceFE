import { useMemo } from "react";
import { ChartPoint } from "../../entities/chart-point";
import ReactECharts, { EChartsOption } from "echarts-for-react";

interface TimeAreaChartProps {
  data: ChartPoint[];
  chartHeight?: string | number;
  xName?: string; // Tên cho trục X (tùy chọn)
  yName?: string; // Tên cho trục Y (tùy chọn)
}

const TimeAreaChart: React.FC<TimeAreaChartProps> = ({
  data,
  chartHeight = '400px',
  xName, // Nhận prop xName
  yName, // Nhận prop yName
}) => {
  const formattedData = useMemo(() => {
    return data.map(item => [item.time, item.value]);
  }, [data]);

  const options:EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const param = params[0];
        const date = new Date(param.value[0]);
        const timeString = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        // Sử dụng yName trong tooltip nếu có, nếu không thì dùng tên mặc định
        const seriesName = yName || 'Giá trị';
        return `${timeString}<br /><strong>${seriesName}: ${param.value[1]}</strong>`;
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      name: xName, // Gán tên cho trục X
      nameLocation: 'middle', // Vị trí của tên trục
      nameGap: 30, // Khoảng cách từ tên đến trục
      axisLabel: {
        formatter: (value: number) => {
          const date = new Date(value);
          return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });
        },
      },
    },
    yAxis: {
      type: 'value',
      name: yName, // Gán tên cho trục Y
      nameLocation: 'middle',
      nameGap: 50,
      axisLabel: {
        formatter: '{value}',
      },
      minInterval: 1,
    },
    series: [
      {
        name: yName || 'Dữ liệu', // Dùng yName cho tên series để nhất quán
        type: 'line',
        areaStyle: {},
        // smooth: true,
        data: formattedData,
        emphasis: {
          focus: 'series',
        },
      },
    ],
  };

  return (
    <div className="chart-wrapper">
        <ReactECharts
      option={options}
      style={{ height: chartHeight, width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
    />
    </div>
  );
};

export default TimeAreaChart;
