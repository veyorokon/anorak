export function clearToken() {
  localStorage.removeItem("sessionToken");
}

export function getToken() {
  try {
    const idToken = localStorage.getItem("sessionToken");
    return idToken;
  } catch (err) {
    clearToken();
    return null;
  }
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = number => {
    return number > 1 ? "s" : "";
  };
  const number = num => (num > 9 ? "" + num : "0" + num);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + " day" + numberEnding(days);
      } else {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return "a few seconds ago";
  };
  return getTime();
}

export function stringToInt(value, defValue = 0) {
  if (!value) {
    return 0;
  } else if (!isNaN(value)) {
    return parseInt(value, 10);
  }
  return defValue;
}
export function stringToPosetiveInt(value, defValue = 0) {
  const val = stringToInt(value, defValue);
  return val > -1 ? val : defValue;
}

export function getMemberStatus(value) {
  if (value === "A_0") return "Payment Failed";
  if (value === "A_10") return "Kicked";
  if (value === "A_20") return "Canceled";
  if (value === "A_30") return "Pending";
  if (value === "A_40") return "Pending Invite";
  if (value === "A_50") return "Pending Creation";
  if (value === "A_51") return "Pending Connection";
  if (value === "A_55") return "Confirmation Required";
  if (value === "A_60") return "Pending Update";
  if (value === "A_90") return "Active";
  if (value === "A_91") return "Connected";
}

export function getMemberColor(value) {
  if (value === "A_0") return "danger";
  if (value === "A_10") return "danger";
  if (value === "A_20") return "danger";
  if (value === "A_30") return "warning";
  if (value === "A_40") return "warning";
  if (value === "A_50") return "warning";
  if (value === "A_51") return "warning";
  if (value === "A_55") return "warning";
  if (value === "A_60") return "warning";
  if (value === "A_90") return "success";
  if (value === "A_91") return "success";
}
export function isAccountConfirmationNeeded(value) {
  if (value === "A_35") return true;
  return false;
}

export function getAccountStatus(value) {
  if (value === "A_0") return "Terminated";
  if (value === "A_10") return "Canceled";
  if (value === "A_15") return "Pending Cancellation";
  if (value === "A_20") return "Pending";
  if (value === "A_29") return "Creating";
  if (value === "A_30") return "Connecting";
  if (value === "A_35") return "Confirmation Needed";
  if (value === "A_80") return "Active";
  if (value === "A_90") return "Active";
  if (value === "A_91") return "Connected";
}

export function isAccountStatusActive(value) {
  var status = value.split("A_")[1];
  if (status >= 80) return true;
  return false;
}

export function getAccountColor(value) {
  if (value === "A_0") return "danger";
  if (value === "A_10") return "muted";
  if (value === "A_15") return "muted";
  if (value === "A_20") return "warning";
  if (value === "A_29") return "warning";
  if (value === "A_30") return "warning";
  if (value === "A_35") return "warning";
  if (value === "A_80") return "success";
  if (value === "A_90") return "success";
  if (value === "A_91") return "success";
}

export function getPlanFrequency(value) {
  if (value === "A_0") return "Daily";
  if (value === "A_10") return "Weekly";
  if (value === "A_20") return "Monthly";
  if (value === "A_30") return "Yearly";
}

export function calcAnorakFee(value) {
  var fee = (value * 0.03 + 0.5).toFixed(2);
  if (fee <= 5.0) return fee;
  return (5.0).toFixed(2);
}

export function formatDateTime(value) {
  return value.split("T")[0];
}

export function formatEpochTime(value) {
  var dateObj = new Date(0);
  dateObj.setUTCSeconds(value);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  return month + "/" + day + "/" + year;
}

export function getRenewalDate(value) {
  if (value === "A_0") return "N/a";
  if (value === "A_1") return "N/a";
  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  var month = m + 1;
  var year = y;
  var day = new Date(year, month, 0).getDate();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  var output = year + "-" + month + "-" + day;
  return output;
}

const stripeAPIKey = "pk_test_rLuroFoR4XKOxb3FbmJqTqrh";

const mixpanel = require("mixpanel-browser");
mixpanel.init("a1c48cab157e61bdb24c9b6756de12b8", { debug: true, verbose: 1 });
export { mixpanel, stripeAPIKey };
