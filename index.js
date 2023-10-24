const url = "http://localhost:3000/api/";

function formattedDate(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${day < 10 ? "0" : ""}${day}-${month}-${year} ${hour}:${minutes}`;
}

module.exports = { url, formattedDate };
