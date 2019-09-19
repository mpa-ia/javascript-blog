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
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  const generateTitleLinks = function (customSelector = '') {

    /* remove content of the titleList */

    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
    titleList.innerHTML = '';

    let html = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector  + customSelector);
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

  function generateTags () {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article */
    for (let article of articles) {
      console.log(article);
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log(tagsWrapper);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log(tag);
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';
        console.log(linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML;
        console.log(html);
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      console.log(tagsWrapper);
    /* END LOOP: for every article */
    }
  }
  generateTags();

  function tagClickHandler () {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "hrefAttribute" and read the attribute href of the clicked element */
    const hrefAttribute = clickedElement.getAttribute('href');
    console.log(hrefAttribute);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = hrefAttribute.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active');
    console.log(activeTags);
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active link */
    }
    /* find all tag links with "href" attribute equal to the "hrefAttribute" constant */
    const tagLinksWithEqualHrefAttribute = document.querySelectorAll('a[href="' + hrefAttribute + '"]');
    console.log(tagLinksWithEqualHrefAttribute);
    /* START LOOP: for each found tag link*/
    for (let foundLink of tagLinksWithEqualHrefAttribute) {
      /* add class active */
      foundLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  const addClickListenersToTags = function () {
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    console.log(links);
    /* START LOOP: for each link */
    for (let link of links) {
      console.log(link);
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  function generateAuthors () {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for each article */
    for (let article of articles) {
      console.log(article);
      /* define author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log(authorWrapper);
      /* get author from data-author attribute */
      const authorAttribute =  article.getAttribute('data-author');
      console.log(authorAttribute);
      /* make new constant to keep name and surname of the author without dash */
      const author = authorAttribute.replace('author-', '').replace('-', ' ');
      console.log(author);
      /* generate HTML code for link*/
      const linkHTML = '<a href="#' + authorAttribute + '">' + author + '</a>';
      console.log(linkHTML);
      /* insert generated HTML code to author wrapper */
      authorWrapper.insertAdjacentHTML('beforeend', linkHTML);
      console.log(authorWrapper);
      /* END LOOP: for each article */
    }
  }

  generateAuthors();

  function authorClickHandler () {
    /* prevent default action for this event */
    event.preventDefault();
    /* get href attribute of clicked element */
    const hrefAttribute = this.getAttribute('href');
    console.log(hrefAttribute);
    /* extract author-id from href constant */
    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    console.log(activeAuthorLinks);
    /* START LOOP: for each active link */
    for (let activeAuthorLink of activeAuthorLinks) {
      /* remove class active */
      activeAuthorLink.classList.remove('active');
    /* END LOOP: for each active link */
    }
    /* find all author links with href attribute (author-id) equal to href constant */
    const allLinksWithEqualHref = document.querySelectorAll('a[href="' + hrefAttribute + '"]');
    console.log(allLinksWithEqualHref);
    /* START LOOP: for each found link */
    for (let foundLink of allLinksWithEqualHref) {
      /* add class active */
      foundLink.classList.add('active');
    /* END LOOP: for each found link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
  }

  const addClickListenersToAuthors = function () {
    /* find all links to authors */
    const links = document.querySelectorAll('a[href^="#author-"]');
    console.log(links);
    /* START LOOP: for each link */
    for (let link of links) {
      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();
}
