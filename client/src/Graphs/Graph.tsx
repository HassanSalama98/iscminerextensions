///<reference path="../typings/main.d.ts" />

import CytoscapeComponent from 'react-cytoscapejs';
import { Stylesheet } from 'cytoscape';

type GraphProps = {
    data: {
        nodes: nodeType[];
        edges: edgeType[];
    },
    stylesheet: Stylesheet[];
};

const Graph = ({ data, stylesheet }: GraphProps) => {
    let myCyRef;

    const layout = {
        name: "breadthfirst",
        fit: true,
        directed: true,
        padding: 80, // was 50
        // spacingFactor: 1.5,
        animate: true,
        animationDuration: 800,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: true
    };

    // const elem = {
    //     nodes: [
    //         { data: { id: "x", label: "X"} },
    //         { data: { id: "y", label: "Y" } },
    //         { data: { id: "m", label: "e" } },
    //     ],
    //     edges: [
    //         { data: { target: 'x', source: "y" } },
    //     ]
    // };

    return (
        <CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements(data)}
            // pan={{ x: 200, y: 200 }}
            style={{ width: "100%", height: "calc(100vh - 64px)" }}
            maxZoom={3}
            minZoom={0.1}
            boxSelectionEnabled={true}
            layout={layout}
            stylesheet={stylesheet}
                cy={cy => {
                    myCyRef = cy;
        
                    console.log("EVT", cy);
        
                    cy.on("tap", "node", (evt: { target: any; }) => {
                        var node = evt.target;
                        console.log("EVT", evt);
                        console.log("TARGET", node.data());
                        console.log("TARGET TYPE", typeof node[0]);
                    });
        
                    // TODO remove
                    cy.on('add', 'node', _evt => {
                        cy.layout(layout).run()
                        cy.fit()
                    })
                }}
        />
    );
}

export default Graph;