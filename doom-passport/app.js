const STORAGE_KEY = "doomPassport";

let editingIndex = null;

let wads = [
    {
        name: "Doom II Reloaded",
        status: "completed",
        hardcore: false,
        icon: "😈"
    },
    {
        name: "Hell on Earth Starter Pack",
        status: "completed",
        hardcore: false,
        icon: "🚀"
    },
    {
        name: "Extermination Day",
        status: "completed",
        hardcore: false,
        icon: "💀"
    },
    {
        name: "Ancient Aliens",
        status: "completed",
        hardcore: false,
        icon: "👹"
    },
    {
        name: "Valiant",
        status: "completed",
        hardcore: false,
        icon: "🔥"
    },
    {
        name: "No End In Sight",
        status: "pending",
        hardcore: false,
        icon: "💀"
    },
    {
        name: "Scythe",
        status: "pending",
        hardcore: false,
        icon: "😈"
    },
    {
        name: "Mutiny",
        status: "pending",
        hardcore: false,
        icon: "🚀"
    },
    {
        name: "Deus Vult II",
        status: "completed",
        hardcore: true,
        icon: "👹"
    },
    {
        name: "Sunder",
        status: "completed",
        hardcore: true,
        icon: "👹"
    },
    {
        name: "Speed of Doom",
        status: "completed",
        hardcore: true,
        icon: "🔥"
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

        try {

            wads = JSON.parse(saved);

        }
        catch {

            console.error(
                "Poškozená data LocalStorage."
            );

        }

    }

    wads.forEach(wad => {

        if (
            wad.hardcore === undefined
        ) {

            wad.hardcore = false;

        }

    });

}

function resetForm() {

    editingIndex = null;

    document
        .getElementById("newName")
        .value = "";

    document
        .getElementById("newIcon")
        .selectedIndex = 0;

    document
        .getElementById("newHardcore")
        .checked = false;

    document
        .getElementById("addWadButton")
        .textContent = "Přidat";

    document
        .getElementById("cancelEditButton")
        .style.display = "none";

}

function editWad(index) {

    const wad =
        wads[index];

    editingIndex = index;

    document
        .getElementById("newName")
        .value = wad.name;

    document
        .getElementById("newIcon")
        .value = wad.icon;

    document
        .getElementById("newHardcore")
        .checked = wad.hardcore;

    document
        .getElementById("addWadButton")
        .textContent = "Uložit";

    document
        .getElementById("cancelEditButton")
        .style.display = "inline-block";

    document
        .getElementById("newName")
        .focus();

}

function deleteWad(index) {

    const wad =
        wads[index];

    if (
        !confirm(
            `Opravdu smazat "${wad.name}"?`
        )
    ) {

        return;

    }

    wads.splice(index, 1);

    saveState();

    renderPassport();

}

function addWad() {

    const name =
        document
            .getElementById("newName")
            .value
            .trim();

    const icon =
        document
            .getElementById("newIcon")
            .value;

    const hardcore =
        document
            .getElementById("newHardcore")
            .checked;

    if (!name) {

        alert(
            "Zadej název WADu."
        );

        return;

    }

    if (
        editingIndex !== null
    ) {

        wads[editingIndex].name =
            name;

        wads[editingIndex].icon =
            icon;

        wads[editingIndex].hardcore =
            hardcore;

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

    resetForm();

}

function renderPassport() {

    const completedList =
        document.getElementById(
            "completed-list"
        );

    const pendingList =
        document.getElementById(
            "pending-list"
        );

    completedList.innerHTML = "";
    pendingList.innerHTML = "";

    let completedCount = 0;
    let activeCount = 0;

    wads.forEach((wad, index) => {

        activeCount++;

        if (
            wad.status === "completed"
        ) {

            completedCount++;

        }

        const card =
            document.createElement("div");

        card.className =
            "wad-card";

        card.innerHTML = `
            <div class="wad-title">

                <span>
                    ${wad.icon}
                    ${wad.name}
                </span>

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
                        <span
                            class="badge badge-hardcore">

                            Hardcore

                        </span>
                        `
                        : ""
                }

            </div>

            <div class="card-actions">

                <button
                    class="edit-button"
                    title="Upravit">

                    ✏️

                </button>

                <button
                    class="delete-button"
                    title="Smazat">

                    🗑️

                </button>

            </div>
        `;

        const editButton =
            card.querySelector(
                ".edit-button"
            );

        const deleteButton =
            card.querySelector(
                ".delete-button"
            );

        editButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                editWad(index);

            }
        );

        deleteButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                deleteWad(index);

            }
        );

        card.addEventListener(
            "click",
            () => {

                wad.status =
                    wad.status === "completed"
                        ? "pending"
                        : "completed";

                saveState();

                renderPassport();

            }
        );

        if (
            wad.status === "completed"
        ) {

            completedList.appendChild(
                card
            );

        }
        else {

            pendingList.appendChild(
                card
            );

        }

    });

    const progress =
        activeCount > 0
            ? Math.round(
                (completedCount /
                    activeCount) *
                100
            )
            : 0;

    document.getElementById(
        "completed-count"
    ).textContent =
        completedCount;

    document.getElementById(
        "active-count"
    ).textContent =
        activeCount;

    document.getElementById(
        "progress-percent"
    ).textContent =
        progress + "%";

    document.getElementById(
        "progress-fill"
    ).style.width =
        progress + "%";

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
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const a =
        document.createElement(
            "a"
        );

    a.href = url;

    a.download =
        "doom-passport-backup.json";

    a.click();

    URL.revokeObjectURL(
        url
    );

}

function importPassport(event) {

    const file =
        event.target.files[0];

    if (!file) {

        return;

    }

    const reader =
        new FileReader();

    reader.onload =
        function (e) {

            try {

                const imported =
                    JSON.parse(
                        e.target.result
                    );

                if (
                    !Array.isArray(
                        imported
                    )
                ) {

                    throw new Error();

                }

                wads = imported;

                saveState();

                renderPassport();

                resetForm();

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
    .getElementById(
        "addWadButton"
    )
    .addEventListener(
        "click",
        addWad
    );

document
    .getElementById(
        "cancelEditButton"
    )
    .addEventListener(
        "click",
        resetForm
    );

document
    .getElementById(
        "exportButton"
    )
    .addEventListener(
        "click",
        exportPassport
    );

document
    .getElementById(
        "importButton"
    )
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "importFile"
                )
                .click();

        }
    );

document
    .getElementById(
        "importFile"
    )
    .addEventListener(
        "change",
        importPassport
    );