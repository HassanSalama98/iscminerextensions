import { useEffect } from "react";
import React from "react";
import { fetchData, fetchOrderISC, fetchOrderSummary } from "./populateGraph";
import NonConcurrentGraph from "./Graphs/NonConcurrentGraph";
import Sidebar from "./Sidebar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


type NonConcurrentGraphDisplayProps = {
    sidebarOpen: boolean;
    marginLeft: number;
};

const NonConcurrentGraphDisplay = ({ sidebarOpen, marginLeft }: NonConcurrentGraphDisplayProps) => {
    const [graphData, setGraphData] = React.useState<{ nodes: nodeType[], edges: edgeType[] }>({ nodes: [], edges: [] });
    const [interedges, setInteredges] = React.useState<edgeType[]>([]);

    useEffect(() => {
        fetchOrderISC().then((dt: edgeType[] | undefined) => {
            if (dt === undefined) {
                throw Error();
            }
            setInteredges(dt);
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

    const style = {
        backgroundColor: "#f5f6fe",
        marginLeft: marginLeft,
        height: 'calc(100vh - 64px)',
    };

    return (
        <div style={style}>
            <Sidebar open={sidebarOpen}>
                <FormControlLabel control={<Checkbox />} label="Show Conc" />
            </Sidebar>
            <NonConcurrentGraph data={graphData} />
        </div>
    );
}

export default NonConcurrentGraphDisplay;
