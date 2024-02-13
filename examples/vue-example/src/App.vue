<script setup>
import ros2_action_client from './components/ros2_action_client.vue';
import ros2_action_server from './components/ros2_action_server.vue';
import simple from './components/simple.vue';
</script>

<template>
  <main>
    <ros2_action_client />
    <ros2_action_server />
    <simple />
  </main>
</template>
