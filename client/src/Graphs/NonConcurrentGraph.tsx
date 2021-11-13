import { Stylesheet } from "cytoscape";
import Graph from "./Graph";
import { graphStyle } from "./GraphStyle";

type NonConcurrentGraphProps = {
    data: { nodes: nodeType[], edges: edgeType[] };
    executionDelayShown: boolean;
};

const NonConcurrentGraph = ({ data, executionDelayShown }: NonConcurrentGraphProps) => {
    const interEdgeStyle: Stylesheet = {
        selector: "edge[type='inter']",
        style: {
            label: executionDelayShown ? "data(label)" : "",
            'text-margin-y': -15,
            "text-rotation": "autorotate",
            'target-arrow-shape': 'none'
           // "arrow-": none
        }
    }
    const stylesheet = [...graphStyle, interEdgeStyle];

    return (
        <Graph data={data} stylesheet={stylesheet} />
    );
}

export default NonConcurrentGraph;
