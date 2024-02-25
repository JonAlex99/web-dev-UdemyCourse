document.getElementById('sets').addEventListener('change', function() {
    let selectedValue = this.value;
    if (selectedValue){
        axios.get('/getSelectedSet', {
            params: {
                sets: selectedValue
            }
        })
        .then(function(response){
            console.log(response)
        })
    }
})