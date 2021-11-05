import Graph from "./Graph";
import { Stylesheet } from 'cytoscape';
import { graphStyle } from "./GraphStyle";

type OrderingGraphProps = {
    data: { nodes: nodeType[], edges: edgeType[] };
    orderObedienceShown: boolean;
};

const OrderingGraph = ({ data, orderObedienceShown }: OrderingGraphProps) => {
    const interEdgeStyle: Stylesheet = {
        selector: "edge[type='inter']",
        style: {
            label: orderObedienceShown ? "data(label)" : "",
            'text-margin-y': -15,
            "text-rotation": "autorotate",
        }
    }
    const stylesheet = [...graphStyle, interEdgeStyle];

    return (
        <Graph data={data} stylesheet={stylesheet} />
    );
}

export default OrderingGraph;
