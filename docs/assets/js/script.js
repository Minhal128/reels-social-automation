(function ($, window, document, undefined) {
  "use strict";
  var $ripple = $(".js-ripple");
  $ripple.on("click.ui.ripple", function (e) {
    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find(".c-ripple__circle");
    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;
    $circle.css({
      top: y + "px",
      left: x + "px",
    });
    $this.addClass("is-active");
  });
  $ripple.on("animationend webkitAnimationEnd oanimationend MSAnimationEnd", function (e) {
    $(this).removeClass("is-active");
  });
})(jQuery, window, document);
var scrollLink = $("#myScrollspy");

$(document).ready(function () {
  var scrollLink = $('#myScrollspy .nav-item a[href^="#"]');

  // Smooth scrolling
  scrollLink.click(function (e) {
    e.preventDefault();
    $("body,html").animate(
      {
        scrollTop: $(this.hash).offset().top - 20,
      },
      500
    );
  });
});
$(document).ready(function () {
  $(".view-more-btn").on("click", function () {
    var $this = $(this);
    var $content = $this.prev(".features-hide-content");
    var $core = $this.closest(".core-features");

    $content.toggleClass("show");

    if ($content.hasClass("show")) {
      $this.html('View Less <i class="fa fa-angle-down" aria-hidden="true"></i>');
      $core.addClass("active");
    } else {
      $this.html('View More <i class="fa fa-angle-up" aria-hidden="true"></i>');
      $core.removeClass("active");
    }
  });
});








document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();

  // Find all links
  document.querySelectorAll(".nav-link").forEach(link => {
    const linkHref = link.getAttribute("href");

    if (linkHref === currentPage) {
      // Highlight active link
      link.classList.add("active");

      // Open parent menus
      let parent = link.closest(".nav-item");
      while (parent) {
        if (parent.classList.contains("menu")) {
          parent.classList.add("active"); // highlight parent
          let submenu = parent.querySelector(".sub-menu");
          if (submenu) submenu.style.display = "block"; // keep open
        }
        parent = parent.parentElement.closest(".nav-item");
      }
    }
  });
});

// Automated image-loading & fallback system for images-box elements
document.addEventListener("DOMContentLoaded", function () {
  const imagesBoxes = document.querySelectorAll(".images-box");
  imagesBoxes.forEach(box => {
    const img = box.querySelector("img");
    if (!img) return;

    // Check if there is already a fallback element.
    let fallback = box.querySelector(".image-placeholder-fallback");
    if (!fallback) {
      // Create a fallback element dynamically.
      fallback = document.createElement("div");
      fallback.className = "image-placeholder-fallback";
      
      // Determine placeholder text
      let altText = img.getAttribute("alt") || "";
      if (!altText) {
        // Fallback to filename
        const srcAttr = img.getAttribute("src") || "";
        const srcParts = srcAttr.split("/");
        const fileName = srcParts[srcParts.length - 1] || "image";
        altText = fileName.split(".")[0].replace(/[-_]/g, " ");
      }
      
      // Capitalize first letters of each word for premium look
      const title = altText.replace(/\b\w/g, c => c.toUpperCase());
      
      // Pick icon class based on title words
      let iconClass = "fa-image";
      const titleLower = title.toLowerCase();
      if (titleLower.includes("faq")) {
        iconClass = "fa-question-circle-o";
      } else if (titleLower.includes("billing") || titleLower.includes("plan") || titleLower.includes("transaction")) {
        iconClass = "fa-credit-card";
      } else if (titleLower.includes("settings") || titleLower.includes("config")) {
        iconClass = "fa-cogs";
      } else if (titleLower.includes("user") || titleLower.includes("member") || titleLower.includes("role")) {
        iconClass = "fa-users";
      } else if (titleLower.includes("log") || titleLower.includes("history")) {
        iconClass = "fa-clock-o";
      } else if (titleLower.includes("upload") || titleLower.includes("import")) {
        iconClass = "fa-upload";
      } else if (titleLower.includes("post") || titleLower.includes("caption") || titleLower.includes("social")) {
        iconClass = "fa-share-alt";
      }
      
      fallback.innerHTML = `
        <i class="fa ${iconClass}" style="font-size: 40px; color: var(--theme-deafult); margin-bottom: 15px; display: block;"></i>
        <h6 style="color: #fff; margin-bottom: 5px;">[Image Placeholder: ${title}]</h6>
        <p class="small text-muted mb-0">Displays visual reference for this interface. (Asset path: ${img.getAttribute("src")})</p>
      `;
      box.appendChild(fallback);
    }

    // Setup onload/onerror listeners
    const handleSuccess = () => {
      img.style.display = "block";
      fallback.style.display = "none";
    };

    const handleError = () => {
      img.style.display = "none";
      fallback.style.display = "block";
    };

    // Initialize state
    img.style.display = "none";
    fallback.style.display = "block";

    if (img.complete) {
      if (img.naturalWidth > 0) {
        handleSuccess();
      } else {
        handleError();
      }
    } else {
      img.addEventListener("load", handleSuccess);
      img.addEventListener("error", handleError);
    }
  });
});