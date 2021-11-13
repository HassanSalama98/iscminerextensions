from flask import Flask, request, session
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from Meta import readlog, get_activities
from Meta import getOrderObedience, getGeneralOrderSummary
from main import getGeneralOrderingISC, getGeneralNonConTotal, getTimeDifference
from main import getPairAllocation, getNonConISCs
import os
import ISCmain
import glob

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'data')
ALLOWED_EXTENSIONS = {'xes'}
app = Flask(__name__)
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
    return getTimeDifference()
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