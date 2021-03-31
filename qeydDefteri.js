const yeniQeyd = document.querySelector('.inputDaxilEt');
const yeniQeydAddBtn = document.querySelector('.qeydAddBtn');
const qeydSiyahisi = document.querySelector('.qeydSiyahisi');
 

yeniQeydAddBtn.addEventListener('click',  qeydAdd);
qeydSiyahisi.addEventListener('click' , qeydSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOxu);


function qeydSilTamamla (e){
    const clickObject = e.target;
    if(clickObject.classList.contains('qeydTamamBtn')){
         clickObject.parentElement.classList.toggle('qeydListTamam');
    }
    if(clickObject.classList.contains('qeydSilBtn')){

        if(confirm ('Qeydi silmək istədiyinizə əminsinizmi?')){

            clickObject.parentElement.classList.toggle('panelSil');
        const silinecekQeyd = clickObject.parentElement.children[0].innerText;
        localStorageSil(silinecekQeyd);
        clickObject.parentElement.addEventListener('transitionend', function(){
            clickObject.parentElement.remove();

        }) 

        }

    }

}

function qeydAdd (e){
    e.preventDefault(); 
    if(yeniQeyd.value.length > 0){

     qeydItemYarat(yeniQeyd.value); 
     // local storage save.
     localStorageQeyd(yeniQeyd.value);

     yeniQeyd.value = '';
    }
    else{
        alert("Lütfən qeyd daxil edin!")
    }
    
      


}

function localStorageArrayYarat(){
    let qeydler;
    if(localStorage.getItem('qeydler') === null){
        qeydler  = [];
    }
    else{
        qeydler = JSON.parse(localStorage.getItem('qeydler')); 
    }
    return qeydler; 
}

function localStorageQeyd(yeniQeyd){
    let qeydler = localStorageArrayYarat();
    qeydler.push(yeniQeyd);
    localStorage.setItem('qeydler', JSON.stringify(qeydler))


}

function localStorageOxu (){
    let qeydler =  localStorageArrayYarat();
    
    qeydler.forEach(function(qeyd){
        qeydItemYarat(qeyd); 
    });
 
}

function qeydItemYarat(qeyd){
    // Div Create
    const qeydDiv = document.createElement('div');
    qeydDiv.classList.add('qeydItem');
    // li Create
    const qeydLi = document.createElement('li');
    qeydLi.classList.add('qeydDescription');
    qeydLi.innerText = qeyd;
    qeydDiv.appendChild(qeydLi);

    //Completed Button Add
    const qeydTamamlandiBtn =  document.createElement('button');
    qeydTamamlandiBtn.classList.add('qeydBtn');
    qeydTamamlandiBtn.classList.add('qeydTamamBtn');
    qeydTamamlandiBtn.innerHTML='<i class="far fa-check-square"> </i>';
    qeydDiv.appendChild(qeydTamamlandiBtn);

//Completed Button Delete
    const qeydSilBtn =  document.createElement('button');
    qeydSilBtn.classList.add('qeydBtn');
    qeydSilBtn.classList.add('qeydSilBtn');
    qeydSilBtn.innerHTML='<i class="far fa-trash-alt"> </i>';
    qeydDiv.appendChild(qeydSilBtn);

   

    // Ul-ye Div Add
    qeydSiyahisi.appendChild(qeydDiv);

}

function localStorageSil(qeyd){
    let qeydler = localStorageArrayYarat();

    //splice ile item silmek
    const silinecekQeydIndexi = qeydler.indexOf(qeyd);
    qeydler.splice(silinecekQeydIndexi, 1);
    localStorage.setItem('qeydler', JSON.stringify(qeydler));
}

