const URL_BASE = "https://627412da345e1821b2271d7d.mockapi.io/";
const queryId = (id) => document.getElementById(id);
let editId = 0;
let deleteId = 0;

const filterData = (loc, sen, cat) => {
  console.log(loc);
  console.log(sen);
  console.log(cat);
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
    .catch((err) => console.log(err));
};
queryId("search_btn").addEventListener("click", (e) => {
  e.preventDefault();
  setSpinner();
  queryId("form").classList.add("d-none");
  setTimeout(() => {
    cleanData();
    queryId("container__cards").style.minHeight = "250px";
    filterData(
      queryId("locations").value,
      queryId("seniority").value,
      queryId("category").value
    );
  }, 700);
});

const receiveData = () => {
  fetch(`${URL_BASE}jobs`)
    .then((res) => res.json())
    .then((data) => displayData(data))
    .catch((err) => console.log(err));
};
receiveData();

const cardDetail = (id) => {
  fetch(`${URL_BASE}jobs`)
    .then((res) => res.json())
    .then((data) => {
      const cards = data.find((card) => card.id == id);
      renderCards(cards);
    });
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

const cleanData = () => {
  queryId("container__cards").innerHTML = "";
};

const displayData = (data) => {
  setSpinner();
  setTimeout(() => {
    cleanData();
    for (const { name,location ,category, seniority, id } of data) {
      queryId("container__cards").innerHTML += `
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h3 class="card-title">${name}</h3>
            <div class="badge">
            <p class="card-text badge_attribute">${location}</p>
            <span class="badge_attribute">${category}</span>
            <span class="badge_attribute">${seniority}</span>
            </div>
            <button class="btn btn-info" onclick="cardDetail(${id})">See more details <span>&rarr;</span></button>
        </div>
        `;
    }
  }, 700);
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
     <h3 class="card-title">${name}</h3>
     <p class="card-text">${description}</p>
     <p class="card-text badge_category">${location}</p>
     <div class="badge">
     <span class="badge_category">${category}</span>
     <span class="badge_seniority">${seniority}</span>
     </div>
     <div class="d-flex__buttons">
     <button class="edit__btn" onclick="showForm(${id})">Edit</button>
     <button class="delete__btn" onclick="modalDeleteData(${id})">Delete</button>
     </div>
   </div>
   <div class="goback">
   <button class="goback_btn">
   <a href="index.html"><span>&larr;</span> Go back </a>
   </button>
   </div>
     `;
  }, 700);
};

const modalDeleteData = (id) => {
  console.log(id);
  queryId("modal_delete").classList.remove("d-none");
  deleteId = id;
};
queryId("btn-danger").addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${URL_BASE}jobs/${deleteId}`, {
    method: "DELETE",
  }).finally(() => location.reload());
});

const showForm = (id) => {
  console.log(id);
  queryId("form").classList.remove("d-none");
  editId = id;
};

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
  setSpinner();
  setTimeout(() => {
    cleanData();
    queryId("container__cards").style.minHeight = "50px";
    queryId("form").classList.remove("d-none");
    queryId("submit").classList.add("d-none");
    queryId("save").classList.remove("d-none");
  }, 700);
});

queryId("save").addEventListener("click", (e) => {
  e.preventDefault();
  if (validateFields(saveData())) {
    alert("complete los campos");
  } else {
    fetch(`${URL_BASE}jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(saveData()),
    }).finally(() => location.reload());
  }
});

queryId("submit").addEventListener("click", (e) => {
  e.preventDefault();
  setSpinner();
  cleanData();
  if (validateFields(saveData())) {
    alert("complete los campos");
  } else {
    fetch(`${URL_BASE}jobs/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(saveData()),
    }).finally(() => location.reload());
  }
});

const validateFields = (data) => {
  console.log(data);
  return (
    data.name == "" ||
    data.description == "" ||
    data.location == "Locations" ||
    data.category == "Category" ||
    data.seniority == "Seniority"
  );
};
