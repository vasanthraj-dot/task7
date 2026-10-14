
const missionInput = document.getElementById("inp");
const addButton = document.getElementById("addBtn");
const missionList = document.getElementById("missionList");
const themeButton = document.getElementById("colorBtn");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");
const emptyMessage = document.getElementById("emptyMessage");

function updateCounts() {
    const missions = missionList.querySelectorAll("li");
    const finished = missionList.querySelectorAll("li.done").length;

    totalCount.textContent = missions.length;
    completedCount.textContent = finished;
    pendingCount.textContent = missions.length - finished;

    emptyMessage.hidden = missions.length !== 0;
}

function addMission() {
    const missionText = missionInput.value.trim();

    if (missionText === "") {
        missionInput.focus();
        return;
    }

    const item = document.createElement("li");
    const missionName = document.createElement("span");
    const finishBox = document.createElement("input");
    const deleteButton = document.createElement("button");

    finishBox.type = "checkbox";
    finishBox.setAttribute("aria-label", "Mark mission as complete");

    missionName.textContent = missionText;
    missionName.title = "Click to change mission status";

    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.className = "deleteBtn";

    function changeStatus() {
        item.classList.toggle("done", finishBox.checked);
        updateCounts();
    }

    finishBox.addEventListener("change", changeStatus);

    missionName.addEventListener("click", function () {
        finishBox.checked = !finishBox.checked;
        changeStatus();
    });

    deleteButton.addEventListener("click", function () {
        item.remove();
        updateCounts();
    });

    item.append(finishBox, missionName, deleteButton);
    missionList.appendChild(item);

    missionInput.value = "";
    missionInput.focus();
    updateCounts();
}

addButton.addEventListener("click", addMission);

missionInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addMission();
    }
});

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("night");

    themeButton.textContent =
        document.body.classList.contains("night")
            ? "Light Theme"
            : "Dark Theme";
});

updateCounts();
