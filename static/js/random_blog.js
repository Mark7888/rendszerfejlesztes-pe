var blogData = [
    {
        id: 1,
        title: "Exciting News in the World of Technology",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in mi eget magna pretium mattis. Ut euismod neque id mi rhoncus viverra.",
        favorite: false,
        comments: []
    },
    {
        id: 2,
        title: "New bgbg in Health and Wellness",
        content: "asdauet, lobortis elit non, tempus leo. Integer congue libero non nisi vestibulum, vitae commodo velit eleifend.",
        favorite: false,
        comments: []
    },
    {
        id: 3,
        title: "New Developments in Health and Wellness",
        content: "Sed eget risus aliquet, lobortis elit non, tempus leo. Integer congue libero non nisi vestibulum, vitae commodo velit eleifend.",
        favorite: false,
        comments: []
    },
    {
        id: 4,
        title: "Recent Trends in Fashion and Style",
        content: "Aenean eget elit vehicula, vestibulum arcu vel, euismod purus. In ut commodo ipsum. Vivamus in dui auctor, fermentum felis ac, tempus sapien.",
        favorite: false,
        comments: []
    }
];

var topicsData = [
    { id: 1, name: "Photography" },
    { id: 2, name: "PC" },
    { id: 3, name: "Media" },
    { id: 4, name: "Games" },
    { id: 5, name: "World" },
    { id: 6, name: "Etc" }
];

function displayFavorites() {
    var favoriteBlogs = blogData.filter(blog => blog.favorite);
    generateBlogCards(favoriteBlogs.map(blog => blog.id), currentPage);
}


function toggleFavorite(blogId) {
    var blog = blogData.find(blog => blog.id === blogId);
    blog.favorite = !blog.favorite;
    document.getElementById('favoriteButton').textContent = blog.favorite ? 'Remove from Favorites' : 'Add to Favorites';

    displayFavorites();
}




function generateTopicChooser() {
    var topicChooserHtml = `
        <div class="text-center white-text pulse-animation">
            <h1>Choose Topics</h1>
        </div>
        <div class="text-center">
            <button type="button" class="mb-0 btn btn-primary topic-button" data-topic-id="0">My Favorites</button>
    `;
    topicsData.forEach(function(topic) {
        topicChooserHtml += `
            <button type="button" class="mb-0 btn btn-primary topic-button" data-topic-id="${topic.id}">
                ${topic.name}
            </button>
        `;
    });
    topicChooserHtml += `</div>`;
    document.getElementById("topic-chooser").innerHTML = topicChooserHtml;

    document.querySelector('.topic-button[data-topic-id="0"]').addEventListener('click', function() {
        displayFavorites();
    });
}


function generateBlogCard(blog) {
    var truncatedContent = blog.content.length > 90 ? blog.content.substring(0, 90) + "..." : blog.content;
    
    var cardHtml = `
        <div class="card mb-3 mt-0">
            <div class="card-body">
                <h5 class="card-title">${blog.title}</h5>
                <p class="card-text">${truncatedContent}</p>
                <button class="btn btn-primary open-popup" data-blog-id="${blog.id}">Read More</button>
            </div>
        </div>
    `;
    return cardHtml;
}

function generateBlogCards(selectedTopics, currentPage) {
    var blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = "";

    var filteredBlogs = blogData.filter(blog => selectedTopics.includes(blog.id));

    var totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    var startIndex = (currentPage - 1) * blogsPerPage;
    var endIndex = Math.min(startIndex + blogsPerPage, filteredBlogs.length);

    for (var i = startIndex; i < endIndex; i++) {
        var blog = filteredBlogs[i];
        var cardHtml = generateBlogCard(blog);
        blogContainer.innerHTML += cardHtml;
    }

    var navigationHtml = `
        <div class="text-center mt-3">
            <button class="btn btn-primary mx-2" id="prevButton">&lt;</button>
            <button class="btn btn-primary disabled" id="pageNumber">${currentPage} / ${totalPages}</button>
            <button class="btn btn-primary mx-2" id="nextButton">&gt;</button>
        </div>
    `;
    blogContainer.innerHTML += navigationHtml;

    document.getElementById("prevButton").addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            generateBlogCards(selectedTopics, currentPage);
        }
    });

    document.getElementById("nextButton").addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            generateBlogCards(selectedTopics, currentPage);
        }
    });

    var openPopupButtons = document.querySelectorAll('.open-popup');
    openPopupButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var blogId = parseInt(button.getAttribute('data-blog-id'));
            openBlogPopup(blogId);
        });
    });
}

