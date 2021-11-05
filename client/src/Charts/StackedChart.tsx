import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Animation, Stack } from '@devexpress/dx-react-chart';

export type ChartDatapoint = {
    key: string;
    value1: number;
    value2: number;
}

type StackedChartProps = {
    data: ChartDatapoint[];
    title: string;
    name1: string;
    name2: string;
};

const StackedChart = ({ data, title, name1, name2 }: StackedChartProps) => {
    const dd: ChartDatapoint[] = [
        {key: 'a', value1: 80, value2: 20},
        { key: 'b', value1: 30, value2: 70 },
        { key: 'c', value1: 40, value2: 60 },
    ];

    return (
        <Chart
            data={dd}
        >
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
                stacks={[
                { series: [name1, name2] },
                ]}
            />

            <Title text={title} />
            <Animation />
            <Legend />
        </Chart>
    );
}

export default StackedChart;