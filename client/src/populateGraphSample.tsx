import { convertToKV, convertToKVV, parseGraphData, parseInterEdges } from "./dataparser";
import { fetchData, fetchNonConData, fetchNonConStackedData, fetchOrderISC, fetchOrderPie, fetchOrderSummary } from "./populateGraph";

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
        case 1:
        case 2: {
            data = "step1,step2,step3,step4,step5%step6,step7,step8,step9,step10%step11,step12,step13,step15";
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
        case 1:
        case 2: {
            data = {
                "step6/step12": 100,
                "step1/step12": 82,
                "step4/step15": 21.4,
            };
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
        case 1:
        case 2: {
            data = {
                "Total Number of ISC": 7,
                "Deliver Bill": 3,
                "Write Bill": 3,
                "Design Photo Poster": 2,
                "Deliver Flyer": 1,
                "Deliver Poster": 1,
                "Print Bill": 1,
                "Print Flyer": 1,
                "Receive Flyer Order": 1,
                "Receive Order and Photo": 1
            };
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
        case 1:
        case 2: {
            data = {
                "a": 100,
                "b": 82,
                "c": 21.4,
            };
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
        case 1:
        case 2: {
            data = {
                "a": 100,
                "b": 82,
                "c": 21.4,
            };
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return convertToKV(data);
}
export const fetchSampleNonConISC = async (sampleNr: number) => {
    var data: { [index: string]: number; };
    switch (sampleNr) {
        case -1:
            throw Error("datasource not selected");
        case 0: {
            data = await fetch("/generalNonConKPI").then(res => res.json());
            break;
        }
        case 1:
        case 2: {
            data = {
                "step6/step12": 100,
                "step1/step12": 82,
                "step4/step15": 21.4,
            };
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return parseInterEdges(data);
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
        case 1:
        case 2: {
            data = {
                "a": [80, 20],
                "b": [30, 70],
                "c": [45, 55],
            };
            break;
        }
        default:
            throw Error("invalid datasource");
    }

    return convertToKVV(data);
}