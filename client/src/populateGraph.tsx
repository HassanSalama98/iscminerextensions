import { createCompoundNode, createEdge, createBasicNode, splitInput, parseProcessConnection } from './util';

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
export const fetchData = async () => {
    let nodes: nodeType[] = [];
    let edges: edgeType[] = [];
     return await fetch("/printIndex").then(res => res.text()).then(res => {
        const m = res.split("%");
        for (let i = 0; i < m.length; ++i) {
            let events = splitInput(m[i]);
            let [ns, es] = drawProcess('p' + (i + 1), events);
            console.log(events)
            nodes = nodes.concat(ns);
            edges = edges.concat(es);
        }
        return { nodes: nodes, edges: edges };
     })

}
 export const fetchOrderISC = async () => {
    let edges: edgeType[] = [];

     return await fetch("/printKPI").then(res => res.json()).then(res => {
        for (const conn in res) {
            const kpi = res[conn];
            const [p1, p2] = parseProcessConnection(conn);
            const edge = createEdge("Order Obedience:" + kpi.toString() + "%", p1, p2, "inter");
            edges.push(edge);
        }
        return edges
     })
}
export const fetchOrderSummary = async () => {
     return await fetch("/printOrderSummary").then(res => {return res.json()});
}
export const fetchOrderPie = async () => {
    return await fetch("/printOrder").then(res => {return res.json()});

}
