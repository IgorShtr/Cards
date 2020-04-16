const docType = [" ", "Кардиолог", "Стоматолог", "Терапевт"];
const docTypeFilter = ["Любой врач", "Кардиолог", "Стоматолог", "Терапевт"];
const urgencyType = ["Срочность высокая", "Срочность обычная","Срочность низкая"];
const urgencyTypeFilter = ["Любая срочность", "Срочность высокая", "Срочность обычная","Срочность низкая"];
const visitStatus = ["Done", "Open"]
const doctorClass = "doctorType";

const toggleClass = function (id) {
    const elem = document.getElementById(id);
    elem.classList.toggle("active")
}
const addHideClass = function (...arg) {
    arg.forEach(id => {
        const elem = document.getElementById(id);
        if (!elem.classList.contains("hide")) {
            elem.classList.add("hide")
        }
    })

}
const removeHideClass = function (...args) {
    args.forEach(id => {
        const elem = document.getElementById(id);
        elem.classList.remove("hide")
    })
}

class InputConstr {
    constructor(type = "", className = "", id = "", name = "", placeholder = "", required = false, value="") {
        this._type = type;
        this._className = className;
        this._id = id;
        this._name = name;
        this._placeholder = placeholder;
        this._required = required;
        this._value = value;
        this.elem = null;
    }
    render() {
        this.elem = document.createElement("input");
        this.elem.type = this._type;
        this.elem.className = this._className;
        this.elem.id = this._id;
        this.elem.name = this._name;
        this.elem.setAttribute("value", this._value);
        this.elem.setAttribute("placeholder", this._placeholder);
        this.elem.style.marginTop = "10px";
        this.elem.style.width = "75%";
        if (this._required) {
            this.elem.required = true;
           
        }
        return this.elem;
    }
 
}

class ModalWind {
    constructor(className, id) {
        this._className = className;
        this._id = id;
        this.elem = null;
    }
    render(container, btn) {
        this.elem = document.createElement("div");
        this.elem.id = this._id;
        this.elem.className = this._className;
        this.elem.innerHTML = `<div class="modal-content">
                                <span class="close">&times;</span>
                               
                              </div>`;
      
        this.close();
        return this.elem;
    }
    open() {
        this.elem.classList.add("active")
    }
    close() {
        this.elem.querySelector(".close").addEventListener("click", () => this.elem.remove())
    }
}

class AuthorizationModal extends ModalWind {
    constructor(url, id, emailHTML, passlHTML, submlHTML, ...args) {
        super(...args);
        this.url = url;
        this.id = id;
        this.emailHTML = emailHTML;
        this.passlHTML = passlHTML;
        this.submlHTML = submlHTML;
    }
    render() {
        const form = document.createElement("form");
        form.action = this.url;
        form.id = this.id;
        form.append(this.emailHTML);
        form.append(this.passlHTML);
        form.append(this.submlHTML);
        const modal = super.render();
        modal.querySelector(".modal-content").append(form);
        return modal;
    }
}

// Создание полей модального окна регистрации
const registerEmail = new InputConstr("text", "registerEmail", "reristerEmailID", "login", "igor.shtr@gmail.com", false, "")
const regEmailHTML = registerEmail.render();

const registerPass = new InputConstr("password", "registerPass", "reristerPassID", "password", "11111111910", true, "")
const regPasslHTML = registerPass.render();

const registerSubm = new InputConstr("submit", "registerSabm", "reristerSabmID", "ПОДТВЕРДИТЬ", "", false, "ПОДТВЕРДИТЬ")
const regSubmlHTML = registerSubm.render();

const modalRegister = new AuthorizationModal("http://cards.danit.com.ua/login", "loginForm", regEmailHTML, regPasslHTML, regSubmlHTML, "modalRegister", "modalRegisterId");
document.body.append(modalRegister.render());


