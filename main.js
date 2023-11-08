// Function to load data from URL parameters and populate form fields
function  loaddata()
{
  // Get URL and split parameters
  var url = decodeURIComponent(document.location.href),
  params = url.split('?')

  // Get form fields by ID
  let id=document.getElementById("adminid");
  let name=document.getElementById("adminname");
  let gender=document.getElementById("admingender");
  let mail=document.getElementById("adminmail");
  let phone=document.getElementById("adminphone");

  // Populate form fields with values from URL parameters
  id.innerHTML=params[1].split('=')[1];
  name.innerHTML=params[2].split('=')[1];
  mail.innerHTML=params[3].split('=')[1];
  gender.innerHTML=params[4].split('=')[1];
  phone.innerHTML=params[5].split('=')[1];
}

// Admin class definition
class admin{
   constructor()
   {
    // Get elements by ID
    this.dash=document.getElementById("dashboard");
    this.borw=document.getElementById("borrower");
    this.issue=document.getElementById("issue");
    this.book=document.getElementById("book")
    this.dashmenu=document.getElementById("dashmenu")
    this.borwmenu=document.getElementById("borwmenu")
    this.issuemenu=document.getElementById("issuemenu")
    this.bookmenu=document.getElementById("bookmenu")
   }

   // Function to display book-related content
   gotobook=function(){
    const heading=["BookId","Name","Publisher","Author","ISBN","Edition","Pages","Available"];
    let booktable=document.getElementById('booktable');
    booktable.innerHTML=""
    let tr=document.createElement("tr");
    for (let index = 0; index < heading.length; index++) {
      let th=document.createElement("th");
      th.setAttribute("align","left");
      th.setAttribute("valign","middle");
      th.innerHTML=heading[index];
      tr.appendChild(th);
    }
    booktable.appendChild(tr);
    this.dash.style.display="none";
    this.borw.style.display="none";
    this.issue.style.display="none";
    this.book.style.display="flex";
    this.dashmenu.classList.remove("active");
    this.borwmenu.classList.remove("active");
    this.issuemenu.classList.remove("active");
    this.bookmenu.classList.add("active");
    {
      let params={
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
        }),
        method:"POST"
      }
      fetch('http://localhost:4000/book',params)
      .then(response=>response.json())
      .then(res => { 
        console.log(res);
        let data=res.data;
        for (let index = 0; index < data.length; index++) {
          let tr=document.createElement("tr");
          for (let i in data[index]) {  
            let td=document.createElement("td");
            td.innerHTML=data[index][i];
            tr.appendChild(td);
          }
          booktable.appendChild(tr);
        }
      })
    }
  }

  // Function to display dashboard-related content
  gotodash=function()
  {
    this.dash.style.display="flex";
    this.borw.style.display="none";
    this.issue.style.display="none";
    this.book.style.display="none";
    this.dashmenu.classList.add("active");
    this.borwmenu.classList.remove("active");
    this.issuemenu.classList.remove("active");
    this.bookmenu.classList.remove("active");

  }

  // Function to display borrower-related content
  gotoborw = function() {
    const heading = ["Id", "Name", "Email", "Phone", "Gender", "Update", "Remove"];
    let borrowertable = document.getElementById('borrowertable');
    borrowertable.innerHTML = '';
    let tr = document.createElement('tr');
    for (let index = 0; index < heading.length; index++) {
      let th = document.createElement('th');
      th.setAttribute('align', 'left');
      th.setAttribute('valign', 'middle');
      th.innerHTML = heading[index];
      tr.appendChild(th);
    }
    borrowertable.appendChild(tr);
    this.dash.style.display = 'none';
    this.borw.style.display = 'flex';
    this.issue.style.display = 'none';
    this.book.style.display = 'none';
    this.dashmenu.classList.remove('active');
    this.borwmenu.classList.add('active');
    this.issuemenu.classList.remove('active');
    this.bookmenu.classList.remove('active');
    {
      let params = {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}),
        method: 'POST'
      };
      fetch('http://localhost:4000/borrower', params)
        .then(response => response.json())
        .then(res => {
          let data = res.data;
          for (let index = 0; index < data.length; index++) {
            let tr = document.createElement('tr');
            for (let i in data[index]) {
              let td = document.createElement('td');
              td.innerHTML = data[index][i];
              tr.appendChild(td);
            }
  
            // Add "Update" button
            let updateButton = document.createElement('button');
            updateButton.type = 'button';
            updateButton.textContent = 'Update';
            updateButton.onclick = function() {
              openUpdateForm(data[index]); // Pass borrower data to open the update form
            };
            let tdUpdate = document.createElement('td');
            tdUpdate.appendChild(updateButton);
            tr.appendChild(tdUpdate);
  
            // Add "Remove" button and its functionality
            let removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.textContent = 'Remove';
            removeButton.onclick = function() {
              removeborrower(data[index].Id); // Pass borrower ID to remove function
            };
            let tdRemove = document.createElement('td');
            tdRemove.appendChild(removeButton);
            tr.appendChild(tdRemove);
  
            borrowertable.appendChild(tr);
          }
        });
    }
  };
  
  // Function to display issue books to borrowers
  gotoissue=function()
  {
    const heading=["borrower Id","borrower Name","Book Id","Book Name","Issued Date","Due Data","Return","Fine"];
    let reporttable=document.getElementById('reporttable')
    reporttable.innerHTML=""
    let tr=document.createElement("tr");
    for (let index = 0; index < heading.length; index++) {
      let th=document.createElement("th");
      th.setAttribute("align","left");
      th.setAttribute("valign","middle");
      th.innerHTML=heading[index];
      tr.appendChild(th);
    }
    reporttable.appendChild(tr);
    this.dash.style.display="none";
    this.borw.style.display="none";
    this.issue.style.display="flex";
    this.book.style.display="none";
    this.dashmenu.classList.remove("active");
    this.borwmenu.classList.remove("active");
    this.issuemenu.classList.add("active");
    this.bookmenu.classList.remove("active");
    {
      let params={
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
        }),
        method:"POST"
      }
      fetch('http://localhost:4000/bookreport',params)
      .then(response=>response.json())
      .then(res => { 
        let data=res.data;
        for (let index = 0; index < data.length; index++) {
          let tr=document.createElement("tr");
          for (let i in data[index]) {  
            let td=document.createElement("td");
            td.innerHTML=data[index][i];
            tr.appendChild(td);
          }
          let Return=document.createElement("td");
          Return.innerHTML="<a href=\"#\">Return</a>"
          Return.onclick=Returned;
          let curtime=new Date();
          console.log(curtime);
          let fine=document.createElement("td");
          let duedate=data[index].duedate.split('-');
          duedate=new Date(duedate[0],duedate[1]-1,duedate[2]);
          console.log(duedate);
          console.log(curtime-duedate)
          if((curtime-duedate) > 0)
          {
            fine.innerHTML=((curtime-duedate)/(1000*60*60*24));
          }
          else{
          fine.innerHTML=0;
          }
          tr.appendChild(Return);
          tr.appendChild(fine)
          reporttable.appendChild(tr);
        }
      })
    }

  }
}

