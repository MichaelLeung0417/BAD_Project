const spawner = require("child_process").spawn;

const data_to_pass_in = "happy";

console.log("Data sent to python script");

const python_process = spawner("python", [
  "../python/apple-orange-app/actualSentimentApp.py",
  JSON.stringify(data_to_pass_in),
]);

python_process.stdout.on("data", (data: any) => {
  console.log("Data received from python script:", JSON.parse(data.toString()));
});
