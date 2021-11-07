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
import FileUploadIcon from '@mui/icons-material/FileUpload';

enum View { Graph, Bar, Pie }

type OrderingGraphDisplayProps = {
    sidebarOpen: boolean;
    marginLeft: number;
};

const OrderingGraphDisplay = ({ sidebarOpen, marginLeft }: OrderingGraphDisplayProps) => {
    const [isDataUploaded, setIsDataUploaded] = React.useState(false);
    const [uploadType, setUploadType] = React.useState(-1);

    const [currentView, setCurrentView] = React.useState(View.Graph);

    const [graphData, setGraphData] = React.useState<{ nodes: nodeType[], edges: edgeType[] }>({ nodes: [], edges: [] });
    const [interedges, setInteredges] = React.useState<edgeType[]>([]);

    const [orderSummaryData, setOrderSummaryData] = React.useState<ChartDatapoint[]>([]);
    const [orderSummaryPie, setOrderSummaryPie] = React.useState<ChartDatapoint[]>([]);

    const [orderObedienceShown, setOrderObedienceShown] = React.useState(false);
    const toggleOrderObedienceShown = () => {
        setOrderObedienceShown(!orderObedienceShown);
    }

    useEffect(() => {
        if (uploadType === -1) {
            return;
        }
        // fetchOrderISC().then((dt: edgeType[]) => setInteredges(dt));
        fetchSampleOrderISC(uploadType).then((dt: edgeType[]) => setInteredges(dt));
        fetchSampleOrderBar(uploadType).then((dt: ChartDatapoint[]) => setOrderSummaryData(dt));
        fetchSampleOrderPie(uploadType).then((dt: ChartDatapoint[]) => setOrderSummaryPie(dt));
    }, [isDataUploaded, uploadType]);

    useEffect(() => {
        // fetchData().then((dt: { edges: any[]; nodes: any; }) =>
        //     setGraphData({ nodes: dt.nodes, edges: dt.edges.concat(interedges) })
        // );
        if (uploadType === -1 || interedges === []){
            return;
        }
         fetchSampleData(uploadType).then((dt: { edges: edgeType[]; nodes: nodeType[]; }) =>
             setGraphData({ nodes: dt.nodes, edges: dt.edges.concat(interedges) })
         );
    }, [isDataUploaded,interedges, uploadType]);

    useEffect(() => {
        setIsDataUploaded(window.localStorage.getItem('isDataUploaded') === "true");
    }, []);

    useEffect(() => {
        window.localStorage.setItem('isDataUploaded', isDataUploaded.toString());
    }, [isDataUploaded]);

    const style = {
        backgroundColor: "#f5f6fe",
        marginLeft: marginLeft,
        height: 'calc(100vh - 64px)',
    };

    const renderView = () => {
        switch (currentView) {
            case View.Graph:
                return <OrderingGraph data={graphData} orderObedienceShown={orderObedienceShown} />;

            case View.Bar:
                return <BarChart title={"Order Summary"} data={orderSummaryData} />;

            case View.Pie:
                return <PieChart title={"Order Pie"} data={orderSummaryPie} />;
        }
    }

    const UploadButton = () => {
        const handleUpload = (event: any) => {
            const data = new FormData();
            for (const file of event.target.files)
                data.append('file', file, file.name);

            console.log(data)

            fetch('/upload', {
                method: 'POST',
                body: data,
            }).then(response =>
                selectDatasource(0)
        )
        };

        return (
            <label htmlFor="contained-button-file">
                <Input inputProps={{ accept: ".xes", multiple: true }} onChange={handleUpload} id="contained-button-file" type="file" hidden style={{ display: "none" }} />
                <Button component="span">
                    Upload File <FileUploadIcon />
                </Button>
            </label>
        );
    }

    const selectDatasource = (_uploadType: number) => {
        setUploadType(_uploadType);
        setIsDataUploaded(true);
    }

    return (
        <div style={style}>
            <Sidebar open={sidebarOpen}>
                <ViewSelector currentView={currentView} setCurrentView={setCurrentView} />
                <div>
                    <Typography>Options</Typography>
                    <FormControlLabel control={<Checkbox checked={orderObedienceShown} onChange={toggleOrderObedienceShown} />} label="Show Obedience" />
                </div>
                <Divider />
                {/* <div style={{
                    display: "flex",
                    position: "fixed",
                    bottom: 0,
                    // textAlign: "center",
                    paddingBottom: 10,
                }}> */}
                    <Button onClick={() => selectDatasource(1)}>Load Sample1</Button>
                    <Button onClick={() => selectDatasource(2)}>Load Sample2</Button>
                    <UploadButton/>
                    {/* <Button onClick={() => setIsDataUploaded(false)}>Go to Upload</Button> */}
                {/* </div> */}
            </Sidebar>

            {!isDataUploaded ? <p>Press on upload in sidebar</p> : renderView()}
        </div>
    );
}

export default OrderingGraphDisplay;
