(function () {
  const WHATSAPP_NUMBER = "919972505291";

  const chatbot = document.createElement("div");
  chatbot.id = "wa-chatbot";

  chatbot.innerHTML = `
    <button id="wa-chat-button" type="button" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path fill="#ffffff" d="M19.11 17.42c-.28-.14-1.65-.81-1.91-.9-.26-.1-.45-.14-.64.14-.19.28-.73.9-.9 1.08-.16.19-.33.21-.61.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1 .97-1 2.36s1.02 2.73 1.16 2.92c.14.19 2.01 3.07 4.87 4.3.68.29 1.21.47 1.63.6.68.22 1.3.19 1.79.11.55-.08 1.65-.68 1.89-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33z"/>
        <path fill="#ffffff" d="M16.03 4C9.39 4 4 9.23 4 15.68c0 2.26.66 4.47 1.92 6.35L4 29l7.13-1.82a12.25 12.25 0 0 0 4.89 1.01h.01C22.66 28.19 28 22.96 28 16.51 28 10.06 22.66 4 16.03 4zm0 21.78h-.01a9.9 9.9 0 0 1-5.05-1.37l-.36-.21-4.23 1.08 1.13-4.02-.24-.38a9.53 9.53 0 0 1-1.48-5.2c0-5.24 4.59-9.5 10.24-9.5 5.65 0 10.24 4.26 10.24 9.5 0 5.24-4.59 10.1-10.24 10.1z"/>
      </svg>
    </button>

    <div id="wa-chat-box">

      <div class="wa-header">
        <div class="wa-header-info">
          <div class="wa-header-icon">
            <img src="./serene-exotica-logo.png" alt="Serene Exotica">
          </div>
          <div>
            <div class="wa-header-title">Serene Exotica</div>
            <div class="wa-header-subtitle">Let us understand your requirement</div>
          </div>
        </div>

        <button id="wa-close" type="button" aria-label="Close">&times;</button>
      </div>

      <form id="wa-form" class="wa-body">

        <div class="wa-intro">
          Hi! Please answer these 3 quick questions and our team will assist you.
        </div>

        <div class="wa-question">
          <div class="wa-question-number">1</div>

          <div class="wa-question-text">
            Looking for Plots?
          </div>

          <div class="wa-options">

            <label class="wa-option">
              <input type="radio" name="interest" value="Yes">
              <span>Yes</span>
            </label>

            <label class="wa-option">
              <input type="radio" name="interest" value="No">
              <span>No</span>
            </label>

          </div>
        </div>

        <div class="wa-question">
          <div class="wa-question-number">2</div>

          <div class="wa-question-text">
            Purchase Timeline
          </div>

          <div class="wa-options">

            <label class="wa-option">
              <input type="radio" name="timeline" value="Immediately">
              <span>Immediately</span>
            </label>

            <label class="wa-option">
              <input type="radio" name="timeline" value="Within 1 month">
              <span>Within 1 month</span>
            </label>

            <label class="wa-option">
              <input type="radio" name="timeline" value="Within 3 months">
              <span>Within 3 months</span>
            </label>

          </div>
        </div>

        <div class="wa-question">
          <div class="wa-question-number">3</div>

          <div class="wa-question-text">
            Budget?
          </div>

          <div class="wa-options">

            <label class="wa-option">
              <input type="radio" name="budget" value="60 Lakhs - 80 Lakhs">
              <span>60 Lakhs - 80 Lakhs</span>
            </label>

            <label class="wa-option">
              <input type="radio" name="budget" value="80 Lakhs - 1 Cr">
              <span>80 Lakhs - 1 Cr</span>
            </label>

            <label class="wa-option">
              <input type="radio" name="budget" value="Above 1 Cr">
              <span>Above 1 Cr</span>
            </label>

          </div>
        </div>

        <button id="wa-submit" type="submit" disabled>
          Continue on WhatsApp
        </button>

        <div class="wa-footer-note">
          Please answer all 3 questions to continue.
        </div>

      </form>
    </div>
  `;

  document.body.appendChild(chatbot);

  /*
   * Hide the website's old floating WhatsApp widget.
   * Only fixed/floating WhatsApp elements are hidden.
   * Normal phone/contact information in the page is left untouched.
   */
  function hideOldWhatsAppWidget() {
    const selectors = [
      'a[href*="wa.me"]',
      'a[href*="api.whatsapp.com"]',
      'a[href*="whatsapp.com/send"]',
      '[aria-label*="whatsapp" i]',
      '[title*="whatsapp" i]',
      '[id*="whatsapp" i]',
      '[class*="whatsapp" i]'
    ];

    document.querySelectorAll(selectors.join(",")).forEach(function (element) {
      if (chatbot.contains(element)) {
        return;
      }

      let current = element;
      let fixedWrapper = null;

      while (current && current !== document.body) {
        const style = window.getComputedStyle(current);

        if (style.position === "fixed") {
          fixedWrapper = current;
          break;
        }

        current = current.parentElement;
      }

      if (fixedWrapper && !chatbot.contains(fixedWrapper)) {
        fixedWrapper.style.setProperty("display", "none", "important");
      }
    });
  }

  hideOldWhatsAppWidget();

  window.addEventListener("load", function () {
    hideOldWhatsAppWidget();

    setTimeout(hideOldWhatsAppWidget, 500);
    setTimeout(hideOldWhatsAppWidget, 1500);
  });

  const oldWhatsAppObserver = new MutationObserver(function () {
    hideOldWhatsAppWidget();
  });

  oldWhatsAppObserver.observe(document.body, {
    childList: true,
    subtree: true
  });


  const chatButton = document.getElementById("wa-chat-button");
  const chatBox = document.getElementById("wa-chat-box");
  const closeButton = document.getElementById("wa-close");
  const form = document.getElementById("wa-form");
  const submitButton = document.getElementById("wa-submit");

  chatButton.addEventListener("click", function () {
    chatBox.classList.toggle("open");
  });

  closeButton.addEventListener("click", function () {
    chatBox.classList.remove("open");
  });

  function handleInterestSelection() {
    const interest =
      form.querySelector('input[name="interest"]:checked');

    const questions = form.querySelectorAll(".wa-question");
    const footerNote = form.querySelector(".wa-footer-note");

    let thankYou = document.getElementById("wa-no-thank-you");

    if (!thankYou) {
      thankYou = document.createElement("div");
      thankYou.id = "wa-no-thank-you";
      thankYou.className = "wa-thank-you";
      thankYou.innerHTML = `
        <div class="wa-thank-you-icon">✓</div>
        <strong>Thank you for visiting our website.</strong>
        <div>We appreciate your interest in Serene Exotica.</div>
      `;

      questions[0].insertAdjacentElement("afterend", thankYou);
    }

    if (interest && interest.value === "No") {

      if (questions[1]) {
        questions[1].style.display = "none";
      }

      if (questions[2]) {
        questions[2].style.display = "none";
      }

      form.querySelectorAll(
        'input[name="timeline"], input[name="budget"]'
      ).forEach(function (input) {
        input.checked = false;
      });

      submitButton.style.display = "none";

      if (footerNote) {
        footerNote.style.display = "none";
      }

      thankYou.style.display = "block";

      return true;
    }

    if (questions[1]) {
      questions[1].style.removeProperty("display");
    }

    if (questions[2]) {
      questions[2].style.removeProperty("display");
    }

    submitButton.style.removeProperty("display");

    if (footerNote) {
      footerNote.style.removeProperty("display");
    }

    thankYou.style.display = "none";

    return false;
  }

  form.addEventListener("change", function () {
    const interest =
      form.querySelector('input[name="interest"]:checked');

    if (handleInterestSelection()) {
      submitButton.disabled = true;
      return;
    }

    const timeline =
      form.querySelector('input[name="timeline"]:checked');

    const budget =
      form.querySelector('input[name="budget"]:checked');

    submitButton.disabled = !(interest && timeline && budget);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const interest =
      form.querySelector('input[name="interest"]:checked').value;

    const timeline =
      form.querySelector('input[name="timeline"]:checked').value;

    const budget =
      form.querySelector('input[name="budget"]:checked').value;

    const message =
`Hi,
I am interested in Serene Exotica.

Looking for Plots? - ${interest}

Purchase Timeline - ${timeline}

Budget - ${budget}

Please share more details.`;

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank");
  });
})();
