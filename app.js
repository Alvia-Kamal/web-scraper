const feedDisplay=document.querySelector('#feed')

http://localhost:8000/results

fetch('http://localhost:8000/news')
.then(response=>{return response.json()})
.then(data=>
    data.forEach(article=>{
        const title=`<div><h3>`+article.label+`</h3><p><a href="`+article.url+`">`+"link"+`</a></p></div>`
        feedDisplay.insertAdjacentHTML('beforeend',title)
    }))
.catch(err=>console.log(err))
