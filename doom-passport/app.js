const STORAGE_KEY = "doomPassport";
let editingIndex = null;

let wads = [
    {
        name: "Doom II Reloaded",
        status: "completed",
        hardcore: false,
        icon: "🟦",
        locked: true
    },
    {
        name: "Hell on Earth Starter Pack",
        status: "completed",
        hardcore: false,
        icon: "🔥",
        locked: true
    },
    {
        name: "Extermination Day",
        status: "completed",
        hardcore: false,
        icon: "💀",
        locked: true
    },
    {
        name: "Ancient Aliens",
        status: "completed",
        hardcore: false,
        icon: "😈",
        locked: true
    },
    {
        name: "Valiant",
        status: "completed",
        hardcore: false,
        icon: "🔥",
        locked: true
    },
    {
        name: "No End In Sight",
        status: "pending",
        hardcore: false,
        icon: "💀",
        locked: true
    },
    {
        name: "Scythe",
        status: "pending",
        hardcore: false,
        icon: "🟦",
        locked: true
    },
    {
        name: "Mutiny",
        status: "pending",
        hardcore: false,
        icon: "🔥",
        locked: true
    },
    {
        name: "Deus Vult II",
        status: "completed",
        hardcore: true,
        icon: "👹",
        locked: true
    },
    {
        name: "Sunder",
        status: "completed",
        hardcore: true,
        icon: "👹",
        locked: true
    },
    {
        name: "Speed of Doom",
        status: "completed",
        hardcore: true,
        icon: "🔥",
        locked: true
    }
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

    const defaultWads = [
        "Doom II Reloaded",
        "Hell on Earth Starter Pack",
        "Extermination Day",
        "Ancient Aliens",
        "Valiant",
        "No End In Sight",
        "Scythe",
        "Mutiny",
        "Deus Vult II",
        "Sunder",
        "Speed of Doom"
    ];

    wads.forEach(wad => {

        if (defaultWads.includes(wad.name)) {

            wad.locked = true;

        }

        if (wad.hardcore === undefined) {

            if (wad.status === "hardcore") {

                wad.status = "completed";
                wad.hardcore = true;

            } else {

                wad.hardcore = false;

            }

        }

    });

}

function renderPassport() {

    const completedList =
        document.getElementById("completed-list");

    const pendingList =
        document.getElementById("pending-list");

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

    let completedCount = 0;
    let activeCount = 0;

    wads.forEach((wad, index) => {

        if (
            wad.status === "completed" ||
            wad.status === "pending"
        ) {

            activeCount++;

        }

        if (wad.status === "completed") {

            completedCount++;

        }

        const card =
            document.createElement("div");

        card.className = "wad-card";

        card.innerHTML = `
            <div class="wad-title">
                ${wad.icon} ${wad.name}
            </div>

            <div>

                <span class="badge ${
                    wad.status === "completed"
                        ? "badge-completed"
                        : "badge-pending"
                }">

                    ${
                        wad.status === "completed"
                            ? "Dohráno"
                            : "Čeká na razítko"
                    }

                </span>

                ${
                    wad.hardcore
                        ? `
                        <span class="badge badge-hardcore">
                            Hardcore
                        </span>
                        `
                        : ""
                }

            </div>

            ${
                wad.locked
                    ? `
                    <span
                        class="locked-icon"
                        title="Výchozí WAD">

                        🔒

                    </span>
                    `
                    : `
                    <button
                        class="delete-button"
                        title="Smazat WAD">

                        🗑

                    </button>
                    `
            }
        `;

        const deleteButton =
            card.querySelector(".delete-button");

        if (deleteButton) {

            deleteButton.addEventListener(
                "click",
                (event) => {

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

                }
            );

        }

        card.style.cursor = "pointer";

        card.addEventListener("click", () => {

            wad.status =
                wad.status === "completed"
                    ? "pending"
                    : "completed";

            saveState();
            renderPassport();

        });

        if (wad.status === "completed") {

            completedList.appendChild(card);

        } else {

            pendingList.appendChild(card);

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

    const icon =
        document.getElementById("newIcon")
        .value;

    const hardcore =
        document.getElementById("newHardcore")
        .checked;

    if (!name) {

        alert("Zadej název WADu.");
        return;

    }

    if (editingIndex !== null) {

        wads[editingIndex].name = name;
        wads[editingIndex].icon = icon;
        wads[editingIndex].hardcore = hardcore;

        editingIndex = null;

        document.getElementById(
            "addWadButton"
        ).textContent = "Přidat";

        document.getElementById(
            "cancelEditButton"
        ).style.display = "none";

    }
    else {

        wads.push({

            name: name,
            status: "pending",
            hardcore: hardcore,
            icon: icon

        });

    }

    saveState();
    renderPassport();

    document.getElementById("newName").value = "";
    document.getElementById("newHardcore").checked = false;

}

    const icon =
        document.getElementById("newIcon").value;

    wads.push({

        name: name,
        status: "pending",
        hardcore: false,
        icon: icon,
        locked: false

    });

        saveState();

        renderPassport();

        document.getElementById("newName").value = "";

    }

function addWad() {

    ...

}

function editWad(index) {

    const wad = wads[index];

    editingIndex = index;

    document.getElementById("newName")
        .value = wad.name;

    document.getElementById("newIcon")
        .value = wad.icon;

    document.getElementById("newHardcore")
        .checked = wad.hardcore;

    document.getElementById(
        "addWadButton"
    ).textContent = "Uložit";

    document.getElementById(
        "cancelEditButton"
    ).style.display = "block";

    window.scrollTo({

        top: document.body.scrollHeight,

        behavior: "smooth"

    });

}

function exportPassport() {

    ...

}

function exportPassport() {

    const data =
        JSON.stringify(
            wads,
            null,
            2
        );

    const blob =
        new Blob(
            [data],
            {
                type: "application/json"
            }
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
                JSON.parse(
                    e.target.result
                );

            if (
                !Array.isArray(imported)
            ) {

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
    .addEventListener(
        "click",
        addWad
    );

document
    .getElementById("exportButton")
    .addEventListener(
        "click",
        exportPassport
    );

document
    .getElementById("importButton")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("importFile")
                .click();

        }
    );

document
    .getElementById("importFile")
    .addEventListener(
        "change",
        importPassport
    );