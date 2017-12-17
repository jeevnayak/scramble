import Constants from "./constants.js";

export class RootRecord extends quip.apps.RootRecord {
  static getProperties = () => ({
    seed: "string",
    results: quip.apps.RecordList.Type(ResultRecord),
  });

  static getDefaultProperties = () => ({
    results: [],
  });

  getResults() {
    return this.get("results").getRecords();
  }

  createResultForViewingUser() {
    const user = quip.apps.getViewingUser();
    if (!user) {
      return;
    }

    this.get("results").add({
      userId: user.getId(),
    });
  }

  getResultForViewingUser() {
    const user = quip.apps.getViewingUser();
    if (!user) {
      return null;
    }

    return this.getResults().find(
      (result) => result.get("userId") === user.getId());
  }

  getCompletedResults() {
    return this.getResults()
      .filter((result) => (
        getSecondsRemaining(result.get("startTime")) <= 0 && result.getUser()))
      .sort((r1, r2) => r2.getScore() - r1.getScore());
  }
}
quip.apps.registerClass(RootRecord, "root-record");

export class ResultRecord extends quip.apps.Record {
  static getProperties = () => ({
    userId: "string",
    startTime: "number",
    completed: "array",
    currentScramble: "string",
  });

  static getDefaultProperties = () => ({
    startTime: Date.now(),
    completed: [],
  });

  getUser() {
    return quip.apps.getUserById(this.get("userId"));
  }

  getScore() {
    return this.get("completed").length;
  }

  completeScramble(answer, nextScramble) {
    let completed = this.get("completed");
    completed.push({
      answer: answer,
      time: Date.now(),
    });
    this.set("completed", completed);
    this.set("currentScramble", nextScramble);
  }
}
quip.apps.registerClass(ResultRecord, "result-record");

export function getSecondsRemaining(startTime, currentTime) {
  currentTime = currentTime || Date.now();
  const secondsElapsed = Math.floor((currentTime - startTime) / 1000);
  return Constants.GAME_SECONDS - secondsElapsed;
}