const registerBtn = document.getElementById("registerId");
registerBtn.addEventListener("click", () => {

    modalRegister.open();
});

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const url = this.getAttribute("action");

    const email = this.querySelector("[name =login]").value;
    const password = this.querySelector("[name = password]").value;

    const user = {
        email,
        password
    };
    //    Раскомментировапть для валидации пароля  
    const request = fetch(url, {
        method: "post",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer 69fb6b423bee"
        },
        body: JSON.stringify(user)
    })

    request.then(request => request.json())
        .then(result => {
            console.log(result.status)
            if (result.status != "Success") {

                alert("Не верный логин и/или пароль")
            }
            else {
                console.log("Все ОК")
                document.getElementById("modalRegisterId").remove();
                document.getElementById("registerId").remove();

                toggleClass("newVizitId");
                chooseVisit();

                //    Раскомментироапть для валидации пароля 
            }
        });
});

class SelectConstr {
    constructor(className = "", id = "", innMenu) {
        this._className = className;
        this._id = id;
        this._actValue = null;
        this._elem = null;
        this._innMenu = innMenu;

    }
    render() {
        this._elem = document.createElement("select");
        this._elem.className = this._className;
        this._elem.id = this._id;
        this._elem.style.width = "75%";
        this._elem.style.marginTop = "10px";
        for (let i = 0; i < this._innMenu.length; i++) {
            const innerEllem = document.createElement("option");
            innerEllem.value = i + 1;
            innerEllem.textContent = this._innMenu[i]
            this._elem.append(innerEllem)
        }
        this.followMenu();
        return this._elem;

    }
    followMenu() {
        this._elem.addEventListener("click", function () {
            // console.log (this.options[this.selectedIndex].value) 
        });
    }
}

class CartModal extends ModalWind {
    constructor(url, id, viziPashentDataHTML, vizitTitleHTML, vizitDoctorselectHTML, vizitDoctorDataHTML,
        vizitDiscrHTML, vizitDateHTML, vizitPriorityHTML, vizitorAgeHTML, vizitorWeightHTML, vizitorBPHTML,
        newCardSabmHTML, vizitorDiseasHTML, ...args) {
        super(...args);
        this.url = url;
        this.id = id;
        this.viziPashentDataHTML = viziPashentDataHTML;
        this.vizitTitleHTML = vizitTitleHTML;
        this.vizitDoctorselectHTML = vizitDoctorselectHTML;
        this.vizitDoctorDataHTML = vizitDoctorDataHTML;
        this.vizitDiscrHTML = vizitDiscrHTML;
        this.vizitDateHTML = vizitDateHTML;
        this.vizitPriorityHTML = vizitPriorityHTML;
        this.vizitorAgeHTML = vizitorAgeHTML;
        this.vizitorDiseasHTML = vizitorDiseasHTML;
        this.vizitorWeightHTML = vizitorWeightHTML;
        this.vizitorBPHTML = vizitorBPHTML;
        this.newCardSabmHTML = newCardSabmHTML;
    }
    render() {
        const form = document.createElement("form");
        form.action = this.url;
        form.id = this.id;
        form.append(this.viziPashentDataHTML);
        form.append(this.vizitTitleHTML);
        form.append(vizitPriorityHTML);
        form.append(this.vizitDoctorselectHTML);
        form.append(this.vizitDoctorDataHTML);
        form.append(this.vizitDiscrHTML);
        form.append(this.vizitDateHTML);
        form.append(this.vizitorAgeHTML);
        form.append(this.vizitorWeightHTML);
        form.append(this.vizitorDiseasHTML);
        form.append(this.vizitorBPHTML);
        form.append(this.newCardSabmHTML);

        const modal = super.render();
        modal.querySelector(".modal-content").append(form);
        
        return modal;
    }
}



const viziPashentData = new InputConstr("text", "", "vizitNameID", "name", "Enter pashent name", false, "GHBDTN!")
const viziPashentDataHTML = viziPashentData.render();

const vizitTitle = new InputConstr("text", "", "vizitTitleID", "title", "Enter vizit title", false, "")
const vizitTitleHTML = vizitTitle.render();

