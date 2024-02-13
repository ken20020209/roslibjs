<script setup>
import roslib from "roslib";
import { ref } from "vue";
const ros = new roslib.Ros({
  url: "ws://localhost:9090",
});


const status = ref("connecting");

ros.on("error", function (error) {
  status.value = "error";
  console.log(error);
});

// Find out exactly when we made a connection.
ros.on("connection", function () {
  console.log("Connection made!");

  status.value = "connected";
});

ros.on("close", function () {
  console.log("Connection closed.");

  status.value = "closed";
});
const fibonacciServer = new roslib.Action({
  ros: ros,
  name: "/fibonacci",
  actionType: "action_tutorials_interfaces/Fibonacci",
});

var actionCallback = function (goal, id) {
  console.log(
    "Received action goal on " + fibonacciServer.name + ", order: " + goal.order
  );
  console.log("ID: " + id);
  let fibonacciSequence = [];
  fibonacciSequence.push(0);
  fibonacciSequence.push(1);

  // failure case
  if (goal.order > 47) {
    console.log("Aborting. Value will exceed maximum signed integer value.");
    fibonacciServer.setFailed(id);
    return;
  }

  // publish feedback
  for (var i = 1; i < goal.order; i++) {
    fibonacciSequence.push(fibonacciSequence[i] + fibonacciSequence[i - 1]);
    console.log("Sending feedback: " + fibonacciSequence);
    fibonacciServer.sendFeedback(id, { partial_sequence: fibonacciSequence });
  }

  // send result
  console.log("Sending result: " + fibonacciSequence);
  fibonacciServer.setSucceeded(id, { sequence: fibonacciSequence });
};
var cancelCallback = function (id) {
  console.log("Canceled action with goal ID " + id);
};

fibonacciServer.advertise(actionCallback, cancelCallback);
</script>
<template>
  <h1>Fibonacci ActionServer Example</h1>
  <p>
    Run the following commands in the terminal then refresh this page. Check the
    JavaScript console for the output.
  </p>
  <ol>
    <li>
      <tt>ros2 launch rosbridge_server rosbridge_websocket_launch.xml</tt>
    </li>
    <li><tt>refresh this page</tt></li>
    <li>
      <tt>ros2 run action_tutorials_py fibonacci_action_client</tt>
      <br />or<br />
      <tt
        >ros2 action send_goal --feedback /fibonacci
        action_tutorials_interfaces/action/Fibonacci order:\ 20\
      </tt>
    </li>
  </ol>
  <div id="statusIndicator">
    <p id="connecting" v-if="status === 'connecting'">
      Connecting to rosbridge...
    </p>
    <p id="connected" style="color: #00d600" v-if="status === 'connected'">
      Connected
    </p>
    <p id="error" style="color: #ff0000" v-if="status === 'error'">
      Error in the backend!
    </p>
    <p id="closed" v-if="status === 'closed'">Connection closed.</p>
  </div>
</template>
