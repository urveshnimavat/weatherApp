// const btnSubmit = document.querySelector('#btnSubmit');

function submitQuery(){
    
    const inputSearch = document.querySelector('#inputSearch');
    const tempPara = document.querySelector('#temp');
    const descPara = document.querySelector('#desc');
    const searchValue = inputSearch.value;

    console.log('submitted query '+ searchValue);

    const url = 'http://localhost:3000/weather?search='+ searchValue;
    tempPara.innerHTML = 'fetching information...';
    descPara.innerHTML = '';

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            if (data.error){
                tempPara.innerHTML = data.error;
                descPara.innerHTML = '';
                return;
            }
            tempPara.innerHTML = 'celcius:  '+data.temp;
            descPara.innerHTML = 'description:  '+data.desc;

        })
    })
}