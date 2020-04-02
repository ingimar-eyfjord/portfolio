window.addEventListener("DOMContentLoaded", listen);
/// This is the cursor function.
document.addEventListener("mousemove", function(event) {
  // ////////// Spinner
  //   const spinner = document.querySelectorAll(`[data-spin]`);
  //   spinner.forEach(e => {
  //     e.addEventListener("mouseover", spin);
  //   });
  //   function spin() {
  //     arrow.classList.add("spinme");
  //   }
  //   document.querySelector("body").addEventListener("mouseover", e => {
  //     arrow.classList.remove("spinme");
  //   });

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
  const cv = document.querySelector(`[data-nav="CV"]`).getClientRects();
  const ab = document.querySelector(`[data-nav="About"]`).getClientRects();
  const cont = document.querySelector(`[data-nav="Contact"]`).getClientRects();
  const port = document
    .querySelector(`[data-nav="Portfolio"]`)
    .getClientRects();

  ///// Check the pos
  const cvX = cv[0].x;
  const cvY = cv[0].y;
  const abX = ab[0].x;
  const abY = ab[0].y;
  const contX = cont[0].x;
  const contY = cont[0].y;
  const portX = port[0].x;
  const portY = port[0].y;
  /// if cursor goes over the navigation elements. then make small and stop spinning.
  if (x >= cvX && y >= cvY) {
    const cv = document.querySelector(`[data-nav="CV"]`);
    arrow.style.backgroundColor = "#ff414d";
  }
  if (x >= abX && y >= abY) {
    arrow.style.backgroundColor = "#1aa6b7";
  }
  if (x >= contX && y >= contY) {
    arrow.style.backgroundColor = "#002d40";
  }
  if (x >= portX && y >= portY) {
    arrow.style.backgroundColor = "#d9ecf2";
  }

  if (
    (x >= cvX && y >= cvY) ||
    (x >= abX && y >= abY) ||
    (x >= contX && y >= contY) ||
    (x >= portX && y >= portY)
  ) {
    arrow.style.opacity = 0.8;
    arrow.classList.remove("arrowbig");
    arrow.classList.add("arrowsmall");
    arrow.style.transform = `rotateX(0deg) rotateY(0deg)`;
  } else {
    arrow.classList.add("arrowbig");
    arrow.classList.remove("arrowsmall");
    arrow.style.opacity = 1;
  }
});
//// Navigation function.
function navigation() {
  if (document.querySelector(`[data-navState="active"]`)) {
    const deacnav = document.querySelector(`[data-navState="active"]`);
    deacnav.dataset.navState = "";
  }
  const thisisOpen = this;
  const clip = document.querySelector(`[data-clip="` + this.dataset.nav + `"]`);
  const activeN = document.querySelector(
    `[data-page="` + this.dataset.nav + `"]`
  );
  const AN = activeN.querySelector(`[data-nav="` + this.dataset.nav + `"]`);
  AN.dataset.navState = "active";
  AN.style.display = "none";
  const arrow1 = document.querySelector(".arrow");
  const arrow = arrow1.getClientRects();
  const X = arrow[0].x;
  const Y = arrow[0].y;
  clip.setAttribute("cy", Y);
  clip.setAttribute("cx", X);
  arrow1.style.backgroundColor = "#d9ecf2";
  activateCircle(clip, thisisOpen, arrow);
}

/// Add event listeners on document loaded.
function listen() {
  const e = document.querySelectorAll("[data-nav]");
  e.forEach(t => {
    t.addEventListener("click", (event = navigation));
  });
}