const vizitDoctorselect = new SelectConstr("doctorTipe", "doctorTipeId", docType);
const vizitDoctorselectHTML = vizitDoctorselect.render();

const vizitDoctorData = new InputConstr("text", "", "viziDoctorDataID", "doctorData", "Enter doctor name", false, "");
const vizitDoctorDataHTML = vizitDoctorData.render();

const vizitDiscr = new InputConstr("text", " ", "vizitDiscrID", "description", "Enter visit discription", false, "");
const vizitDiscrHTML = vizitDiscr.render();

const vizitDate = new InputConstr("date", "hide", "vizitDateID", "lastvizDate", "Enter last visit date", false, "");
const vizitDateHTML = vizitDate.render();

const vizitPriority = new SelectConstr("vizitPriority", "vizitPriorityId", urgencyType);
const vizitPriorityHTML = vizitPriority.render();

const vizitorAge = new InputConstr("text", "hide", "vizitorAgeID", "age", "Enter vizitor age", false, "");
const vizitorAgeHTML = vizitorAge.render();

const vizitorDiseas = new InputConstr("text", "hide", "vizitorDiseasID", "disease", "Enter vizitor diseases history", false, "");
const vizitorDiseasHTML = vizitorDiseas.render();

const vizitorWeight = new InputConstr("text", "hide", "vizitorWeightID", "weight", "Enter vizitor weight", false, "")
const vizitorWeightHTML = vizitorWeight.render();

const vizitorBP = new InputConstr("text", "hide", "vizitorBPID", "bp", "Enter vizitor BP", false, "");
const vizitorBPHTML = vizitorBP.render();

const newCardSabm = new InputConstr("submit", "newCardSabm", "newCardSabmID", "СОЗДАТЬ ВИЗИТ", "", false, "ADD VISIT")
const newCardSabmHTML = newCardSabm.render();


const newCardBtn = document.getElementById("newVizitId");
newCardBtn.addEventListener("click", () => {
     const modalCard = new CartModal("http://cards.danit.com.ua/cards", "modalFormcardId", viziPashentDataHTML, vizitTitleHTML, vizitDoctorselectHTML, vizitDoctorDataHTML,
        vizitDiscrHTML, vizitDateHTML, vizitPriorityHTML, vizitorAgeHTML, vizitorWeightHTML, vizitorBPHTML, newCardSabmHTML, vizitorDiseasHTML, "modalCard", "modalCardId");
    document.body.append(modalCard.render());
console.log(modalCard)
    modalCard.open();
   const allInputs = document.querySelectorAll("input");
   allInputs.forEach(item => item.value = (""));
  
    cardSelector();

    // Запись в объект введенных данных визита

    const modalFormcard = document.getElementById("modalFormcardId");

    modalFormcard.addEventListener("submit", function (e) {
        e.preventDefault();
        const vizit = {}
        const url = this.getAttribute("action");
        const inputs = this.querySelectorAll("input");
        inputs.forEach(item => {
          console.log(item.value)
            if (!(item.getAttribute("name") === "СОЗДАТЬ ВИЗИТ")) {

                vizit[item.name] = item.value;
            }
        })
        const selects = this.querySelectorAll("select")
        selects.forEach(item => {
            if (item.classList.contains("vizitPriority")) {
                vizit["priority"] = urgencyType[item.options[item.selectedIndex].value - 1];
            }
            if (item.classList.contains("doctorTipe")) {
                vizit["doctorType"] = docType[item.options[item.selectedIndex].value - 1];
            }
        });
        // console.log(vizit)

        // отправка данных на сервер
        const request = fetch(url, {
            method: "post",
            headers: {
                "Content-type": "aplication/json",
                "Authorization": "Bearer 69fb6b423bee"
            },
            body: JSON.stringify(vizit)
        })
        request.then(request => request.json())
            .then(result => {
                // console.log(result);
               

                //карта появляется после добавления через форму
                switch (result.doctorType) {
                    case "Кардиолог":
                        new VisitCardiolog(result).showMore();
                        break;
                    case "Стоматолог":
                        new VisitDentist(result).showMore();
                        break;
                    case "Терапевт":
                        new visitTherapist(result).showMore();
                        break;
                  
                }                
              
                document.getElementById("modalCardId").remove();
            });
    });
})
// fetch DELETE запрос на получение массива всех карточек с объекта

