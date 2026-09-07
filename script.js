/* ==========================================================================
   ŠPICA.hr — Humoristična svadbena parodija
   script.js — vanilla JavaScript, bez ovisnosti, bez kolačića i praćenja
   ========================================================================== */
(function () {
  "use strict";

  /* -------------------------------------------------------------------------
     PODACI: povezani članci, komentari, najčitanije, mini kartice
     (Slobodno mijenjaj tekstove i ubacuj interne fore.)
     ------------------------------------------------------------------------- */

  var RELATED = [
    { flag: "EKSKLUZIVNO", ico: "🎬", grad: "linear-gradient(135deg,#e2001a,#ff7a00)", title: "Keanu Reeves viđen kako odobrava pull request bez ijednog komentara" },
    { flag: "ŠOK", ico: "😱", grad: "linear-gradient(135deg,#7b2ff7,#f107a3)", title: "ŠOK U HOLLYWOODU: Ryan Gosling priznao da ne zna centrirati div bez Flexboxa" },
    { flag: "SHOWBUZZ", ico: "💃", grad: "linear-gradient(135deg,#00b4db,#0083b0)", title: "Jennifer Lopez otkrila tajnu mladolikosti: „Nikad ne deployam petkom“" },
    { flag: "DRAMA", ico: "🚪", grad: "linear-gradient(135deg,#232526,#414345)", title: "Brad Pitt napustio sastanak nakon pitanja „Može li samo mala izmjena?“" },
    { flag: "TRAČ", ico: "🕵️", grad: "linear-gradient(135deg,#c31432,#240b36)", title: "Severina uhvaćena s misterioznim backend developerom: Istina će vas iznenaditi" },
    { flag: "UPRAVO", ico: "📅", grad: "linear-gradient(135deg,#11998e,#38ef7d)", title: "Baby Lasagna odbio sastanak koji je mogao biti e-mail" },
    { flag: "LJUBAV", ico: "💍", grad: "linear-gradient(135deg,#ee9ca7,#ffdde1)", title: "George Clooney progovorio o braku: „Najvažniji je dobar version control“" },
    { flag: "GLAZBA", ico: "🎤", grad: "linear-gradient(135deg,#8e2de2,#4a00e0)", title: "Taylor Swift navodno piše album o developeru koji nije dokumentirao API" },
    { flag: "EKSKLUZIVNO", ico: "📸", grad: "linear-gradient(135deg,#000428,#004e92)", title: "EKSKLUZIVNE FOTOGRAFIJE: Poznati glumac koristi light mode nakon ponoći" },
    { flag: "DRAMA", ico: "📶", grad: "linear-gradient(135deg,#f12711,#f5af19)", title: "Drama na crvenom tepihu: Nitko nije znao lozinku za Wi-Fi" },
    { flag: "ŠOK", ico: "🏖️", grad: "linear-gradient(135deg,#2193b0,#6dd5ed)", title: "Stručnjaci zabrinuti: Programer otišao na godišnji i nije ponio laptop" },
    { flag: "UPRAVO", ico: "🎂", grad: "linear-gradient(135deg,#403a3e,#be5869)", title: "Pogledajte reakciju uzvanika kada su shvatili da torta nema dark mode" }
  ];

  var MOST_READ = [
    "Bog Jave prešao na stabilnu paralelnu obradu — evo što to znači za vas",
    "10 znakova da je vaša veza spremna za produkciju (broj 7 će vas iznenaditi)",
    "Kumovi otkrili: ovako izgleda savršen approval na pull requestu",
    "Zašto stručnjaci tvrde da rollback ljubavi nije moguć",
    "Torta bez dark modea podijelila naciju"
  ];

  var MINI = [
    { ico: "🔒", title: "Mladenka dobila trajni admin pristup — bez 2FA" },
    { ico: "📉", title: "SLA braka premašio 99,99% već prvi dan" },
    { ico: "🤝", title: "Uzvanici jednoglasno odobrili merge" },
    { ico: "🐛", title: "Ceremonija prošla bez ijednog kritičnog buga" }
  ];

  var COMMENTS = [
    { user: "JavaFan1987",     time: "prije 12 min", likes: 342, color: "#e2001a", html: "Čestitam! Samo me zanima je li brak pisan u Springu ili su išli na nešto stabilnije?" },
    { user: "AnonimniKolega",  time: "prije 18 min", likes: 210, color: "#7b2ff7", html: "Mogu potvrditi, ceremonija je prošla bez rollbacka. Bio sam na produkciji." },
    { user: "TetkaIzNjemačke", time: "prije 24 min", likes: 501, color: "#0083b0", html: "Predivni ste, samo nemojte sad predugo čekati na junior developera ❤️" },
    { user: "SeniorBezPovišice", time: "prije 31 min", likes: 888, color: "#111827", html: "Napokon jedan projekt koji je dobio odobrenje uprave." },
    { user: "NullPointer",     time: "prije 40 min", likes: 777, color: "#c31432", html: "Ja sam zaplakao već kod <code>public static void zauvijek()</code>." },
    { user: "ScrumMasterica",  time: "prije 52 min", likes: 156, color: "#11998e", html: "Je li medeni mjesec uračunat u ovaj sprint?" },
    { user: "KumNaProdukciji", time: "prije 1 h",    likes: 623, color: "#ff7a00", html: "Pull request je pregledan. Dajem approval." },
    { user: "Baka_Official",   time: "prije 1 h",    likes: 1204, color: "#be5869", html: "Sretno, djeco! Ne razumijem ništa od ove Jave, ali bitno da se vi volite." },
    { user: "FrontendRatnik",  time: "prije 2 h",    likes: 289, color: "#4a00e0", html: "Mladenka izgleda divno. Mladoženjin CSS također neočekivano stabilan." },
    { user: "PrviRedNaSvadbi", time: "prije 2 h",    likes: 415, color: "#16a34a", html: "Mogu li potvrditi da je torta uspješno prošla sve testove." }
  ];

  /* Poruke za modal (dummy članci) */
  var MODAL_MSG = "Ova ekskluziva još nije potvrđena jer je naš novinar trenutno na švedskom stolu.";

  /* -------------------------------------------------------------------------
     Pomoćne funkcije
     ------------------------------------------------------------------------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function initials(name) {
    // uzmi prva dva velika slova / znamenke iz imena
    var m = name.replace(/[^A-Za-zČĆŽŠĐčćžšđ0-9]/g, "");
    return (m.charAt(0) + (m.charAt(1) || "")).toUpperCase();
  }

  var toastTimer = null;
  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-visible"); }, 2600);
  }

  /* -------------------------------------------------------------------------
     Godina u footeru
     ------------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------------------------------
     MODAL (dummy članci)
     ------------------------------------------------------------------------- */
  var modal = document.getElementById("modal");
  var modalTitle = document.getElementById("modalTitle");
  var lastFocused = null;

  function openModal(title) {
    if (!modal) return;
    lastFocused = document.activeElement;
    if (modalTitle) modalTitle.textContent = title || "Ekskluziva";
    modal.hidden = false;
    var closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-modal-close")) closeModal();
    });
  }

  /* -------------------------------------------------------------------------
     POPUP REKLAMA
     ------------------------------------------------------------------------- */
  var popup = document.getElementById("popupAd");
  function openPopup() {
    if (!popup) return;
    popup.hidden = false;
    var x = popup.querySelector(".popup__x");
    if (x) x.focus();
  }
  function closePopup() {
    if (!popup) return;
    popup.hidden = true;
  }
  if (popup) {
    popup.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-popup-close")) closePopup();
    });
  }

  // Prikaži popup samo jednom po sesiji, nakon 6–10 s
  try {
    if (!sessionStorage.getItem("spica_popup_shown")) {
      var delay = 6000 + Math.floor(Math.random() * 4000); // 6–10 s
      setTimeout(function () {
        // ne prikazuj ako je već otvoren neki drugi dijalog
        if (modal && !modal.hidden) return;
        openPopup();
        try { sessionStorage.setItem("spica_popup_shown", "1"); } catch (e) {}
      }, delay);
    }
  } catch (e) {
    // sessionStorage nedostupan (npr. file:// u strogom načinu) — popup jednostavno preskačemo
  }

  /* -------------------------------------------------------------------------
     ESC zatvara modal i popup
     ------------------------------------------------------------------------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      if (modal && !modal.hidden) closeModal();
      if (popup && !popup.hidden) closePopup();
    }
  });

  /* -------------------------------------------------------------------------
     KLIK NA REKLAME (CTA) -> humoristična poruka
     ------------------------------------------------------------------------- */
  document.addEventListener("click", function (e) {
    var cta = e.target.closest("[data-ad-cta]");
    if (cta) {
      e.preventDefault();
      closePopup();
      toast("Čestitamo! Upravo ste izbjegli kupnju proizvoda koji ne postoji.");
    }
  });

  /* -------------------------------------------------------------------------
     POVEZANI ČLANCI (grid)
     ------------------------------------------------------------------------- */
  var grid = document.getElementById("relatedGrid");
  if (grid) {
    RELATED.forEach(function (r) {
      var card = el("button", "rel-card");
      card.type = "button";
      card.setAttribute("data-modal", r.title);
      card.innerHTML =
        '<div class="rel-card__thumb" style="background:' + r.grad + '" aria-hidden="true">' + r.ico + "</div>" +
        '<div class="rel-card__body">' +
          '<span class="rel-card__flag">' + r.flag + "</span>" +
          '<span class="rel-card__title">' + r.title + "</span>" +
        "</div>";
      card.addEventListener("click", function () { openModal(r.title); });
      grid.appendChild(card);
    });
  }

  /* -------------------------------------------------------------------------
     NAJČITANIJE (sidebar) — klik otvara modal
     ------------------------------------------------------------------------- */
  var mostRead = document.getElementById("mostRead");
  if (mostRead) {
    MOST_READ.forEach(function (t) {
      var li = el("li", null, '<span class="most-read__t">' + t + "</span>");
      li.setAttribute("tabindex", "0");
      li.setAttribute("role", "button");
      li.addEventListener("click", function () { openModal(t); });
      li.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(t); }
      });
      mostRead.appendChild(li);
    });
  }

  /* -------------------------------------------------------------------------
     MINI KARTICE (sidebar)
     ------------------------------------------------------------------------- */
  var miniCards = document.getElementById("miniCards");
  if (miniCards) {
    MINI.forEach(function (m) {
      var b = el("button", "mini-card");
      b.type = "button";
      b.innerHTML =
        '<span class="mini-card__ico" aria-hidden="true">' + m.ico + "</span>" +
        '<span class="mini-card__t">' + m.title + "</span>";
      b.addEventListener("click", function () { openModal(m.title); });
      miniCards.appendChild(b);
    });
  }

  /* -------------------------------------------------------------------------
     KOMENTARI + lajkovi
     ------------------------------------------------------------------------- */
  var commentList = document.getElementById("commentList");
  if (commentList) {
    COMMENTS.forEach(function (c) {
      var li = el("li", "comment");
      li.innerHTML =
        '<div class="comment__avatar" style="background:' + c.color + '" aria-hidden="true">' + initials(c.user) + "</div>" +
        '<div class="comment__main">' +
          '<div class="comment__head">' +
            '<span class="comment__user">' + c.user + "</span>" +
            '<span class="comment__time">' + c.time + "</span>" +
          "</div>" +
          '<p class="comment__text">' + c.html + "</p>" +
          '<div class="comment__actions">' +
            '<button class="comment__btn comment__like" type="button" aria-pressed="false">' +
              '👍 Sviđa mi se <span class="like-count">' + c.likes + "</span>" +
            "</button>" +
            '<button class="comment__btn comment__reply" type="button">💬 Odgovori</button>' +
          "</div>" +
        "</div>";

      // Lajk
      var likeBtn = li.querySelector(".comment__like");
      var countEl = li.querySelector(".like-count");
      likeBtn.addEventListener("click", function () {
        var liked = likeBtn.classList.toggle("is-liked");
        likeBtn.setAttribute("aria-pressed", liked ? "true" : "false");
        countEl.textContent = parseInt(countEl.textContent, 10) + (liked ? 1 : -1);
      });

      // Odgovori (šaljivo)
      li.querySelector(".comment__reply").addEventListener("click", function () {
        toast("Odgovor je poslan u red čekanja (procjena: nakon medenog mjeseca).");
      });

      commentList.appendChild(li);
    });
  }

  // Lažni gumb "Objavi komentar"
  var fakeSubmit = document.querySelector("[data-fake-submit]");
  if (fakeSubmit) {
    fakeSubmit.addEventListener("click", function () {
      toast("Komentar poslan na moderaciju. Moderator je trenutno na švedskom stolu.");
    });
  }

  /* -------------------------------------------------------------------------
     SHARE GUMBI
     ------------------------------------------------------------------------- */
  document.querySelectorAll("[data-share]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      toast("Trač je uspješno podijeljen 🎉");
    });
  });

  /* -------------------------------------------------------------------------
     ANKETA (lažni rezultati)
     ------------------------------------------------------------------------- */
  var poll = document.getElementById("poll");
  if (poll) {
    var voted = false;
    var opts = poll.querySelectorAll(".poll__opt");
    var fakePct = [58, 27, 15]; // zbroj 100
    opts.forEach(function (opt, i) {
      opt.addEventListener("click", function () {
        if (voted) return;
        voted = true;
        opts.forEach(function (o, j) {
          o.classList.add("is-voted");
          var bar = el("span", "poll__bar");
          var pct = el("span", "poll__pct", fakePct[j] + "%");
          // umotaj postojeći tekst
          var label = o.textContent;
          o.textContent = "";
          o.appendChild(bar);
          var span = el("span", null, label);
          o.appendChild(span);
          span.appendChild(pct);
          // animiraj traku
          requestAnimationFrame(function () { bar.style.width = fakePct[j] + "%"; });
        });
        opt.querySelector(".poll__bar").style.background = "#f9b4bd";
        toast("Glas zabilježen! (Rezultati su, naravno, izmišljeni.)");
      });
    });
  }

  /* -------------------------------------------------------------------------
     HAMBURGER IZBORNIK
     ------------------------------------------------------------------------- */
  var hamburger = document.getElementById("hamburger");
  var mainNav = document.getElementById("mainNav");
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      hamburger.classList.toggle("is-open", open);
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // zatvori nakon klika na link (mobilni)
    mainNav.querySelectorAll(".mainnav__link").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        hamburger.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------------------------------------------------------------
     POVRATAK NA VRH
     ------------------------------------------------------------------------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.hidden = window.scrollY < 500;
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------------------------------------------------------------------------
     LAGANO "ŽIVI" BROJ PREGLEDA (samo za atmosferu)
     ------------------------------------------------------------------------- */
  var viewCount = document.getElementById("viewCount");
  if (viewCount) {
    setInterval(function () {
      var n = parseInt(viewCount.textContent.replace(/\./g, ""), 10) || 12487;
      n += Math.floor(Math.random() * 4) + 1;
      // formatiraj s točkom kao razdjelnikom tisućica (hr)
      viewCount.textContent = n.toLocaleString("hr-HR");
    }, 4000);
  }

})();
