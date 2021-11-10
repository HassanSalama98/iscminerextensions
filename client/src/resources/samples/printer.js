
export const index = "Start Flyer,receive flyer order,design flyer,send draft to customer,print flyer,deliver flyer,End Flyer%Start Billing,write bill,print bill,deliver bill,End Billing%Start Poster,receive order and photo,design photo poster,print poster,deliver poster,End Poster";

export const kpi = {
    "deliver flyer/deliver bill": 100.0,
    "deliver poster/deliver bill": 96.44,
    "design photo poster/print bill": 99.89,
    "print flyer/deliver bill": 100.0,
    "receive flyer order/write bill": 100.0,
    "receive order and photo/write bill": 100.0,
    "write bill/design photo poster": 100.0
};

export const orderSummary = {
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
}

export const orderPie = {
    'deliver flyer/deliver bill': 900,
    'deliver poster/deliver bill': 868,
    'design photo poster/print bill': 899,
    'print flyer/deliver bill': 900,
    'receive flyer order/write bill': 900,
    'receive order and photo/write bill': 900,
    'write bill/design photo poster': 900
}

export const nonConPie = {
    'deliver poster/deliver bill': 893,
    'print bill/deliver poster': 1770,
    'print bill/design flyer': 2057,
    'print poster/print bill': 944,
    'send draft to customer/print bill': 2176
};

export const nonConKPI = {
   'deliver poster/deliver bill': ['23:59:00'],
    'print bill/deliver poster': ['19:32:00.130734', '17:12:01.846154'],
    'print bill/design flyer': ['1 day, 9:50:45.064463', '18:38:24.380165'],
    'print poster/print bill': ['12:57:08.377778', '14:40:52.673302'],
    'send draft to customer/print bill': ['12:31:27.929043', '1 day, 21:46:29.536307']
}

export const pairAllocation = {
   'deliver poster/deliver bill': [100, 0],
    'print bill/deliver poster': [97.105, 2.895],
    'print bill/design flyer': [41.667, 58.333],
    'print poster/print bill': [5.006, 94.994],
    'send draft to customer/print bill': [38.599, 61.401]
}