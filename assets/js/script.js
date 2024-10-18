// NAVIGATION HANDLING
const navToggle = document.getElementById("menu-icon");
navToggle.addEventListener("click", () => {
  const navLists = document.getElementById("nav-lists");
  navLists.classList.toggle("show");
});

// SWEETALERT CUSTOM
const Pop = Swal.mixin({
  showConfirmButton: true,
  iconColor: "#66fcf1",
  customClass: {
    confirmButton: "btn",
  },
});

// FORM HANDLING
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  const btnText = document.getElementById("form-btn-text");
  const loader = document.getElementById("form-loader");
  const btn = document.getElementById("form-btn");
  btnText.classList.toggle("display-none");
  loader.classList.toggle("display-none");
  btn.classList.toggle("btn-disable");

  e.preventDefault();
  const formData = {
    to: "dedesupriatna.webpage@gmail.com",
    name: document.getElementById("name").value,
    subject: document.getElementById("subject").value,
    text: document.getElementById("message").value,
  };
//   console.log(formData);

  fetch("https://lumoshive-academy-email-api.vercel.app/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "RJS1-202403",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        contactForm.reset();
        Pop.fire({
          title: "Success!",
          icon: "success",
          text: data.message,
        });
      } else {
        Pop.fire({
          title: "Failed!",
          icon: "error",
          text: data.message,
        });
      }
      btnText.classList.toggle("display-none");
      loader.classList.toggle("display-none");
      btn.classList.toggle("btn-disable");
    })
    .catch((error) => {
      console.error("Error:", error);
      btnText.classList.toggle("display-none");
      loader.classList.toggle("display-none");
      btn.classList.toggle("btn-disable");
    });
});
