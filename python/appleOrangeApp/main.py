from sanic import Sanic
from sanic.response import json
from pathlib import os
from datetime import datetime
import tensorflow as tf
import speech


from cors import add_cors_headers
from options import setup_options



# config = {}
# config["upload"] = "./uploads"

# class_names = ['apple', 'orange', 'others']

app = Sanic("smartchi")

@app.route("/")
def hello(request):
    return json({"message": "hello"})



# model = tf.saved_model.load('./apple-orange-app/saved_model/apple_orange_model')



# @app.route("/", methods=['POST'])
# def speech(request):
    
#     print (request.body)
#     # result = speech.predict_sentiment("happy")
#     return json({ "result": request.body })


@app.route("/query_string")
def query_string(request):
    try:
  
        toBeProccessed = request.args["a"][0]
        print(toBeProccessed)

        result = speech.predict_sentiment(toBeProccessed)

        return json(result)
    except Exception as ex:
        print(ex)
        return json({"error":"true"})

# UPLOAD_FOLDER = r'.\uploads'
# ALLOWED_EXTENSIONS = ['.jpg','.png','.jpeg']

# def allowed_file(filename):
#     _, ext = os.path.splitext(filename)
#     return ext.lower() in ALLOWED_EXTENSIONS

# @app.route("/upload", methods=['POST'])
# async def omo(request):
#     if request.files.get('myFile', None):
#         print(request.files.get('file'))

#     return json({"ok":"ok"})





# @app.route("/speech", method=['POST'])
# def speechSentiment(request):
#     print(request.body)
#     return json({"gotSpeech": "yes"})

# @app.route("/upload", methods=['POST'])
# def post_json(request):
#     if not os.path.exists(config["upload"]):
#         os.makedirs(config["upload"])
#     test_file = request.files.get('file')
#     file_parameters = {
#         'body': test_file.body,
#         'name': test_file.name,
#         'type': test_file.type,
#     }
#     if file_parameters['name'].split('.')[-1] == 'pdf':
#         file_path = f"{config['upload']}/{str(datetime.now())}.pdf"
#         with open(file_path, 'wb') as f:
#             f.write(file_parameters['body'])
#         f.close()
#         print('file wrote to disk')

#         return json({ "received": True, "file_names": request.files.keys(), "success": True })
#     else:
#         return json({ "received": False, "file_names": request.files.keys(), "success": False, "status": "invalid file uploaded" })


# Add OPTIONS handlers to any route that is missing it
app.register_listener(setup_options, "before_server_start")

# Fill in CORS headers
app.register_middleware(add_cors_headers, "response")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080)
