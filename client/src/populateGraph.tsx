import { parseGraphData, parseInterEdges, convertToKV, convertToKVV } from './dataparser';

export const fetchData = async (url: string = "/index") => {
    const res = "step1,step2,step3,step4,step5%step6,step7,step8,step9,step10%step11,step12,step13,step15";

    // return await fetch(url).then(res => res.text()).then(res => {
        return parseGraphData(res);
    // });
}

export const fetchOrderISC = async (url: string = "/KPI") => {
    const res: {[index: string]: number; }  = {
        "step6/step12": 100,
        "step1/step12": 82,
        "step4/step15": 21.4,
    };

    // return await fetch(url).then(res => res.json()).then(res => {
        return parseInterEdges(res);
    // });
}

export const fetchOrderSummary = async (url: string = "/OrderSummary") => {
    const res: { [index: string]: number } = {
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

    // return await fetch(url).then(res => res.json()).then(res => {
        return convertToKV(res)
    // });
}

export const fetchOrderPie = async (url: string = "/OrderPie") => {
    const res: { [index: string]: number } = {
        "a": 100,
        "b": 82,
        "c": 21.4,
    };

    // uncomment dis
    // return await fetch("/OrderPie").then(res => res.json()).then(res => {
        return convertToKV(res);
    // });
}



// NON CONCURURENT

export const fetchNonConData = async (url: string = "/NonConData") => {
    const res: { [index: string]: number } = {
        "a": 100,
        "b": 82,
        "c": 21.4,
    };

    // return await fetch(url).then(res => res.json()).then(res => {
        return convertToKV(res);
    // });
}

export const fetchNonConStackedData = async (url: string = "/NonConData") => {
    const res = {
        "a": [80, 20],
        "b": [30, 70],
        "c": [45, 55],
    };

    // return await fetch(url).then(res => res.json()).then(res => {
        return convertToKVV(res);
    // });
}