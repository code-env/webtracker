// (function () {
//     "use strict";
//     var location = window.location;
//     var document = window.document;
//     var scriptElement = document.currentScript;
//     var dataDomain = scriptElement.getAttribute("data-domain");
  
//     // Enhanced UTM parameter tracking
//     let queryString = location.search;
//     const params = new URLSearchParams(queryString);
//     var utmParams = {
//       source: params.get("utm_source"),
//       medium: params.get("utm_medium"),
//       campaign: params.get("utm_campaign"),
//       term: params.get("utm_term"),
//       content: params.get("utm_content"),
//     };
  
//     var endpoint = "https://webtracker.avikmukherjee.tech/api/track";
//     var sessionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
  
//     // Visitor identification (anonymous)
//     function getVisitorId() {
//       var visitorId = localStorage.getItem("visitor_id");
//       if (!visitorId) {
//         visitorId = "visitor-" + Math.random().toString(36).substr(2, 16);
//         localStorage.setItem("visitor_id", visitorId);
//       }
//       return visitorId;
//     }
  
//     function generateSessionId() {
//       return "session-" + Math.random().toString(36).substr(2, 9);
//     }
  
//     function initializeSession() {
//       var sessionId = sessionStorage.getItem("session_id");
//       var expirationTimestamp = sessionStorage.getItem(
//         "session_expiration_timestamp",
//       );
//       var isNewSession = false;
  
//       if (
//         !sessionId ||
//         !expirationTimestamp ||
//         isSessionExpired(parseInt(expirationTimestamp))
//       ) {
//         // Generate a new session ID
//         sessionId = generateSessionId();
//         // Set the expiration timestamp
//         expirationTimestamp = Date.now() + sessionDuration;
//         // Store the session ID and expiration timestamp in sessionStorage
//         sessionStorage.setItem("session_id", sessionId);
//         sessionStorage.setItem(
//           "session_expiration_timestamp",
//           expirationTimestamp,
//         );
//         isNewSession = true;
//       } else {
//         // Extend the session
//         expirationTimestamp = Date.now() + sessionDuration;
//         sessionStorage.setItem(
//           "session_expiration_timestamp",
//           expirationTimestamp,
//         );
//       }
  
//       if (isNewSession) {
//         trackSessionStart();
//       }
  
//       return {
//         sessionId: sessionId,
//         expirationTimestamp: parseInt(expirationTimestamp),
//         isNewSession: isNewSession,
//       };
//     }
  
//     function isSessionExpired(expirationTimestamp) {
//       return Date.now() >= expirationTimestamp;
//     }
  
//     function resetActivityTimer() {
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       var session = initializeSession();
//       // Just updating the expiration time
//     }
  
//     // User activity monitoring
//     ["mousedown", "keydown", "touchstart", "scroll"].forEach(function (evt) {
//       document.addEventListener(evt, throttle(resetActivityTimer, 5000), {
//         passive: true,
//       });
//     });
  
//     // Throttle function to limit how often a function is called
//     function throttle(func, limit) {
//       var lastCall = 0;
//       return function () {
//         var now = Date.now();
//         if (now - lastCall >= limit) {
//           lastCall = now;
//           func.apply(this, arguments);
//         }
//       };
//     }
  
//     // Function to send tracking events to the endpoint
//     function trigger(eventName, eventData, options) {
//       var session = initializeSession();
//       var visitorId = getVisitorId();
//       var source = "";
//       if (document.referrer) {
//         try {
//           const referrerUrl = new URL(document.referrer);
//           source = referrerUrl.hostname;
//           // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         } catch (e) {
//           // Invalid referrer URL
//           source = "unknown";
//         }
//       } else {
//         source = "direct";
//       }
  
//       var payload = {
//         event: eventName,
//         url: location.href,
//         path: location.pathname,
//         domain: dataDomain,
//         referrer: document.referrer,
//         title: document.title,
//         utm: utmParams,
//         source: source,
//         visitor_id: visitorId,
//         session_id: session.sessionId,
//         timestamp: new Date().toISOString(),
//         screen: {
//           width: window.innerWidth,
//           height: window.innerHeight,
//         },
//         language: navigator.language,
//         user_agent: navigator.userAgent,
//         data: eventData || {},
//       };
  
