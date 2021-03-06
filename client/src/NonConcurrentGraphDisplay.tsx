import { useEffect } from "react";
import React from "react";

import NonConcurrentGraph from "./Graphs/NonConcurrentGraph";
import Sidebar from "./Sidebar";
import PieChart, { ChartDatapoint } from "./Charts/PieChart";
import StackedChart, { StackedChartDatapoint } from "./Charts/StackedChart";
import ViewSelector from "./ViewSelector";
import { getGraphData, getNonConISC, getNonConPie, getNonConStackedData } from "./populateGraph";
import { Typography, FormControlLabel, Checkbox, Divider } from "@mui/material";

enum View { Graph, Bar, Pie }

type NonConcurrentGraphDisplayProps = {
    sidebarOpen: boolean;
    marginLeft: number;
};

const NonConcurrentGraphDisplay = ({ sidebarOpen, marginLeft }: NonConcurrentGraphDisplayProps) => {
    const [uploadType, setUploadType] = React.useState(parseInt(window.sessionStorage.getItem('uploadType') ?? "-1"));

    const [currentView, setCurrentView] = React.useState(View.Graph);

    const [graphData, setGraphData] = React.useState<{ nodes: nodeType[], edges: edgeType[] }>({ nodes: [], edges: [] });
    const [interedges, setInteredges] = React.useState<edgeType[]>([]);

    const [chartData, setChartData] = React.useState<ChartDatapoint[]>([]);
    const [stackedChartData, setStackedChartData] = React.useState<StackedChartDatapoint[]>([]);

    const [executionDelayShown, setExecutionDelayShown] = React.useState(false);
    const toggleExecutionDelayShown = () => setExecutionDelayShown(!executionDelayShown);

    useEffect(() => {
        if (uploadType !== -1) {
            getNonConISC(uploadType).then((dt: edgeType[]) => setInteredges(dt));
            getNonConPie(uploadType).then((dt: ChartDatapoint[]) => setChartData(dt));
            getNonConStackedData(uploadType).then((dt: StackedChartDatapoint[]) => setStackedChartData(dt));
        }
    }, [uploadType]);

    useEffect(() => {
        if (uploadType !== -1 && interedges !== []) {
            getGraphData(uploadType).then((dt: { edges: any[]; nodes: any; }) =>
                setGraphData({ nodes: dt.nodes, edges: dt.edges.concat(interedges) })
            );
        }
    }, [uploadType, interedges]);

    useEffect(() => {
        if (uploadType !== -1) {
            window.localStorage.setItem('uploadType', uploadType.toString());
        }
    }, [uploadType]);

    const renderView = () => {
        switch (currentView) {
            case View.Graph:
                return <NonConcurrentGraph data={graphData} executionDelayShown={executionDelayShown} />;

            case View.Bar:
                return <StackedChart title={"Pair Allocation"} data={stackedChartData} name1="A -> B" name2="B -> A" />;

            case View.Pie:
                return <PieChart title={"Number of Executions Per ISC"} data={chartData} />;
        }
    }

    const selectDatasource = (_uploadType: number) => {
        setUploadType(_uploadType);
    }

    const style = {
        backgroundColor: "#f5f6fe",
        marginLeft: marginLeft,
        height: 'calc(100vh - 64px)',
    };

    return (
        <div style={style}>
            <Sidebar open={sidebarOpen} selectDatasource={selectDatasource}>
                <ViewSelector currentView={currentView} setCurrentView={setCurrentView} />
                <div>
                    <Typography>Options</Typography>
                    <FormControlLabel control={<Checkbox checked={executionDelayShown} onChange={toggleExecutionDelayShown} />} label="Show Execution Delay" />
                </div>
                <Divider />
            </Sidebar>
            {uploadType === -1 ? <h4 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Select a sample or upload new files in sidebar</h4> : renderView()}
        </div>
    );
}

export default NonConcurrentGraphDisplay;