const delrequest = fetch("http://cards.danit.com.ua/cards/2460", {
    method: "delete",
    headers: {
        "Content-type": "aplication/json",
        "Authorization": "Bearer 69fb6b423bee"
    }
})

// fetch ГЕТ запрос на получение массива всех карточек с сервера для фильтрации


const serchBtn = document.getElementById("serchBtn");
serchBtn.addEventListener("click", function () {
    const requesCards = fetch("http://cards.danit.com.ua/cards", {
        method: "get",
        headers: {
            "Content-type": "aplication/json",
            "Authorization": "Bearer 69fb6b423bee"
        }
    });

    requesCards.then(requesCards => requesCards.json())
        .then(result => {
            const selectUrg = document.getElementById("selectUrgencyId");
            const selectedUrg = urgencyTypeFilter[selectUrg.options[selectUrg.selectedIndex].value - 1];
            const selectDoctor = document.getElementById("selectDoctorId");
            const selectedDoctor = docTypeFilter[selectDoctor.options[selectDoctor.selectedIndex].value - 1];
  
            const filtredCards = result.filter(function (item) {
                const cardsValues = Object.values(item);
                if (selectedUrg === urgencyTypeFilter[0] && selectedDoctor === docTypeFilter[0]) {
                    return true;
                }
                else if (selectedUrg === urgencyTypeFilter[0]) {
                    return cardsValues.includes(`${selectedDoctor}`)
                }
                else if (selectedDoctor === docTypeFilter[0]) {
                    return cardsValues.includes(`${selectedUrg}`);
                }
                else {
                    return ((cardsValues.includes(`${selectedUrg}`) && (cardsValues.includes(`${selectedDoctor}`))));
                }
            });

           
            // Уделение всех карт из разметки отображение только отфильтрованных
            const cardsOnBoard = document.getElementById(`containerId`);
            while (cardsOnBoard.children[1]) {
                cardsOnBoard.children[1].remove();
            }
            if (filtredCards.length === 0) {
                removeHideClass("zero-messageId")
            }
            else {
                addHideClass("zero-messageId");
              filtredCards.forEach(function (item) {
                    // console.log(item);
                    let response = item;
                    // console.log(response);       
        
                        switch (response.doctorType) {
                            case "Кардиолог":
                                new VisitCardiolog(response).showMore();
                                break;
                            case "Стоматолог":
                                new VisitDentist(response).showMore();
                                break;
                            case "Терапевт":
                                new visitTherapist(response).showMore();
                                break;
                            
                               
                        };
                        switch (response.doctorData) {// удаляем пробные карты
                            case "":
                                new VisitCardiolog(response).showMore();
                                break;
                            case "House":
                                new VisitCardiolog(response).showMore();
                                break;
                                                          
                            };
                    })   
            }
        }
        )

})
//   Функция отображение полей в зависимости от выбранного типа врача
const cardSelector = function () {
    const inputs = document.querySelectorAll(`select`);
    inputs.forEach(item => {
        if (item.classList.contains("doctorTipe")) {
            item.addEventListener("click", function () {
                let val = this.options[this.selectedIndex].value;
                if (val == 2) {
                    addHideClass("vizitDateID");
                    removeHideClass("vizitorAgeID", "vizitorWeightID", "vizitorBPID", "vizitorDiseasID")

                }
                else if (val == 3) {
                    addHideClass("vizitorAgeID", "vizitorWeightID", "vizitorBPID", "vizitorDiseasID");
                    removeHideClass("vizitDateID");
                }
                else if (val == 4) {
                    addHideClass("vizitDateID", "vizitorWeightID", "vizitorBPID", "vizitorDiseasID");
                    removeHideClass("vizitorAgeID");
                }
                else {
                    addHideClass("vizitorAgeID", "vizitDateID", "vizitorWeightID", "vizitorBPID", "vizitorDiseasID");
                }
            })

        }
    })
}
// Создание полей блока фильтров

