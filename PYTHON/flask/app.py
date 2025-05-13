from flask import Flask, render_template
from modules import reportes, aire, censo, educacion, movilidad

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/aire')
def mostrar_aire():
    return aire.mostrar_reportes()

@app.route('/censo')
def mostrar_censo():
    return censo.mostrar_reportes()

@app.route('/educacion')
def mostrar_educacion():
    return educacion.mostrar_reportes()

@app.route('/movilidad')
def mostrar_movilidad():
    return movilidad.mostrar_reportes()

@app.route('/reportes')
def mostrar_reportes():
    return reportes.mostrar_reportes()


if __name__ == '__main__':
    app.run(debug=True)