//       // Using sendBeacon API for more reliable data sending, falling back to XHR
//       if (navigator.sendBeacon && !options?.forceXHR) {
//         navigator.sendBeacon(endpoint, JSON.stringify(payload));
//         options?.callback?.();
//       } else {
//         sendRequest(payload, options);
//       }
//     }
  
//     // Function to send HTTP requests
//     function sendRequest(payload, options) {
//       var request = new XMLHttpRequest();
//       request.open("POST", endpoint, true);
//       request.setRequestHeader("Content-Type", "application/json");
//       request.onreadystatechange = function () {
//         if (request.readyState === 4) {
//           options?.callback?.();
//         }
//       };
//       request.send(JSON.stringify(payload));
//     }
  
//     // Queue of tracking events
//     var queue = (window.your_tracking && window.your_tracking.q) || [];
  
//     // Enhanced API with more options
//     window.your_tracking = function (eventName, eventData, options) {
//       trigger(eventName, eventData, options);
//     };
  
//     // Public API methods
//     window.your_tracking.pageview = function (customData) {
//       trigger("pageview", customData);
//     };
  
//     window.your_tracking.event = function (category, action, label, value) {
//       trigger("event", { category, action, label, value });
//     };
  
//     window.your_tracking.timing = function (category, variable, time, label) {
//       trigger("timing", { category, variable, time, label });
//     };
  
//     // Process queued events
//     for (var i = 0; i < queue.length; i++) {
//       var args = queue[i];
//       if (typeof args[0] === "string") {
//         window.your_tracking.apply(this, args);
//       }
//     }
  
//     function trackPageView() {
//       window.your_tracking.pageview();
//     }
  
//     function trackSessionStart() {
//       var referrerInfo = document.referrer
//         ? {
//             url: document.referrer,
//             domain: new URL(document.referrer).hostname,
//           }
//         : null;
  
//       trigger("session_start", {
//         landing_page: location.href,
//         referrer: referrerInfo,
//       });
//     }
  
//     function trackSessionEnd() {
//       var session = sessionStorage.getItem("session_id");
//       if (session) {
//         trigger(
//           "session_end",
//           {
//             duration:
//               Date.now() -
//               parseInt(sessionStorage.getItem("last_activity") || Date.now()),
//           },
//           { forceXHR: true },
//         );
//       }
//     }
  
//     // Track performance metrics
//     function trackPerformance() {
//       if (window.performance && window.performance.timing) {
//         var timing = window.performance.timing;
//         var performanceData = {
//           load_time: timing.loadEventEnd - timing.navigationStart,
//           dom_ready: timing.domContentLoadedEventEnd - timing.navigationStart,
//           network_latency: timing.responseEnd - timing.requestStart,
//           processing_time: timing.domComplete - timing.responseEnd,
//           total_time: timing.loadEventEnd - timing.navigationStart,
//         };
  
//         // Wait for the load event to finish
//         setTimeout(function () {
//           trigger("performance", performanceData);
//         }, 0);
//       }
//     }
  
//     // Track outbound links
//     document.addEventListener("click", function (event) {
//       var target = event.target.closest("a");
//       if (!target) return;
  
//       var href = target.getAttribute("href") || "";
//       var isOutbound =
//         href.indexOf("http") === 0 && !href.includes(location.hostname);
//       var isDownload = /\.(pdf|zip|docx?|xlsx?|pptx?|rar|tar|gz|exe)$/i.test(
//         href,
//       );
  
//       if (isOutbound) {
//         trigger("outbound_click", {
//           url: href,
//           text: target.innerText,
//           target: target.getAttribute("target"),
//         });
//       }
  
//       if (isDownload) {
//         trigger("download", {
//           file: href,
//           name: href.split("/").pop(),
//         });
//       }
//     });
  
