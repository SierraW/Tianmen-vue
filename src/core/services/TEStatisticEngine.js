import { em_histories, timestamp } from "@/core/services/firebaseInit";
import ApiService from "@/core/services/api.service";

class TEStatisticEngine {
    constructor(fs_key, login) {
        this.dbRef = em_histories(fs_key);
        this.dbRefLoginFiltered = em_histories(fs_key).where("from", "==", login);
    }

    query(type, startDate, endDate = new Date(), message = "") {
        return new Promise((resolve, reject) => {
            if (message == "") {
                this.dbRefLoginFiltered
                    .where("type", "==", type)
                    .where("time", ">=", timestamp(startDate))
                    .where("time", "<", timestamp(endDate))
                    .get()
                    .then((querySnapshot) => {
                        resolve(querySnapshot.size);
                    })
                    .catch((err) => {

                        reject(err);
                    });
            } else {
                this.dbRefLoginFiltered
                    .where("type", "==", type)
                    .where("time", ">=", timestamp(startDate))
                    .where("time", "<", timestamp(endDate))
                    .get()
                    .then((querySnapshot) => {
                        var result = 0;
                        querySnapshot.forEach((doc) => {
                            var re = new RegExp(`.*"${message}:.*`, 'g');
                            if (re.test(doc.data().message)) {
                                result++;
                            }

                        })
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        })
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
                class: 'text-success'
            }
        } else {
            return {
                value: mag,
                class: 'text-danger'
            }
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
    async getTopchartToday() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        date.setHours(0, 0, 0, 0);

        var messages = {};

        await this.dbRef.where("time", ">=", date)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (this.isMessageRecord(doc)) {
                        const from = doc.data().from;
                        if (from in messages) {
                            messages[from].value = messages[from].value + 1
                        } else {
                            messages[from] = {
                                display_name: this.getDisplayName(from),
                                user_login: from,
                                subtitle: "Total message set",
                                value: 1
                            }
                        }
                    }
                })
            })
        
        return Object.values(messages).sort((lhs, rhs) => {
            return rhs.value - lhs.value;
        })
    }

    isMessageRecord(doc) {
        return doc.data().type === "Message";
    }

    getDisplayName(login) {
        ApiService.post("getDisplayName.php", {
            user_login: login
        })
            .then(({ data }) => {
                return data.data.display_name;
            })
            .catch(() => {
                return "Unknown";
            });
    }
}

export default TEStatisticEngine;
