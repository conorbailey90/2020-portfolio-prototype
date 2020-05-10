const header = document.querySelector(".header");

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  prevScrollpos > currentScrollPos
    ? header.classList.remove("scroll")
    : header.classList.add("scroll");

  prevScrollpos = currentScrollPos;
};

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

// function mapBlogPosts() {
//   blogPosts.map((post) => {
//     let postDiv = document.createElement("div");
//     postDiv.className = "post";

//     let titleDiv = document.createElement("div");
//     titleDiv.className = "post-title";
//     titleDiv.innerHTML = `<h1>${post.title}</h1>`;

//     let summaryDiv = document.createElement("div");
//     summaryDiv.className = "post-summary";
//     summaryDiv.innerHTML = `<p>${post.content}</p>`;

//     postDiv.appendChild(titleDiv);
//     postDiv.appendChild(summaryDiv);

//     postContainer.appendChild(postDiv);
//   });
// }

let currentPage = 0;
let postId = 0;

function mapBlogPosts() {
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
    summaryDiv.innerHTML = `<p>${blogPosts[i].content}</p>`;

    postDiv.appendChild(titleDiv);
    postDiv.appendChild(summaryDiv);
    if (postId == 0 && blogPosts[i].image_source !== "") {
      let image = document.createElement("img");
      image.className = "post-image";
      image.src = blogPosts[i].image_source;
      postDiv.appendChild(image);
    }
    postId++;
  }
}
