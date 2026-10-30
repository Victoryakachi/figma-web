document.querySelectorAll("[data-account-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-account-status]");
    status.textContent = "Account services aren't connected yet. Your details haven't been submitted.";
  });
});
