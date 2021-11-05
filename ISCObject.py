#!/usr/bin/python3
import time
import dateutil
import datetime
from dateutil.parser import *
from dateutil.relativedelta import *
from datetime import timedelta
import os.path
from Trace import *
from EHandler import *
from Algorithm import *
from SetEncoder import*
from EventPair import *
from Heuristics import *
import re
import collections
import pickle


class ISCObject:
  def __init__(self, fn, paths, args):
    self.lifecycle_options = {'lifecycle_exists': 1, 'lifecycle_options': set()}
    self.logs = {}
    self.start_events = {}
    self.end_events = {}
    self.fn = fn  # filename
    self.algos = dict()
    self.paths = paths
    self.args = args
    self.heuristics = []
    for path in paths:
      ev_map = collections.defaultdict(int)
      parser = SX.make_parser()
      handler = EHandler(path, self.logs, self.start_events, self.end_events, self.lifecycle_options, ev_map)
      parser.setContentHandler(handler)
      parser.parse(path)
    self.mt = self.merge_traces()
    self.create_results()
    for path in paths:
      self.heuristics.append(
        Heuristics(re.sub(".xes", "", os.path.basename(path)), self.logs[path], self.lifecycle_options,
                   self.start_events[path], self.end_events[path]))

  def get_attribset(self):
    ret = set()
    for logname, traces in self.logs.items():
      for tracename, trace in traces.items():
        for k, v in trace.attribset.items():
          if len(v) == 1 and k != "concept:instance" and k != "cpee:uuid":  # cpee specific checks added
            ret.add(k)
    for logname, traces in self.logs.items():
      for tracename, trace in traces.items():
        for e in trace.events:
          ret = ret.intersection(set(e.attrib.keys()));
    return ret

  def merge_traces(self):
    ret = {}  # inp => [events]
    if len(self.logs.keys()) == 1:
      for logname, traces in self.logs.items():
        for tracename, trace in traces.items():
          ret[tracename] = trace.events
      return ret
    attribs = list(self.get_attribset())
    if len(attribs) == 1:
      inp = attribs[0]
      self.args.mergeattribute = attribs[0]
    elif self.args.mergeattribute:
      for att in attribs:
        if att == self.args.mergeattribute:
          inp = att
    else:
      raise ValueError(
        "There is no possibility to merge all traces. Either there is no option or too many. If there is more than one, please use the config file")
    for logname, traces in self.logs.items():
      for tracename, trace in traces.items():
        if inp in trace.attribset.keys():
          if len(trace.attribset[inp]) > 1:
            raise RuntimeError("Only unique trace identifiers possible for merging.")
          temp = list(trace.attribset[inp])
          if temp[0] not in ret:
            ret[temp[0]] = []
          ret[temp[0]].extend(trace.events)
    for trname, events in ret.items():
      events.sort(key=lambda x: parse(x.attrib['time:timestamp']))
    return ret

  def create_results(self):
    if self.args.a3:
      try:
        self.algos['a3'] = Algorithm_3(self.args, self)
      except RuntimeError as err:
        print("RuntimeError: {0} ".format(err))
        self.args.a3 = False
    if self.args.a4:
      try:
        self.algos['a4'] = Algorithm_4(self.args, self)
      except RuntimeError as err:
        print("RuntimeError: {0} ".format(err))
        self.args.a4 = False
  def write_results(self):
    if 'a3' in self.algos:
      self.algos['a3'].write(os.path.join(self.fn, 'json', "algo_3"))
    if 'a4' in self.algos:
      self.algos['a4'].write(os.path.join(self.fn, 'json', "algo_4"))
