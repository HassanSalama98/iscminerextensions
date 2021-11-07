#!/usr/bin/python3
import argparse
import re
import yaml
import os
import shutil
from configparser import ConfigParser
import json
import datetime
from ISCObject import *
from Heuristics import *
import glob


def main():
  pather = os.path.join(os.getcwd(), 'data', 'upload')
  with open('upload.config', 'a') as file:
    for path in os.listdir(pather):
      l = " " + "data/upload/" + path
      file.write(l)

  myvars = {}
  with open("upload.config") as myfile:
    for line in myfile:
      name, var = line.partition(":")[::2]
      myvars[name.strip()] = var
  names = type("Names", (), myvars)
  args = type("Names", (), {})
  args.g3 = float(names.g3)
  args.eps3 = float(names.eps3)
  args.eps4 = float(names.eps4)
  args.a3 = bool(names.a3)
  args.a4 = bool(names.a4)
  args.minerabs = int(names.minerabs)
  args.minerrel = float(names.minerrel)
  args.xesfiles = names.xesfiles.split()

  # parser = argparse.ArgumentParser()
  # parser.add_argument(os.path.join(os.getcwd(), "upload.config"))
  # args = parser.parse_args()

  # with open(args.config, 'r') as stream:
  #     try:
  #         conf = yaml.full_load(stream)
  #     except yaml.YAMLError as exc:
  #         print(exc)
  #
  # for k,v in args.items():
  #   vars(args)[k]=v

  if not args.xesfiles:
    print("At least one xesfile needed")
    quit()

  # if not (args.a1 or args.a2 or args.a3 or args.a4):
  #   args.a1 = False
  #   args.a2 = False
  #   args.a3 = True
  #   args.a4 = True
  fn = os.getcwd()
  paths = args.xesfiles
  if not os.path.exists(os.path.join(fn,'json')):
    os.makedirs(os.path.join(fn,'json'))
  # else:
  #   resultFiles = glob.glob(os.path.join(fn, 'json') + "/*")
  #   for res in resultFiles:
  #         os.remove(res)

  try:
    iscobj = ISCObject(fn,paths,args)
    iscobj.write_results()
  except ValueError as ve:
    print("Caught the culprit")
    x = dict()
    x['error']  = str(ve)
  #  with open(os.path.join(fn,'json','algo_1.json'),'w') as f:
   #   json.dump(x,f)
    with open(os.path.join(fn,'json','algo_3.json'),'w') as f:
      json.dump(x,f)
    with open(os.path.join(fn,'json','algo_4.json'),'w') as f:
      json.dump(x,f)
    #with open(os.path.join(fn,'json','algo_2_data_constraint_start_complete.json'),'w') as f:
     # json.dump(x,f)
    #with open(os.path.join(fn,'json','algo_2_data_constraint_start_start.json'),'w') as f:
     # json.dump(x,f)
    #with open(os.path.join(fn,'json','algo_2_execution_constraint.json'),'w') as f:
     # json.dump(x,f)
    #with open(os.path.join(fn,'json','algo_2_regularities_event_level_start_complete.json'),'w') as f:
     # json.dump(x,f)
    #with open(os.path.join(fn,'json','algo_2_regularities_event_level_start_start.json'),'w') as f:
     # json.dump(x,f)
    #with open(os.path.join(fn,'json','algo_2_regularities_instance_level.json'),'w') as f:
     # json.dump(x,f)
    f.closed