//     // Track form submissions
//     document.addEventListener("submit", function (event) {
//       var form = event.target;
//       if (!form || !form.tagName || form.tagName.toLowerCase() !== "form") return;
  
//       var formId = form.id || form.getAttribute("name") || "unknown_form";
//       trigger("form_submit", {
//         form_id: formId,
//         form_class: form.className,
//         form_action: form.action,
//       });
//     });
  
//     // SPA navigation tracking
//     var initialPathname = location.pathname;
//     var lastHistoryState = history.state;
  
//     // Listen for history API changes
//     var originalPushState = history.pushState;
//     history.pushState = function () {
//       originalPushState.apply(this, arguments);
//       handleUrlChange();
//     };
  
//     var originalReplaceState = history.replaceState;
//     history.replaceState = function () {
//       originalReplaceState.apply(this, arguments);
//       handleUrlChange();
//     };
  
//     function handleUrlChange() {
//       if (
//         location.pathname !== initialPathname ||
//         history.state !== lastHistoryState
//       ) {
//         setTimeout(function () {
//           trackPageView();
//           initialPathname = location.pathname;
//           lastHistoryState = history.state;
//         }, 50);
//       }
//     }
  
//     // Track scrolling depth
//     var scrollDepthMarkers = [25, 50, 75, 90];
//     var scrollDepthTracked = {};
  
//     window.addEventListener(
//       "scroll",
//       throttle(function () {
//         var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//         var scrollHeight =
//           document.documentElement.scrollHeight -
//           document.documentElement.clientHeight;
//         var scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
  
//         scrollDepthMarkers.forEach(function (marker) {
//           if (scrollPercent >= marker && !scrollDepthTracked[marker]) {
//             scrollDepthTracked[marker] = true;
//             trigger("scroll_depth", { depth: marker });
//           }
//         });
//       }, 1000),
//     );
  
//     // Initialize everything
//     function initialize() {
//       // Check for existing session
//       initializeSession();
  
//       // Track performance
//       if (document.readyState === "complete") {
//         trackPerformance();
//       } else {
//         window.addEventListener("load", trackPerformance);
//       }
  
//       // Track initial page view
//       trackPageView();
  
//       // Clean up when the page is unloaded
//       window.addEventListener("beforeunload", function () {
//         // Update last activity time to calculate session duration
//         sessionStorage.setItem("last_activity", Date.now().toString());
//         // Use a synchronous request for beforeunload
//         trackSessionEnd();
//       });
  
//       // Event listeners for navigation
//       window.addEventListener("popstate", handleUrlChange);
//       window.addEventListener("hashchange", handleUrlChange);
//     }
  
//     // Start tracking
//     initialize();
//   })();

