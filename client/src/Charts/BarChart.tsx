import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { Animation, ArgumentScale, ScaleObject, ValueScale } from '@devexpress/dx-react-chart';



export type ChartDatapoint = {
    key: string;
    value: number;
}

type BarChartProps = {
    data: ChartDatapoint[];
    title: string;
};

const BarChart = ({ data, title }: BarChartProps) => {

    return (
        <Chart
            data={data}
        >
            <ArgumentAxis />
            <ValueAxis />
            
            <BarSeries
                valueField="value"
                argumentField="key"
            />
            <Title text={title} />
            <Animation />
        </Chart>
    );
}

export default BarChart;
