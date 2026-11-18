const STORAGE_KEY = "doomPassport";

let wads = [
    { name: "Doom II Reloaded", status: "completed", style: "kompaktní, rychlé", note: "Perfektní BD flow.", icon: "🟦" },
    { name: "Hell on Earth Starter Pack", status: "completed", style: "oficiální BD kampaň", note: "BD v nejčistší podobě.", icon: "🔥" },
    { name: "Extermination Day", status: "completed", style: "skriptovaná BD kampaň", note: "Film v Doomu.", icon: "💀" },
    { name: "Ancient Aliens", status: "completed", style: "stylová, barevná", note: "Neonový chaos.", icon: "😈" },
    { name: "Valiant", status: "completed", style: "rychlé, moderní", note: "Skillsaw nikdy nezklame.", icon: "🔥" },

    { name: "No End In Sight", status: "pending", style: "temná klasika", note: "Temná výprava.", icon: "💀" },
    { name: "Scythe", status: "pending", style: "krátké, svižné", note: "BD sprint.", icon: "🟦" },
    { name: "Mutiny", status: "pending", style: "komunitní projekt", note: "Hodně akce, málo chození.", icon: "🔥" },

    { name: "Deus Vult II", status: "hardcore", style: "gigantické slaughter mapy", note: "Totální chaos.", icon: "👹" },
    { name: "Sunder", status: "hardcore", style: "extrémně těžké", note: "Jen pro odvážné.", icon: "👹" },
    { name: "Speed of Doom", status: "hardcore", style: "rychlé, agresivní", note: "Akce bez pauzy.", icon: "🔥" }
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

            <div class="wad-meta">
                ${wad.style}
            </div>

            <span class="badge ${badgeClass}">
                ${badgeText}
            </span>

            <div class="wad-note">
                ${wad.note}
            </div>

            <button class="delete-button">
                🗑 Smazat
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

                if (wads[index].status === "completed") {

                    wads[index].status = "pending";

                } else {

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

loadState();
renderPassport();

function addWad() {

    const name =
        document.getElementById("newName").value.trim();

    const style =
        document.getElementById("newStyle").value.trim();

    const note =
        document.getElementById("newNote").value.trim();

    if (!name) {

        alert("Zadej název WADu.");
        return;
    }

    wads.push({

        name: name,
        status: "pending",
        style: style || "Neurčeno",
        note: note || "",
        icon: "🟦"

    });

    saveState();
    renderPassport();

    document.getElementById("newName").value = "";
    document.getElementById("newStyle").value = "";
    document.getElementById("newNote").value = "";

}

document
    .getElementById("addWadButton")
    .addEventListener("click", addWad);