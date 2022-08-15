const spawner = require("child_process").spawn;

const data_to_pass_in = ["send this to python script"];

console.log("Data sent to python script");

const python_process = spawner("python", [
  "./python.py",
  JSON.stringify(data_to_pass_in),
]);

python_process.stdout.on("data", (data: any) => {
  console.log("Data received from python script:", JSON.parse(data.toString()));
});