const selectDoctor = new SelectConstr(" ", "selectDoctorId", docTypeFilter);
const selectUrgency = new SelectConstr(" ", "selectUrgencyId", urgencyTypeFilter);
const serchVizitDiscr = new InputConstr("text", "serchVizitDiscr", "serchVizitDiscrID", " ", "Enter visit discription", false)

const filtersSect = document.getElementById("filters");
filtersSect.append(selectDoctor.render());

filtersSect.append(selectUrgency.render());

class Visit {
    constructor(response) {
        this.id = response.id;
        this.name = response.name;
        this.doctorData = response.doctorData;
        this.doctorType = response.doctorType;
        this.title = response.title;
        this.description = response.description;
        this.status = response.status;
        this.priority = response.priority;
        let id = this.id;
       
    }

    render() {
        const container = document.querySelector('.container');
        const nocards = document.querySelector('.zero-message');// Remove message No cards added
        nocards.classList.add('hide');
        const visitCard = document.createElement('div');
        
        let id = this.id
        visitCard.classList.add(`card`, `card${id}`);
        visitCard.id = `${id}`;
        visitCard.setAttribute('draggable', 'true');
        container.append(visitCard);
        visitCard.insertAdjacentHTML('afterbegin', `        
                <button class="close closeBtn${id}">&times;</button>
                <div class="card-content">  
                <p><span>Пациент:</span><span class="name">${this.name}</span></p>        
                <p><span>Имя Доктор: </span>${this.doctorData}</p>
                <p><span>Тип Доктора: </span>${this.doctorType}</p>           
                <p><span>Название: </span>${this.title}</p>
                <p><span>Описание: </span>${this.description}</p>
                <p><span>Срочность: </span>${this.priority}</p>              
                </div>         
                <div class="card-options">
                <button class="showMore showMore${id}">Show Details</button>            
                <button class="edit edit${id}">Edit</button>
                <button class="submit submit${id}">Submit</button>
                </div>            
            `)    
      
        visitCard.draggable = true;
        visitCard.addEventListener('dragstart', this.drag)

        // надо вызвать модалку формы но передать туда поля этой карты
        document.querySelector(`.edit${id}`).addEventListener('click', () => {
            const modalCard = new CartModal("http://cards.danit.com.ua/cards", "modalFormcardId", viziPashentDataHTML, vizitTitleHTML, vizitDoctorselectHTML, vizitDoctorDataHTML,
                vizitDiscrHTML, vizitDateHTML, vizitPriorityHTML, vizitorAgeHTML, vizitorWeightHTML, vizitorBPHTML, newCardSabmHTML, vizitorDiseasHTML, "modalCard", "modalCardId");
            document.body.append(modalCard.render());
            modalCard.open();
            cardSelector();
            // поля из редактируемой карты в форму
            document.getElementById("vizitDiscrID").setAttribute('value', `${this.description}`)
            document.getElementById("viziDoctorDataID").setAttribute('value', `${this.doctorData}`)
            document.getElementById("vizitTitleID").setAttribute('value', `${this.title}`)
            document.getElementById("vizitNameID").setAttribute('value', `${this.name}`)
            document.getElementById("vizitDateID").setAttribute('value', `${this.lastvizDate}`)
            document.getElementById("vizitorAgeID").setAttribute('value', `${this.age}`)
            document.getElementById("vizitPriorityId").setAttribute('selected', `${this.priority}`)
            document.getElementById("doctorTipeId").setAttribute('selected', `${this.doctorType}`)
           
            // Запись в объект введенных данных визита

            const modalFormcard = document.getElementById("modalFormcardId");
            modalFormcard.addEventListener("submit", function (e) {
                e.preventDefault();
                const vizit = {};
                const url = this.getAttribute("action");
                const inputs = this.querySelectorAll("input");
                inputs.forEach(item => {
                    if (!(item.getAttribute("name") == "СОЗДАТЬ ВИЗИТ")) {

                        vizit[item.name] = item.value

                    }

                })
                const selects = this.querySelectorAll("select")
                selects.forEach(item => {
                    if (item.classList.contains("vizitPriority")) {
                        vizit["priority"] = urgencyType[item.options[item.selectedIndex].value - 1]
                    }
                    if (item.classList.contains("doctorTipe")) {
                        vizit["doctorType"] = docType[item.options[item.selectedIndex].value - 1]
                    }
                })

          

                // отправка данных на сервер
                const request = fetch(url, {
                    method: "post",
                    headers: {
                        "Content-type": "aplication/json",
                        "Authorization": "Bearer 69fb6b423bee"
                    },
                    body: JSON.stringify(vizit)

                })
                request.then(request => request.json())
                    .then(result => {
                
                     

                        //карта появляется после добавления через форму
                        switch (result.doctorType) {
                            case "Кардиолог":
                                new VisitCardiolog(result).showMore();
                                break;
                            case "Стоматолог":
                                new VisitDentist(result).showMore();
                                break;
                            case "Терапевт":
                                new visitTherapist(result).showMore();
                                break;
                            
                        };
                        document.getElementById("modalCardId").remove();
                    })
            })
        })
    }
    drag(e) {
        // console.log(e)
        e.dataTransfer.setData('text/html', e.currentTarget.id);        
    }
    deleteCard() {
        // console.log(this.id)
        let id = this.id
        const closeBtn = document.querySelector(`.closeBtn${id}`);
        closeBtn.addEventListener('click', () => {
            // console.log(id)
            const delrequest = fetch(`http://cards.danit.com.ua/cards/${id}`, {
                method: "delete",
                headers: {
                    "Content-type": "aplication/json",
                    "Authorization": "Bearer 69fb6b423bee"
                }
            })
            delrequest.then(delrequest => delrequest.json())
                .then(result => 
                    // console.log(result),
                    document.querySelector(`.card${id}`).remove()
                )
        })
    }
}
function chooseVisit() {
    const request = fetch("http://cards.danit.com.ua/cards", {
        method: "get",
        headers: {
            "Content-type": "aplication/json",
            "Authorization": "Bearer 69fb6b423bee"
        }
    })
    request.then(request => request.json())
        .then(result => {
            // console.log(result)
            result.forEach(function (item) {
                // console.log(item);
                let response = item;
                // console.log(response);

                switch (response.doctorType) {
                    case "Кардиолог":
                        new VisitCardiolog(response).showMore();
                        break;
                    case "Стоматолог":
                        new VisitDentist(response).showMore();
                        break;
                    case "Терапевт":
                        new visitTherapist(response).showMore();
                        break;

                }               
            })
        })
}

