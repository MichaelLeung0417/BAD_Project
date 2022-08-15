import sys
import json
import ast

# data_to_pass_back = 'Send this to node process'

input = sys.argv[1]
capWord = input.upper()
output = capWord
# output.append(data_to_pass_back)
print(json.dumps(output))

sys.stdout.flush()