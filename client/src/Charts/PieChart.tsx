import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis, PieSeries, Legend, Tooltip } from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';
import { Palette } from '@devexpress/dx-react-chart';
import { schemeCategory10 } from 'd3-scale-chromatic';

export type ChartDatapoint = {
    key: string;
    value: number;
}

type PieChartProps = {
    data: ChartDatapoint[];
    title: string;
};

const PieChart = ({ data, title }: PieChartProps) => {
    return (
        <Chart
            data={data}
        >
            <Palette scheme={schemeCategory10} />
            <PieSeries
                valueField="value"
                argumentField="key"
            />
            <Title text={title} />
            <Animation />
            <Legend />
            <EventTracker />
            <Tooltip />
        </Chart>
    );
}

export default PieChart;
