window.addEventListener("DOMContentLoaded", listen);
/// This is the cursor function.
document.addEventListener("mousemove", function (event) {
  // ////////// Spinner
  const x = event.pageX;
  const y = event.pageY;
  const midX = x - window.innerWidth / 2;
  const midY = y - window.innerHeight / 2;
  const arrow = document.querySelector(".arrow");
  arrow.style.left = x + "px";
  arrow.style.top = y + "px";
  //// Spin the mouse when you move it.
  arrow.style.transform =
    "rotateX(" + midY * 0.2 + "deg) rotateY(" + midX * 0.2 + "deg)";
});
//// Navigation function.
function navigation() {
  if (document.querySelector(`[data-nav-state="active"]`)) {
    const deacnav = document.querySelector(`[data-nav-state="active"]`);
    deacnav.dataset.navState = "";
  }
  const titles = document.querySelectorAll(`[data-title]`);
  titles.forEach(e => {
    e.style.display = "none";
  })
  const thisisOpen = this;
  const clip = document.querySelector(`[data-clip="` + this.dataset.nav + `"]`);
  const AN = document.querySelector(`[data-nav="` + this.dataset.nav + `"]`);
  AN.dataset.navState = "active";
  const arrow1 = document.querySelector(".arrow");
  arrow1.dataset.color = this.dataset.nav;
  const arrow = arrow1.getClientRects();
  const X = arrow[0].x;
  const Y = arrow[0].y;
  clip.setAttribute("cy", Y);
  clip.setAttribute("cx", X);
  activateCircle(clip, thisisOpen, arrow);


  const part = document.querySelector(".PortfolioC")
  if (part.querySelector(`[data-nav="Home"]`)) {
    const changeCol = function () {
      document.querySelector(`[data-nav="Home"]`).style.color = "#f46a79";
    }
    document.querySelector(`[data-nav="Home"]`).addEventListener("mouseleave", e = changeCol);
  }
}

async function showPortCard() {
  const template = document.querySelector(".portcardTemplate").content;
  const clone = template.cloneNode(true);
  const what = this.dataset.porthover;
  const data = await GetJsonData(what);
  const para = clone.querySelector(".portParagr");
  para.textContent = data[0].parts[0].header;
  const ul = clone.querySelector("ul");
  data[0].parts[0].under.forEach(e => {
    const list = document.createElement("li");
    list.textContent = e;
    ul.appendChild(list);
  });
  const vid = clone.querySelector(".header");
  vid.style.backgroundImage = `url(portfolioAssets/gif/` + data[0].parts[0].media[0].gif + `)`
  const circle = document.querySelector(`[data-clip="portcard"]`);
  document.querySelector(".PortfolioCard").innerHTML = "";
  document.querySelector(".PortfolioCard").appendChild(clone);
  activateCircle2(circle);
}

async function GetJsonData(part) {
  const response = await fetch("data.json");
  const json = await response.json();
  let ret = [];
  json.forEach(e => {
    if (e.id == part) {
      ret.push(e)
    }
  })
  return ret;
}

const smallArrow = function () {
  const part = document.querySelector(".PortfolioC")
  if (part.querySelector(`[data-nav="Home"]`)) {
    const changeCol = function () {
      document.querySelector(`[data-nav="Home"]`).style.color = "#002D40";
    }
    document.querySelector(`[data-nav="Home"]`).addEventListener("mouseover", e = changeCol);
  }
  const arrow = document.querySelector(".arrow")
  arrow.style.opacity = 0.8;
  arrow.classList.remove("arrowbig");
  arrow.classList.add("arrowsmall");
  arrow.style.transform = `rotateX(0deg) rotateY(0deg)`;
}

const bigArrow = function () {
  const arrow = document.querySelector(".arrow")
  arrow.classList.add("arrowbig");
  arrow.classList.remove("arrowsmall");
  arrow.style.opacity = 1;
}

/// Add event listeners on document loaded.
function listen() {
  const e = document.querySelectorAll("[data-nav]");
  e.forEach(t => {
    t.addEventListener("click", (event = navigation));
  });
  const t = document.querySelectorAll("[data-porthover]");
  t.forEach(e => {
    e.addEventListener("mouseover", (event = showPortCard));
  });
  const y = document.querySelectorAll("[data-porthover]");
  y.forEach(e => {
    e.addEventListener("mouseleave", (event = hidePortCard));
  });

  const nav = document.querySelectorAll("[data-nav]")
  nav.forEach(e => {
    e.addEventListener("mouseover", (event = smallArrow));
    e.addEventListener("mouseleave", (event = bigArrow));
  });
  const a = document.querySelectorAll("a")
  a.forEach(e => {
    e.addEventListener("mouseover", (event = smallArrow));
    e.addEventListener("mouseleave", (event = bigArrow));
  });
  const g = document.querySelectorAll(".PortfolioTitle");
  g.forEach(e => {
    e.addEventListener("mouseover", (event = smallArrow));
    e.addEventListener("mouseleave", (event = bigArrow));
  });
  const k = document.querySelectorAll("[data-mini]");
  k.forEach(e => {
    e.addEventListener("mouseover", (event = smallArrow));
    e.addEventListener("mouseleave", (event = bigArrow));
  });
}


$("#ContactForm").submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  const form = $(this);
  const url = form.attr("action");
  const data = form.serialize();
  $.ajax({
    type: "POST",
    url: url,
    data: form.serialize(), // serializes the form's elements.
    success: function (data) {
      document.querySelector(".thanks").style.display = "block";
      const clip = document.querySelector("#CVclip7");
      clip.style.display = "block";
      const circle = clip.querySelector("circle")
      gsap.to(circle, { duration: 2, r: 1000 });
    }
  });
});