(async () => {

  let airtable_res = await fetch(
    `https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Math%20Sessions?maxRecords=20&view=Grid%20view`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409`,
      },
    }
  );
  
  let mps_data = await airtable_res.json();  
  let session_list = document.getElementById("session-list");

  for (let session of mps_data.records) {
    session_info = {
      date: new Date(session.fields.Date),
      problems: session.fields["Problems PDF"]?.[0].url || "",
      solutions: session.fields["Solutions PDF"]?.[0].url || "",
    };

    let session_div = document.createElement("div");
    session_div.classList.add("session");
    
    if (session_info.date > Date.now())
      session_div.classList.add("upcoming");

    session_div.innerHTML = `
      <span class="session-label">${session_info.date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
      <a class="session-button${session_info.solutions ? "" : " disabled"}" href="${session_info.solutions || "javascript:void(0)"}">
        <span class="material-symbols-outlined">inventory</span>
        <span class="session-button-label"> Solutions </span>
      </a>
      <a class="session-button${session_info.problems ? "" : " disabled"}" href="${session_info.problems || "javascript:void(0)"}">
        <span class="material-symbols-outlined">assignment</span>
        <span class="session-button-label"> Problems </span>
      </a>
    `;

    session_list.appendChild(session_div);
  }

  // Remove loader
  unload();
})();