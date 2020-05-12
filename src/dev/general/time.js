export class Time {
  constructor(firstTimestamp){
    this.firstTimestamp = firstTimestamp;
    this.currentTimestamp = firstTimestamp;
    this.previousTimestamp = 0;
    this.deltaTime = 0;
  }

  nextStamp(timestamp){
    this.previousTimestamp = this.currentTimestamp;
    this.currentTimestamp = timestamp;
    this.deltaTime = this.currentTimestamp - this.previousTimestamp;
  }

  getDeltaTime(){
    return this.deltaTime;
  }
}