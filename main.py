import json
import os
import yaml
import argparse
import pandas as pd
from collections import Counter
from ISCObject import *
def getOrderingISC():
    with open('printer_algo_3.json') as f:
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
def getGeneralOrderingISC():
    with open('json/algo_3.json') as f:
        data = json.load(f)
        list_of_ISC = {}
    for i in data:
        counter = 0
        for event in data[i]:
            counter += 1
            list_of_ISC.update({i: counter})
    return list_of_ISC
def getOrderedActivityOccurrences():
    with open('printer_algo_3.json') as f:
        data = json.load(f)
        list_of_ISC = []
        final_list = []
        for i in data:
          list_of_ISC.append(i.split("/"))
        for sublist in list_of_ISC:
            for item in sublist:
                final_list.append(item)
        return Counter(final_list)
def getGeneralOrderedActivityOccurrences():
    with open('json/algo_3.json') as f:
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
    with open('printer_algo_3.json') as f:
        data = json.load(f)
        counter = 0
        for i in data:
            counter += 1
    return counter
def getgeneraltotalalgo3constraintsKPI():
    with open('json/algo_3.json') as f:
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
    with open('printer_algo_4.json') as f:
        data = json.load(f)
        list_of_ISC = []
    for i in data:
     list_of_ISC.append(i)
    return list_of_ISC
def getNonConTotal():
    with open('printer_algo_4.json') as f:
        data = json.load(f)
        result ={}
        for i in data:
            counter = 0
            for events in data[i]:
                for j in events:
                    counter += 1
            result.update({i : counter})
    return result
def getGeneralNonConTotal():
    with open('json/algo_4.json') as f:
        data = json.load(f)
        result ={}
        for i in data:
            counter = 0
            for events in data[i]:
                for j in events:
                    counter += 1
            result.update({i : counter})
    return result
def getManufNonConTotal():
    with open('manuf_algo_4.json') as f:
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
    result = {}
    for key, value in total.items():
        for keys, values in total.items():
         i, j = key.split("/")
         if(i in keys and j in keys and keys != key):
             result.update({key: [round((value / (value + values)) * 100, 3), round((values / (value + values)) * 100, 3)]})
             #result.update({keys: round((values / (value + values)) * 100, 3)})
         if key not in result.keys():
            result.update({key : [100,0]})
    for o, valuer in result.copy().items():
        for l in result.copy().keys():
            m,n = o.split("/")
            if m in l and n in l and o != l:
                del result[l]
                result.setdefault(o, valuer)
    return result
def getNonConISCs(total):
    for key,value in total.copy().items():
        for keys, values in total.copy().items():
            i, j = key.split("/")
            if (i in keys and j in keys and keys != key):
                sum = value + values
                del total[keys]
                total.update({key: sum})
    return total

if __name__ == '__main__':
    # with open('json/algo_3.json') as f:
    #     data = json.load(f)
    #     for i in data:
    #         print(i)
    print(getNonConISCs(getNonConTotal()))
    # pather = os.path.join(os.getcwd(), 'data', 'upload')
    # with open('upload.config', 'a') as file:
    #     for path in os.listdir(pather):
    #         l = " " + "data/upload/" + path
    #         file.write(l)
    # file = open('upload.config', 'rb')
    # pos = next = 0
    # for line in file:
    #     pos = next
    #     next += len(line)
    # file = open('upload.config', 'ab')
    # file.truncate(pos)
    # with open('upload.config', 'a') as final:
    #     m = "xesfiles:"
    #     final.write(m)

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
    #print(getNonConISCs(getNonConTotal()))
    #print(getOrderingISC())
    # pather = os.path.join(os.getcwd(), 'data', 'printer')
    # with open('upload.config', 'a') as file:
    #     for path in os.listdir(pather):
    #         l = "\n" + "- data/upload/" + path
    #         file.write(l)
    # myvars = {}
    # with open("upload.config") as myfile:
    #     for line in myfile:
    #         name, var = line.partition(":")[::2]
    #         myvars[name.strip()] = var
    # names = type("Names", (), myvars)
    # args = type("Names", (), {})
    # args.g3 = float(names.g3)
    # args.eps3 = float(names.eps3)
    # args.eps4 = float(names.eps4)
    # args.a3 = bool(names.a3)
    # args.a4 = bool(names.a4)
    # args.minerabs = int(names.minerabs)
    # args.minerrel = float(names.minerrel)
    # print(type(args.minerabs))
    # pather = os.path.join(os.getcwd(), 'data', 'upload')
    # with open('upload.config', 'a') as file
    #     for path in os.listdir(pather):
    #         l = "\n" + "- data/upload/" + path
    #         file.write(l)
    # filename= os.path.join(os.getcwd(), "upload.config")
    # parser = argparse.ArgumentParser()
    # parser.add_argument('--config', nargs= '?', default=filename)
    # args = parser.parse_args()
    # with open(args.config, 'r') as stream:
    #     try:
    #         conf = yaml.full_load(stream)
    #     except yaml.YAMLError as exc:
    #         print(exc)

