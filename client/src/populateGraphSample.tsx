import {convertToKV, convertToKVV, parseGraphData, parseInterEdges, parseNonConInterEdges} from "./dataparser";
import { fetchData, fetchNonConData, fetchNonConStackedData, fetchOrderISC, fetchOrderPie, fetchOrderSummary } from "./populateGraph";
import * as printer from "./resources/samples/printer";
import * as manufacturing from "./resources/samples/manufacturing";


const getSampleDataURL = (sampleNr: number) => {
    return sampleNr === 1 ? "/index" : "";
}

export const fetchSampleData = async (sampleNr: number) => {
    var data;
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalIndex").then(res => res.text());
            break;
        }
        case 1: {
            data = manufacturing.index;
            break;
        }
        case 2: {
            data = printer.index;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return parseGraphData(data);
}

export const fetchSampleOrderISC = async (sampleNr: number) => {
    var data: { [index: string]: number; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalKPI").then(res => res.json());
            break;
        }
        case 1: {
            data = manufacturing.kpi;
            break;
        }
        case 2: {
            data = printer.kpi;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return parseInterEdges(data);
}

export const fetchSampleOrderBar = async (sampleNr: number) => {
    var data: { [index: string]: number; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalOrderSummary").then(res => res.json());
            break;
        }
        case 1: {
            data = manufacturing.orderSummary;
            break;
        }
        case 2: {
            data = printer.orderSummary;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return convertToKV(data);
}

export const fetchSampleOrderPie = async (sampleNr: number) => {
    var data: { [index: string]: number; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalOrderPie").then(res => res.json());
            break;
        }
        case 1: {
            data = manufacturing.orderPie;
            break;
        }
        case 2: {
            data = printer.orderPie;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return convertToKV(data);
}



// NON CONCURURENT
export const fetchSampleNonConPie = async (sampleNr: number) => {
    var data: { [index: string]: number; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalNonConPie").then(res => res.json());
            break;
        }
        case 1: {
            data = manufacturing.nonConPie;
            break;
        }
        case 2: {
            data = printer.nonConPie;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return convertToKV(data);
}
export const fetchSampleNonConISC = async (sampleNr: number) => {
    var data: { [index: string]: string[]; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalNonConKPI").then(res => res.json());
            break;
        }
        case 1: {
            data = manufacturing.nonConKPI;
            break;
        }
        case 2: {
            data = printer.nonConKPI;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return parseNonConInterEdges(data);
}
export const fetchSampleNonConStackedData = async (sampleNr: number) => {
    var data: { [index: string]: number[]; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalPairAllocation").then(res => res.json());
            break;
        }
        case 1: {
            data = manufacturing.pairAllocation;
            break;
        }
        case 2: {
            data = printer.pairAllocation;
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return convertToKVV(data);
}

