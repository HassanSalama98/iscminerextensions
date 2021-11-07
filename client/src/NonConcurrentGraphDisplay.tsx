import { useEffect } from "react";
import React from "react";

import { fetchData, fetchNonConData, fetchNonConStackedData, fetchOrderISC } from "./populateGraph";
import NonConcurrentGraph from "./Graphs/NonConcurrentGraph";
import Sidebar from "./Sidebar";
import PieChart, { ChartDatapoint } from "./Charts/PieChart";
import StackedChart, { StackedChartDatapoint } from "./Charts/StackedChart";
import ViewSelector from "./ViewSelector";

enum View { Graph, Bar, Pie }

type NonConcurrentGraphDisplayProps = {
    sidebarOpen: boolean;
    marginLeft: number;
};

const NonConcurrentGraphDisplay = ({ sidebarOpen, marginLeft }: NonConcurrentGraphDisplayProps) => {
    const [currentView, setCurrentView] = React.useState(View.Graph);

    const [graphData, setGraphData] = React.useState<{ nodes: nodeType[], edges: edgeType[] }>({ nodes: [], edges: [] });
    const [interedges, setInteredges] = React.useState<edgeType[]>([]);

    const [chartData, setChartData] = React.useState<ChartDatapoint[]>([]);
    const [stackedChartData, setStackedChartData] = React.useState<StackedChartDatapoint[]>([]);

    useEffect(() => {
        fetchOrderISC().then((dt: edgeType[]) => setInteredges(dt));

        fetchNonConData().then((dt: ChartDatapoint[]) => setChartData(dt));
        fetchNonConStackedData().then((dt: StackedChartDatapoint[]) => setStackedChartData(dt));
    }, []);

    useEffect(() => {
        fetchData().then((dt: { edges: any[]; nodes: any; }) =>
            setGraphData({ nodes: dt.nodes, edges: dt.edges.concat(interedges) })
        );
    }, [interedges]);

    const renderView = () => {
        switch (currentView) {
            case View.Graph:
                return <NonConcurrentGraph data={graphData} />;

            case View.Bar:
                return <StackedChart title={"1"} data={stackedChartData} name1="A" name2="B" />;

            case View.Pie:
                return <PieChart title={"2"} data={chartData} />;
        }
    }

    const style = {
        backgroundColor: "#f5f6fe",
        marginLeft: marginLeft,
        height: 'calc(100vh - 64px)',
    };

    return (
        <div style={style}>
            <Sidebar open={sidebarOpen}>
                <ViewSelector currentView={currentView} setCurrentView={setCurrentView} />
            </Sidebar>
            {renderView()}
        </div>
    );
}

export default NonConcurrentGraphDisplay;
