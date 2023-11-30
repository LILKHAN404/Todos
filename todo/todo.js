const firebaseConfig = {
    apiKey: "AIzaSyCoXx4ne6Vfyyh4wdvxROUHZE5k67wM8_0",
    authDomain: "todo-c828b.firebaseapp.com",
    databaseURL: "https://todo-c828b-default-rtdb.firebaseio.com",
    projectId: "todo-c828b",
    storageBucket: "todo-c828b.appspot.com",
    messagingSenderId: "308102267071",
    appId: "1:308102267071:web:722949673aa39bc112860a",
    measurementId: "G-X76317GC05"
};

// Initialize Firebase
const khan = firebase.initializeApp(firebaseConfig);
khan.database().ref('toddos').on('child_added', (data) => {
    // table = document.getElementById.on('InfoTable');
    // let tableRow = document.createElement('tr');
    // let tableDisplay1 = document.createElement('td');
    // let tableDisplay2 = document.createElement('td');
    // let tableDisplay3 = document.createElement('td');
    // t1 = document.createTextNode(data.val().name)
    // t2 = document.createTextNode(data.val().age)
    // t3 = document.createTextNode(data.val().email)
    // tableDisplay1.appendChild(t1)
    // tableDisplay2.appendChild(t2)
    // tableDisplay3.appendChild(t3)
    // table.appendChild(tableRow)
    // tableRow.appendChild(tableDisplay1);
    // tableRow.appendChild(tableDisplay2);
    // tableRow.appendChild(tableDisplay3);

    let list = document.getElementById('list')
    let li = document.createElement('li')
    liText = document.createTextNode(data.val().name);
    li.appendChild(liText);
    list.appendChild(li);
    let delBtn = document.createElement("input")
    delBtn.setAttribute("type", "button")
    delBtn.setAttribute("value", "Delete")
    delBtn.setAttribute("id", data.val().key)
    delBtn.setAttribute("onclick", "Delete(this)")
    li.appendChild(delBtn)
    let editBtn = document.createElement("input")
    editBtn.setAttribute("type", "button")
    editBtn.setAttribute("value", "Edit")
    editBtn.setAttribute("id", data.val().key)
    editBtn.setAttribute("onclick", "Edit(this)")
    li.appendChild(editBtn)
})
function addTask() {
    let input = document.getElementById('addItem');
    let key = khan.database().ref('toddos').push().key
    let obj = {
        name: input.value,
        key: key
    }
    khan.database().ref('toddos').child(key).set(obj)
    document.getElementById('addItem').value = ""
}

function Delete(a) {

    khan.database().ref('toddos').child(a.id).remove()
    a.parentNode.remove()
}
function Edit(a) {
    let input = prompt("Enter Your Value")
    let newobj = {
        name: input,
        key: a.id

    }
    khan.database().ref('toddos').child(a.id).set(newobj)
    a.parentNode.firstChild.nodeValue = input
}