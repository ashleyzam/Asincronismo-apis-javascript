const URL_BASE = "https://627412da345e1821b2271d7d.mockapi.io/";
const queryId = (id) => document.getElementById(id);

const getData = () => {
  fetch(`${URL_BASE}jobs`)
    .then((res) => res.json())
    .then((data) => showData(data))
    .catch((err) => console.log(err));
};
getData();

const cardDetail = (id) =>{
  fetch(`${URL_BASE}jobs`)
  .then(res => res.json())
  .then((data) => {
    const prod = data.find(product => product.id == id)
    renderCards(prod) 

  })
}

const showData = (data) => {
  for (const datum of data) {
    const { name, category, seniority, id } = datum;
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
};
   const renderCards = ({name,description,location,category,seniority}) => {
     queryId("container__cards").innerHTML = "";
     queryId("container__cards").innerHTML = `
     <div class="secondary-card-body">
     <h4 class="card-title">${name}</h4>
     <p class="card-text">${description}</p>
     <p class="card-text">Location: ${location}</p>
     <span class="badge_category">${category}</span>
     <span class="badge_seniority">${seniority}</span>
     <div class="d-flex__buttons">
     <button class="edit__btn">Edit</button>
     <button class="delete__btn">Delete</button>
     </div>
   </div>
   <div class="goback__btn">
   <button><a href="index.html"> > Go back </a></button>
   </div>
     `;
   };
