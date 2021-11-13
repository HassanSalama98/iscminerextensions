import json
import os
import yaml
import argparse
import pandas as pd
from collections import Counter
from ISCObject import *
from datetime import datetime, timedelta

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

def getTimeDifference():
    with open('json/algo_4.json') as f:
        data = json.load(f)
        listOfResults = []
        for i in data:
            datetimelist = []
            for events in data[i]:
                for j in events: #get end of event 1 and start of event 2 and determine the time difference
                    m = j["ev1"]["ev1end"]["attrib"]["time:timestamp"]
                    m = m[:19]
                    m = m.replace("T", " ")
                    l = datetime.strptime(m, "%Y-%m-%d %H:%M:%S")
                    p = j["ev2"]["ev2start"]["attrib"]["time:timestamp"]
                    p = p[:19]
                    p = p.replace("T", " ")
                    k = datetime.strptime(p, "%Y-%m-%d %H:%M:%S")
                    res = k - l
                    datetimelist.append(res)
            avgTime = sum([date for date in datetimelist],timedelta()) / len(datetimelist)
            listOfResults.append(i)
            listOfResults.append(str(avgTime))
            results = dict(zip(listOfResults[::2], listOfResults[1::2]))
            for key, value in results.copy().items(): #merge the two results per event pair
                for keys, values in results.copy().items():
                    i, j = key.split("/")
                    if (i in keys and j in keys and keys != key):
                        results.update({keys: [values, value]})
            for o, valuer in results.copy().items():
                for l in results.copy().keys():
                    m, n = o.split("/")
                    if m in l and n in l and o != l:
                        del results[l]
                        results.setdefault(o, valuer)
        return results

def getgeneraltotalalgo3constraintsKPI():
    with open('json/algo_3.json') as f:
        data = json.load(f)
        counter = 0
        for i in data:
            counter += 1
    return counter

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
#Below are the methods used to calculate the KPIs for the evaluation of the two examples:
# Artificial Print Shop and Real-life Manufacturing
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
    with open('manufacturing_algo_3.json') as f:
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

def getManufOrderSummary():
    with open('manufacturing_algo_3.json') as f:
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

def getManufAlgo3Constraints():
    with open('manufacturing_algo_3.json') as f:
        data = json.load(f)
        counter = 0
        for i in data:
            counter += 1
    return counter

def getPrinterTimeDifference():
    with open('printer_algo_4.json') as f:
        data = json.load(f)
        counter = 0
        listOfResults = []
        for i in data:
            counter += 1
            datetimelist = []
            results = dict()
            for events in data[i]:
                for j in events:
                    m = j["ev1"]["ev1end"]["attrib"]["time:timestamp"]
                    m = m[:19]
                    m = m.replace("T", " ")
                    l = datetime.strptime(m, "%Y-%m-%d %H:%M:%S")
                    p = j["ev2"]["ev2start"]["attrib"]["time:timestamp"]
                    p = p[:19]
                    p = p.replace("T", " ")
                    k = datetime.strptime(p, "%Y-%m-%d %H:%M:%S")
                    res = k - l
                    datetimelist.append(res)
            avgTime = sum([date for date in datetimelist],timedelta()) / len(datetimelist)
            listOfResults.append(i)
            listOfResults.append(str(avgTime))
            results = dict(zip(listOfResults[::2], listOfResults[1::2]))
            for key, value in results.copy().items():
                for keys, values in results.copy().items():
                    i, j = key.split("/")
                    if (i in keys and j in keys and keys != key):
                        results.update({keys: [values, value]})
            for o, valuer in results.copy().items():
                for l in results.copy().keys():
                    m, n = o.split("/")
                    if m in l and n in l and o != l:
                        del results[l]
                        results.setdefault(o, valuer)
        return results

def getNonConKPI(time):
    for key,value in time.copy().items():
        listOfDates = []
        for keys, values in time.copy().items():
            i, j = key.split("/")
            if (i in keys and j in keys and keys != key):
                listOfDates.append(datetime.strptime(value[:8], "%H:%M:%S"))
                listOfDates.append(datetime.strptime(values[:8], "%H:%M:%S"))
                avg = sum([date for date in listOfDates], timedelta()) / len(listOfDates)
                del time[keys]
                time.update({key: avg})
    return time
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

def getManufNonConTotal():
    with open('manufacturing_algo_4.json') as f:
        data = json.load(f)
        result ={}
        for i in data:
            counter = 0
            for events in data[i]:
                for j in events:
                    counter += 1
            result.update({i : counter})
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
    print(getManufOrderSummary())


