fetch(
    `https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Profiles?maxRecords=1000&view=Grid%20view`,
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409`,
        },
    })
    .then(response => response.json())
    .then(data => {
        datas = data.records;
        add_data(data.records);
        unload();
    });

function add_data(data) {
    // Create a mapping of members batchwise
    batch_map = {};
    
    // Map member data based on batches
    for (member of data) {
        batch = member.fields.Batch;

        if (batch_map[batch]) batch_map[batch].push(member.fields);
        else batch_map[batch] = [member.fields];
    }

    // Generate container elements for batches
    batches = Object.keys(batch_map);
    batches.sort();
    batches.reverse();

    parent_elem = document.getElementById("people-list");
    
    for (batch of batches) {
        members = create_batch(batch);

        for (member_data of batch_map[batch]) {
            members.appendChild(create_person(member_data));
        }

        toggle_collapsible(members.previousElementSibling);
    }
}

// Creates and appends a .batch-container element to #people-list
// Returns the child element which should contain member elements
function create_batch(title) {
    let container = document.createElement("div");
    container.className = "batch-container";
    document.getElementById("people-list").appendChild(container);

    let header = document.createElement("div");
    header.innerHTML = "<span class='material-symbols-outlined'>chevron_right</span>" + title;
    header.className = "batch-header";
    container.appendChild(header);

    header.addEventListener("click", e => toggle_collapsible(e.target));

    let members = document.createElement("div");
    members.className = "batch-members";
    container.appendChild(members);

    return members;
}

function toggle_collapsible(headerElement) {
    let content = headerElement.nextElementSibling;
    headerElement.classList.toggle("active");
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

function create_person(data) {
    let link = document.createElement("a");
    link.className = "profile-link";
    link.href = "./about/member.html?user=" + data.Username;
    link.className = "person-element";
    data.Photo = data.Photo??[{url: "./img/user.png"}];
    link.innerHTML = `<div class="person-profile" 
        style="background-image: url(${data.Photo[0].url})"></div>
        <div class="person-name">${data.Name}</div>`;
    return link;
}