(function () {
  "use strict";
  var location = window.location;
  var document = window.document;
  var scriptElement = document.currentScript;
  var dataDomain = scriptElement.getAttribute("data-domain");

  // Enhanced UTM parameter tracking
  const params = new URLSearchParams(location.search);
  var utmParams = {
    source: params.get("utm_source"),
    medium: params.get("utm_medium"),
    campaign: params.get("utm_campaign"),
    term: params.get("utm_term"),
    content: params.get("utm_content"),
  };

  var endpoint = "https://webtracker.avikmukherjee.tech/api/track";
  var sessionDuration = 30 * 60 * 1000; // 30 minutes

  // Visitor identification with cross-page persistence
  function getVisitorId() {
    var visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = "visitor-" + Math.random().toString(36).slice(2, 18);
      localStorage.setItem("visitor_id", visitorId);
    }
    return visitorId;
  }

  // Session handling with localStorage
  function initializeSession() {
    var sessionId = localStorage.getItem("session_id");
    var lastActivity = parseInt(localStorage.getItem("last_activity")) || Date.now();
    var isNewSession = false;

    // Reset session if new tab/window
    if(performance.navigation.type === 0 && !sessionId) {
      sessionId = null;
    }

    if (!sessionId || (Date.now() - lastActivity) > sessionDuration) {
      sessionId = "session-" + Math.random().toString(36).slice(2, 12);
      localStorage.setItem("session_id", sessionId);
      isNewSession = true;
    }

    localStorage.setItem("last_activity", Date.now().toString());

    if (isNewSession) {
      trackSessionStart();
    }

    return {
      sessionId: sessionId,
      isNewSession: isNewSession
    };
  }

  // Enhanced SPA navigation handling
  var currentPath = location.pathname + location.search + location.hash;
  var lastHistoryState = history.state;
  
  function handleUrlChange() {
    requestAnimationFrame(() => {
      const newPath = location.pathname + location.search + location.hash;
      if (newPath !== currentPath || history.state !== lastHistoryState) {
        currentPath = newPath;
        lastHistoryState = history.state;
        trackPageView();
      }
    });
  }

  // Override history methods
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(state, title, url) {
    originalPushState.apply(this, arguments);
    handleUrlChange();
  };
  
  history.replaceState = function(state, title, url) {
    originalReplaceState.apply(this, arguments);
    handleUrlChange();
  };
  
  window.addEventListener("popstate", handleUrlChange);
  window.addEventListener("hashchange", handleUrlChange);

  // Tracking core
  function trigger(eventName, eventData, options = {}) {
    const session = initializeSession();
    const payload = {
      event: eventName,
      url: location.href,
      path: location.pathname,
      domain: dataDomain,
      referrer: document.referrer,
      title: document.title,
      utm: utmParams,
      screen: {
        width: screen.width,
        height: screen.height,
      },
      language: navigator.language,
      user_agent: navigator.userAgent,
      visitor_id: getVisitorId(),
      session_id: session.sessionId,
      timestamp: new Date().toISOString(),
      data: eventData || {},
    };

    // Enhanced beacon handling
    try {
      if (navigator.sendBeacon && !options.forceXHR) {
        const blob = new Blob([JSON.stringify(payload)], {type: 'application/json'});
        navigator.sendBeacon(endpoint, blob);
      } else {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(payload));
      }
    } catch (e) {
      console.error('Tracking error:', e);
    }
  }

  // Public API
  window.your_tracking = {
    pageview: (data) => trigger('pageview', data),
    event: (category, action, label, value) => 
      trigger('event', { category, action, label, value }),
    timing: (category, variable, time, label) => 
      trigger('timing', { category, variable, time, label }),
    
    // Debugging helpers
    getVisitorId: () => getVisitorId(),
    getSessionId: () => localStorage.getItem("session_id"),
  };

  // Initial page load tracking
  document.addEventListener('DOMContentLoaded', () => {
    if (document.visibilityState === 'prerender') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          trackPageView();
        }
      });
    } else {
      trackPageView();
    }
  });

  // Session renewal on activity
  function trackActivity() {
    localStorage.setItem("last_activity", Date.now().toString());
  }
  
  ['click', 'touchstart', 'keydown', 'mousemove', 'scroll'].forEach(event => {
    window.addEventListener(event, throttle(trackActivity, 5000), { passive: true });
  });

  // Enhanced performance tracking
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (window.performance) {
        const [entry] = performance.getEntriesByType('navigation');
        trigger('performance', {
          type: 'page_load',
          duration: entry.duration,
          dom_content_loaded: entry.domContentLoadedEventEnd,
          time_to_interactive: entry.domInteractive,
        });
      }
    }, 0);
  });

  // Outbound link tracking
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.href;
    if (!href || href.startsWith('javascript:')) return;
    
    try {
      const url = new URL(href);
      if (url.hostname !== location.hostname) {
        trigger('outbound_click', {
          url: href,
          text: link.innerText,
          target: link.target || '_self',
        });
        
        // Prevent immediate navigation for beacon
        if (!link.target || link.target === '_self') {
          e.preventDefault();
          setTimeout(() => (location.href = href), 150);
        }
      }
    } catch {}
  });

  // Throttle function
  function throttle(fn, wait) {
    let last = 0;
    return function(...args) {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  // Initial session setup
  initializeSession();
})();