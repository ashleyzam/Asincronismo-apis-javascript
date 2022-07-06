const user = {
  username: "ada@lovelace.com",
  password: "1234",
};

const queryId = (id) => document.getElementById(id);

queryId("btn_log_in").addEventListener("click", () => {
  queryId("open_log").classList.remove("d-none");
});
queryId("cancel_btn").addEventListener("click", () => {
  queryId("open_log").classList.add("d-none");
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Scape") {
    queryId("open_log").classList.add("d-none");
  }
});
window.addEventListener("click", (e) => {
  if (e.target === queryId("close_modal")) {
    queryId("open_log").classList.add("d-none");
  }
});

queryId("log_btn").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateLoginForm()) {
    queryId("text_validation").classList.remove("d-none");
    queryId("validate").classList.add("d-none");
  } else if (validateUser()) {
    setTimeout(() => {
      window.location = "landing.html";
    }, 700);
  } else {
    queryId("text_validation").classList.add("d-none");
    queryId("validate").classList.remove("d-none");
  }
});

const validateLoginForm = () => {
  return queryId("password").value == "" || queryId("input_login").value == "";
};

const validateUser = () => {
  return (
    queryId("password").value === user.password &&
    queryId("input_login").value === user.username
  );
};

queryId("toggle").addEventListener("click", () => {
  const pass = queryId("password");
  if (pass.type === "password") {
    pass.type = "text";
  } else {
    pass.type = "password";
  }
});