class VisitCardiolog extends Visit {
    constructor(response) {
        super(response);
        // this.id = response.id;
        this.bp = response.bp;
        this.weight = response.weight;
        this.prevDiseases = response.disease;
        this.age = response.age;
        super.render();
        super.id
        super.deleteCard();
    }
    showMore() {//работает только для первой карты
        let id = this.id
        const card = document.querySelector(`.card${id}`);
        const showMoreBtn = document.querySelector(`.showMore${id}`);
        showMoreBtn.addEventListener('click', () => {
            showMoreBtn.classList.toggle('hidden');
            const moreInfo = document.createElement('div');
            // console.log(this); 
            card.append(moreInfo);         
            moreInfo.insertAdjacentHTML('afterbegin', `       
                <div class ="show show${id}"> 
                <p><span></span>id: ${id}</p> 
                <p><span></span>Заболевание: ${this.disease}</p> 
                <p><span></span>Давление: ${this.bp}</p>
                <p><span></span>Возраст: ${this.age}</p>
                <p><span></span>Вес: ${this.weight}</p> 
                <p><span></span>Последний визит: ${this.lastvizDate}</p>
                <button class="showLess showLess${id}">Hide Details</button> 
                </div>  
            `);
            card.append(moreInfo);
            const showLessBtn = document.querySelector(`.showLess${id}`);
            showLessBtn.addEventListener('click', () => {//работает только первый раз 
                document.querySelector(`.show${id}`).classList.add('hidden');
                document.querySelector(`.showMore${id}`).classList.remove('hidden');
            })
        });
    }
}
class VisitDentist extends Visit {
    constructor(response) {
        super(response);
        // this.id = response.id;
        this.lastVisit = response.lastVisit;
        super.render();
        super.id
        super.deleteCard();
    }
    showMore() {//работает только для первой карты
        let id = this.id
        const card = document.querySelector(`.card${id}`);
        const showMoreBtn = document.querySelector(`.showMore${id}`);
        showMoreBtn.addEventListener('click', () => {
            showMoreBtn.classList.toggle('hidden');
            const moreInfo = document.createElement('div');
            // console.log(this);
            moreInfo.innerHTML = `       
                <div class ="show${id}">  
                <p><span></span>Последний визит: ${this.lastvizDate}</p>
                <button class="showLess${id}">Hide Details</button> 
                </div>  
            `;
            card.append(moreInfo);
            const showLessBtn = document.querySelector(`.showLess${id}`);
            showLessBtn.addEventListener('click', () => {//работает только первый раз 
                document.querySelector(`.show${id}`).classList.add('hidden');
                document.querySelector(`.showMore${id}`).classList.remove('hidden');
            })
        });
    }
}
class visitTherapist extends Visit {
    constructor(response) {
        super(response);
        this.bp = response.bp;
        this.weight = response.weight;
        this.prevDiseases = response.disease;
        this.age = response.age;
        super.render();
        super.id
        super.deleteCard();
    }
    showMore() {//работает только для первой карты
        let id = this.id
        const card = document.querySelector(`.card${id}`);
        const showMoreBtn = document.querySelector(`.showMore${id}`);
        showMoreBtn.addEventListener('click', () => {
            showMoreBtn.classList.add('hidden');
            const moreInfo = document.createElement('div');
            
            moreInfo.innerHTML = `       
                <div class ="show${id}">           
                <p><span></span>Возраст: ${this.age}</p>         
                <button class="showLess${id}">Hide Details</button> 
                </div>  
            `;
            card.append(moreInfo);
            const showLessBtn = document.querySelector(`.showLess${id}`);
            showLessBtn.addEventListener('click', () => {//работает только первый раз 
                document.querySelector(`.show${id}`).classList.add('hidden');
                document.querySelector(`.showMore${id}`).classList.remove('hidden');
            })
        });
    }
}

