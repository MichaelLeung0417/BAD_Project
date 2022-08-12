from sanic import Sanic
from sanic.response import json
from pathlib import os
from datetime import datetime
import tensorflow as tf

config = {}
config["upload"] = "./uploads"

class_names = ['apple', 'orange', 'others']

app = Sanic("smartchi")

model = tf.saved_model.load('./apple-orange-app/saved_model/apple_orange_model')

@app.route("/hello", methods=['GET'])
def hello(request):
    return json({ "result":"It is working~" })

@app.route("/upload", methods=['POST'])
def post_json(request):
    if not os.path.exists(config["upload"]):
        os.makedirs(config["upload"])
    test_file = request.files.get('file')
    file_parameters = {
        'body': test_file.body,
        'name': test_file.name,
        'type': test_file.type,
    }
    if file_parameters['name'].split('.')[-1] == 'pdf':
        file_path = f"{config['upload']}/{str(datetime.now())}.pdf"
        with open(file_path, 'wb') as f:
            f.write(file_parameters['body'])
        f.close()
        print('file wrote to disk')

        return json({ "received": True, "file_names": request.files.keys(), "success": True })
    else:
        return json({ "received": False, "file_names": request.files.keys(), "success": False, "status": "invalid file uploaded" })






if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080)
