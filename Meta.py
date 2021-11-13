import json
import os
from main import gettotalalgo3constraintsKPI, getOrderedActivityOccurrences
import pm4py
from pm4py.objects.log.importer.xes import importer as xes_importer
import pm4py.objects.bpmn.layout.variants.pygraphviz
from pm4py.algo.discovery.alpha import algorithm as alpha_miner
from pm4py.algo.discovery.heuristics import algorithm as heuristics_miner
from pm4py.algo.discovery.inductive import algorithm as inductive_miner
from pm4py.visualization.heuristics_net import visualizer as hn_visualizer
from pm4py.visualization.petri_net import visualizer as pn_visualizer
from main import getManufAlgo3Constraints, getManufOrderSummary, getgeneraltotalalgo3constraintsKPI, getGeneralOrderedActivityOccurrences
from ISCObject import *

pat = os.getcwd()
path_bill = os.path.join(pat, "data", "printer", "billinstances.xes")
path_flyer = os.path.join(pat, "data", "printer", "flyerinstances.xes")
path_poster = os.path.join(pat, "data", "printer", "posterinstances.xes")
paths = os.path.join(pat, "data", "manufacturing")
pathp = os.path.join(pat, "data", "printer")
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz/bin/'
log_bill = pm4py.read_xes(path_bill)
log_flyer = pm4py.read_xes(path_flyer)
log_poster = pm4py.read_xes(path_poster)

def getAllActivities():
    result = ""
    remove = "external"
    for file in os.listdir(paths):
        log = xes_importer.apply(os.path.join(paths, file))
        act = get_activities(log)
        act = [x for x in act if not (remove in x)]
        print(act)
        temp = ','.join(act)
        result += temp + "%"
    return result
#Not used on the frontend
def alphaminer(log):
    alph, ima, fma = alpha_miner.apply(log)
    return alph, ima, fma
#Process Discovery Algorithm utilized by the frontend.
def heuristicsminer(log, minRel: 0.5, minAnd : 0.65):
    heuristicsnet = heuristics_miner.apply_heu(log, parameters=
    {heuristics_miner.Variants.CLASSIC.value.Parameters.DEPENDENCY_THRESH: minRel,
     heuristics_miner.Variants.CLASSIC.value.Parameters.AND_MEASURE_THRESH: minAnd})
    graph = hn_visualizer.apply(heuristicsnet)
    #hn_visualizer.view(graph)
    activities = heuristicsnet.activities
    return heuristicsnet

#Used for evaluation; not used on frontend
def inductiveminer(log):
    ind, im, fm = inductive_miner.apply(log)
    graph = pn_visualizer.apply(ind, im, fm)
    pn_visualizer.view(graph)
    return ind, im, fm

def getTotalActivityOccurrence(log):
    heuristicsnet = heuristics_miner.apply_heu(log)
    graph = hn_visualizer.apply(heuristicsnet)
    total = heuristicsnet.activities_occurrences
    return total

def getOrderObedience(listOfLogs):
    with open('json/algo_3.json') as f:
        data = json.load(f)
        list_of_results = {}
        listOfLists = []
        for log in listOfLogs: #collect inputted log files in 1 list
            listOfLists.append(getTotalActivityOccurrence(log))
        for i in data:
            counter = 0
            for events in data[i]:
                counter += 1
            for list in listOfLists:
                for key, value in list.items():
                    if (key in i):
                        if i in list_of_results.keys():
                            if ((counter / (value / 2) * 100) > list_of_results.get(i)): #ensure the minimum of the activity occurrences is chosen
                                list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
                            else:
                                counter = counter
                        else:
                            list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
    return list_of_results

def get_activities(log):
    heuristicsnet = heuristics_miner.apply_heu(log)
    graph = hn_visualizer.apply(heuristicsnet)
    activities = heuristicsnet.activities
    return activities
def getGeneralOrderSummary():
    total = getgeneraltotalalgo3constraintsKPI()
    occPerISC = getGeneralOrderedActivityOccurrences()
    occPerISC.update({"Total": total})
    return dict(sorted(occPerISC.items(), key=lambda x: x[1], reverse=True))

def getPairAllocation(total):
    result = {}
    for key, value in total.items():
        for keys, values in total.items():
         i, j = key.split("/")
         if(i in keys and j in keys and keys != key): #avoid duplicate event pairs in dictionary
             result.update({key: round((value / (value + values)) * 100, 3)})
             result.update({keys: round((values / (value + values)) * 100, 3)})
         if key not in result.keys():
            result.update({key : 100})
    return result

def readlog(log):
    new = pm4py.read_xes(log)
    return new

#Below are the methods used to calculate the KPIs for the evaluation of the two examples:
# Artificial Print Shop and Real-life Manufacturing Domain Example
def getOrderAccuaracy(log1,log2,log3):
    with open('printer_algo_3.json') as f:
        data = json.load(f)
        list_of_results = {}
        list1 = getTotalActivityOccurrence(log1)
        list2 = getTotalActivityOccurrence(log2)
        list3 = getTotalActivityOccurrence(log3)
        for i in data:
           counter = 0
           for events in data[i]:
               counter += 1
           for key, value in list1.items():
               if(key in i):
                   if i in list_of_results.keys():
                     if (counter/(value/2)) * 100 > list_of_results.get(i):
                      list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
                     else: counter = counter
                   else: list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
           for key, value in list2.items():
              if(key in i):
                if i in list_of_results.keys():
                  if (counter / (value / 2)) * 100> list_of_results.get(i):
                    list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
                  else: counter = counter
                else: list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
           for key, value in list3.items():
                if(key in i):
                 if i in list_of_results.keys():
                  if (counter / (value / 2)) * 100 > list_of_results.get(i):
                    list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
                  else: counter = counter
                 else:
                       list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
        return list_of_results

def getManufOrderObedience(listOfLogs):
    with open('manufacturing_algo_3.json') as f:
        data = json.load(f)
        list_of_results = {}
        listOfLists = []
        for log in listOfLogs:
            listOfLists.append(getTotalActivityOccurrence(log))
        for i in data:
            counter = 0
            for events in data[i]:
                counter += 1
            for list in listOfLists:
                for key, value in list.items():
                    if (key in i):
                        if i in list_of_results.keys():
                            if ((counter / (value / 2) * 100) > list_of_results.get(i)):
                                list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
                            else:
                                counter = counter
                        else:
                            list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
        for z,x in list_of_results.items():
            if x > 100 :
                list_of_results.update({z: "invalid result"})
    return list_of_results

def getOrderSummary():
    total = gettotalalgo3constraintsKPI()
    occPerISC = getOrderedActivityOccurrences()
    occPerISC.update({"Total" : total})
    return dict(sorted(occPerISC.items(), key=lambda x: x[1], reverse=True))
def getOrderInsights():
    total = getManufAlgo3Constraints()
    occPerISC = getManufOrderSummary()
    occPerISC.update({"Total": total})
    return dict(sorted(occPerISC.items(), key=lambda x: x[1], reverse=True))

if __name__ == '__main__':
    listOfLogs = []
    for file in os.listdir(pathp):
        log = xes_importer.apply(os.path.join(pathp, file))
        listOfLogs.append(log)