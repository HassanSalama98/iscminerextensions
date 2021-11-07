import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { Animation, ArgumentScale, ScaleObject, ValueScale } from '@devexpress/dx-react-chart';
import { scaleBand } from "@devexpress/dx-chart-core";
import { scaleLinear } from 'd3-scale';


export type ChartDatapoint = {
    key: string;
    value: number;
}

type BarChartProps = {
    data: ChartDatapoint[];
    title: string;
};

const BarChart = ({ data, title }: BarChartProps) => {

    // scaleLinear
    // var myscale = scaleLinear(); //.rangeRound([0, 30])
    // myscale.rangeRound([0, 30]);
    // myscale = myscale.domain([0, 10]);
    // const myscale = d3.scaleLinear().nice().tickFormat(d3.format("d"));

    return (
        <Chart
            data={data}
        >
            <ArgumentAxis />
            {/* <ValueScale factory={() => myscale}/> */}
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
