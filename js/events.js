// var aud_filter = new Set(["Advanced", "Intermediate", "Beginner"]);
// var type_filter = new Set([
//   "Seminar",
//   "Talk",
//   "Competition",
//   "Workshop",
//   "Hackathon",
//   "Other",
// ]);
// function layCards(cards, type_filter, aud_filter) {
//   document.getElementById("container").innerHTML = "";
//   let card_containers = [];
//   let heights = [];
//   for (let i = 0; i < 4; i++) {
//     const card_container = document.createElement("div");
//     card_container.className = "card_container";
//     card_containers.push(card_container);
//     heights.push(0);
//   }

//   let NUM_CONTAINERS = Math.max(
//     Math.floor(
//       document.querySelector("main").getBoundingClientRect().width / 300
//     ),
//     1
//   );
//   for (let i = 0; i < NUM_CONTAINERS; i++) {
//     document.getElementById("container").appendChild(card_containers[i]);
//   }
//   cards.forEach(function (card) {
//     let aud = card.getElementsByClassName("audTag")[0].getAttribute("data-aud");
//     if (!aud_filter.has(aud)) {
//       return;
//     }

//     let typeTagList = card.getElementsByClassName("typeTag");
//     let card_types = [...typeTagList].map(function (tag) {
//       return tag.getAttribute("data-type");
//     });

//     let common_types = card_types.filter((x) => type_filter.has(x));
//     if (common_types.length == 0) {
//       return;
//     }

//     const min_height = Math.min(...heights.slice(0, NUM_CONTAINERS));
//     const min_height_index = heights.indexOf(min_height);
//     card_containers[min_height_index].appendChild(card);
//     heights[min_height_index] += card.clientHeight;
//     console.log(1);
//   });
// }

