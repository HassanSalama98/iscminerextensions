
export const index = "Start Process 1,external5,Check State5,End Process 1%Start Process 2,external3,Correct Queue3,Fetch3,End Process 2%Start Process 3,external8,Detection Machining8,Machining8,End Process 3%Start Process 4,external7,Set7,Check State7,End Process 4%Start Process 5,external6,Set6,Check State6,End Process 5%Start Process 6,external4,Set4,Check State4,End Process 6%Start Process 7,external2,Set2,Check State2,End Process 7%Start Process 8,external1,Set1,Check State1,End Process 8%Start Process 9,external9,GV12 Turn9,Signal Machining End9,Manually Measure9,Measure with MicroVu9,End Process 9";

export const kpi = {
   "Check State1/Fetch3": 19.33,
  "Check State2/Set4": 68.31,
  "Check State4/Set1": 836.21,
  "Check State5/GV12 Turn9": 50.0,
  "Check State6/Measure with MicroVu9": 48.86,
  "Fetch3/Signal Machining End9": 66.67,
  "Manually Measure9/Set6": 66.67,
  "Set1/Machining8": 66.67,
  "Set2/Set4": 66.67,
  "Set4/Set1": 66.67,
  "Set6/Measure with MicroVu9": 65.02,
  "Signal Machining End9/Set6": 66.67
};

export const orderSummary = {
    "Check State1": 1,
  "Check State2": 1,
  "Check State4": 1,
  "Check State5": 1,
  "Check State6": 1,
  "Fetch3": 2,
  "GV12 Turn9": 1,
  "Machining8": 1,
  "Manually Measure9": 1,
  "Measure with MicroVu9": 2,
  "Set1": 3,
  "Set2": 1,
  "Set4": 3,
  "Set6": 3,
  "Signal Machining End9": 2,
  "Total": 12
};

export const orderPie = {
    "Check State1/Fetch3": 87,
  "Check State2/Set4": 83,
  "Check State4/Set1": 1016,
  "Check State5/GV12 Turn9": 81,
  "Check State6/Measure with MicroVu9": 86,
  "Fetch3/Signal Machining End9": 81,
  "Manually Measure9/Set6": 81,
  "Set1/Machining8": 81,
  "Set2/Set4": 81,
  "Set4/Set1": 81,
  "Set6/Measure with MicroVu9": 79,
  "Signal Machining End9/Set6": 81

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