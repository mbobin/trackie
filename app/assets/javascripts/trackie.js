let trackie = window.Trackie || {};
window.Trackie = trackie

trackie.config = {
  urlPrefix: "",
  apiUrl: "http://localhost:3000",
  visitsUrl: "/api/v1/page_views",
  page: null,
  startOnReady: true,
  projectToken: null,
};

trackie.isReady = false;
trackie.queue = trackie.queue || [];
trackie.canStringify = typeof(JSON) !== "undefined" && typeof(JSON.stringify) !== "undefined";

trackie.configure = function (options) {
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      trackie.config[key] = options[key];
    }
  }
};

trackie.visitsUrl = function () {
  return trackie.config.apiUrl +
    trackie.config.urlPrefix +
    trackie.config.visitsUrl;
}

trackie.setReady = function () {
  let callback;
  while ((callback = trackie.queue.shift())) {
    callback();
  }
  trackie.isReady = true;
}

trackie.ready = function (callback) {
  if (trackie.isReady) {
    callback();
  } else {
    trackie.queue.push(callback);
  }
}

function whenDocumentReady(callback) {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    callback();
  } else if (typeof(Turbolinks) !== "undefined") {
    document.addEventListener("turbolinks:load", callback);
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

trackie.sendXMLHttpRequest = function (url, data) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(JSON.stringify(data));
}

trackie.track = function (data) {
  console.log("tracked:", data);
  trackie.sendXMLHttpRequest(trackie.visitsUrl(), data);
}

trackie.trackView = function () {
  let data = {
    path: window.location.pathname,
    title: document.title,
    project_token: trackie.config.projectToken,
  };

  if (document.referrer.length > 0) {
    data.referrer = document.referrer;
  }

  trackie.track({page_view: data});
};

trackie.start = function () {
  trackie.trackView();
};

whenDocumentReady(function() {
  if (trackie.config.startOnReady) {
    trackie.setReady();
    trackie.start();
  }
});
