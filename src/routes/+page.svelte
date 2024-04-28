<script context="module" lang="ts">
  import { Timer } from "$models/Timer";
</script>

<script lang="ts">
  let time = 10;
  let isRunning = false;

  const timer = new Timer(100);

  const onClick = () => {
    if (!isRunning) {
      start();
    } else {
      stop();
    }
  }

  const start = () => {
    isRunning = true;
    timer.start(time * 1000, (current: number) => {
      time = current / 1000;
    },() => {
      alert('done');
    });
  }

  const stop = () => {
    timer.stop();
    isRunning = false;
  }

</script>

<h1>hello pomodoro</h1>
<input type="number" name="" id="" bind:value={time}>
<button type="button" on:click={onClick}>{isRunning ? 'stop' : 'start'}</button>

<style lang="scss">
</style>
