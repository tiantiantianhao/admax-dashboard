const tabs = Array.from(document.querySelectorAll(".section-tab"));
const sections = Array.from(document.querySelectorAll("[data-section]"));
const messages = Array.from(document.querySelectorAll(".message-item"));
const navParents = Array.from(document.querySelectorAll(".nav-parent"));
const rangeSelect = document.querySelector("#rangeSelect");

function activateSection(id, shouldScroll = true) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.target === id;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  if (shouldScroll) {
    document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateSection(tab.dataset.target));
});

navParents.forEach((parent) => {
  parent.addEventListener("click", () => {
    const group = parent.closest(".nav-group");
    const isExpanded = !group?.classList.contains("expanded");

    group?.classList.toggle("expanded", isExpanded);
    parent.setAttribute("aria-expanded", String(isExpanded));
  });
});

messages.forEach((message) => {
  message.addEventListener("click", () => {
    messages.forEach((item) => item.classList.remove("selected"));
    message.classList.add("selected");
    message.classList.remove("is-unread");
  });
});

rangeSelect?.addEventListener("change", () => {
  document.body.dataset.range = rangeSelect.value;
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      activateSection(visible.target.id, false);
    }
  },
  {
    rootMargin: "-20% 0px -65% 0px",
    threshold: [0.1, 0.3, 0.6],
  },
);

sections.forEach((section) => observer.observe(section));
