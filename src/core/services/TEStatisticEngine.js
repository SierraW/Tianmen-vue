import {
  em_histories,
  timestamp,
  em_ass,
  db
} from "@/core/services/firebaseInit";
import ApiService from "@/core/services/api.service";

class TEStatisticEngine {
  constructor(fs_key, login) {
    this.pmrRef = em_ass(fs_key, "pmmr");
    this.dbRef = em_histories(fs_key);
    this.dbRefLoginFiltered = em_histories(fs_key).where("from", "==", login);
    this.loginDisplayNameMap = {};
  }

  query(type, startDate, endDate = new Date(), message = "") {
    return new Promise((resolve, reject) => {
      if (message == "") {
        this.dbRefLoginFiltered
          .where("type", "==", type)
          .where("time", ">=", timestamp(startDate))
          .where("time", "<", timestamp(endDate))
          .get()
          .then(querySnapshot => {
            resolve(querySnapshot.size);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        this.dbRefLoginFiltered
          .where("type", "==", type)
          .where("time", ">=", timestamp(startDate))
          .where("time", "<", timestamp(endDate))
          .get()
          .then(querySnapshot => {
            var result = 0;
            querySnapshot.forEach(doc => {
              var re = new RegExp(`.*"${message}:.*`, "g");
              if (re.test(doc.data().message)) {
                result++;
              }
            });
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  }

  // message part
  getDailyMessagesReport() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return this.query("Message", date);
  }

  async getComparisonDMR() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const tdby = new Date();
    tdby.setDate(date.getDate() - 1);
    tdby.setHours(0, 0, 0, 0);

    const reportNow = await this.getDailyMessagesReport();
    const reportPre = await this.query("Message", tdby, date);

    return this.toAttributedString(reportNow - reportPre);
  }

  toAttributedString(mag) {
    if (mag >= 0) {
      return {
        value: `+${mag}`,
        class: "text-success"
      };
    } else {
      return {
        value: mag,
        class: "text-danger"
      };
    }
  }

  // new cus
  getMonthlyNewCustomerReport() {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return this.query("create", date);
  }

  async getComparisonMNCR() {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);

    const before = new Date();
    before.setMonth(date.getMonth() - 1);
    before.setDate(1);
    before.setHours(0, 0, 0, 0);

    const reportNow = await this.getMonthlyNewCustomerReport();
    const reportPre = await this.query("create", before, date);

    return this.toAttributedString(reportNow - reportPre);
  }

  // progress
  getMonthlyProgressReport() {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return this.query("modify", date, new Date(), "progress");
  }

  async getComparisonMPR() {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);

    const before = new Date();
    before.setMonth(date.getMonth() - 1);
    before.setDate(1);
    before.setHours(0, 0, 0, 0);

    const reportNow = await this.getMonthlyProgressReport();
    const reportPre = await this.query("modify", before, date, "progress");

    return this.toAttributedString(reportNow - reportPre);
  }

  //project dummy
  getMonthProjectReport() {
    return 0;
  }

  // message top chart
  // [
  //     {
  //         display_name: "name",
  //         user_login: "login",
  //         subtitle: "sub",
  //         value: 123
  //     }

  // ]

  async getMessageTopChartFrom(mode) {
    var myRef = this.dbRef;

    if (mode === "d") {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      myRef = myRef.where("time", ">=", date);
    } else if (mode === "m") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth());
      lastMonth.setDate(1);
      lastMonth.setHours(0, 0, 0, 0);

      const before = new Date();
      before.setMonth(before.getMonth() - 1);
      before.setDate(1);
      before.setHours(0, 0, 0, 0);
      myRef = myRef.where("time", ">=", before).where("time", "<", lastMonth);
    } else if (mode === "a") {
      // do nothing
    } else {
      return [];
    }

    var messages = {};

    await myRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (this.isMessageRecord(doc)) {
          const from = doc.data().from;
          if (from in messages) {
            messages[from].value = messages[from].value + 1;
          } else {
            messages[from] = {
              user_login: from,
              subtitle: "Total message set",
              value: 1
            };
          }
        }
      });
    });

    var result = Object.values(messages).sort((lhs, rhs) => {
      return rhs.value - lhs.value;
    });
    if (result.length == 0) {
      result.push({
        display_name: "Empty",
        user_login: "-",
        subtitle: "-",
        value: 0
      });
      return result;
    }

    return this.assignNameTo(result);
  }

  isMessageRecord(doc) {
    return doc.data().type === "Message";
  }

  async assignNameTo(reports) {
    for (var i = 0; i < reports.length; i++) {
      const login = reports[i].user_login;
      if (!this.loginDisplayNameMap[login]) {
        await this.getDisplayName(login)
          .then(({ data }) => {
            this.loginDisplayNameMap[login] = data.data.display_name;
          })
          .catch(() => {
            this.loginDisplayNameMap[login] = "Unknown";
          });
      }
      reports[i].display_name = this.loginDisplayNameMap[login];
    }
    return reports;
  }

  getDisplayName(login) {
    return ApiService.post("getDisplayName.php", {
      user_login: login
    });
  }

  async generatePMReport() {
    var size = 0;
    await this.pmrRef.get().then(querySnapshot => {
      size = querySnapshot.size;
    });

    if (size === 0) {
      var gen = await this.getMessageTopChartFrom("m");
      var len = gen.length;
      var batch = db.batch();

      for (var i = 0; i < len; i++) {
        console.log(gen[i]);
        batch.set(this.pmrRef.doc(`a${i}`), gen[i]);
      }

      await batch.commit();
    }
  }

  getPMReport() {
    var instance = this;
    return new Promise(resolve => {
      instance.pmrRef.onSnapshot(async querySnapshot => {
        if (querySnapshot.size === 0) {
          await this.generatePMReport();
        }
        var items = [];

        querySnapshot.forEach(doc => {
          items.push({
            display_name: doc.data().display_name,
            user_login: doc.data().user_login,
            acceptanceSpeech: doc.data().acceptanceSpeech,
            subtitle: doc.data().subtitle,
            value: doc.data().value
          });
        });
        resolve(items);
      });
    });
  }

  setSpeechOnPMR(index, speech) {
    this.pmrRef.doc(`a${index}`).update({ acceptanceSpeech: speech });
  }
}

export default TEStatisticEngine;
