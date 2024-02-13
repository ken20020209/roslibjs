<script setup>
import roslib from "roslib";
import { ref } from "vue";
const ros = new roslib.Ros({
    url: "ws://localhost:9090",
});

const fibonacciClient = new roslib.Action({
    ros: ros,
    name: "/fibonacci",
    actionType: "action_tutorials_interfaces/Fibonacci",
});

const status = ref("connecting");

ros.on('error', function (error) {

    status.value = "error";
    console.log(error);
});

// Find out exactly when we made a connection.
ros.on('connection', function () {
    console.log('Connection made!');

    status.value = "connected";
});

ros.on('close', function () {
    console.log('Connection closed.');
    
    status.value = "closed";
});

const goal = { order: 5 };
const goal_id = fibonacciClient.sendGoal(
    goal,
    (result) => {
        console.log(
            "Result for action goal on " +
            fibonacciClient.name +
            ": " +
            result.result.sequence
        );
    },
    (feedback) => {
        console.log(
            "Feedback for action on " +
            fibonacciClient.name +
            ": " +
            feedback.partial_sequence
        );
    }
);
</script>
<template>
    <h1>Fibonacci ActionClient Example</h1>
    <p>Run the following commands in the terminal then refresh this page. Check the JavaScript
        console for the output.</p>
    <ol>
        <li><tt>ros2 launch rosbridge_server rosbridge_websocket_launch.xml</tt></li>
        <li><tt>ros2 run action_tutorials_py fibonacci_action_server</tt></li>
    </ol>
    <div id="statusIndicator" >
        <p id="connecting" v-if="status==='connecting'">
            Connecting to rosbridge...
        </p>
        <p id="connected" style="color:#00D600;" v-if="status==='connected'">
            Connected
        </p>
        <p id="error" style="color:#FF0000;" v-if="status==='error'">
            Error in the backend!
        </p>
        <p id="closed" v-if="status==='closed'">
            Connection closed.
        </p>
    </div>
</template>
