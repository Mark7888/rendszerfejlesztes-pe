var blogData = [];
var topicTypes = [];

var currentPage = 1;
var blogsPerPage = 3;

document.addEventListener('DOMContentLoaded', function() {
    loadTopicTypes();
});

function loadTopicTypes() {
    fetch('/get_topic_types')
        .then(response => response.json())
        .then(data => {
            topicTypes = data['topic_types'];

            loadBlogData();
        })
        .catch(error => console.error('Error:', error));
}

function loadBlogData() {
    fetch('/get_topics')
        .then(response => response.json())
        .then(data => {
            blogData = data['topics'];

            generateTopicChooser();
            generateBlogCards(topicTypes.map(topic => topic.id), currentPage);
            initializeTopicButtons();
        })
        .catch(error => console.error('Error:', error));
}


function displayFavorites() {
    var favoriteBlogs = blogData.filter(blog => blog.favorite);
    generateBlogCards(favoriteBlogs.map(blog => blog.id), currentPage);
}

function displayCommentedOn() {
    fetch('/get_topics_commented')
        .then(response => response.json())
        .then(data => {
            var commentedBlogIds = data['topics'];
            var commentedBlogs = blogData.filter(blog => commentedBlogIds.includes(blog.id));
            generateBlogCards(commentedBlogs.map(blog => blog.id), currentPage);
        })
        .catch(error => console.error('Error:', error));
}

function toggleFavorite(blogId) {
    var blog = blogData.find(blog => blog.id === blogId);
    blog.favorite = !blog.favorite;
    document.getElementById('favoriteButton').textContent = blog.favorite ? 'Remove from Favorites' : 'Add to Favorites';

    if (blog.favorite) {
        fetch('/add_favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `topic_id=${blogId}`
        })
            .then(response => response.json())
            .then(data => {
                console.log('Added to favorites:', blogId);
            })
            .catch(error => console.error('Error:', error));
    } else {
        fetch('/remove_favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `topic_id=${blogId}`
        })
            .then(response => response.json())
            .then(data => {
                console.log('Removed from favorites:', blogId);
            })
            .catch(error => console.error('Error:', error));
    }

    displayFavorites();
}




function generateTopicChooser() {
    var topicChooserHtml = `
        <div class="text-center white-text pulse-animation">
            <h1>Choose Topics</h1>
        </div>
        <div class="text-center">
            <button type="button" class="mb-0 btn btn-primary topic-button mb-3" data-topic-id="favorite">My Favorites</button>
            <button type="button" class="mb-0 btn btn-primary topic-button mb-3" data-topic-id="commented">Commented On</button>
    `;
    topicTypes.forEach(function(topic) {
        topicChooserHtml += `
            <button type="button" class="mb-0 btn btn-primary topic-button mb-3" data-topic-id="${topic.id}">
                ${topic.name}
            </button>
        `;
    });
    topicChooserHtml += `</div>`;
    document.getElementById("topic-chooser").innerHTML = topicChooserHtml;
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

            if (button.dataset.topicId === "favorite" && button.classList.contains("active")) {
                displayFavorites();
            } else if (button.dataset.topicId === "commented" && button.classList.contains("active")) {
                displayCommentedOn();
            } else {
                generateBlogCards(getSelectedBlogs(), currentPage);
            }
        });
    });
}


function getSelectedBlogs() {
    var selectedTopics = [];
    var activeButtons = document.querySelectorAll(".topic-button.active");
    if (activeButtons.length === 0) {
        return topicTypes.map(topic => topic.id); // Return all topics if none are selected
    }

    activeButtons.forEach(function(activeButton) {
        selectedTopics.push(parseInt(activeButton.dataset.topicId));
    });

    let selectedBlogIds = blogData
        .filter(blog => selectedTopics.includes(blog.type_id))
        .map(blog => blog.id);
    return selectedBlogIds;
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

    fetch('/add_comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `topic_id=${blogId}&comment=${encodeURIComponent(commentText)}`
    })
        .then(response => response.json())
        .then(data => {
            displayComments(blogId);
        })
        .catch(error => console.error('Error:', error));
}

function displayComments(blogId) {

    console.log("displayComments>" + blogId + "<");

    fetch('/get_comments?topic_id=' + blogId)
        .then(response => response.json())
        .then(data => {
            var comments = data['comments'];
            var commentList = document.getElementById('commentList');
            commentList.innerHTML = '';

            if (comments.length > 0) {
                comments.forEach(function(comment) {
                    var commentItem = document.createElement('li');
                    commentItem.textContent = comment['username'] + " - " + comment['body'] + ' (' + comment['timestamp'] + ')';
                    commentList.appendChild(commentItem);
                });
            } else {
                commentList.innerHTML = '<li>No comments yet.</li>';
            }
        })
        .catch(error => console.error('Error:', error));
}
