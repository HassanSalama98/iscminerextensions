function createNode(name: string, index: string, process: string, type: string) {
    return { data: { id: index, parent: process, label: name, type: type } };
}

export function createCompoundNode(name: string) {
    return createNode(name, name, "", "");
}

export function createBasicNode(name: string, process: string) {
    return createNode(name, name, process, "");
}

export function createEdge(name: string, node1: string, node2: string, type: string) {
    return { data: { source: node1, target: node2, label: name, type: type } };
}