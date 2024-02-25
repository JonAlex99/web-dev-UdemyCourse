document.querySelector("#setcard").addEventListener("change", function() {
    let newCard = document.querySelector("#newCard")
    newCard.removeAttribute("hidden")

    let selectedSet = "<%=JSON.stringify(set.cards) %>"
    selectedSet = JSON.parse(selectedSet.replace(/&#34;/ig,'"'))
    
    let selectedCard = selectedSet.filter(crd => {return crd.id === this.value})[0]
    newCard.innerHTML = `<img src="${selectedCard.image}/high.webp" alt="Picture of TCG-${selectedCard.name}">`
})