{
  'use strict';

  const opt = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };
  const select = {
    all: {
      articles: '.post',
      titles: '.post-title',
    },
    article: {
      tags:'.post-tags .list',
      authors: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.list.tags',
      authors: '.list.authors',
    },
  };
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

  const generateTitleLinks = function (customSelector = '') {

    /* remove content of the titleList */

    const titleList = document.querySelector(select.listOf.titles);
    console.log(titleList);
    titleList.innerHTML = '';

    let html = '';

    /* for each article */

    const articles = document.querySelectorAll(select.all.articles  + customSelector);
    console.log(articles);
    for (let article of articles ) {

      /* get article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* find title element, get title from title element */
      const articleTitle = article.querySelector(select.all.titles).innerHTML;
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
  /* Function looks for the greatest and the smallest number of tags */
  function calculateTagsParam (tags) {
    /* Create an object with min and max values */
    const params = {
      max: 0,
      min: 999999
    };
    /* START LOOP: for each attribute of given object */
    for (let tag in tags) {
      /* find the greatest value and set it as params.max value  */
      params.max = Math.max(tags[tag], params.max);
      /* find thr smallest value and set it as params.min value  */
      params.min = Math.min(tags[tag], params.min);
      /* END LOOP: for each attribute of given object */
    }
    /* return object */
    return params;
  }
  function calculateTagClass (count, params) {
    const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * (opt.tagSizes.count - 1) + 1 );
    console.log(classNumber);
    console.log(params.min);
    console.log(params.max);
    return classNumber;
  }
  function generateTags () {

    /* [NEW] create new variable allTags with an empty object */
    const allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    console.log(articles);
    /* START LOOP: for every article */
    for (let article of articles) {
      console.log(article);
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);
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
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        console.log(allTags);
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      console.log(tagsWrapper);
    /* END LOOP: for every article */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);
    console.log(tagList);
    /* [NEW] execute function calculateTags Param with allTags as argument */
    const tagsParam = calculateTagsParam(allTags);
    console.log('tagsParam: ', tagsParam);
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    /* [NEW] START LOOP: for each tag in allTags */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a class="' + opt.tagSizes.classPrefix + calculateTagClass(allTags[tag], tagsParam) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
      console.log(allTagsHTML);
    /* [NEW] END LOOP: for each link in allTags  */
    }
    console.log(allTagsHTML);
    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
    console.log(tagList);
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
    /* [NEW] create new variable allAuthors with an empty object */
    const allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    console.log(articles);
    /* START LOOP: for each article */
    for (let article of articles) {
      console.log(article);
      /* define author wrapper */
      const authorWrapper = article.querySelector(select.article.authors);
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
      /* [NEW] check if this author is NOT already in allAuthors */
      if (!allAuthors.hasOwnProperty(author)) {
        console.log(author);
        /* [NEW] add generated code to allTags array */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      console.log(allAuthors);
      /* insert generated HTML code to author wrapper */
      authorWrapper.insertAdjacentHTML('beforeend', linkHTML);
      console.log(authorWrapper);

    /* END LOOP: for each article */
    }
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);
    console.log(authorList);
    /* [NEW] execute function calculateTagsParam with allAuthors as argument */
    const authorsParam = calculateTagsParam(allAuthors);
    console.log('authorsParam', authorsParam);
    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';
    /* [NEW] START LOOP: for each author in allAuthors */
    for (let author in allAuthors) {
      allAuthorsHTML += '<li><a class="' + opt.tagSizes.classPrefix + calculateTagClass(allAuthors[author], authorsParam) + '" href="#author-' + author.replace(' ', '-') +'">' + author + ' (' + allAuthors[author] + ')</a></li>';
      console.log(allAuthorsHTML);
    /* [NEW] END LOOP: for each author in allAuthors  */
    }
    /* [NEW] add html from allAuthorsHTML to authorsList */
    authorList.innerHTML = allAuthorsHTML;
  }

  generateAuthors();

  function authorClickHandler () {
    /* prevent default action for this event */
    event.preventDefault();
    /* get href attribute of clicked element */
    const hrefAttribute = this.getAttribute('href');
    console.log(hrefAttribute);
    /* extract author-id from href constant */
    const authorId = hrefAttribute.replace('#', '');
    console.log(authorId);
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
    generateTitleLinks('[data-author="' + authorId + '"]');
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
