// ============================================
// UniVibe - Main JavaScript
// Handles all interactivity on the website
// ============================================

// --- wait for the page to load ---
document.addEventListener("DOMContentLoaded", function () {

  // ============================================
  // Global state
  // ============================================
  let currentCategory = "All";
  let currentSearch = "";
  let showingShortlist = false;
  let favorites = JSON.parse(localStorage.getItem("cc-favorites")) || [];
  let quizAnswers = {}; // stores selected option index for each question

  // ============================================
  // DOM elements
  // ============================================
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const categoryButtonsContainer = document.getElementById("categoryButtons");
  const societyGrid = document.getElementById("societyGrid");
  const searchInput = document.getElementById("searchInput");
  const emptyState = document.getElementById("emptyState");
  const showAllBtn = document.getElementById("showAllBtn");
  const showShortlistBtn = document.getElementById("showShortlistBtn");
  const shortlistCount = document.getElementById("shortlistCount");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");
  const quizContainer = document.getElementById("quizContainer");
  const quizActions = document.getElementById("quizActions");
  const findMySocietyBtn = document.getElementById("findMySocietyBtn");
  const quizResults = document.getElementById("quizResults");
  const recommendedCards = document.getElementById("recommendedCards");
  const otherRecommendations = document.getElementById("otherRecommendations");
  const retakeQuizBtn = document.getElementById("retakeQuizBtn");
  const applyForm = document.getElementById("applyForm");
  const formSuccess = document.getElementById("formSuccess");
  const newApplicationBtn = document.getElementById("newApplicationBtn");
  const societySelect = document.getElementById("societySelect");
  const campusTipText = document.getElementById("campusTipText");

  // ============================================
  // 1. NAVBAR - hamburger menu toggle
  // ============================================
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // close mobile menu when a link is clicked
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  // ============================================
  // 2. DARK MODE
  // ============================================
  // check if user previously set dark mode
  if (localStorage.getItem("cc-dark-mode") === "true") {
    document.body.classList.add("dark");
    darkModeBtn.textContent = "☀️";
  }

  darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    darkModeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("cc-dark-mode", isDark);
  });

  // ============================================
  // 3. CAMPUS TIP - show a random tip
  // ============================================
  const randomTip = campusTips[Math.floor(Math.random() * campusTips.length)];
  campusTipText.textContent = randomTip;

  // ============================================
  // 4. CATEGORY BUTTONS
  // ============================================
  function renderCategoryButtons() {
    categoryButtonsContainer.innerHTML = "";
    categories.forEach(function (cat) {
      const btn = document.createElement("button");
      btn.className = "category-btn" + (cat === currentCategory ? " active" : "");
      btn.textContent = cat;
      btn.addEventListener("click", function () {
        currentCategory = cat;
        showingShortlist = false;
        renderCategoryButtons();
        renderSocieties();
      });
      categoryButtonsContainer.appendChild(btn);
    });
  }

  // ============================================
  // 5. SOCIETY CARDS - render and filter
  // ============================================
  function getFilteredSocieties() {
    let filtered = societies;

    // filter by category
    if (currentCategory !== "All") {
      filtered = filtered.filter(function (s) {
        return s.category === currentCategory;
      });
    }

    // filter by search
    if (currentSearch.trim() !== "") {
      const query = currentSearch.toLowerCase();
      filtered = filtered.filter(function (s) {
        return (
          s.name.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.tagline.toLowerCase().includes(query)
        );
      });
    }

    // filter by shortlist
    if (showingShortlist) {
      filtered = filtered.filter(function (s) {
        return favorites.includes(s.id);
      });
    }

    return filtered;
  }

  function renderSocieties() {
    const filtered = getFilteredSocieties();
    societyGrid.innerHTML = "";

    if (filtered.length === 0) {
      emptyState.classList.remove("hidden");
      societyGrid.classList.add("hidden");
    } else {
      emptyState.classList.add("hidden");
      societyGrid.classList.remove("hidden");

      filtered.forEach(function (society) {
        const card = createSocietyCard(society);
        societyGrid.appendChild(card);
      });
    }

    // update shortlist count
    shortlistCount.textContent = favorites.length;
  }

  // create a single society card element
  function createSocietyCard(society) {
    const card = document.createElement("div");
    card.className = "society-card";

    const isFav = favorites.includes(society.id);
    const statusText = society.status === "open" ? "🟢 Applications Open" : "⚪ Coming Soon";
    const statusClass = society.status === "open" ? "status-open" : "status-coming-soon";

    card.innerHTML = `
      <img src="${society.image}" alt="${society.name}" class="card-image">
      <div class="card-header">
        <span class="card-icon">${society.icon}</span>
        <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${society.id}" title="Add to shortlist">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <h3 class="card-name">${society.name}</h3>
      <p class="card-category">${society.category}</p>
      <p class="card-tagline">"${society.tagline}"</p>
      <p class="card-description">${society.description}</p>
      <div class="card-footer">
        <span class="status-badge ${statusClass}">${statusText}</span>
        <button class="btn btn-outline card-view-btn" data-id="${society.id}">View Details</button>
      </div>
    `;

    // favorite button click
    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", function () {
      toggleFavorite(society.id);
    });

    // view details button click
    const viewBtn = card.querySelector(".card-view-btn");
    viewBtn.addEventListener("click", function () {
      openModal(society);
    });

    return card;
  }

  // ============================================
  // 6. FAVORITES / SHORTLIST
  // ============================================
  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(function (fId) {
        return fId !== id;
      });
    } else {
      favorites.push(id);
    }
    localStorage.setItem("cc-favorites", JSON.stringify(favorites));
    renderSocieties();
  }

  showShortlistBtn.addEventListener("click", function () {
    showingShortlist = !showingShortlist;
    currentCategory = "All";
    currentSearch = "";
    searchInput.value = "";
    renderCategoryButtons();
    renderSocieties();

    if (showingShortlist) {
      showShortlistBtn.textContent = "← Back to All Societies";
    } else {
      showShortlistBtn.innerHTML = '❤️ My Shortlist (<span id="shortlistCount">' + favorites.length + '</span>)';
    }
  });

  // ============================================
  // 7. SEARCH
  // ============================================
  searchInput.addEventListener("input", function () {
    currentSearch = searchInput.value;
    showingShortlist = false;
    showShortlistBtn.innerHTML = '❤️ My Shortlist (<span id="shortlistCount">' + favorites.length + '</span>)';
    renderSocieties();
  });

  // "Show All" button in empty state
  showAllBtn.addEventListener("click", function () {
    currentCategory = "All";
    currentSearch = "";
    searchInput.value = "";
    showingShortlist = false;
    showShortlistBtn.innerHTML = '❤️ My Shortlist (<span id="shortlistCount">' + favorites.length + '</span>)';
    renderCategoryButtons();
    renderSocieties();
  });

  // ============================================
  // 8. SOCIETY DETAIL MODAL
  // ============================================
  function openModal(society) {
    const statusText = society.status === "open" ? "🟢 Applications Open" : "⚪ Coming Soon";
    const statusClass = society.status === "open" ? "status-open" : "status-coming-soon";

    let activitiesHTML = "";
    society.activities.forEach(function (a) {
      activitiesHTML += "<li>" + a + "</li>";
    });

    let rolesHTML = "";
    society.roles.forEach(function (r) {
      rolesHTML += '<span class="role-tag">' + r + "</span>";
    });

    modalContent.innerHTML = `
      <img src="${society.image}" alt="${society.name}" class="modal-banner">
      <h2>${society.icon} ${society.name}</h2>
      <p class="modal-category">${society.category}</p>

      <h3>About</h3>
      <p>${society.about}</p>

      <h3>What members do</h3>
      <ul>${activitiesHTML}</ul>

      <h3>Open Roles</h3>
      <div class="modal-roles">${rolesHTML}</div>

      <h3>Why join?</h3>
      <p>${society.whyJoin}</p>

      <div class="modal-status">
        <span class="status-badge ${statusClass}">${statusText}</span>
      </div>

      ${society.status === "open"
        ? '<a href="#apply-section" class="btn btn-primary modal-apply-btn" id="modalApplyBtn">Apply Now</a>'
        : '<p style="color: var(--text-light); font-size: 0.85rem;">Applications will open soon. Check back later!</p>'}
    `;

    modalOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // prevent background scrolling

    // if "Apply Now" button exists, set the society dropdown when clicked
    const modalApplyBtn = document.getElementById("modalApplyBtn");
    if (modalApplyBtn) {
      modalApplyBtn.addEventListener("click", function () {
        closeModal();
        // set the society in the dropdown
        societySelect.value = society.name;
      });
    }
  }

  function closeModal() {
    modalOverlay.classList.add("hidden");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // ============================================
  // 9. RECOMMENDATION QUIZ
  // ============================================
  function renderQuiz() {
    quizContainer.innerHTML = "";
    quizAnswers = {};

    quizQuestions.forEach(function (q, qIndex) {
      const questionDiv = document.createElement("div");
      questionDiv.className = "quiz-question";

      let optionsHTML = "";
      q.options.forEach(function (opt, oIndex) {
        optionsHTML += '<button class="quiz-option" data-q="' + qIndex + '" data-o="' + oIndex + '">' + opt.text + "</button>";
      });

      questionDiv.innerHTML = `
        <h4><span class="q-number">Q${qIndex + 1}.</span> ${q.question}</h4>
        <div class="quiz-options">${optionsHTML}</div>
      `;

      quizContainer.appendChild(questionDiv);
    });

    // add click listeners to all quiz options
    document.querySelectorAll(".quiz-option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const qIdx = parseInt(btn.dataset.q);
        const oIdx = parseInt(btn.dataset.o);

        // deselect other options in the same question
        document.querySelectorAll('.quiz-option[data-q="' + qIdx + '"]').forEach(function (b) {
          b.classList.remove("selected");
        });

        btn.classList.add("selected");
        quizAnswers[qIdx] = oIdx;

        // show the "Find My Society" button when all questions are answered
        if (Object.keys(quizAnswers).length === quizQuestions.length) {
          quizActions.classList.remove("hidden");
        }
      });
    });
  }

  // calculate recommendations
  findMySocietyBtn.addEventListener("click", function () {
    // calculate scores for each category
    const scores = {};

    Object.keys(quizAnswers).forEach(function (qIdx) {
      const oIdx = quizAnswers[qIdx];
      const option = quizQuestions[qIdx].options[oIdx];

      Object.keys(option.scores).forEach(function (category) {
        if (!scores[category]) scores[category] = 0;
        scores[category] += option.scores[category];
      });
    });

    // sort categories by score (highest first)
    const sortedCategories = Object.keys(scores).sort(function (a, b) {
      return scores[b] - scores[a];
    });

    // get top 2 recommended categories
    const topCategories = sortedCategories.slice(0, 2);
    const otherCategories = sortedCategories.slice(2, 4);

    // find matching societies
    const topSocieties = [];
    topCategories.forEach(function (cat) {
      const match = societies.find(function (s) {
        return s.category === cat && !topSocieties.includes(s);
      });
      if (match) {
        topSocieties.push(match);
      }
    });

    // if we don't have enough, grab any remaining
    if (topSocieties.length < 2 && sortedCategories.length > 0) {
      for (let i = 0; i < societies.length && topSocieties.length < 2; i++) {
        if (!topSocieties.includes(societies[i])) {
          topSocieties.push(societies[i]);
        }
      }
    }

    // build reason strings based on the user's answers
    function getReasonForCategory(category) {
      switch (category) {
        case "Technical":
          return "Because you showed an interest in technology and problem solving.";
        case "Cultural":
          return "Because you enjoy creative expression and performances.";
        case "Sports":
          return "Because you're competitive and enjoy physical activities.";
        case "Literary":
          return "Because you value communication and love words.";
        case "Photography":
          return "Because you have a creative eye and love visual storytelling.";
        case "Entrepreneurship":
          return "Because you selected leadership and organising activities.";
        case "Social Service":
          return "Because you care about making a positive impact.";
        case "Music & Dance":
          return "Because you love performing and creative expression.";
        default:
          return "Based on your interests and personality.";
      }
    }

    // render top recommendations
    recommendedCards.innerHTML = "";
    topSocieties.forEach(function (society) {
      const card = document.createElement("div");
      card.className = "rec-card";
      card.innerHTML = `
        <p class="rec-name">⭐ ${society.name}</p>
        <p class="rec-reason">${getReasonForCategory(society.category)}</p>
      `;
      recommendedCards.appendChild(card);
    });

    // render other recommendations
    otherRecommendations.innerHTML = "";
    if (otherCategories.length > 0) {
      const otherSocieties = [];
      otherCategories.forEach(function (cat) {
        const match = societies.find(function (s) {
          return s.category === cat && !topSocieties.includes(s) && !otherSocieties.includes(s);
        });
        if (match) otherSocieties.push(match);
      });

      if (otherSocieties.length > 0) {
        let tagsHTML = "";
        otherSocieties.forEach(function (s) {
          tagsHTML += '<span class="other-rec-tag">' + s.name + "</span>";
        });
        otherRecommendations.innerHTML = `
          <h4>Other societies you may like</h4>
          <div class="other-rec-list">${tagsHTML}</div>
        `;
      }
    }

    // show results, hide quiz
    quizContainer.classList.add("hidden");
    quizActions.classList.add("hidden");
    quizResults.classList.remove("hidden");
  });

  // retake quiz
  retakeQuizBtn.addEventListener("click", function () {
    quizResults.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    renderQuiz();
  });

  // ============================================
  // 10. APPLICATION FORM
  // ============================================

  // populate society dropdown
  function populateSocietyDropdown() {
    societies.forEach(function (s) {
      if (s.status === "open") {
        const opt = document.createElement("option");
        opt.value = s.name;
        opt.textContent = s.name;
        societySelect.appendChild(opt);
      }
    });
  }

  // form validation
  applyForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // helper to show/clear errors
    function showError(fieldId, message) {
      const errorEl = document.getElementById(fieldId + "Error");
      const inputEl = document.getElementById(fieldId);
      if (message) {
        errorEl.textContent = message;
        inputEl.classList.add("input-error");
        isValid = false;
      } else {
        errorEl.textContent = "";
        inputEl.classList.remove("input-error");
      }
    }

    // validate each required field
    const fullName = document.getElementById("fullName").value.trim();
    showError("fullName", fullName === "" ? "Please enter your full name." : "");

    const email = document.getElementById("email").value.trim();
    if (email === "") {
      showError("email", "Please enter your college email.");
    } else if (!email.includes("@") || !email.includes(".")) {
      showError("email", "Please enter a valid email address.");
    } else {
      showError("email", "");
    }

    const year = document.getElementById("year").value;
    showError("year", year === "" ? "Please select your year." : "");

    const branch = document.getElementById("branch").value.trim();
    showError("branch", branch === "" ? "Please enter your branch." : "");

    const selectedSociety = societySelect.value;
    showError("societySelect", selectedSociety === "" ? "Please select a society." : "");

    const whyJoin = document.getElementById("whyJoin").value.trim();
    showError("whyJoin", whyJoin === "" ? "Please tell us why you want to join." : "");

    if (isValid) {
      // "submit" the form (no backend, just show success)
      applyForm.classList.add("hidden");
      formSuccess.classList.remove("hidden");
    }
  });

  // clear error styling when user starts typing
  applyForm.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      field.classList.remove("input-error");
      const errorEl = document.getElementById(field.id + "Error");
      if (errorEl) errorEl.textContent = "";
    });
  });

  // new application button
  newApplicationBtn.addEventListener("click", function () {
    applyForm.reset();
    applyForm.classList.remove("hidden");
    formSuccess.classList.add("hidden");
  });

  // ============================================
  // 11. "WHAT ARE YOU LOOKING FOR?" - Preferences
  // ============================================

  // DOM elements for preferences section
  const prefGrid = document.getElementById("prefGrid");
  const prefMsg = document.getElementById("prefMsg");
  const showPrefResultsBtn = document.getElementById("showPrefResultsBtn");
  const prefResults = document.getElementById("prefResults");
  const prefResultsGrid = document.getElementById("prefResultsGrid");

  // keep track of which preferences are selected (multiple allowed)
  let selectedPrefs = [];

  // render the preference chips from data
  function renderPrefChips() {
    prefGrid.innerHTML = "";

    preferenceOptions.forEach(function (pref) {
      const chip = document.createElement("button");
      chip.className = "pref-chip";
      chip.innerHTML = '<span class="chip-emoji">' + pref.emoji + '</span> ' + pref.label + ' <span class="chip-check">✓</span>';

      // toggle selection on click
      chip.addEventListener("click", function () {
        chip.classList.toggle("selected");

        // update selectedPrefs array
        if (chip.classList.contains("selected")) {
          selectedPrefs.push(pref.id);
        } else {
          selectedPrefs = selectedPrefs.filter(function (id) {
            return id !== pref.id;
          });
        }

        // hide the warning message when user selects something
        prefMsg.classList.add("hidden");
      });

      prefGrid.appendChild(chip);
    });
  }

  // when the "Show Societies For Me" button is clicked
  showPrefResultsBtn.addEventListener("click", function () {
    // if nothing selected, show a friendly message
    if (selectedPrefs.length === 0) {
      prefMsg.classList.remove("hidden");
      prefResults.classList.add("hidden");
      return;
    }

    prefMsg.classList.add("hidden");

    // collect all matching categories from selected preferences
    var matchedCategories = [];
    var selectedLabels = [];

    selectedPrefs.forEach(function (prefId) {
      var pref = preferenceOptions.find(function (p) { return p.id === prefId; });
      if (pref) {
        selectedLabels.push(pref.label.toLowerCase());
        pref.categories.forEach(function (cat) {
          if (matchedCategories.indexOf(cat) === -1) {
            matchedCategories.push(cat);
          }
        });
      }
    });

    // find societies whose category matches, pick up to 4
    var matchedSocieties = societies.filter(function (s) {
      return matchedCategories.indexOf(s.category) !== -1;
    }).slice(0, 4);

    // build a "why this matches" string
    var reasonText = "";
    if (selectedLabels.length === 1) {
      reasonText = "You said you want to " + selectedLabels[0] + ".";
    } else if (selectedLabels.length === 2) {
      reasonText = "You selected " + selectedLabels[0] + " and " + selectedLabels[1] + ".";
    } else {
      var last = selectedLabels.pop();
      reasonText = "You selected " + selectedLabels.join(", ") + " and " + last + ".";
    }

    // render results using existing society cards
    prefResultsGrid.innerHTML = "";

    matchedSocieties.forEach(function (society) {
      var card = createSocietyCard(society);

      // add a "why this matches" explanation at the bottom of the card
      var reasonDiv = document.createElement("div");
      reasonDiv.className = "rec-match-reason";
      reasonDiv.innerHTML = '<strong>Why this matches:</strong> ' + reasonText;
      card.appendChild(reasonDiv);

      prefResultsGrid.appendChild(card);
    });

    prefResults.classList.remove("hidden");
  });

  // ============================================
  // 12. "WHAT'S YOUR CAMPUS MOOD?" - Mood Picker
  // ============================================

  // DOM elements for mood section
  const moodGrid = document.getElementById("moodGrid");
  const moodMsg = document.getElementById("moodMsg");
  const findMoodMatchBtn = document.getElementById("findMoodMatchBtn");
  const moodResults = document.getElementById("moodResults");
  const moodResultsGrid = document.getElementById("moodResultsGrid");
  const moodReason = document.getElementById("moodReason");

  // only one mood can be selected at a time
  let selectedMood = null;

  // render the mood cards from data
  function renderMoodCards() {
    moodGrid.innerHTML = "";

    moodOptions.forEach(function (mood) {
      var card = document.createElement("button");
      card.className = "mood-card";
      card.innerHTML = '<span class="mood-emoji">' + mood.emoji + '</span> ' + mood.label + ' <span class="mood-check">✓</span>';

      card.addEventListener("click", function () {
        // deselect all other mood cards first (only one at a time)
        document.querySelectorAll(".mood-card").forEach(function (c) {
          c.classList.remove("selected");
        });

        // select this one
        card.classList.add("selected");
        selectedMood = mood.id;

        // hide warning
        moodMsg.classList.add("hidden");
      });

      moodGrid.appendChild(card);
    });
  }

  // when the "Find My Match" button is clicked
  findMoodMatchBtn.addEventListener("click", function () {
    // if no mood selected, show message
    if (!selectedMood) {
      moodMsg.classList.remove("hidden");
      moodResults.classList.add("hidden");
      return;
    }

    moodMsg.classList.add("hidden");

    // find the selected mood object
    var mood = moodOptions.find(function (m) { return m.id === selectedMood; });
    if (!mood) return;

    // find matching societies (up to 3)
    var matchedSocieties = societies.filter(function (s) {
      return mood.categories.indexOf(s.category) !== -1;
    }).slice(0, 3);

    // show the reason text
    moodReason.textContent = mood.reason;

    // render result cards using existing society card function
    moodResultsGrid.innerHTML = "";

    matchedSocieties.forEach(function (society) {
      var card = createSocietyCard(society);
      moodResultsGrid.appendChild(card);
    });

    moodResults.classList.remove("hidden");
  });

  // ============================================
  // INITIALIZE EVERYTHING
  // ============================================
  renderCategoryButtons();
  renderSocieties();
  renderQuiz();
  populateSocietyDropdown();
  renderPrefChips();
  renderMoodCards();

});
