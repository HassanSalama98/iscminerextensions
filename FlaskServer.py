from flask import Flask
from Meta import get_activities
from Meta import readlog
from Meta import getOrderAccuaracy
import os

app = Flask(__name__)
pat = os.getcwd()
#path_bill = os.path.join(pat, "data", "billinstances.xes")
#path_flyer = os.path.join(pat, "data", "flyerinstances.xes")
path_poster = os.path.join(pat, "data", "posterinstances.xes")
path_bill = os.path.join(pat, "data", "billinstances.xes")
path_flyer = os.path.join(pat, "data", "flyerinstances.xes")
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz/bin/'

@app.route('/index')
def index():
    act = get_activities(readlog(path_poster))
    act1 = get_activities(readlog(path_bill))
    act2 = get_activities(readlog(path_flyer))
    #dictio = dict.fromkeys(act)
    dictio = ','.join(act)
    dictio1 = ','.join(act1)
    dictio2 = ','.join(act2)
    final = dictio + "%" + dictio1 + "%" + dictio2
    return final

@app.route('/KPI')
def KPI():
    return getOrderAccuaracy(readlog(path_poster), readlog(path_flyer), readlog(path_bill))

if __name__ == '__main__':
    app.run(debug=True)