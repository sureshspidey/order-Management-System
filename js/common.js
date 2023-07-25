$(function(){
    $('#bootstrap').load('bootstrap.html')
    $('#header').load('header.html')
    $('#footer').load('footer.html')
    $('.carousel').carousel()
})

function getOrderList(){
    var orderItems = localStorage.getItem('orderList');
    if (orderItems){
        return JSON.parse(orderItems).values;
    }
    else{
        return [];
    }
}

function setOrderList(orderList){
    const obj ={
        values: orderList
    };
    localStorage.setItem('orderList',JSON.stringify(obj));
}

function getIndexOfOrder(id,orderList){
    var index=-1;
    for(var i=0;i<orderList.length;i++){
        if(orderList[i].id===id){
            index=i;
            break;
        }
    }
    return index;
}

function orderCreated(){

    var file=document.getElementById('img1').files[0]
    var reader= new FileReader();
    reader.onload=function() {
       var imageData=reader.result;
       orderCreatedAfterReading(imageData);  
    }
    reader.readAsDataURL(file)
}

function orderCreatedAfterReading(imageData){

    var id=document.getElementById('id').value 
    var name=document.getElementById('name').value
    var desc=document.getElementById('desc').value
    const order={
        id:id,
        name:name,
        desc:desc,
        image:imageData
    }
    var orderList=getOrderList();
    orderList.unshift(order);
    setOrderList(orderList);
    document.getElementById('form').reset();
    alert(`order:${order.id} created successfully`);
    }

function getAllOrders(){
        const allOrdersArray=getOrderList();
        console.log(allOrdersArray)
        var parentDiv =document.getElementById('view-order-parent');
        parentDiv.innerHTML='';
        if(allOrdersArray.length==0){
            parentDiv.innerHTML=`<div style="color:red;"> No orders Founds.</div>`
        }

    for(var order of allOrdersArray){    
         var cardDiv=document.createElement('div');
    cardDiv.setAttribute('class','card col-lg-3 col-md-6 col-sm-12');
    cardDiv.innerHTML=`
<img src="${order.image}" class="card-img-top" width=250px  height=300px >
<div class="card-body" border=20px>
<h5 class="card-title">${order.id}</h5>
<p class="card-text">${order.name}</p>
<p class="card-text">${order.desc}</p>
<a href="${order.image}" download="${order.id}.jpg" class="btn btn-primary">Download</a>
</div>`
parentDiv.appendChild(cardDiv)
}
}

function getAllOrdersForDelete(){
    var allOrdersArray=getOrderList();
    var tableBody=document.getElementById('tbody');
    var notFoundDiv=document.getElementById('not-found');
    notFoundDiv.innerHTML=''
    tableBody.innerHTML='';
    if(allOrdersArray.length==0){
        notFoundDiv.innerHTML=`<div style="color:red;"> No Orders found.</div>`
    }
    tableBody.innerHTML='';
    for(var order of allOrdersArray){
        var row=document.createElement('tr');
        row.innerHTML=`
        <td>${order.id}</td>
        <td>${order.name}</td>
        <td>${order.desc}</td>
        <td><a href="${order.image}" download="${order.id}.jpg">click here to Download Image</a>
        <br><a target="_blank"href="#" onClick="openImage(${order.id})">Click Here to preview</a></td>
        <td><button onClick="deleteOrder(${order.id})" class="btn btn-primary">Delete</button></td>
    `;
    tableBody.appendChild(row);
    }
}

function openImage(id){

}

function deleteOrder(id){
    var isConfirmed=confirm('are you sure you want to delete this order')
    if(!isConfirmed){
        return;
    }
    var allOrdersArray=getOrderList();
    var index=getIndexOfOrder(id,allOrdersArray);
    if(index == -1){
        alert('Order not found');
    }else{
        allOrdersArray.splice(index, 1);
        setOrderList(allOrdersArray)
        alert(`order: ${id} deleted successfully`);
        getAllOrdersForDelete();
    }
}