// var cards = [];
// fetch(
//   `https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Events?maxRecords=1000&view=Grid%20view`,
//   {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409`,
//     },
//   }
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((response) => {
//     response.records.forEach(function (row) {
//       // let typeString = "";
//       // row.fields.Type.forEach(function (type) {
//       //     if (type != "") {
//       //         typeString += `<span class="typeTag" type="${type}">${type}</span>`;
//       //         type_filter.add(type);
//       //     }
//       // });
//       const card = document.createElement("div");
//       card.className = "card";
//       card.innerHTML += `<h2>${row.fields.Name}</h2>`;
//       card.innerHTML += `<span data-aud=${row.fields.Audience} class="audTag ${row.fields.Audience}">${row.fields.Audience}</span>`;
//       card.innerHTML += `<span data-type=${row.fields.Type} class="typeTag">${row.fields.Type}</span>`;
//       card.innerHTML += `<span class="topicTag">${row.fields.Topics}</span>`;
//       card.innerHTML += `<span class="dateTag">${row.fields.Date}</span>`;
//       card.innerHTML += `<button id="learnMore" onclick="document.getElementById('modal').style.display='flex'">Learn More</button>`;
//       card.innerHTML += `<div id="modal" class="modal"><div class="modal-content">
//             <span class="close" onclick="document.getElementById('modal').style.display='none'">&times;</span>
//             <p class='p'>${row.fields.Description}</p>
//             <img src="${row.fields.Files[0].url}" style="width:100%">
//             </div>
//             </div>`;
//       cards.push(card);
//     });

//     layCards(cards, type_filter, aud_filter);

//     type_filter.forEach(function (type) {
//       document.querySelector(
//         ".filter[data-type=type]"
//       ).innerHTML += `<button class="active" data="${type}">${type}</button>`;
//     });
//     document.querySelectorAll(".filter button").forEach(function (btn) {
//       btn.addEventListener("click", function (event) {
//         let data_type = this.parentElement.getAttribute("data-type");

//         if (this.classList.contains("active")) {
//           this.classList.remove("active");
//           window[data_type + "_filter"].delete(this.getAttribute("data"));
//         } else {
//           this.classList.add("active");
//           window[data_type + "_filter"].add(this.getAttribute("data"));
//         }
//       });
//     });
//     unload();
//   });
// window.addEventListener(
//   "resize",
//   function (event) {
//     layCards(cards, type_filter, aud_filter);
//   },
//   true
// );

// Array of objects containing formatted text, page link and image to be displayed on the title page
let major_events = [
  {
    text: `<span class="text-size-50"><b>Ubuntu</b></span> <br/> <span class="text-size-30">India Conference <br/> 2025</span>`,
    link: "https://ubuntu-in.netlify.app/events/ubucon-india-2025",
    img: "./img/ubucon/ubucon-poster.png"
  },
  {
    text: `<span class="text-size-70"><b>IISc</b></span> <br/> <span class="text-size-30">OPEN DAY <br/> 2025</span>`,
    link: "./pages/open-day-2025",
    img: "./img/banner.webp"
  },
  {
    text: `<span class="text-size-35"><b>Algorithm <br/> Festival</b></span>`,
    link: "./pages/algorithms",
    img: "./img/algorithms/group-pic.webp"
  }
]

// Modify DOM to display major event of given index
function display_event(event_arr, index) {
  window.major_event_index = index;
  cur_event = event_arr[index];

  document.querySelector("#major-event-info-title").innerHTML = cur_event.text;
  document.querySelector("#major-event-info-btn").href = cur_event.link;
  document.querySelector("#major-event-photo").style.backgroundImage = `url(${cur_event.img})`;
  document.querySelector("#major-event-slider-count").innerHTML = `${index + 1} / ${event_arr.length}`;
}

function next_event() {
  new_index = window.major_event_index + 1;
  new_index %= major_events.length;
  display_event(major_events, new_index);
}

function prev_event() {
  new_index = window.major_event_index == 0 ? major_events.length - 1 : major_events.length;
  new_index %= major_events.length;
  display_event(major_events, new_index);
}

// Initialize the major event display
display_event(major_events, 0);
document.querySelector("#major-event-prev").addEventListener('click', prev_event);
document.querySelector("#major-event-next").addEventListener('click', next_event);

// Loop through each event at regular intervals
setInterval(next_event, 5000);

// Code for fetching events from Airtable

fetch(
  `https://api.airtable.com/v0/appHwUzo4ARCQQlwr/Events?view=Grid%20view`,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer pat2bEq3dsaXHSBH9.2edd33a7b1c2de8fd5e4fe14b82900cf807d2c9b56dfead6a8bdd48715826409`,
    },
  }
)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    response.records.forEach(function (row) {
      if (!row.fields.Files) {
        var imgSrc = ["./img/Backgrounds/Ngaruroro.png"];
      } else {
        var imgSrc = row.fields.Files.map(function (e) {
          return e.url;
        });
      }
      var cardDiv = document.createElement("div");
      cardDiv.innerHTML = `
          <div class="eventCardImg" style="background-image: url(${
            imgSrc[0]
          })"></div>
          <div class="eventCardContent">
              <span class="eventCardDate">${new Date(
                row.fields.Date
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}</span>
              <h2 class="eventCardTitle">${row.fields.Name}</h2>
              <span class="eventCardType">${row.fields.Type}</span>
          </div>`;
      document.querySelector("#eventsGrid").appendChild(cardDiv);

      var imgTags = "";
      imgSrc.forEach(function (e) {
        imgTags += `<img src="${e}">`;
      });
      var topicTags = "";
      if (row.fields.Topics) {
        row.fields.Topics.forEach(function (e) {
          topicTags += `<span class="modalTopic">${e}</span>`;
        });
      }
      cardDiv.addEventListener("click", function () {
        document.querySelector("#eventModal").style.display = "block";
        document.querySelector("#eventModal .imagesContainer").innerHTML =
          imgTags;
        document.querySelector(
          "#eventModal .modalImg"
        ).style.backgroundImage = `url(${imgSrc[0]}), linear-gradient(90deg, #ddd 0%, #ddd)`;
        document.querySelector("#eventModal .imagesButtons").innerHTML =
          `<button onClick="eventsModalImage(this)"></button>`.repeat(
            imgSrc.length
          );
        document
          .querySelector("#eventModal .imagesButtons button")
          .classList.add("active");
        document.querySelector("#eventModal .modalHeading").innerHTML =
          row.fields.Name;
        document.querySelector(
          "#eventModal .modalDate"
        ).innerHTML = `<span class="material-symbols-outlined">
          event_available
          </span> ${new Date(row.fields.Date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}`;
        document.querySelector(
          "#eventModal .modalPlace"
        ).innerHTML = `<span class="material-symbols-outlined">
          location_on
          </span> ${row.fields.Location}`;
        document.querySelector("#eventModal .modalType").innerHTML =
          row.fields.Type;
        document.querySelector("#eventModal .modalAudience").innerHTML =
          row.fields.Audience;
        document.querySelector("#eventModal .modalTopics").innerHTML =
          topicTags;
        document.querySelector("#eventModal .modalDescription").innerHTML = row
          .fields.Description
          ? row.fields.Description
          : "";
      });
    });
    unload();
  });

function eventsModalImage(e) {
  var i = Array.from(
    document.querySelectorAll("#eventModal .imagesButtons button")
  ).indexOf(e);
  e.addEventListener("click", function () {
    document
      .querySelector("#eventModal .imagesButtons button.active")
      .classList.remove("active");
    e.classList.add("active");
    document.querySelector(
      "#eventModal .modalImg"
    ).style.backgroundImage = `url(${
      document.querySelectorAll("#eventModal .imagesContainer img")[i].src
    }), linear-gradient(90deg, #ddd 0%, #ddd)`;
  });
}

document
  .querySelector("#closeEventModal")
  .addEventListener("click", function () {
    document.querySelector("#eventModal").style.display = "none";
  });
