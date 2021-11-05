import { Stylesheet } from "cytoscape";
import Graph from "./Graph";
import { graphStyle } from "./GraphStyle";

type NonConcurrentGraphProps = {
    data: { nodes: nodeType[], edges: edgeType[] };
};

const NonConcurrentGraph = ({ data }: NonConcurrentGraphProps) => {
    const interEdgeStyle: Stylesheet = {
        selector: "edge[type='inter']",
        style: {
            "target-arrow-shape": "none",
        }
    }
    const stylesheet = [...graphStyle, interEdgeStyle];

    return (
        <Graph data={data} stylesheet={stylesheet} />
    );
}

export default NonConcurrentGraph;
