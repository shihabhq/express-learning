//creating a post
const postForm = document.querySelector("form");

async function createPost(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const postValue = formData.get("postInput");

  try {
    if (postValue) {
      const response = await axios.post(
        "http://localhost:8000/api/posts",
        postValue,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      setTimeout(() => {
        alert(response.data.msg);
      }, 100);
      showPost();
    } else {
      alert("post cannot be empty");
    }
  } catch (error) {
    alert("unexpected error occured");
  }
}

postForm.addEventListener("submit", createPost);

//getting the posts
const getPostBtn = document.querySelector(".get-post");
const postAppearingDiv = document.querySelector(".posts");

async function showPost() {
  postAppearingDiv.innerHTML = "";
  try {
    const res = await axios.get("http://localhost:8000/api/posts");
    const postArray = res.data;

    if (res.data.length === 0) {
      postAppearingDiv.innerHTML = "<h1>There is not post here to show</h1>";
    } else {
      postArray.forEach((post) => {
        const newHeading = document.createElement("h1");
        newHeading.textContent = post.post;
        postAppearingDiv.appendChild(newHeading);
      });
    }
  } catch (error) {
    postAppearingDiv.innerHTML =
      "<h1>There was a problem in gettign the posts</h1>";
  }
}

getPostBtn.addEventListener("click", showPost);
