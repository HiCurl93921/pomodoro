export class Timer {
  private readonly thick: number;
  private interval: NodeJS.Timeout | undefined = undefined;

  constructor(thick: number = 1000) {
    this.thick = thick;
  }

  async start(time: number, onThick: (current: number) => void, onEnd: () => void = () => {}) {
    this.interval = await setInterval(() => {
      time -= this.thick;
      onThick(time);

      if (time <= 0) {
        clearInterval(this.interval);
        onEnd();
        return;
      }
    }, this.thick);
  }

  async stop() {
    if (this.interval) {
      await clearInterval(this.interval);
    }
  }
}