// Create an instance of the admin class
Admin=new admin();

// Event handler functions for navigation buttons
function gotobook(){
  Admin.gotobook();  
}
function gotodash()
{
  Admin.gotodash();
}
function gotoborw()
{
  Admin.gotoborw();
}
function gotoissue()
{
  Admin.gotoissue();
}

// Function to close the book entry form and clear its fields
function closebook()
{
  document.getElementById('bookid').value="",
  document.getElementById('bookname').value="",
  document.getElementById('publisher').value="",
  document.getElementById('author').value="",
  document.getElementById('isbn').value="",
  document.getElementById('edition').value="",
  document.getElementById('pages').value="",
  document.getElementById('quantity').value="";
  document.getElementById('addbook').style.display="none";
}

// Function to display the book entry form
function openbook()
{
  document.getElementById('addbook').style.display="flex";
}

// Function to close the borrower entry form and clear its fields
function closeborrower()
{
  document.getElementById('borrowername').value="";
  document.getElementById('borrowerid').value="";
  document.getElementById('borroweremail').value="";
  document.getElementById('borrowerphone').value="";
  document.getElementById('borrowergender').value="";
  document.getElementById('addborrower').style.display="none";
}

// Function to display the borrower entry form
function openborrower()
{
  document.getElementById('addborrower').style.display="flex";
}

