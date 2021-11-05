from flask import Flask, request
from flask_restful import Resource, Api, abort, reqparse
from flask_cors import CORS
from Meta import get_activities
from Meta import readlog, getAllActivities
from Meta import getOrderAccuaracy, getOrderSummary
from main import getManufNonConTotal
from main import getOrderingISC, getPairAllocation, getNonConTotal, getNonConISCs,getManufOrderingISC
import os

app = Flask(__name__)
API = Api(app)
pat = os.getcwd()
#path_bill = os.path.join(pat, "data", "billinstances.xes")
#path_flyer = os.path.join(pat, "data", "flyerinstances.xes")
path_bill = os.path.join(pat, "data", "printer", "billinstances.xes")
path_flyer = os.path.join(pat, "data", "printer", "flyerinstances.xes")
path_poster = os.path.join(pat, "data", "printer", "posterinstances.xes")
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz/bin/'

@app.route('/indexPrint')
def indexPrint():
    counter = 1
    act = get_activities(readlog(path_poster))
    act.insert(0, "Start Process " + str(counter))
    act.insert(len(act), "End Process " + str(counter))
    counter += 1
    act1 = get_activities(readlog(path_bill))
    act1.insert(0, "Start Process " + str(counter))
    act1.insert(len(act1), "End Process " + str(counter))
    counter += 1
    act2 = get_activities(readlog(path_flyer))
    act2.insert(0, "Start Process " + str(counter))
    act2.insert(len(act2), "End Process " + str(counter))
    counter += 1
    dictio = ','.join(act)
    dictio1 = ','.join(act1)
    dictio2 = ','.join(act2)
    final = dictio + "%" + dictio1 + "%" + dictio2
    return final

@app.route('/kpiPrint')
def kpiPrint():
    return getOrderAccuaracy(readlog(path_poster), readlog(path_flyer), readlog(path_bill))
@app.route('/orderSummaryPrint')
def orderSummaryPrint():
    return getOrderSummary()
@app.route('/orderPiePrint')
def orderPiePrint():
    return getOrderingISC()
@app.route('/nonConKPIPrint')
def nonConKPIPrint():
    return
@app.route('/nonConBarPrint')
def nonConBarPrint():
    return getNonConISCs(getNonConTotal())
@app.route('/pairAllocationPrint')
def pairAllocationPrint():
    return getPairAllocation(getNonConTotal())
@app.route('/indexManuf')
def indexManuf():
    return getAllActivities()
@app.route('/kpiManuf')
def kpiManuf():
    return
@app.route('/orderSummaryManuf')
def orderSummaryManuf():
    return
@app.route('/orderPieManuf')
def orderPieManuf():
    return getManufOrderingISC()
@app.route('/nonConKPIManuf')
def nonConKPIManuf():
    return
@app.route('/nonConPieManuf')
def nonConPieManuf():
    return getManufNonConTotal()
@app.route('/pairAllocationManuf')
def pairAllocationManuf():
    return getPairAllocation(getManufNonConTotal())
if __name__ == '__main__':
    app.run(debug=True)