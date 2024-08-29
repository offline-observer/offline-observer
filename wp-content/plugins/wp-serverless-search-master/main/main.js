/**
 * WP Serverless Search
 * A static search plugin for WordPress.
 */

var wpServerlessSearch = (function () {
  const searchFeed = location.origin + '/wp-content/uploads/wp-sls/search-feed.xml';
  const urlParams = window.location.search;
  const searchModalSelector = 'wp-sls-search-modal';
  const searchModalInput = '.wp-sls-search-field';
  const searchForm = searchParams.searchForm;
  const searchFormInput = searchParams.searchFormInput;

  function syncSearchFields() {
    jQuery(searchFormInput).keyup(function () {
      jQuery(searchModalInput).val(jQuery(this).val());
    });
  }

  function launchSearchModal() {
    MicroModal.show('wp-sls-search-modal');
  }

  function postUrl(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser.pathname;
  }

  function urlQuery() {
    if (!searchQueryParams()) {
      return;
    }
    launchSearchModal();
  }

  function addQueryToSearchModal() {
    if (!searchQueryParams()) {
      return;
    }
    var el = document.querySelectorAll(searchModalInput);
    [].forEach.call(el, function (el) {
      el.value = searchQueryParams();
    });
  }

  function searchQueryParams(url = urlParams) {
    url = url.split('+').join(' ');
    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(url)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params.s;
  }

  function onSearchSubmit() {
    var el = document.querySelectorAll(searchForm);
    [].forEach.call(el, function (e) {
      e.addEventListener("submit", function (e) {
        e.preventDefault();
        launchSearchModal();
      });
    });
  }

  function onSearchInput() {
    var el = document.querySelectorAll(searchForm);
    [].forEach.call(el, function (e) {
      e.addEventListener("input", function (e) {
        // fire on search input
      });
    });
  }

  function searchPosts() {
    var search = null;
    jQuery.ajax(searchFeed, {
      accepts: {
        xml: "application/rss+xml"
      },
      dataType: "xml",
      success: function (data) {
        var searchArray = [];
        var data = data.getElementsByTagName("channel")[0];

        jQuery('.wp-sls-search-modal [role=document]').append('<div id="wp-sls-search-results" class="wp-sls-search-modal__results"></div>');

        jQuery(data).find("item").each(function () {
          var el = jQuery(this);
          if (!el.find("title").text()) {
            return;
          }
          searchArray.push({
            "title": el.find('title').text(),
            "description": el.find('excerpt\\:encoded').text(),
            "content": el.find('content\\:encoded').text(),
            "link": postUrl(el.find('link').text())
          });
        });

        var options = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [{
            name: 'title',
            weight: 0.75
          }, {
            name: 'description',
            weight: 0.5
          }, {
            name: 'content',
            weight: 0.5
          }]
        };

        var fuse = new Fuse(searchArray, options);

        function performSearch(searchTerm, $resultsContainer, $inputField) {
          var search = fuse.search(searchTerm);
          $resultsContainer.empty();

          if (searchTerm.length < 1) {
            $resultsContainer.hide();
            return;
          }

          $resultsContainer.show();

          if (search.length === 0) {
            $resultsContainer.append('<h5>No results</h5>');
          } else {
            $resultsContainer.append('<h5>' + search.length + ' results:</h5>');
            search.forEach(function (item) {
              var postContentData = {
                title: item.title,
                excerpt: item.description ? item.description : item.content,
                link: item.link
              };
              $resultsContainer.append(postContent(postContentData));
            });
          }

          // 엔터키 이벤트 핸들러 추가
          $inputField.off('keypress').on('keypress', function(e) {
            if (e.which == 13 && search.length === 1) {
              e.preventDefault();
              window.location.href = search[0].link;
            }
          });
        }

        var $searchInput = jQuery(searchParams.searchFormInput);
        var $modalSearchInput = jQuery(searchModalInput);

        $searchInput.each(function () {
          var $this = jQuery(this);
          var $resultsContainer = jQuery('<div class="live-search-results"></div>');
          $this.after($resultsContainer);

          $this.on('input', function () {
            var searchTerm = jQuery(this).val();
            performSearch(searchTerm, $resultsContainer, $this);
          });
        });

        $modalSearchInput.on('input', function () {
          var searchTerm = jQuery(this).val();
          var $modalResultsContainer = jQuery('#wp-sls-search-results');
          performSearch(searchTerm, $modalResultsContainer, $modalSearchInput);
        });
      }
    });
  }

  function postContent(
    postContentData = {
      title: '',
      excerpt: '',
      link: ''
    }
  ) {
    return `<article>
      <header class='entry-header'>
        <h2 class='entry-title'><a href='${postContentData.link}' rel='bookmark'>${postContentData.title}</a></h2>
      </header>
    </article>`;
  }

  searchPosts();
  onSearchSubmit();
  addQueryToSearchModal();
  urlQuery();
  syncSearchFields();

})();