// drag & drop
const container = document.querySelector('.container');
container.addEventListener('dragover', allowDrop);
container.addEventListener('drop', drop);
function allowDrop(e) {
    e.preventDefault();
}
function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/html');
    const draggableEl = document.getElementById(data);
    let cards = document.querySelectorAll('.card');

    cards.forEach(el => {  
        el.dataset.right = el.getBoundingClientRect().right;
        el.dataset.left = el.getBoundingClientRect().left;
        el.dataset.bottom = el.getBoundingClientRect().bottom;
    });

    let rowFactor = 0;
    for (let i = 0; i < cards.length; i++) {
        i !== 0 && i % 4 === 0 ? rowFactor += 4 : "";

        if (cards[2 + rowFactor]) {           
            if (e.clientX > +cards[2 + rowFactor].dataset.right) {               
                if (e.clientY <= +cards[i].dataset.bottom) { 
                    rowFactor = 0;
                    break;
                }
            }
        }
        if (e.clientY <= +cards[i].dataset.bottom && e.clientX <= +cards[i].dataset.left) {
            cards[i].before(draggableEl);
            break;
        } else if (e.clientY <= +cards[i].dataset.bottom && e.clientX <= +cards[i].dataset.right) {
            cards[i].after(draggableEl);
            break;
        }
        if (i === cards.length - 1) {
            cards[cards.length - 1].after(draggableEl);
        }
    }
}
