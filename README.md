# ISC Mining Prototype Extensions

This repository contains the implementation of an Instance Spanning Constraint (ISC) mining graphical user interface. The implementation of this application is built upon the fundamentals, principles and ISC discovery algorithms presented in the paper [Discovering instance and process spanning constraints from process execution logs](https://www.sciencedirect.com/science/article/pii/S0306437919305368) and the paper [SVIPEX: A Web Service for Discovering and Visualizing Instance Spanning Constraints based on Process Execution Logs](http://ceur-ws.org/Vol-2673/paperDR11.pdf) as well the project found in the [ISC-Mining 2020 GitHub Repository](https://github.com/WinterKaro/iscmining-infsys20).


*Two Seperate Command Terminals need to be opened simultaneously to run the application: one for the server side and one for the client side*
## Server Side
Depending on the python version on the operating system `pip3` and `python3` would need to be used.
###### Optional

Create Python Virtual Environment

`$ python -m venv <name_of_virtualenv>`

Activate Virtual Environment

`$ /<name_of_virtualenv>/bin/activate`

###### Installing Dependencies
`$ pip install -r requirements.txt`

###### Running the Application
`$ python FlaskServer.py`


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
## Licenses
The PM4Py framework was utilized in this project. [PM4Py License](https://github.com/pm4py/pm4py-core/blob/release/LICENSE)
