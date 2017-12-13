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
}
quip.apps.registerClass(RootRecord, "root-record");

export class ResultRecord extends quip.apps.Record {
  static getProperties = () => ({
    userId: "string",
    startTime: "number",
  });

  static getDefaultProperties = () => ({
    startTime: Date.now(),
  });
}
quip.apps.registerClass(ResultRecord, "result-record");
