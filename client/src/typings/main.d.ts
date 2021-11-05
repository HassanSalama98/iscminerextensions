
interface nodeType {
    data: {
        id: string;
        parent: string;
        label: string;
        type: string;
    };
};

interface edgeType {
    data: {
        source: string;
        target: string;
        label: string;
    };
};