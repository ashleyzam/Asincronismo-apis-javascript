const URL_BASE = "https://627412da345e1821b2271d7d.mockapi.io/";
const queryId = (id) => document.getElementById(id);
let editId = 0;
let deleteId = 0;
let isId = 0;

const receiveData = () => {
  fetch(`${URL_BASE}jobs`)
    .then((res) => res.json())
    .then((data) => displayData(data))
    .catch((err) => console.log(err));
};
receiveData();

const displayData = (data) => {
  setSpinner();
  queryId("container__cards").style.minHeight = "350px";
  setTimeout(() => {
    cleanData();
    for (const { name, location, category, seniority, id } of data) {
      queryId("container__cards").innerHTML += `
      
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h3 class="card-title badge_attribute">${name}</h3>
            <div class="badge">
            <img src="" alt="">
            <p class="card-text badge_attribute">${location}</p>
            <span class="card-text badge_attribute">${category}</span>
            <span class="badge_attribute">${seniority}</span>
            </div>
            <button class="btn btn-info" onclick="cardDetail(${id})">See more details <span>&rarr;</span></button>
        </div>
        `;
    }
  }, 700);
};
const cardDetail = (id) => {
  queryId("container__cards").style.minHeight = "800px";
  queryId("container__cards").style.flexDirection = "column";
  queryId("container__cards").style.marginTop = "0px";
  queryId("container__cards").style.padding = "0px";
  queryId("background__image").classList.add("d-none");
  cleanData();
  queryId("form_display").classList.add("d-none");
  fetch(`${URL_BASE}jobs`)
    .then((res) => res.json())
    .then((data) => {
      const cards = data.find((card) => card.id == id);
      renderCards(cards);
    });
};
const renderCards = ({
  name,
  description,
  location,
  category,
  seniority,
  id,
}) => {
  setSpinner();
  setTimeout(() => {
    cleanData();

    queryId("container__cards").innerHTML = `
     <div class="secondary-card-body">
     <h3 class="card-title title_card">${name}</h3>
     <p class="card_textt">${description}</p>
     <div class="badge">
     <p class="card-text badge_attribute">${location}</p>
     <span class="badge_attribute">${category}</span>
     <span class="badge_attribute">${seniority}</span>
     </div>
     <div class="d-flex__buttons">
     <button class="edit__btn" onclick="showForm(${id})">Edit</button>
     <button class="delete__btn" onclick="modalDeleteData(${id})">Delete</button>
     </div>
   </div>
   <div class="goback">
   <button class="goback_btn">
   <a href="landing.html"><span>&larr;</span> Go back </a>
   </button>
   </div>
     `;
  }, 700);
};
const filterData = (loc, sen, cat) => {
  fetch(`${URL_BASE}jobs`)
    .then((res) => res.json())
    .then((data) => {
      displayData(
        data.filter(
          ({ location, seniority, category }) =>
            location == loc || seniority == sen || category == cat
        )
      );
    })
    .catch((err) => error404(err));
};
queryId("search_btn").addEventListener("click", (e) => {
  e.preventDefault();
  if (containerError()) {
    const msg =
      "oops something went wrong. please choose an option to continue your search";
    errorMessage(msg);
  } else {
    queryId("form").classList.add("d-none");
    cleanData();
    filterData(
      queryId("locations").value,
      queryId("seniority").value,
      queryId("category").value
    );
  }
});

