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
  filterData(
    queryId("locations").value,
    queryId("seniority").value,
    queryId("category").value
  );
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
      const prod = data.find((card) => card.id == id);
      renderCards(prod);
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
    for (const { name, category, seniority, id } of data) {
      queryId("container__cards").innerHTML += `
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h4 class="card-title">${name}</h4>
            <div class="badge">
            <span class="badge_category">${category}</span>
            <span class="badge_seniority">${seniority}</span>
            </div>
            <button class="btn btn-info" onclick="cardDetail(${id})">See more details</button>
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
     <h4 class="card-title">${name}</h4>
     <p class="card-text">${description}</p>
     <p class="card-text">Location: ${location}</p>
     <span class="badge_category">${category}</span>
     <span class="badge_seniority">${seniority}</span>
     <div class="d-flex__buttons">
     <button class="edit__btn" onclick="showForm(${id})">Edit</button>
     <button class="delete__btn" onclick="modalDeleteData(${id})">Delete</button>
     </div>
   </div>
   <div class="goback__btn">
   <button><a href="index.html"> <= Go back </a></button>
   </div>
     `;
  }, 700);
};

const modalDeleteData = (id) => {
  console.log(id)
  queryId("modal_delete").classList.remove("d-none");
  deleteId = id
};
queryId("btn-danger").addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${URL_BASE}jobs/${deleteId}`, {
    method: "DELETE",
  }).finally(() => location.reload());
});

const showForm = (id) => {
  console.log(id)
  queryId("form").classList.remove("d-none");
  editId = id;
};

const saveData = () => {
  return {
    name: queryId("title").value,
    description: queryId("description").value,
    location: queryId("location").value,
    category: queryId("work").value,
    seniority: queryId("seniority").value,
  };
};
queryId("submit").addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${URL_BASE}jobs/${editId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveData()),
  }).finally(() => location.reload());
});
