# ISC Mining Prototype Extensions

This repository contains the implementation of an Instance Spanning Constraint (ISC) mining graphical user interface. The implementation of this application is built upon the fundamentals, principles and ISC discovery algorithms presented in the paper [Discovering instance and process spanning constraints from process execution logs](https://www.sciencedirect.com/science/article/pii/S0306437919305368) and the paper [SVIPEX: A Web Service for Discovering and Visualizing Instance Spanning Constraints based on Process Execution Logs](http://ceur-ws.org/Vol-2673/paperDR11.pdf) as well the project found in the [ISC-Mining 2020 GitHub Repository](https://github.com/WinterKaro/iscmining-infsys20).


*Two Seperate Command Terminals need to be opened simultaneously to run the application: one for the server side and one for the client side.* 
The client application can be run independantly and will show the results of two sample datasets. *But please note:*
**Please make sure to run the server application first in order to obtain upload functionality.**


## Server Side
Depending on the python version installed on the operating system `pip3` and `python3` would need to be used.
###### Optional

Create Python Virtual Environment

`$ python -m venv <name_of_virtualenv>`

Activate Virtual Environment

`$ /<name_of_virtualenv>/bin/activate`

###### Installing Dependencies
`$ pip install -r requirements.txt`

###### Running the Application
`$ python FlaskServer.py`

###### **Important Notes**
*In case there are issues with the installment of GraphViz:*

**MacOs**

`brew install graphviz`

**Linux**

`sudo apt-get install graphviz`

[This](https://stackoverflow.com/questions/28312534/graphvizs-executables-are-not-found-python-3-4) may also be helpful.
## Client Side
In the new command terminal navigate into the client application folder using the command `cd client`
###### Optional: 

**If Nodejs is not installed on the operating system**

`$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`

`$ nvm install 14.4.0`

###### Installing Dependencies
`npm install`
###### Running the Application
`npm start`

###### **Important Notes**
*While using the application please note that:*

- When files are uploaded, it takes around 60s-120s until the results appear on the screen. Please leave the browser session open.
- The above also applies to navigating between the ordering and non-concurrent tabs for an upload. Response Time: 10s-30s

## Licenses
The PM4Py framework was utilized in this project. [PM4Py License](https://github.com/pm4py/pm4py-core/blob/release/LICENSE)
