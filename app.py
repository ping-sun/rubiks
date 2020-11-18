from flask import Flask, jsonify, render_template, request
import json
from CFOP import CFOP

app = Flask(__name__, template_folder="", static_folder="static", static_url_path='')

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('step6.html')

@app.route('/CFOP', methods=['GET', 'POST'])
def solution():
    if request.method == 'POST':
        serializedCube = request.form['cube'].split(',')
        cube = [[] for i in range(6)]
        for i in range(6):
            for j in range(9):
                cube[i].append(serializedCube[9*i+j])
        steps = CFOP(cube)
        print("CFOP result:", steps)
        return jsonify(steps)
    else:
        return jsonify("GET")

if __name__ == "__main__":
    app.run(debug=True)