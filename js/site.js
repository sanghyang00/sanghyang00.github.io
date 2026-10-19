(function () {
  var VENUES = {
    COLM: "https://colmweb.org/",
    Interspeech: "https://www.isca-speech.org/",
    ICASSP: "https://ieeexplore.ieee.org/xpl/conhome/1000002/all-proceedings",
    EMNLP: "https://2025.emnlp.org/",
    AAAI: "https://www.aaai.org/conference/aaai/"
  };

  var LINK_FIELDS = [
    ["arxiv", "arXiv"],
    ["github", "GitHub"],
    ["dataset", "Dataset"],
    ["model", "Model"]
  ];

  function parseBib(text) {
    var entries = [];
    var re = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
    var match;

    while ((match = re.exec(text))) {
      var i = re.lastIndex;
      var fields = {};

      while (i < text.length) {
        while (i < text.length && /[\s,]/.test(text.charAt(i))) i += 1;
        if (text.charAt(i) === "}") {
          i += 1;
          break;
        }

        var nameMatch = /^([A-Za-z0-9_]+)\s*=\s*/.exec(text.slice(i));
        if (!nameMatch || text.charAt(i + nameMatch[0].length) !== "{") break;
        i += nameMatch[0].length;

        var depth = 0;
        var start = i;
        for (; i < text.length; i += 1) {
          if (text.charAt(i) === "{") depth += 1;
          else if (text.charAt(i) === "}") {
            depth -= 1;
            if (depth === 0) {
              i += 1;
              break;
            }
          }
        }

        fields[nameMatch[1].toLowerCase()] = cleanValue(text.slice(start + 1, i - 1));
      }

      re.lastIndex = i;
      entries.push({ key: match[2], fields: fields });
    }

    return entries;
  }

  function cleanValue(value) {
    var text = value.replace(/\s+/g, " ").trim();
    while (text.charAt(0) === "{" && text.charAt(text.length - 1) === "}" && wrapped(text)) {
      text = text.slice(1, -1).trim();
    }
    return text;
  }

  function wrapped(text) {
    var depth = 0;
    for (var i = 0; i < text.length; i += 1) {
      if (text.charAt(i) === "{") depth += 1;
      else if (text.charAt(i) === "}") {
        depth -= 1;
        if (depth === 0) return i === text.length - 1;
      }
    }
    return false;
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function selected(entry) {
    return String(entry.fields.selected || "").toLowerCase() === "true";
  }

  function authors(value) {
    var names = String(value || "").split(/\s+and\s+/).map(function (name) {
      return name.trim();
    }).filter(Boolean);
    var html = names.map(function (name) {
      return name === "Sangmin Lee" ? '<em class="me">' + esc(name) + "</em>" : esc(name);
    });
    if (html.length < 2) return html.join("");
    return html.slice(0, -1).join(", ") + ", and " + html[html.length - 1];
  }

  function venue(entry, withYear) {
    var abbr = entry.fields.abbr || "";
    var label = withYear && entry.fields.year ? abbr + " " + entry.fields.year : abbr;
    var url = VENUES[abbr];
    if (!url) return '<span class="venue">' + esc(label) + "</span>";
    return '<a class="venue" href="' + esc(url) + '">' + esc(label) + "</a>";
  }

  function links(entry) {
    return LINK_FIELDS.map(function (field) {
      var href = (entry.fields[field[0]] || "").trim();
      if (!href) return "";
      return '<a href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + field[1] + "</a>";
    }).join("");
  }

  function paper(entry, withYear, showAbstract) {
    var fields = entry.fields;
    var linkHtml = links(entry);
    var abstract = "";
    if (showAbstract && fields.abstract) {
      abstract = '<details class="abstract"><summary>Abstract</summary><p>' + esc(fields.abstract) + "</p></details>";
    }
    return (
      '<article class="paper" id="' + esc(entry.key) + '">' +
      venue(entry, withYear) +
      "<h3>" + esc(fields.title || "") + "</h3>" +
      '<p class="authors">' + authors(fields.author) + "</p>" +
      (fields.note ? '<p class="note">' + fields.note + "</p>" : "") +
      (linkHtml ? '<div class="links">' + linkHtml + "</div>" : "") +
      abstract +
      "</article>"
    );
  }

  function renderPapers(entries, mode) {
    if (mode === "selected") {
      return entries.filter(selected).map(function (entry) {
        return paper(entry, true, false);
      }).join("");
    }

    var years = [];
    var grouped = {};
    entries.forEach(function (entry) {
      var year = entry.fields.year || "";
      if (!grouped[year]) {
        grouped[year] = [];
        years.push(year);
      }
      grouped[year].push(entry);
    });
    years.sort(function (a, b) { return Number(b) - Number(a); });

    return years.map(function (year) {
      return (
        '<section class="year-group"><h2 class="year">' + esc(year) + "</h2>" +
        grouped[year].map(function (entry) { return paper(entry, false, true); }).join("") +
        "</section>"
      );
    }).join("");
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { parseBib: parseBib, renderPapers: renderPapers };
  }

  if (typeof document === "undefined") return;

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function theme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function label() {
    if (!toggle) return;
    var dark = theme() === "dark";
    toggle.textContent = dark ? "Light mode" : "Dark mode";
    toggle.setAttribute("aria-pressed", dark ? "true" : "false");
  }

  label();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = theme() === "dark" ? "light" : "dark";
      if (next === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
      try {
        localStorage.setItem("theme", next);
      } catch (error) {}
      label();
    });
  }

  function openExternal(scope) {
    (scope || document).querySelectorAll('a[href^="http"]').forEach(function (link) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }

  openExternal();

  function bindFilter() {
    var filter = document.querySelector("#pub-filter");
    if (!filter || filter.dataset.bound) return;
    filter.dataset.bound = "1";
    var empty = document.querySelector("#pub-empty");

    function apply() {
      var query = filter.value.trim().toLowerCase();
      var shown = 0;
      document.querySelectorAll(".year-group").forEach(function (group) {
        var count = 0;
        group.querySelectorAll(".paper").forEach(function (item) {
          var hit = item.textContent.toLowerCase().indexOf(query) !== -1;
          item.hidden = !hit;
          if (hit) count += 1;
        });
        group.hidden = count === 0;
        shown += count;
      });
      if (empty) empty.hidden = shown !== 0;
    }

    filter.addEventListener("input", apply);
    apply();
  }

  var list = document.querySelector("[data-papers]");
  if (!list) return;

  fetch("/_bibliography/papers.bib", { cache: "no-cache" })
    .then(function (response) {
      if (!response.ok) throw new Error(String(response.status));
      return response.text();
    })
    .then(function (text) {
      list.innerHTML = renderPapers(parseBib(text), list.getAttribute("data-papers"));
      openExternal(list);
      bindFilter();
    })
    .catch(function () {
      list.innerHTML = '<p class="empty">Could not load publications.</p>';
    });
})();
