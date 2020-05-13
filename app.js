const header = document.querySelector(".header");
const mobileNav = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".close-menu");

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    header.classList.remove("scroll");
  }, 1000);
});

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  prevScrollpos > currentScrollPos
    ? header.classList.remove("scroll")
    : header.classList.add("scroll");

  prevScrollpos = currentScrollPos;
};

menuToggle.addEventListener("click", () => {
  mobileNav.classList.add("active");
  menuToggle.classList.add("active");
  menuClose.classList.add("active");
});

menuClose.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  menuToggle.classList.remove("active");
  menuClose.classList.remove("active");
});

// Blog

let postContainer = document.querySelector(".blog-posts");

let blogPosts;

let url = "http://127.0.0.1:8000/";
fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    blogPosts = data;
    console.log(blogPosts);
    mapBlogPosts();
  });

let currentPage = 0;
let postId = 0;

function mapBlogPosts() {
  postContainer.classList.add("flash");
  setTimeout(() => {
    postContainer.classList.remove("flash");
  }, 1000);
  postContainer.innerHTML = "";
  for (let i = currentPage; i < currentPage + 5; i++) {
    let postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.id = `post-${postId}`;

    postContainer.appendChild(postDiv);

    let titleDiv = document.createElement("div");
    titleDiv.className = "post-title";
    titleDiv.innerHTML = `<h1>${blogPosts[i].title}</h1>`;

    let summaryDiv = document.createElement("div");
    summaryDiv.className = "post-summary";
    summaryDiv.innerHTML = `<h4>${blogPosts[i].summary}</h4>`;

    let button = document.createElement("div");
    button.classList.add("post-button");
    button.innerText = "READ MORE";

    postDiv.appendChild(titleDiv);
    postDiv.appendChild(summaryDiv);
    postDiv.appendChild(button);

    let imageDiv = document.createElement("div");
    imageDiv.className = "post-image";
    imageDiv.innerHTML = blogPosts[i].image_source;
    postDiv.appendChild(imageDiv);

    postId++;
  }
}

// pagination

const first = document.querySelector(".first");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const last = document.querySelector(".last");

first.addEventListener("click", firstPage);
last.addEventListener("click", lastPage);
next.addEventListener("click", nextPage);
previous.addEventListener("click", previousPage);

function firstPage(e) {
  currentPage = 0;
  postId = 0;
  mapBlogPosts();
}

function lastPage(e) {
  currentPage = blogPosts.length - 1;
  postId = 0;
  mapBlogPosts();
}

function lastPage(e) {
  currentPage = blogPosts.length - 5;
  postId = 0;
  mapBlogPosts();
}

function nextPage(e) {
  if (currentPage >= blogPosts.length - 5) {
    return;
  }
  currentPage++;
  postId = 0;
  mapBlogPosts();
}

function previousPage(e) {
  if (currentPage <= 0) {
    return;
  }
  currentPage--;
  postId = 0;
  mapBlogPosts();
}
