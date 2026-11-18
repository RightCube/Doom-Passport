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

function renderPassport() {

    const completedList =
        document.getElementById("completed-list");

    if (!completedList) {
        return;
    }

    completedList.innerHTML = "";

    wads.forEach(wad => {

        const card = `
        <div class="wad-card completed">

            <div class="wad-title">
                ${wad.icon} ${wad.name}
            </div>

            <div class="wad-meta">
                ${wad.style}
            </div>

            <span class="badge badge-completed">
                ${wad.status}
            </span>

            <div class="wad-note">
                ${wad.note}
            </div>

        </div>
        `;

        completedList.innerHTML += card;
    });

}

renderPassport();