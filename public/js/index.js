const img = document.getElementById('photo');
const file = document.getElementById('images');
const imgs2 = document.getElementById('photo2')
const files2 = document.getElementById('multimages')

const filechage1= ()=>{
    const choosedFile = file.files[0];
    if(choosedFile){
        const reader = new FileReader();

        reader.addEventListener('load', () =>{
                img.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);
    };
}

file.addEventListener('change', filechage1) ;

const filechage2 = () =>{
    const choosedFile = file.files[0];
    if(choosedFile){
        const reader = new FileReader();

        reader.addEventListener('load', () =>{
                imgs2.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);
    };
}
files2.addEventListener('change', filechage2);


document.querySelector('span small').innerHTML = new Date().getFullYear()