import { Timer } from "./Timer"

export class ProgramTimer {
    private readonly program: number[]
    private readonly timer: Timer
    private currentStep: number = 0
    private currentTime: number

    constructor(program: number[], tick: number = 1000) {
        this.program  = program
        this.timer = new Timer(tick)
        this.currentTime = this.program[0]
    }

    /**
     * タイマーを開始します。
     * @param onThick tick毎に呼び出される、タイマー現在時間[ms]を引数に取るコールバック
     * @param onEnd タイマー終了時に呼び出される、タイマー現在時間[ms]を引数に取るコールバック
     */
    async start(onThick: (time: number) => void, onEnd: (time: number) => void = () => {}) {
        await this.timer.start(this.currentTime, (time) => {
            this.currentTime = time
            onThick(time)
        }, () => {
            // 最後の要素に達したら最初に戻る
            this.gotoNext()
            onEnd(this.currentTime)
        })
    }

    /**
     * タイマーを停止します。
     */
    async stop() {
        await this.timer.stop()
    }

    /**
     * 次のステップに進み、次の時間を返します。
     */
    gotoNext(): number {
        this.currentStep = this.currentStep === this.program.length - 1 ? 0 : this.currentStep + 1
        this.currentTime = this.program[this.currentStep]
        return this.currentTime
    }

    /**
     * 現在のステップを返します。
     * @returns 現在のステップ
     */
    getStep(): number {
        return this.currentStep
    }
}