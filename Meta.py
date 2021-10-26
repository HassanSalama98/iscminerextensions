import json
import os
import pm4py
import pm4py.objects.bpmn.layout.variants.pygraphviz
from pm4py.algo.discovery.alpha import algorithm as alpha_miner
from pm4py.algo.discovery.heuristics import algorithm as heuristics_miner
from pm4py.algo.discovery.inductive import algorithm as inductive_miner
from pm4py.visualization.heuristics_net import visualizer as hn_visualizer
from pm4py.visualization.petri_net import visualizer as pn_visualizer
from pm4py.algo.evaluation.replay_fitness import algorithm as replay_fitness_evaluator
from pm4py.algo.evaluation.precision import algorithm as precision_evaluator
from pm4py.algo.evaluation.generalization import algorithm as generalization_evaluator

pat = os.getcwd()
path_bill = os.path.join(pat, "data", "billinstances.xes")
path_flyer = os.path.join(pat, "data", "flyerinstances.xes")
path_poster = os.path.join(pat, "data", "posterinstances.xes")
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz/bin/'
log_bill = pm4py.read_xes(path_bill)
log_flyer = pm4py.read_xes(path_flyer)
log_poster = pm4py.read_xes(path_poster)

def alphaminer(log):
    alph, ima, fma = alpha_miner.apply(log)
    return alph, ima, fma

def heuristicsminer(log, minRel: 0.5, minAnd : 0.65):
    heuristicsnet = heuristics_miner.apply_heu(log, parameters=
    {heuristics_miner.Variants.CLASSIC.value.Parameters.DEPENDENCY_THRESH: minRel,
     heuristics_miner.Variants.CLASSIC.value.Parameters.AND_MEASURE_THRESH: minAnd})
    graph = hn_visualizer.apply(heuristicsnet)
    #hn_visualizer.view(graph)
    activities = heuristicsnet.activities
    return heuristicsnet
def inductiveminer(log):
    ind, im, fm = inductive_miner.apply(log)
    graph = pn_visualizer.apply(ind, im, fm)
    pn_visualizer.view(graph)
    return ind, im, fm
def getTotalActivityOccurrence(log):
    heuristicsnet = heuristics_miner.apply_heu(log)
    graph = hn_visualizer.apply(heuristicsnet)
    # hn_visualizer.view(graph)
    total = heuristicsnet.activities_occurrences
    return total
def getOrderAccuaracy(log1,log2,log3):
    with open('algo_3.json') as f:
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
                     if (counter/(value/2)) > list_of_results[i]:
                         list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
                     else: counter = counter
                   else: list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
           for key, value in list2.items():
              if(key in i):
                if i in list_of_results.keys():
                  if (counter / (value / 2)) > list_of_results[i]:
                    list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
                  else: counter = counter
                else: list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
           for key, value in list3.items():
                if(key in i):
                 if i in list_of_results.keys():
                  if (counter / (value / 2)) > list_of_results[i]:
                      list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
                  else: counter = counter
                 else:
                       list_of_results.update({i: round((counter / (value / 2)) * 100, 2)})
        return list_of_results

def get_activities(log):
    heuristicsnet = heuristics_miner.apply_heu(log)
    graph = hn_visualizer.apply(heuristicsnet)
    # hn_visualizer.view(graph)
    activities = heuristicsnet.activities
    return activities


def readlog(log):
    new = pm4py.read_xes(log)
    return new
if __name__ == '__main__':
   # print("Hi")
    print(getOrderAccuaracy(log_poster, log_flyer, log_bill))
    #print(getTotalActivityOccurrence(log_flyer))
     #for i in act:
     #   print(i)




#activities = attributes_filter.get_attribute_values(log_flyer, "concept:name")
#model_bill = pm4py.discover_bpmn_inductive(log_bill)
#start = pm4py.get_start_activities(log_bill)
#end = pm4py.get_end_activities(log_bill)
#model_flyer = pm4py.discover_bpmn_inductive(log_flyer)
#model_poster = pm4py.discover_bpmn_inductive(log_poster)
#pm4py.write_bpmn(model_bill,"bill.gv", enable_layout=True)





