function initializeTopicButtons() {
    var topicButtons = document.querySelectorAll(".topic-button");
    topicButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            button.classList.toggle("active");

            if (button.dataset.topicId === "0" && button.classList.contains("active")) {
                displayFavorites();
            } else {
                generateBlogCards(getSelectedTopics(), currentPage);
            }
        });
    });
}


function getSelectedTopics() {
    var selectedTopics = [];
    var activeButtons = document.querySelectorAll(".topic-button.active");
    activeButtons.forEach(function(activeButton) {
        selectedTopics.push(parseInt(activeButton.dataset.topicId));
    });
    return selectedTopics;
}

function openBlogPopup(blogId) {
    var blog = blogData.find(blog => blog.id === blogId);
    var popupContent = `
        <div class="modal fade" id="blogModal" tabindex="-1" aria-labelledby="blogModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="blogModalLabel">${blog.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>${blog.content}</p>
                        <div class="mb-3">
                            <label for="commentTextarea" class="form-label">Write your comment:</label>
                            <textarea class="form-control" id="commentTextarea" rows="5"></textarea>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <button id="favoriteButton" class="btn btn-outline-primary">${blog.favorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
                            <button type="button" class="btn btn-primary" id="submitCommentButton">Submit Comment</button>
                        </div>
                        <div id="commentsSection">
                            <h3>Comments</h3>
                            <ul id="commentList"></ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('#blogModal').remove();

    var parser = new DOMParser();
    var modalDOM = parser.parseFromString(popupContent, 'text/html').body.firstChild;
    document.body.appendChild(modalDOM);

    $('#blogModal').modal('show');

    document.getElementById('favoriteButton').addEventListener('click', function() {
        toggleFavorite(blog.id);
    });

    document.getElementById('submitCommentButton').addEventListener('click', function() {
        submitComment(blog.id);
    });

    displayComments(blog.id);
}

function submitComment(blogId) {
    var commentText = document.getElementById('commentTextarea').value;
    var loggedInUser = localStorage.getItem("loggedInUser");
    var username = loggedInUser ? loggedInUser : "Guest";
    var timestamp = new Date().toLocaleString();
    var comment = username + " - " + commentText + " (" + timestamp + ")";

    var storedComments = JSON.parse(localStorage.getItem('blogComments')) || {};
    storedComments[blogId] = storedComments[blogId] || [];
    storedComments[blogId].push(comment);
    localStorage.setItem('blogComments', JSON.stringify(storedComments));

    console.log('Submitted comment:', comment);

    displayComments(blogId);
}

function displayComments(blogId) {
    var commentList = document.getElementById('commentList');
    commentList.innerHTML = '';

    var storedComments = JSON.parse(localStorage.getItem('blogComments')) || {};
    var comments = storedComments[blogId] || [];

    if (comments.length > 0) {
        comments.forEach(function(comment) {
            var commentItem = document.createElement('li');
            commentItem.textContent = comment;
            commentList.appendChild(commentItem);
        });
    } else {
        commentList.innerHTML = '<li>No comments yet.</li>';
    }
}












function closePopup() {
    var popup = document.querySelector('.popup-overlay');
    popup.parentNode.removeChild(popup);
}


function toggleFavorite(blogId) {
    var blog = blogData.find(blog => blog.id === blogId);
    blog.favorite = !blog.favorite;
    document.getElementById('favoriteButton').textContent = blog.favorite ? 'Remove from Favorites' : 'Add to Favorites';
}



var currentPage = 1;
var blogsPerPage = 3;

generateTopicChooser();
generateBlogCards(topicsData.map(topic => topic.id), currentPage);
initializeTopicButtons();
