import json
import pandas as pd
from collections import Counter
def getOrderingISC():
    with open('algo_3.json') as f:
        data = json.load(f)
        list_of_ISC = []
    for i in data:
     list_of_ISC.append(i)
    return list_of_ISC

def getOrderedActivityOccurrences():
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
            print(i)
    return counter
def getTimeDifference():
    print()
def getNonConISC():
    with open('algo_4.json') as f:
        data = json.load(f)
        list_of_ISC = []
    for i in data:
     list_of_ISC.append(i)
    return list_of_ISC
def getNonConTotal():
    with open('algo_4.json') as f:
        data = json.load(f)
        result ={}
        for i in data:
            counter = 0
            for events in data[i]:
                for j in events:
                    counter += 1
            result.update({i : counter})
    return result

def getPairAllocation(total):
    #total = getNonConTotal()
    result = {}
    for key, value in total.items():
        for keys, values in total.items():
         i, j = key.split("/")
         if(i in keys and j in keys and keys != key):
             result.update({key: round((value / (value + values)) * 100, 3)})
             result.update({keys: round((values / (value + values)) * 100, 3)})
         if key not in result.keys():
            result.update({key : 100})
    return result
def getNumberoFNonConISC(total):
    count = len(total)
    return count
if __name__ == '__main__':
    #print(getActivityOccurrences())
    #print(gettotalalgo3constraintsKPI())
    print(getOrderingISC())
    #print(getNonConISC())
    print(getNonConTotal())
 #print(getPairAllocation(getNonConTotal()))
    #print(getNumberoFNonConISC(getNonConTotal()))
