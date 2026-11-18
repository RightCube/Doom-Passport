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

    const completedList = document.getElementById("completed-list");
    const pendingList = document.getElementById("pending-list");
    const hardcoreList = document.getElementById("hardcore-list");

    const completedCountElement =
        document.getElementById("completed-count");

    const activeCountElement =
        document.getElementById("active-count");

    const progressPercentElement =
        document.getElementById("progress-percent");

    const progressFill =
        document.getElementById("progress-fill");

    if (
        !completedList ||
        !pendingList ||
        !hardcoreList
    ) {
        return;
    }

    completedList.innerHTML = "";
    pendingList.innerHTML = "";
    hardcoreList.innerHTML = "";

    let completedCount = 0;
    let activeCount = 0;

    wads.forEach(wad => {

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

        const card = `
        <div class="wad-card">

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

        </div>
        `;

        if (wad.status === "completed") {

            completedList.innerHTML += card;

        }
        else if (wad.status === "pending") {

            pendingList.innerHTML += card;

        }
        else {

            hardcoreList.innerHTML += card;

        }

    });

    const progress =
        activeCount > 0
            ? Math.round((completedCount / activeCount) * 100)
            : 0;

    if (completedCountElement)
        completedCountElement.textContent = completedCount;

    if (activeCountElement)
        activeCountElement.textContent = activeCount;

    if (progressPercentElement)
        progressPercentElement.textContent = progress + "%";

    if (progressFill)
        progressFill.style.width = progress + "%";
}

renderPassport();