// Function to close the issue form and clear its fields
function closeissue()
{
  document.getElementById('sname').value="";
  document.getElementById('sid').value="";
  document.getElementById('bid').value="";
  document.getElementById('bname').value="";
  document.getElementById('currentdate').value="";
  document.getElementById('days').value="";
  document.getElementById('issuebook').style.display="none";
}

// Function to display the issue form
function openissue()
{  document.getElementById('issuebook').style.display="flex";
   let today=new Date();
   today=[today.getFullYear(), String(today.getMonth()+1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
   document.getElementById('currentdate').value=today;
}

// Function to save a new book entry
function savebook()
{
  let id=document.getElementById('bookid').value,
        name=document.getElementById('bookname').value,
        isbn=document.getElementById('isbn').value,
        author=document.getElementById('author').value,
        publisher=document.getElementById('publisher').value,
        edition=document.getElementById('edition').value,
        pages=document.getElementById('pages').value,
        quantity=document.getElementById('quantity').value;
  if(name==="" || id==="" || isbn==="" || author==="" || publisher==="" || edition==="" || pages==="" || quantity==="") 
  {
    alert("Can not add empty entry");
    return
  }
  else if( isNaN(edition) || isNaN(pages) || isNaN(quantity) )
  {
    alert("There is an error in edition,pages or quantity. All must be number");
    return 
  }
  {
    let params={
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name,
        id,
        isbn,    
        author,   
        publisher,
        edition,
        pages,   
        quantity
      }),
      method:"POST"
    }
    fetch('http://localhost:4000/addbook',params)
    .then(response=>response.json())
    .then(res=>{
      alert(res.msg);
      closebook();
      Admin.gotobook();
    })
  }
}


// Function to search for a book
function searchbook(){
  console.log('here we go')
  let id=document.getElementById('bookid'),
  name=document.getElementById('bookname'),
  isbn=document.getElementById('isbn'),
  author=document.getElementById('author'),
  publisher=document.getElementById('publisher'),
  edition=document.getElementById('edition'),
  pages=document.getElementById('pages');
  if(id.value==="")
  {
    alert("Insert Id for search");
    return;
  }
  {
    let params={
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
       id:id.value
      }),
      method:"POST"
    }
    fetch('http://localhost:4000/searchbook',params)
    .then(response=>response.json())
    .then(res => {
       data=res.data[0];
       if(data===undefined)
       {
        alert("No Record Found");
        return; 
      }
       name.value=data.Bookname;
       isbn.value=data.ISBN;
       author.value=data.Author;
       publisher.value=data.Publisher;
       edition.value=data.Edition;
       pages.value=data.Pages;
  })
  } 
}