#variant.classic.apply(model_bill)
#pm4py.write_bpmn(model_poster,"poster.bpmn", enable_layout=True)
#pm4py.write_bpmn(model_flyer,"flyer.bpmn", enable_layout=True)
#neth, imh, fmh = heuristics_miner.apply(log_flyer)
#net, im, fm = inductive.apply(log_flyer)
#nethi, imhi, fmhi = heuristics_miner.apply(log_bill)
#netb, imb, fmb = inductive.apply(log_bill)
#nethp, imhp, fmhp = heuristics_miner.apply(log_poster)
#netp, imp, fmp = inductive.apply(log_poster)
#gen_induct_flyer = generalization_evaluator.apply(log_flyer, net, im, fm)
#gen_heur_flyer = generalization_evaluator.apply(log_flyer, neth, imh, fmh)
#gen_induct_bill = generalization_evaluator.apply(log_bill, netb, imb, fmb)
#gen_heur_bill = generalization_evaluator.apply(log_bill, nethi, imhi, fmhi)
#gen_induct_poster = generalization_evaluator.apply(log_poster, netp, imp, fmp)
#gen_heur_poster = generalization_evaluator.apply(log_poster, nethp, imhp, fmhp)
#fitness_induct_flyer = replay_fitness_evaluator.apply(log_flyer, net, im, fm, variant=replay_fitness_evaluator.Variants.TOKEN_BASED)
#fitness_heur_flyer = replay_fitness_evaluator.apply(log_flyer, neth, imh, fmh, variant=replay_fitness_evaluator.Variants.TOKEN_BASED)
#fitness_induct_bill = replay_fitness_evaluator.apply(log_bill, netb, imb, fmb, variant=replay_fitness_evaluator.Variants.TOKEN_BASED)
#fitness_heur_bill = replay_fitness_evaluator.apply(log_bill, nethi, imhi, fmhi, variant=replay_fitness_evaluator.Variants.TOKEN_BASED)
#fitness_induct_poster = replay_fitness_evaluator.apply(log_poster, netp, imp, fmp, variant=replay_fitness_evaluator.Variants.TOKEN_BASED)
#fitness_heur_poster = replay_fitness_evaluator.apply(log_poster, nethp, imhp, fmhp, variant=replay_fitness_evaluator.Variants.TOKEN_BASED)
#prec_induct_flyer = precision_evaluator.apply(log_flyer, net, im, fm, variant=precision_evaluator.Variants.ETCONFORMANCE_TOKEN)
#prec_heur_flyer= precision_evaluator.apply(log_flyer, neth, imh, fmh, variant=precision_evaluator.Variants.ETCONFORMANCE_TOKEN)
#prec_induct_bill = precision_evaluator.apply(log_bill, netb, imb, fmb, variant=precision_evaluator.Variants.ETCONFORMANCE_TOKEN)
#prec_heur_bill= precision_evaluator.apply(log_bill, nethi, imhi, fmhi, variant=precision_evaluator.Variants.ETCONFORMANCE_TOKEN)
#prec_induct_poster = precision_evaluator.apply(log_poster, netp, imp, fmp, variant=precision_evaluator.Variants.ETCONFORMANCE_TOKEN)
#prec_heur_poster= precision_evaluator.apply(log_poster, nethp, imhp, fmhp, variant=precision_evaluator.Variants.ETCONFORMANCE_TOKEN)
#print("Fitness Induct Flyer")
#print(fitness_induct_flyer)
#print("Fitness Heuristics Flyer")
#print(fitness_heur_flyer)
#print("Fitness Induct Bill")
#print(fitness_induct_bill)
#print("Fitness Heuristics Bill")
#print(fitness_heur_bill)
#print("Fitness Induct Poster")
#print(fitness_induct_poster)
#print("Fitness Heuristics Poster")
#print(fitness_heur_poster)


#print("Precision Induct Flyer")
#print(prec_induct_flyer)
#print("Precision Heuristics Flyer")
#print(prec_heur_flyer)
#print("Precision Induct Bill")
#print(prec_induct_bill)
#print("Precision Heuristics Bill")
#print(prec_heur_bill)
#print("Precision Induct Poster")
#print(prec_induct_poster)
#print("Precision Heuristics Poster")
#print(prec_heur_poster)

#print("Generalizability Induct Flyer")
#print(gen_induct_flyer)
#print("Generalizability Heuristics Flyer")
#print(gen_heur_flyer)
#print("Generalizability Induct Bill")
#print(gen_induct_bill)
#print("Generalizability Heuristics Bill")
#print(gen_heur_bill)
#print("Generalizability Induct Poster")
#print(gen_induct_poster)
#print("Generalizability Heuristics Poster")
#print(gen_heur_poster)
#pm4py.view_bpmn(model_bill)
#pm4py.view_bpmn(model_flyer)
#pm4py.view_bpmn(model_poster)