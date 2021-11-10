import { useEffect } from "react";
import React from "react";

import BarChart, { ChartDatapoint } from "./Charts/BarChart";
import OrderingGraph from "./Graphs/OrderingGraph";
import Sidebar from "./Sidebar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PieChart from "./Charts/PieChart";
import Button from "@mui/material/Button";
import { Divider, Input, Typography } from "@mui/material";
import ViewSelector from "./ViewSelector";
import { fetchSampleData, fetchSampleOrderISC, fetchSampleOrderPie, fetchSampleOrderBar } from "./populateGraphSample";
import { fetchOrderISC, fetchOrderSummary, fetchOrderPie, fetchData } from "./populateGraph";

enum View { Graph, Bar, Pie }

type OrderingGraphDisplayProps = {
    sidebarOpen: boolean;
    marginLeft: number;
};

const OrderingGraphDisplay = ({ sidebarOpen, marginLeft }: OrderingGraphDisplayProps) => {
    const [uploadType, setUploadType] = React.useState(parseInt(window.sessionStorage.getItem('uploadType') ?? "-1"));

    const [currentView, setCurrentView] = React.useState(View.Graph);

    const [graphData, setGraphData] = React.useState<{ nodes: nodeType[], edges: edgeType[] }>({ nodes: [], edges: [] });
    const [interedges, setInteredges] = React.useState<edgeType[]>([]);

    const [orderSummaryData, setOrderSummaryData] = React.useState<ChartDatapoint[]>([]);
    const [orderSummaryPie, setOrderSummaryPie] = React.useState<ChartDatapoint[]>([]);

    const [orderObedienceShown, setOrderObedienceShown] = React.useState(false);
    const toggleOrderObedienceShown = () => setOrderObedienceShown(!orderObedienceShown);

    useEffect(() => {
        if (uploadType !== -1) {
            fetchSampleOrderISC(uploadType).then((dt: edgeType[]) => setInteredges(dt));
            fetchSampleOrderBar(uploadType).then((dt: ChartDatapoint[]) => setOrderSummaryData(dt));
            fetchSampleOrderPie(uploadType).then((dt: ChartDatapoint[]) => setOrderSummaryPie(dt));
        }
    }, [uploadType]);

    useEffect(() => {
        if (uploadType !== -1 && interedges !== []) {
            fetchSampleData(uploadType).then((dt: { edges: edgeType[]; nodes: nodeType[]; }) =>
                setGraphData({ nodes: dt.nodes, edges: dt.edges.concat(interedges) })
            );
        }
    }, [uploadType, interedges]);

    useEffect(() => {
        if (uploadType !== -1) {
            window.sessionStorage.setItem('uploadType', uploadType.toString());
        }
    }, [uploadType]);

    const renderView = () => {
        switch (currentView) {
            case View.Graph:
                return <OrderingGraph data={graphData} orderObedienceShown={orderObedienceShown} />;

            case View.Bar:
                return <BarChart title={"ISC Occurrences Per Activity"} data={orderSummaryData} />;

            case View.Pie:
                return <PieChart title={"Number of Executions Per ISC"} data={orderSummaryPie} />;
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
                    <FormControlLabel control={<Checkbox checked={orderObedienceShown} onChange={toggleOrderObedienceShown} />} label="Show Obedience" />
                </div>
                <Divider />
            </Sidebar>
            {uploadType === -1 ? <p>Press on upload in sidebar</p> : renderView()}
        </div>
    );
}

export default OrderingGraphDisplay;
