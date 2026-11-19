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

        wads =
            JSON.parse(saved);

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
        .style.display = "block";

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