fetch('./data/events.json')
  .then(response => response.json())
  .then(events => {
    events.slice(0, 6).forEach(function (event) {
      var imgSrc = event.image ? [event.image.replace(/^\//, './')] : ['./img/Backgrounds/Ngaruroro.png'];
      var cardDiv = document.createElement('div');
      cardDiv.innerHTML = `
          <div class="eventCardImg" style="background-image: url(${imgSrc[0]})"></div>
          <div class="eventCardContent">
              <span class="eventCardDate">${new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <h2 class="eventCardTitle">${event.title}</h2>
              <span class="eventCardType">${event.type}</span>
          </div>`;
      document.querySelector('#eventsGrid').appendChild(cardDiv);

      var imgTags = '';
      imgSrc.forEach(function (e) { imgTags += `<img src="${e}">`; });
      var topicTags = '';
      if (event.topics) {
        event.topics.forEach(function (e) { topicTags += `<span class="modalTopic">${e}</span>`; });
      }
      cardDiv.addEventListener('click', function () {
        document.querySelector('#eventModal').style.display = 'block';
        document.querySelector('#eventModal .imagesContainer').innerHTML = imgTags;
        document.querySelector('#eventModal .modalImg').style.backgroundImage = `url(${imgSrc[0]}), linear-gradient(90deg, #ddd 0%, #ddd)`;
        document.querySelector('#eventModal .imagesButtons').innerHTML = `<button onClick="eventsModalImage(this)"></button>`.repeat(imgSrc.length);
        document.querySelector('#eventModal .imagesButtons button').classList.add('active');
        document.querySelector('#eventModal .modalHeading').innerHTML = event.title;
        document.querySelector('#eventModal .modalDate').innerHTML = `<span class="material-symbols-outlined">event_available</span> ${new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}`;
        document.querySelector('#eventModal .modalPlace').innerHTML = `<span class="material-symbols-outlined">location_on</span> ${event.location || 'TBD'}`;
        document.querySelector('#eventModal .modalType').innerHTML = event.type;
        document.querySelector('#eventModal .modalAudience').innerHTML = (event.audience || []).join(', ');
        document.querySelector('#eventModal .modalTopics').innerHTML = topicTags;
        document.querySelector('#eventModal .modalDescription').innerHTML = event.description || '';
      });
    });
    // tryUnload();
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
    }, linear-gradient(90deg, #ddd 0%, #ddd))`;
  });
}

document
  .querySelector("#closeEventModal")
  .addEventListener("click", function () {
    document.querySelector("#eventModal").style.display = "none";
  });

function loadBlogs({ feed }) {
  console.log(feed);
  var i = 0;
  feed.entry.forEach(function (entry) {
    if (i == 4) return;
    var categoryTags = "";
    if (entry.category) {
      entry.category.forEach(function (category) {
        categoryTags += `<span>${category.term}</span>`;
      });
    }
    var authorImg = entry.author[0].gd$image.src;
    if(authorImg.indexOf("http") == -1) authorImg = "http://" + authorImg;

    if(entry.media$thumbnail){
      var thumbSrc = entry.media$thumbnail.url;
      thumbSrc = thumbSrc.split("/s72-")[0] + "/s600-c/" + thumbSrc.split("/s72-")[1].split('/')[1];
    }
    else{
      var thumbSrc = "img/Backgrounds/Doubs.png";
    }

    document.querySelectorAll("#blogsGrid .row")[i % 2].innerHTML += `
    <a href="${entry.link[0].href}">
      <div
        class="img-container"
        style="background-image: url('${thumbSrc}')"
      ></div>
      <h2>${entry.title.$t}</h2>
      <p class="blogCategories">${categoryTags}</p>
      <p class="blogAuthor"><img src="${authorImg}"> <span>${entry.author[0].name.$t}</span></p>
    </a>`;
    i += 1;
  });

  // tryUnload();
}


// var UNLOAD_TRIAL = 0;
// function tryUnload() {
//   UNLOAD_TRIAL += 1;
//   if (UNLOAD_TRIAL == 1) { // this is supposed to be 2! (Events + Blogs = 2)
//     unload();
//   }
// }



//js for ubuntu icon
document.addEventListener('DOMContentLoaded', () => {
  const ubuconIcon = document.getElementById('ubucon-icon');

  setTimeout(() => {
    if (ubuconIcon) {
      ubuconIcon.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      ubuconIcon.style.transform = 'translateY(0)'; 
      ubuconIcon.style.opacity = '1'; 
    }
  }, 1000); 
});