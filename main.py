import json
import pandas as pd
from collections import Counter
def getISC():
    with open('algo_3.json') as f:
        data = json.load(f)
        list_of_ISC = []
    #new = pd.DataFrame.from_dict(data, orient= "index")
    #new.transpose()
    #print(new.iloc[0,:])
    #print(new)
    for i in data:
     list_of_ISC.append(i)
    return list_of_ISC
        #counter = 0
       # for events in data[i]:
       #  counter += 1
       # print(i)
       # print(counter)
def getActivityOccurrences():
    with open('algo_3.json') as f:
        data = json.load(f)
        list_of_ISC = []
        final_list = []
        for i in data:
          list_of_ISC.append(i.split("/"))
        for sublist in list_of_ISC:
            for item in sublist:
                final_list.append(item)
        return Counter(final_list)
def gettotalalgo3constraintsKPI():
    with open('algo_3.json') as f:
        data = json.load(f)
        counter = 0
        for i in data:
            counter += 1
    return counter
if __name__ == '__main__':
    print(getActivityOccurrences())
    print(gettotalalgo3constraintsKPI())
    print(getISC())