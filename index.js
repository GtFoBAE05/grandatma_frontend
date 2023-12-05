const url = "https://grandatma-api-gtfobae05.vercel.app/api/";

function formattedDate(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    return `${day < 10 ? "0" : ""}${day}-${month}-${year} ${hour}:${minutes}`;
}

function formattedDateWithoutTime(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day < 10 ? "0" : ""}${day}-${month}-${year}`;
}

function isTwoMonthsAhead(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(currentDate.getMonth() + 2);

    return inputDate > twoMonthsLater;
}

function formatDate(date) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
}

class ConfirmDialog {
    constructor({ questionText, trueButtonText, falseButtonText, parent }) {
        this.questionText = questionText || "Are you sure?";
        this.trueButtonText = trueButtonText || "Yes";
        this.falseButtonText = falseButtonText || "No";
        this.parent = parent || document.body;

        this.dialog = undefined;
        this.trueButton = undefined;
        this.falseButton = undefined;

        this._createDialog();
        this._appendDialog();
    }

    confirm() {
        return new Promise((resolve, reject) => {
            const somethingWentWrongUponCreation =
                !this.dialog || !this.trueButton || !this.falseButton;
            if (somethingWentWrongUponCreation) {
                reject("Someting went wrong when creating the modal");
                return;
            }

            this.dialog.showModal();
            this.trueButton.focus();

            this.trueButton.addEventListener("click", () => {
                resolve(true);
                this._destroy();
            });

            this.falseButton.addEventListener("click", () => {
                resolve(false);
                this._destroy();
            });
        });
    }

    _createDialog() {
        this.dialog = document.createElement("dialog");
        this.dialog.classList.add("confirm-dialog");

        const question = document.createElement("div");
        question.textContent = this.questionText;
        question.classList.add("confirm-dialog-question");
        this.dialog.appendChild(question);

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("confirm-dialog-button-group");
        this.dialog.appendChild(buttonGroup);

        this.falseButton = document.createElement("button");
        this.falseButton.classList.add(
            "confirm-dialog-button",
            "confirm-dialog-button--false"
        );
        this.falseButton.type = "button";
        this.falseButton.textContent = this.falseButtonText;
        buttonGroup.appendChild(this.falseButton);

        this.trueButton = document.createElement("button");
        this.trueButton.classList.add(
            "confirm-dialog-button",
            "confirm-dialog-button--true"
        );
        this.trueButton.type = "button";
        this.trueButton.textContent = this.trueButtonText;
        buttonGroup.appendChild(this.trueButton);
    }

    _appendDialog() {
        this.parent.appendChild(this.dialog);
    }

    _destroy() {
        this.parent.removeChild(this.dialog);
        delete this;
    }
}

class Toast {
    constructor(message) {
        this.message = message;
        this.toast = document.createElement("div");
        this.toast.id = "toast";
        this.toast.innerHTML = `<p>${this.message}</p>`;
        document.body.appendChild(this.toast);
    }
    show() {
        this.toast.classList.add("show");
        setTimeout(() => {
            this.toast.classList.remove("show");
        }, 3000); // Hide after 3 seconds
    }
}

module.exports = { url, formattedDate, isTwoMonthsAhead };
