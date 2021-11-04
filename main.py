import json
import os
import pandas as pd
from collections import Counter
from ISCObject import *
def getOrderingISC():
    with open('algo_3.json') as f:
        data = json.load(f)
        list_of_ISC = {}
    for i in data:
        counter = 0
        for event in data[i]:
            counter += 1
            list_of_ISC.update({i: counter})
    return list_of_ISC
def getManufOrderingISC():
    with open('manuf_algo_3.json') as f:
        data = json.load(f)
        list_of_ISC = {}
    for i in data:
        counter = 0
        for event in data[i]:
            counter += 1
            list_of_ISC.update({i: counter})
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
def getManufOrderSummary():
    with open('manuf_algo_3.json') as f:
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
def getManufAlgo3Constraints():
    with open('manuf_algo_3.json') as f:
        data = json.load(f)
        counter = 0
        for i in data:
            counter += 1
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
def getNonConISCs(total):
    for key,value in total.copy().items():
        for keys in total.copy():
            i, j = key.split("/")
            if (i in keys and j in keys and keys != key):
                del total[keys]
                total.update({key: value})
    return list(total.keys())

if __name__ == '__main__':
    # pat = os.getcwd()
    # path = os.path.join(pat, "data", "manufacturing")
    # args = {}
    # args.update({"eps3": 0})
    # args.update({"eps4": 1})
    # args.update({"g3": 1})
    # args.update({"a3": 1})
    # args.update({"a4": 1})
    # args.update({"mergeattribute": "null"})
    # files = []
    # for file in os.listdir(path):
    #     log = os.path.join(path, file)
    #     files.append(log)
    # if not os.path.exists(os.path.join(path, 'pickle')):
    #     os.makedirs(os.path.join(path, 'pickle'))
    # if not os.path.exists(os.path.join(path, 'json')):
    #     os.makedirs(os.path.join(path, 'json'))
    # try:
    #     iscobj = ISCObject(path, files, args)
    #     iscobj.write_results()
    # except ValueError as ve:
    #     print("Caught the culprit")
    #     x = dict()
    #     x['error'] = str(ve)
    #     with open(os.path.join(path, 'json', 'algo_3.json'), 'w') as f:
    #         json.dump(x, f)
    #     with open(os.path.join(path, 'json', 'algo_4.json'), 'w') as f:
    #         json.dump(x, f)
    # f.closed
    #print(getNonConISCs(getNonConTotal()))
    print(getNonConTotal())
    print(getNonConISCs(getNonConTotal()))
