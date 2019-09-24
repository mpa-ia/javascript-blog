{
  'use strict';
  const templates = {
    tmplLink: Handlebars.compile(document.querySelector('#template-link').innerHTML),
    tmplAuthorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
    authorTagCloud: Handlebars.compile(document.querySelector('#template-author-cloud').innerHTML),
  };
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

  const titleClickHandler = function () {
    event.preventDefault();
    const clickedElement = this;

    /* remove class 'active' from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const hrefAttribute = clickedElement.getAttribute('href');
    /* find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(hrefAttribute);
    /* add class 'active' to the correct article */
    correctArticle.classList.add('active');
  };

  const generateTitleLinks = function (customSelector = '') {
    /* remove content of the titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    let html = '';

    /* for each article */
    const articles = document.querySelectorAll(select.all.articles  + customSelector);
    for (let article of articles ) {
      /* get article id */
      const articleId = article.getAttribute('id');
      /* find title element, get title from title element */
      const articleTitle = article.querySelector(select.all.titles).innerHTML;
      /* create HTML code of link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.tmplLink(linkHTMLData);
      /* insert created link to titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
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
    return classNumber;
  }
  function generateTags () {

    /* create new variable allTags with an empty object */
    const allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    /* START LOOP: for every article */
    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */
        const linkHTMLData = {id: 'tag-' + tag, title: tag};
        const linkHTML = templates.tmplLink(linkHTMLData);
        /* add generated code to html variable */
        html = html + linkHTML;
        /* check if this link is NOT already in allTags */
        if (!allTags.hasOwnProperty(tag)) {
          /* add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
    /* END LOOP: for every article */
    }
    /* find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);
    /* execute function calculateTags Param with allTags as argument */
    const tagsParam = calculateTagsParam(allTags);
    /* create variable for all links HTML code */
    const allTagsData = {tags: []};
    /* START LOOP: for each tag in allTags */
    for (let tag in allTags) {
      /* generate code of a link and add it to allTagsHTML */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParam)
      });
    /* END LOOP: for each link in allTags  */
    }
    /* add html fromallTagsData to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }
  generateTags();

  function tagClickHandler () {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "hrefAttribute" and read the attribute href of the clicked element */
    const hrefAttribute = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = hrefAttribute.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active');
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active link */
    }
    /* find all tag links with "href" attribute equal to the "hrefAttribute" constant */
    const tagLinksWithEqualHrefAttribute = document.querySelectorAll('a[href="' + hrefAttribute + '"]');
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
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  function generateAuthors () {
    /* create new variable allAuthors with an empty object */
    const allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    /* START LOOP: for each article */
    for (let article of articles) {
      /* define author wrapper */
      const authorWrapper = article.querySelector(select.article.authors);
      /* get author from data-author attribute */
      const authorAttribute =  article.getAttribute('data-author');
      /* make new constant to keep name and surname of the author without dash */
      const author = authorAttribute.replace('author-', '').replace('-', ' ');
      /* generate HTML code for link*/
      const linkHTMLData = {id: authorAttribute, title: author};
      const linkHTML = templates.tmplAuthorLink(linkHTMLData);
      /* check if this author is NOT already in allAuthors */
      if (!allAuthors.hasOwnProperty(author)) {
        /* add generated code to allTags array */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      /* insert generated HTML code to author wrapper */
      authorWrapper.insertAdjacentHTML('beforeend', linkHTML);
    /* END LOOP: for each article */
    }
    /* find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);
    /* execute function calculateTagsParam with allAuthors as argument */
    const authorsParam = calculateTagsParam(allAuthors);
    /* create variable for all links HTML code */
    let allAuthorsData = {tags: []};
    /* START LOOP: for each author in allAuthors */
    for (let author in allAuthors) {
      allAuthorsData.tags.push({
        author: author,
        id: author.replace(' ', '-'),
        count: allAuthors[author],
        className: calculateTagClass(allAuthors[author], authorsParam),
      });
    /* END LOOP: for each author in allAuthors  */
    }
    /* add html from allAuthorsData to authorsList */
    authorList.innerHTML = templates.authorTagCloud(allAuthorsData);
  }

  generateAuthors();

  function authorClickHandler () {
    /* prevent default action for this event */
    event.preventDefault();
    /* get href attribute of clicked element */
    const hrefAttribute = this.getAttribute('href');
    /* extract author-id from href constant */
    const authorId = hrefAttribute.replace('#', '');
    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active link */
    for (let activeAuthorLink of activeAuthorLinks) {
      /* remove class active */
      activeAuthorLink.classList.remove('active');
    /* END LOOP: for each active link */
    }
    /* find all author links with href attribute (author-id) equal to href constant */
    const allLinksWithEqualHref = document.querySelectorAll('a[href="' + hrefAttribute + '"]');
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
    /* START LOOP: for each link */
    for (let link of links) {
      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();
}
