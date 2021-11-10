import { createBasicNode, createEdge, createCompoundNode } from "./util";


function splitInput(text: string) {
    return text.split(',');
}

function parseProcessConnection(connection: string) {
    var [p1, p2] = connection.split('/');
    return [p1, p2];
}

function drawProcess(processId: string, events: string[]): [nodeType[], edgeType[]] {
    let nodes: nodeType[] = events.map((e, i) => createBasicNode(e, processId));
    let edges: edgeType[] = [];
    var startNode = nodes[0].data.id;
    for (let i = 1; i < nodes.length; i++) {
        let endNode = nodes[i].data.id;
        edges.push(createEdge("", startNode, endNode, ""));
        startNode = endNode;
    }

    nodes.push(createCompoundNode(processId));
    return [nodes, edges];
}

export const parseGraphData = (res: string) => {
    let nodes: nodeType[] = [];
    let edges: edgeType[] = [];
    const m = res.split("%");
    for (let i = 0; i < m.length; ++i) {
        let events = splitInput(m[i]);
        let [ns, es] = drawProcess('p' + (i + 1), events);
        nodes = nodes.concat(ns);
        edges = edges.concat(es);
    }
    return { nodes: nodes, edges: edges };
}

export const parseInterEdges = (res: { [index: string]: number; }) => {
    let edges: edgeType[] = [];
    for (const conn in res) {
        const kpi = res[conn];
        const [p1, p2] = parseProcessConnection(conn);
        const edge = createEdge("Order Obedience:" + kpi.toString() + "%", p1, p2, "inter");
        edges.push(edge);
    }
    return edges;
}

export const parseNonConInterEdges = (res: { [index: string]: string[]; }) => {
    let edges: edgeType[] = [];
    for (const conn in res) {
        const kpi = res[conn];
        const [p1, p2] = parseProcessConnection(conn);
        const edge = createEdge("Execution Delay:" + kpi.toString(), p1, p2, "inter");
        edges.push(edge);
    }
    return edges;
}

export const convertToKV = (data: { [index: string]: number }) => {
    return Object.entries(data).map(([k, v]) => {
        return { 'key': k, 'value': v }
    });
}

export const convertToKVV = (data: { [index: string]: number[] }) => {
    return Object.entries(data).map(([k, [v1, v2]]) => {
        return { 'key': k, 'value1': v1, 'value2': v2 }
    });
}