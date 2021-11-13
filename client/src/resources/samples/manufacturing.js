
export const index = "start_GetMT45State,Check State5,end_GetMT45State%start_GV12TurnMachining,Correct Queue3,Fetch3,end_GV12TurnMachining%start_GV12TurnProduction,Detection Machining8,Machining8,end_GV12TurnProduction%start_MT45AuxOn,Set7,Check State7,end_MT45AuxOn%start_MT45Clamp2Open,Set6,Check State6,end_MT45Clamp2Open%start_MT45DoorClose,Set4,Check State4,end_MT45DoorClose%start_MT45ModeAuto,Set2,Check State2,end_MT45ModeAuto%start_MT45NCStart,Set1,Check State1,end_MT45NCStart%start_SpawnGV12Production,GV12 Turn9,Signal Machining End9,Manually Measure9,Measure with MicroVu9,end_SpawnGV12Production";

export const kpi = {
   'Check State1/Fetch3': 19.33,
  'Check State2/Set4': 68.31,
  'Check State4/Set1': 0.0,
  'Check State6/Measure with MicroVu9': 48.86
};

export const orderSummary = {
  'Total': 4,
  'Check State1': 1,
  'Fetch3': 1,
  'Check State2': 1,
  'Set4': 1,
  'Check State4': 1,
  'Set1': 1,
  'Check State6': 1,
  'Measure with MicroVu9': 1
};

export const orderPie = {
    'Check State1/Fetch3': 87,
  'Check State2/Set4': 83,
  'Check State4/Set1': 1016,
  'Check State6/Measure with MicroVu9': 86

};

export const nonConPie = {
     "Check State1/Machining8": 90
};

export const nonConKPI = {
    "Check State1/Machining8": ["0:00:00.244444"]
};

export const pairAllocation = {
  "Check State1/Machining8": [100, 0]
};