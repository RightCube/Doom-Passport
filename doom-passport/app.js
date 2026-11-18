const STORAGE_KEY = "doomPassport";

let wads = [
    { name: "Doom II Reloaded", status: "completed", icon: "🟦" },
    { name: "Hell on Earth Starter Pack", status: "completed", icon: "🔥" },
    { name: "Extermination Day", status: "completed", icon: "💀" },
    { name: "Ancient Aliens", status: "completed", icon: "😈" },
    { name: "Valiant", status: "completed", icon: "🔥" },

    { name: "No End In Sight", status: "pending", icon: "💀" },
    { name: "Scythe", status: "pending", icon: "🟦" },
    { name: "Mutiny", status: "pending", icon: "🔥" },

    { name: "Deus Vult II", status: "hardcore", icon: "👹" },
    { name: "Sunder", status: "hardcore", icon: "👹" },
    { name: "Speed of Doom", status: "hardcore", icon: "🔥" }
];

function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(wads)
    );

}

function loadState() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (saved) {

        wads = JSON.parse(saved);

    }

}

function renderPassport() {

    const completedList =
        document.getElementById("completed-list");

    const pendingList =
        document.getElementById("pending-list");

    const hardcoreList =
        document.getElementById("hardcore-list");

    const completedCountElement =
        document.getElementById("completed-count");

    const activeCountElement =
        document.getElementById("active-count");

    const progressPercentElement =
        document.getElementById("progress-percent");

    const progressFill =
        document.getElementById("progress-fill");

    completedList.innerHTML = "";
    pendingList.innerHTML = "";
    hardcoreList.innerHTML = "";

    let completedCount = 0;
    let activeCount = 0;

    wads.forEach((wad, index) => {

        let badgeClass = "";
        let badgeText = "";

        if (wad.status === "completed") {

            badgeClass = "badge-completed";
            badgeText = "Dohráno";

            completedCount++;
            activeCount++;

        }
        else if (wad.status === "pending") {

            badgeClass = "badge-pending";
            badgeText = "Čeká na razítko";

            activeCount++;

        }
        else {

            badgeClass = "badge-hardcore";
            badgeText = "Hardcore";

        }

        const card = document.createElement("div");

        card.className = "wad-card";

        card.innerHTML = `
            <div class="wad-title">
                ${wad.icon} ${wad.name}
            </div>

            <span class="badge ${badgeClass}">
                ${badgeText}
            </span>

            <button class="delete-button">
                🗑
            </button>
        `;

        const deleteButton =
            card.querySelector(".delete-button");

        deleteButton.addEventListener("click", (event) => {

            event.stopPropagation();

            if (
                confirm(
                    `Opravdu smazat "${wad.name}"?`
                )
            ) {

                wads.splice(index, 1);

                saveState();
                renderPassport();

            }

        });

        if (wad.status !== "hardcore") {

            card.style.cursor = "pointer";

            card.addEventListener("click", () => {

                if (
                    wads[index].status === "completed"
                ) {

                    wads[index].status = "pending";

                }
                else {

                    wads[index].status = "completed";

                }

                saveState();
                renderPassport();

            });

        }

        if (wad.status === "completed") {

            completedList.appendChild(card);

        }
        else if (wad.status === "pending") {

            pendingList.appendChild(card);

        }
        else {

            hardcoreList.appendChild(card);

        }

    });

    const progress =
        activeCount > 0
            ? Math.round(
                (completedCount / activeCount) * 100
            )
            : 0;

    completedCountElement.textContent =
        completedCount;

    activeCountElement.textContent =
        activeCount;

    progressPercentElement.textContent =
        progress + "%";

    progressFill.style.width =
        progress + "%";

}

function addWad() {

    const name =
        document.getElementById("newName")
        .value
        .trim();

    if (!name) {

        alert("Zadej název WADu.");
        return;

    }

    wads.push({

        name: name,
        status: "pending",
        icon: "🟦"

    });

    saveState();
    renderPassport();

    document.getElementById("newName").value = "";

}

function exportPassport() {

    const data =
        JSON.stringify(wads, null, 2);

    const blob =
        new Blob(
            [data],
            { type: "application/json" }
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "doom-passport-backup.json";

    a.click();

    URL.revokeObjectURL(url);

}

function importPassport(event) {

    const file =
        event.target.files[0];

    if (!file) {
        return;
    }

    const reader =
        new FileReader();

    reader.onload = function(e) {

        try {

            const imported =
                JSON.parse(e.target.result);

            if (!Array.isArray(imported)) {

                throw new Error();

            }

            wads = imported;

            saveState();

            renderPassport();

            alert(
                "Import proběhl úspěšně."
            );

        }
        catch {

            alert(
                "Neplatný soubor."
            );

        }

    };

    reader.readAsText(file);

}

loadState();

renderPassport();

document
    .getElementById("addWadButton")
    .addEventListener("click", addWad);

document
    .getElementById("exportButton")
    .addEventListener("click", exportPassport);

document
    .getElementById("importButton")
    .addEventListener("click", () => {

        document
            .getElementById("importFile")
            .click();

    });

document
    .getElementById("importFile")
    .addEventListener("change", importPassport);