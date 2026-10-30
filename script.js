// Navigation toggle
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Copyright year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Target portfolio recipient
const PORTFOLIO_EMAIL = "krishnaroyalh@gmail.com";

// Contact section copy button
const copyEmail = document.getElementById("copyEmail");
const copyHint = document.getElementById("copyHint");

if (copyEmail && copyHint) {
  copyEmail.addEventListener("click", async () => {
    const email = copyEmail.dataset.email || PORTFOLIO_EMAIL;
    try {
      await navigator.clipboard.writeText(email);
      copyHint.textContent = `✓ Copied ${email} to clipboard!`;
    } catch {
      copyHint.textContent = `Email: ${email}`;
    }
    setTimeout(() => {
      copyHint.textContent = `Direct inquiries to ${PORTFOLIO_EMAIL} · Typically responds within 24 hours`;
    }, 4000);
  });
}

// ==========================================
// Professional Email Reach-Out Modal System
// ==========================================

const emailModal = document.getElementById("emailModal");
const emailMeBtn = document.getElementById("emailMeBtn");
const closeEmailModal = document.getElementById("closeEmailModal");
const miniCopyEmail = document.getElementById("miniCopyEmail");

const quickLaunchGmail = document.getElementById("quickLaunchGmail");
const quickLaunchOutlook = document.getElementById("quickLaunchOutlook");
const quickLaunchMailto = document.getElementById("quickLaunchMailto");

const topicBtns = document.querySelectorAll(".topic-btn");
const senderName = document.getElementById("senderName");
const senderEmail = document.getElementById("senderEmail");
const emailSubject = document.getElementById("emailSubject");
const emailMessage = document.getElementById("emailMessage");

const sendWithGmail = document.getElementById("sendWithGmail");
const sendWithMailApp = document.getElementById("sendWithMailApp");
const copyComposerDraft = document.getElementById("copyComposerDraft");
const modalFeedback = document.getElementById("modalFeedback");

const templates = {
  job: {
    subject: "Opportunity Inquiry — AI/ML Role for Hari Krishna",
    body: `Hi Hari Krishna,

I came across your portfolio and was impressed by your work in AI engineering, agentic systems, and backend development (including TerraMind AI and your FastAPI architectures).

We have an opportunity that aligns well with your background and would love to connect.

Looking forward to speaking with you!

Best regards,`
  },
  collab: {
    subject: "Project Collaboration Proposal for Hari Krishna",
    body: `Hi Hari Krishna,

I reviewed your projects and technical toolkit. I am working on an exciting initiative in AI/software and would love to explore collaborating with you.

Looking forward to your thoughts!

Best regards,`
  },
  ai: {
    subject: "Technical Discussion — AI Systems & Geospatial Intelligence",
    body: `Hi Hari Krishna,

I saw your work with Earth-observation intelligence, agentic workflows, and machine learning. I'd love to connect and exchange ideas on building intelligent AI systems.

Best regards,`
  },
  hello: {
    subject: "Hello from Hari Krishna's Portfolio",
    body: `Hi Hari Krishna,

I just reviewed your portfolio. Great work on your projects and problem-solving focus!

Best regards,`
  }
};

let currentTopic = "job";

function setTemplate(topicKey) {
  const tpl = templates[topicKey];
  if (!tpl) return;
  currentTopic = topicKey;

  topicBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.topic === topicKey);
  });

  if (emailSubject) {
    emailSubject.value = tpl.subject;
  }
  if (emailMessage) {
    emailMessage.value = tpl.body;
  }
}

// Modal open / close
function openModal() {
  if (!emailModal) return;
  emailModal.classList.add("open");
  emailModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (!emailMessage.value.trim()) {
    setTemplate("job");
  }
}

function closeModal() {
  if (!emailModal) return;
  emailModal.classList.remove("open");
  emailModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (modalFeedback) {
    modalFeedback.textContent = "";
  }
}

if (emailMeBtn) {
  emailMeBtn.addEventListener("click", openModal);
}

if (closeEmailModal) {
  closeEmailModal.addEventListener("click", closeModal);
}

if (emailModal) {
  emailModal.addEventListener("click", (e) => {
    if (e.target === emailModal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && emailModal && emailModal.classList.contains("open")) {
    closeModal();
  }
});

// Topic selection
topicBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const topic = btn.dataset.topic;
    setTemplate(topic);
    showModalFeedback(`Applied template: ${btn.textContent.trim()}`);
  });
});

function showModalFeedback(msg) {
  if (!modalFeedback) return;
  modalFeedback.textContent = msg;
  clearTimeout(modalFeedback._timer);
  modalFeedback._timer = setTimeout(() => {
    modalFeedback.textContent = "";
  }, 4000);
}

// Build email body with sender attribution
function getPreparedBody() {
  let body = (emailMessage ? emailMessage.value : "").trim();
  const name = senderName ? senderName.value.trim() : "";
  const email = senderEmail ? senderEmail.value.trim() : "";

  if (name || email) {
    body += "\n\n---\nSent by: " + (name || "Visitor");
    if (email) {
      body += ` <${email}>`;
    }
  }
  return body;
}

function getSubject() {
  return emailSubject && emailSubject.value.trim()
    ? emailSubject.value.trim()
    : "Message for Hari Krishna";
}

// 1-Click fast launchers
if (quickLaunchGmail) {
  quickLaunchGmail.addEventListener("click", () => {
    const sub = getSubject();
    const body = getPreparedBody();
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_EMAIL)}&su=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    showModalFeedback("Opening Gmail Web composer...");
  });
}

if (quickLaunchOutlook) {
  quickLaunchOutlook.addEventListener("click", () => {
    const sub = getSubject();
    const body = getPreparedBody();
    const url = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(PORTFOLIO_EMAIL)}&subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    showModalFeedback("Opening Outlook Web composer...");
  });
}

if (quickLaunchMailto) {
  quickLaunchMailto.addEventListener("click", () => {
    const sub = getSubject();
    const body = getPreparedBody();
    window.location.href = `mailto:${PORTFOLIO_EMAIL}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
    showModalFeedback("Launching default email application...");
  });
}

// Mini copy in modal header
if (miniCopyEmail) {
  miniCopyEmail.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_EMAIL);
      showModalFeedback(`✓ Copied ${PORTFOLIO_EMAIL} to clipboard!`);
    } catch {
      showModalFeedback(`Email: ${PORTFOLIO_EMAIL}`);
    }
  });
}

// Composer action buttons
if (sendWithGmail) {
  sendWithGmail.addEventListener("click", () => {
    const sub = getSubject();
    const body = getPreparedBody();
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_EMAIL)}&su=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    showModalFeedback("✓ Opening Gmail with your tailored draft!");
  });
}

if (sendWithMailApp) {
  sendWithMailApp.addEventListener("click", () => {
    const sub = getSubject();
    const body = getPreparedBody();
    window.location.href = `mailto:${PORTFOLIO_EMAIL}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
    showModalFeedback("✓ Opening default email app with draft!");
  });
}

if (copyComposerDraft) {
  copyComposerDraft.addEventListener("click", async () => {
    const sub = getSubject();
    const body = getPreparedBody();
    const fullText = `To: ${PORTFOLIO_EMAIL}\nSubject: ${sub}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(fullText);
      showModalFeedback("✓ Full draft & recipient copied to clipboard!");
    } catch {
      showModalFeedback("Draft prepared. Could not access clipboard.");
    }
  });
}

// Initialize default template on script load
setTemplate("job");