// Function to save a new borrower entry
function saveborrower()
{
  let name=document.getElementById('borrowername').value,
        id=document.getElementById('borrowerid').value,
        email=document.getElementById('borroweremail').value,
        phone=document.getElementById('borrowerphone').value,
        gender=document.getElementById('borrowergender').value
  if(name==="" || id==="" || email==="" || phone==="" || gender==="") 
  {
    alert("Can not add empty entry");
    return
  }
  else if (phone.length!=10)
  {
    alert("Invalid Phone Number");
    return 
  }
  else if(phone.length>10){
    alert("Invalid Phone Number");
    return
  }
  let params={
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name,
        id,
        email,    
        phone,   
        gender
      }),
      method:"POST"
    }
    
    fetch('http://localhost:4000/addborrower',params)
    .then(response=>response.json())
    .then(res=>{
      if(res.status===1)
      {
        alert("Borrower Added");
        closeborrower();
        Admin.gotoborw();
      }    
      else{
        alert("Borrower wih this id already present in database");
        return
      }
    })

}
function openUpdateForm(borrowerData) {
  // Populate the update form with current details
  document.getElementById('updateborrowername').value = borrowerData.Name;
  document.getElementById('updateborrowerid').value = borrowerData.Id;
  document.getElementById('updateborroweremail').value = borrowerData.Email;
  document.getElementById('updateborrowerphone').value = borrowerData.Phone;
  document.getElementById('updateborrowergender').value = borrowerData.Gender;

  // Show the update form
  document.getElementById('updateborrower').style.display = 'block';
}

// Function to remove a borrower entry
function removeborrower(e){
  let id=e.currentTarget.parentElement.childNodes[0].innerText;
  let params={
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
      id
    }),
    method:"POST"
  }
  
  fetch('http://localhost:4000/removeborrower',params)
  .then(response=>response.json())
  .then(res=>{
    alert(res.msg);
    closeborrower();
    Admin.gotoborw();
  })
}

// Function to issue a book to a borrower
function  issue(){
  let res=search();
  console.log(res);
  if(res)
   {
    let bid=document.getElementById('bid').value;
    let sid=document.getElementById('sid').value;
    let bname=document.getElementById('bname').value;
    let sname=document.getElementById('sname').value;
    let issuedate=document.getElementById('currentdate').value;
    let day=document.getElementById('days').value;
    let arr=issuedate.split('-');
    let date=new Date(arr[0],parseInt(arr[1])-1,arr[2]);
    console.log(date);
    let duedate=date.addDays(parseInt(day));
    console.log(duedate)
    duedate=[duedate.getFullYear(),String(duedate.getMonth()+1).padStart(2, '0'), String(duedate.getDate()).padStart(2,'0')].join('-');
    console.log(duedate,"grkngr");
    let params={
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
         sid,bid,sname,bname,issuedate,duedate
        }),
        method:"POST"
      }
      fetch('http://localhost:4000/issuebook',params)
      .then(response=>response.json())
      .then(res => {
        alert(res.msg);
        closeissue()
        gotoissue();
       })
  }
}

// Function to search for a book before issuing
function search()
{
  let bid=document.getElementById('bid').value;
  let sid=document.getElementById('sid').value;
  if(bid==="" || sid==="")
  {
    alert("Enter borrower  Id and Book Id");
    return false;
  }
  let params={
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
       id:bid
      }),
      method:"POST"
    }
    fetch('http://localhost:4000/searchbook',params)
    .then(response=>response.json())
    .then(res => {
       data=res.data[0];
       if(data===undefined)
       {
        alert("No Record Found For Entered Book Id");
        return false; 
      }
      document.getElementById('bname').value=data.Bookname;
      }).then(()=>{
          let params={
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
            id:sid
            }),
            method:"POST"
          }
          fetch('http://localhost:4000/searchborrower',params)
          .then(response=>response.json())
          .then(res => {
            data=res.data[0];
            if(data===undefined)
            {
              alert("No Record Found For Entered borrower Id");       
              return false; 
            }
            document.getElementById('bname').value=data.borrowername;
          })
  })
  return true;
}

// Function to handle returning a book
function  Returned(e){
  let sid=e.currentTarget.parentElement.childNodes[0].innerText;
  let bid=e.currentTarget.parentElement.childNodes[2].innerText;
  let params={
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
      sid,
      bid
    }),
    method:"POST"
  }
  
  fetch('http://localhost:4000/bookreturned',params)
  .then(response=>response.json())
  .then(res=>{
    alert(res.msg);
    closeissue();
    Admin.gotoissue();
  })
}