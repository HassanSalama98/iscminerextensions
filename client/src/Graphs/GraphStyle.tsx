import { Stylesheet } from "cytoscape"


const nodeStyle = {
    selector: "node",
    style: {
        backgroundColor: "white",
        width: 'label',
        height: 'label',
        label: "data(label)",
        padding: "10px",
        "overlay-padding": "6px",
        "text-valign": "center",
        "text-halign": "center",
        color: "black",
        fontSize: 20
    }
}

const selectedNodeStyle = {
    selector: "node:selected",
    style: {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "background-color": "#77828C",
        padding: "20px",
    }
}

const edgeStyle = {
    selector: "edge",
    style: {
        width: 2,
        "line-color": "#AAD8FF",
        "target-arrow-color": "#AAD8FF",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
    }
}

const interEdgeStyle = {
    selector: "edge[type='inter']",
    style: {
        "line-color": "red",
        "target-arrow-color": "red",
        "line-style": "dashed",
    }
}

const containerStyle = {
    selector: ":parent",
    style: {
        backgroundColor: "#4a56a6",
        "text-valign": "top",
    }
}

export const graphStyle = [
    nodeStyle,
    selectedNodeStyle,
    edgeStyle,
    interEdgeStyle,
    containerStyle
] as Stylesheet[];
