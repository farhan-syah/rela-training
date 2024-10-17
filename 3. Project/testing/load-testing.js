import { check } from "k6";
import exec from "k6/execution";
import http from "k6/http";
import { Counter } from "k6/metrics";

export const options = {
  scenarios: {
    // ramping: {
    //   executor: "ramping-vus",
    //   startVUs: 0,
    //   stages: [{ duration: "10s", target: 5000 }],
    //   gracefulStop: "5s",
    // },
    // shared: {
    //   executor: "shared-iterations",
    //   vus: 300,
    //   iterations: 1500000,
    //   maxDuration: "10s",
    //   gracefulStop: "5s",
    // },
    vu: {
      executor: "per-vu-iterations",
      vus: 5000,
      iterations: 1000,
      maxDuration: "20s",
      gracefulStop: "5s",
    },
  },
};
const myCounter = new Counter("my_counter", false);

export default function () {
  let res = http.get("http://backend.rela.farhansyah.com");

  let checkStatus = check(res, {
    "status code MUST be 200": (res) => res.status == 200,
  });

  if (!checkStatus) {
    exec.test.abort();
  }
  // let ipAddress = JSON.parse(res.body).ipAddress;
  // console.log(ipAddress);
  // myCounter.add(1, { ipAddress: ipAddress });
}
