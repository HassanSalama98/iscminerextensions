import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
    Legend,
    Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import {Animation, EventTracker, Stack} from '@devexpress/dx-react-chart';

export type StackedChartDatapoint = {
    key: string;
    value1: number;
    value2: number;
}

type StackedChartProps = {
    data: StackedChartDatapoint[];
    title: string;
    name1: string;
    name2: string;
};

const StackedChart = ({ data, title, name1, name2 }: StackedChartProps) => {
    return (
        <Chart data={data} >
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
                name={name1}
                valueField="value1"
                argumentField="key"
            />
            <BarSeries
                name={name2}
                valueField="value2"
                argumentField="key"
            />

            <Stack
                stacks={[{ series: [name1, name2] }]}
            />

            <Title text={title} />
            <Animation />
            <Legend />
            <EventTracker />
            <Tooltip />
        </Chart>
    );
}

export default StackedChart;