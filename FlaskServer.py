from flask import Flask
from Meta import get_activities
from Meta import readlog
import os

app = Flask(__name__)
pat = os.getcwd()
#path_bill = os.path.join(pat, "data", "billinstances.xes")
#path_flyer = os.path.join(pat, "data", "flyerinstances.xes")
path_poster = os.path.join(pat, "data", "posterinstances.xes")
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz/bin/'

@app.route('/index')
def index():
    act = get_activities(readlog(path_poster))
    #dictio = dict.fromkeys(act)
    dictio = ','.join(act)
    return dictio



if __name__ == '__main__':
    app.run(debug=True)