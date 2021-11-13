import { convertToKV, convertToKVV, parseGraphData, parseInterEdges, parseNonConInterEdges } from "./dataparser";
import * as printer from "./resources/samples/printer";
import * as manufacturing from "./resources/samples/manufacturing";


const getSampleDataName = (sampleNr: number) => {
    return sampleNr === 1 ? manufacturing : printer;
}

export const getGraphData = async (sampleNr: number) => {
    var data;
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalIndex").then(res => res.text());
            break;
        }
        case 1:
        case 2: {
            data = getSampleDataName(sampleNr).index;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return parseGraphData(data);
}

export const getOrderISC = async (sampleNr: number) => {
    var data: { [index: string]: number; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalKPI").then(res => res.json());
            break;
        }
        case 1:
        case 2: {
            data = getSampleDataName(sampleNr).kpi;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return parseInterEdges(data);
}

export const getOrderBar = async (sampleNr: number) => {
    var data: { [index: string]: number; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalOrderSummary").then(res => res.json());
            break;
        }
        case 1:
        case 2: {
            data = getSampleDataName(sampleNr).orderSummary;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return convertToKV(data);
}

export const getOrderPie = async (sampleNr: number) => {
    var data: { [index: string]: number; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalOrderPie").then(res => res.json());
            break;
        }
        case 1:
        case 2: {
            data = getSampleDataName(sampleNr).orderPie;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return convertToKV(data);
}



// NON CONCURURENT
export const getNonConPie = async (sampleNr: number) => {
    var data: { [index: string]: number; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalNonConPie").then(res => res.json());
            break;
        }
        case 1:
        case 2: {
            data = getSampleDataName(sampleNr).nonConPie;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return convertToKV(data);
}
export const getNonConISC = async (sampleNr: number) => {
    var data: { [index: string]: string[]; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalNonConKPI").then(res => res.json());
            break;
        }
        case 1:
        case 2: {
            data = getSampleDataName(sampleNr).nonConKPI;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return parseNonConInterEdges(data);
}
export const getNonConStackedData = async (sampleNr: number) => {
    var data: { [index: string]: number[]; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalPairAllocation").then(res => res.json());
            break;
        }
        case 1:
        case 2: {
            data = getSampleDataName(sampleNr).pairAllocation;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return convertToKVV(data);
}
