import speech
import sys
import json
import ast

input = sys.argv[1]

result = speech.predict_sentiment(input)

output = result

print(json.dumps(output))

sys.stdout.flush()