const modalDeleteData = (id) => {
  queryId("blur__principal").classList.add("set_blur");
  queryId("modal_size").classList.remove("d-none");
  deleteId = id;
};
queryId("btn-danger").addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${URL_BASE}jobs/${deleteId}`, {
    method: "DELETE",
  })
    .catch((err) => console.log(err))
    .finally(() => location.reload());
});

const saveData = () => {
  return {
    name: queryId("title").value,
    description: queryId("description").value,
    location: queryId("location").value,
    category: queryId("work").value,
    seniority: queryId("seniority_v").value,
  };
};
queryId("create-job").addEventListener("click", (e) => {
  e.preventDefault();
  cleanData();
  setSpinner();
  cleanForm();
  queryId("container__cards").style.margin = "0px";
  setTimeout(() => {
    cleanData();
    queryId("container__cards").style.minHeight = "100px";
    queryId("form").classList.remove("d-none");
    queryId("submit").classList.add("d-none");
    queryId("save").classList.remove("d-none");
  }, 700);
});

queryId("save").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateFields(saveData())) {
    queryId("blur__principal").classList.add("set_blur");
    queryId("modal_size").classList.remove("d-none");
    queryId("modal_text").innerHTML =
      "please, complete the fields to continue.";
  } else {
    fetch(`${URL_BASE}jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(saveData()),
    })
      .catch((err) => console.log(err))
      .finally(() => location.reload());
  }
});

queryId("submit").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateFields(saveData())) {
    queryId("blur__principal").classList.add("set_blur");
    queryId("modal_size").classList.remove("d-none");
    queryId("modal_text").innerHTML = "please, complete the fields to continue";
    queryId("btn-danger").classList.add("d-none");
  } else {
    fetch(`${URL_BASE}jobs/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(saveData()),
    })
      .catch((err) => console.log(err))
      .finally(() => location.reload());
  }
});
const showForm = (id) => {
  getDataById(id);
  queryId("form").classList.remove("d-none");
  editId = id;
};

const getDataById = (id) => {
  fetch(`${URL_BASE}jobs/${id}`)
    .then((response) => response.json())
    .then((data) => recordData(data))
    .catch((err) => console.log(err));
};
const recordData = (data) => {
  const { name, description, location, category, seniority } = data;
  queryId("title").value = name;
  queryId("description").value = description;
  queryId("location").value = location;
  queryId("work").value = category;
  queryId("seniority_v").value = seniority;
};

const cleanForm = () => {
  queryId("title").value = "";
  queryId("description").value = "";
  queryId("location").value = "Locations";
  queryId("work").value = "Category";
  queryId("seniority_v").value = "Seniority";
};

const cleanData = () => {
  queryId("container__cards").innerHTML = "";
};
const validateFields = (data) => {
  return (
    data.name == "" ||
    data.description == "" ||
    data.location == "Locations" ||
    data.category == "Category" ||
    data.seniority == "Seniority"
  );
};
const setSpinner = () => {
  queryId("container__cards").innerHTML = `
  <div class="dot-spinner">
  <div class="dot-spinner__dot"></div>
  <div class="dot-spinner__dot"></div>
  <div class="dot-spinner__dot"></div>
  <div class="dot-spinner__dot"></div>
  <div class="dot-spinner__dot"></div>
  <div class="dot-spinner__dot"></div>
  <div class="dot-spinner__dot"></div>
  <div class="dot-spinner__dot"></div>
</div>`;
};

const errorMessage = (text) => {
  queryId("container__cards").style.minHeight = "150px";
  queryId("container__cards").innerHTML = `
  <p class="err" style="color: white">${text}</p>
 
  `;
};
const containerError = () => {
  return (
    queryId("locations").value == "Location" &&
    queryId("seniority").value == "senioritY" &&
    queryId("category").value == "Category"
  );
};
const error404 = () => {
  const msg = "oops something went wrong. PAGE NOT FOUND 404";
  errorMessage(msg);
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Scape") {
    queryId("modal_size").classList.add("d-none");
    queryId("blur__principal").classList.remove("set_blur");
  }
});

window.addEventListener("click", (e) => {
  if (
    e.target === queryId("close_modal") ||
    e.target === queryId("close__modal")
  ) {
    queryId("modal_size").classList.add("d-none");
    queryId("blur__principal").classList.remove("set_blur");
  }
});
window.addEventListener("keydown", (e) => {
  if (e.key == "F5" || (e.ctrlKey && e.key == "F5")) {
    window.location = "landing.html";
  }
});
