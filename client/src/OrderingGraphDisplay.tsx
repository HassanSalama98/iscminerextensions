import { useEffect } from "react";
import React from "react";

import { fetchData, fetchOrderISC, fetchOrderSummary, fetchOrderPie } from "./populateGraph";
import BarChart, { ChartDatapoint } from "./Charts/BarChart";
import OrderingGraph from "./Graphs/OrderingGraph";
import Sidebar from "./Sidebar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import StackedChart from "./Charts/StackedChart";
import PieChart from "./Charts/PieChart";

type OrderingGraphDisplayProps = {
    sidebarOpen: boolean;
    marginLeft: number;
};

const OrderingGraphDisplay = ({ sidebarOpen, marginLeft }: OrderingGraphDisplayProps) => {
    const [graphData, setGraphData] = React.useState<{ nodes: nodeType[], edges: edgeType[] }>({ nodes: [], edges: [] });
    const [interedges, setInteredges] = React.useState<edgeType[]>([]);

    useEffect(() => {
        fetchOrderISC().then((dt: edgeType[] | undefined) => {
            if (dt === undefined) {
                throw Error();
            }
            setInteredges(dt);
        });

        fetchOrderSummary().then((dt: { [index: string]: number } | undefined) => {
            if (dt === undefined) {
                throw Error();
            }
            const result = Object.entries(dt).map(([k, v]) => {
                return { 'key': k, 'value': v }
            });
            setOrderSummaryData(result);
        });

        fetchOrderPie().then((dt: { [index: string]: number } | undefined) => {
            if (dt === undefined) {
                throw Error();
            }
            const result = Object.entries(dt).map(([k, v]) => {
                return { 'key': k, 'value': v }
            });
            setOrderSummaryPie(result);
        });
    }, []);

    useEffect(() => {
        fetchData().then((dt: { edges: any[]; nodes: any; } | undefined) => {
            if (dt === undefined) {
                throw Error();
            }
            setGraphData({ nodes: dt.nodes, edges: dt.edges.concat(interedges) });
        });
    }, [interedges]);

    const [orderObedienceShown, setOrderObedienceShown] = React.useState(false);
    const [orderSummaryShown, setOrderSummaryShown] = React.useState(false);

    const [orderSummaryData, setOrderSummaryData] = React.useState<ChartDatapoint[]>([]);
    const [orderSummaryPie, setOrderSummaryPie] = React.useState<ChartDatapoint[]>([]);

    const toggleOrderObedienceShown = () => {
        setOrderObedienceShown(!orderObedienceShown);
    }

    const toggleOrderSummaryShown = () => {
        setOrderSummaryShown(!orderSummaryShown);
    }

    const style = {
        backgroundColor: "#f5f6fe",
        marginLeft: marginLeft,
        height: 'calc(100vh - 64px)', // header height 64
    };

    return (
        <div style={style}>
            <Sidebar open={sidebarOpen}>
                <FormControlLabel control={<Checkbox checked={orderObedienceShown} onChange={toggleOrderObedienceShown} />} label="Show Obedience" />
                <FormControlLabel control={<Checkbox checked={orderSummaryShown} onChange={toggleOrderSummaryShown} />} label="Show Summary" />
            </Sidebar>
            {orderSummaryShown
                ? 
                <div>
                    <div style={{ display: 'inline-block', width: '50%' }}>
                        <BarChart title={"Order Summary"} data={orderSummaryData} />
                    </div>
                    <div style={{ display: 'inline-block', width: '50%' }}>
                        <PieChart title={"Order Pie"} data={orderSummaryPie} />
                    </div>
                </div>
                // ? <BarChart title={"Order Summary"} data={orderSummaryData} />
                : <OrderingGraph data={graphData} orderObedienceShown={orderObedienceShown} />
            }
        </div>
    );
}

export default OrderingGraphDisplay;
