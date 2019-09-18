{
  'use strict';

  /*
    document.getElementById('test-button').addEventListener('click', function() {
        const links = document.querySelectorAll('.titles a');
        console.log('links:', links);
    });

  */

  const titleClickHandler = function () {
    event.preventDefault();
    const clickedElement = this;
    console.log('link was clicked!');
    console.log('clicked element: ' + clickedElement);
    console.log('clicked element: ', clickedElement);

    /* [DONE] remove class 'active' from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement: ', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .post.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const hrefAttribute = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const correctArticle = document.querySelector(hrefAttribute);
    console.log(correctArticle);

    /* add class 'active' to the correct article */

    correctArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function () {

    /* remove content of the titleList */

    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
    titleList.innerHTML = '';

    let html = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    for (let article of articles ) {

      /* get article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* find title element, get title from title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* create HTML code of link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* insert created link to titleList */
      html = html + linkHTML;
      console.log(html);

    /*
      titleList.insertAdjacentHTML('beforeend', linkHTML);
      console.log(titleList);
    */
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();
  console.log();

  function generateTags () {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article */
    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log(tagsWrapper);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      /* split tags into array */
      /* START LOOP: for each tag */
        /* generate HTML of the link */
        /* add generated code to html variable */
      /* END LOOP: for each tag */
      /* insert HTML of all the links into the tags wrapper */
    /* END LOOP: for every article */
    }
  }
  generateTags();
}
