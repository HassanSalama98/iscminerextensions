from flask import Flask, request, redirect, url_for, session
from flask_restful import Resource, Api, abort, reqparse
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from Meta import get_activities
from Meta import readlog, getAllActivities
from Meta import getOrderAccuaracy, getOrderSummary, getOrderObedience, getGeneralOrderSummary
from main import getManufNonConTotal, getGeneralOrderingISC, getGeneralNonConTotal
from main import getOrderingISC, getPairAllocation, getNonConTotal, getNonConISCs, getManufOrderingISC
import os
import logging
import ISCmain
import glob


UPLOAD_FOLDER = os.path.join(os.getcwd(), 'data')
ALLOWED_EXTENSIONS = {'xes'}

app = Flask(__name__)
# pat = os.getcwd()
# path_bill = os.path.join(pat, "data", "printer", "billinstances.xes")
# path_flyer = os.path.join(pat, "data", "printer", "flyerinstances.xes")
# path_poster = os.path.join(pat, "data", "printer", "posterinstances.xes")
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz/bin/'
@app.route('/upload', methods = ['POST'])
def upload():
    target = os.path.join(UPLOAD_FOLDER, 'upload')
    if not os.path.isdir(target):
        os.mkdir(target)
    else:
        resultFiles = glob.glob(target + "/*")
        for res in resultFiles:
            os.remove(res)
    files = request.files.getlist('file')
    for file in files:
        filename = secure_filename(file.filename)
        destination = "/".join([target, filename])
        file.save(destination)
        session['uploadFilePath'] = destination
    ISCmain.main()
    return "Success"


# @app.route('/indexPrint')
# def indexPrint():
#     counter = 1
#     act = get_activities(readlog(path_poster))
#     act.insert(0, "Start Process " + str(counter))
#     act.insert(len(act), "End Process " + str(counter))
#     counter += 1
#     act1 = get_activities(readlog(path_bill))
#     act1.insert(0, "Start Process " + str(counter))
#     act1.insert(len(act1), "End Process " + str(counter))
#     counter += 1
#     act2 = get_activities(readlog(path_flyer))
#     act2.insert(0, "Start Process " + str(counter))
#     act2.insert(len(act2), "End Process " + str(counter))
#     counter += 1
#     dictio = ','.join(act)
#     dictio1 = ','.join(act1)
#     dictio2 = ','.join(act2)
#     final = dictio + "%" + dictio1 + "%" + dictio2
#     return final
#
# @app.route('/kpiPrint')
# def kpiPrint():
#     return getOrderAccuaracy(readlog(path_poster), readlog(path_flyer), readlog(path_bill))
# @app.route('/orderSummaryPrint')
# def orderSummaryPrint():
#     return getOrderSummary()
# @app.route('/orderPiePrint')
# def orderPiePrint():
#     return getOrderingISC()
# @app.route('/nonConKPIPrint')
# def nonConKPIPrint():
#     return
# @app.route('/nonConBarPrint')
# def nonConBarPrint():
#     return getNonConISCs(getNonConTotal())
# @app.route('/pairAllocationPrint')
# def pairAllocationPrint():
#     return getPairAllocation(getNonConTotal())
# @app.route('/indexManuf')
# def indexManuf():
#     return getAllActivities()
# @app.route('/kpiManuf')
# def kpiManuf():
#     return
# @app.route('/orderSummaryManuf')
# def orderSummaryManuf():
#     return
# @app.route('/orderPieManuf')
# def orderPieManuf():
#     return getManufOrderingISC()
# @app.route('/nonConKPIManuf')
# def nonConKPIManuf():
#     return
# @app.route('/nonConPieManuf')
# def nonConPieManuf():
#     return getManufNonConTotal()
# @app.route('/pairAllocationManuf')
# def pairAllocationManuf():
#     return getPairAllocation(getManufNonConTotal())
@app.route('/generalIndex')
def generalIndex():
    target = os.path.join(UPLOAD_FOLDER, 'upload')
    counter = 1
    finalString = ""
    for file in os.listdir(target):
        path = os.path.join(target, file)
        act = get_activities(readlog(path))
        act.insert(0, "Start Process " + str(counter))
        act.insert(len(act), "End Process " + str(counter))
        dictio = ",".join(act)
        finalString += dictio + "%"
        counter += 1
    finalString = finalString[:-1]
    return finalString
@app.route('/generalKPI')
def generalKPI():
    target = os.path.join(UPLOAD_FOLDER, 'upload')
    listOfLogs = []
    for file in os.listdir(target):
        log = readlog(os.path.join(target, file))
        listOfLogs.append(log)
    return getOrderObedience(listOfLogs)
@app.route('/generalOrderSummary')
def generalOrderSummary():
    return getGeneralOrderSummary()
@app.route('/generalOrderPie')
def generalOrderPie():
    return getGeneralOrderingISC()
@app.route('/generalNonConKPI')
def generalNonConKPI():
    return getNonConISCs(getGeneralNonConTotal())
@app.route('/generalNonConPie')
def generalNonConPie():
     return getNonConISCs(getGeneralNonConTotal())
@app.route('/generalPairAllocation')
def generalPairAllocation():
     return getPairAllocation(getGeneralNonConTotal())
if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)



CORS(app, expose_headers='Authorization')