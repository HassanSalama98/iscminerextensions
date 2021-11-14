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
    let cyRef//: { current: Core | null; };

    const layout = {
        name: "breadthfirst",
        fit: true,
        directed: true,
        padding: 80,
        // spacingFactor: 1.5,
        animate: true,
        animationDuration: 800,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: true
    };

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
                    cyRef = cy;
                    cy.on('add', 'node', _evt => {
                        cy.layout(layout).run()
                        cy.fit()
                    })
                }}
        />
    );
}

export default Graph;
