const img = document.getElementById('photo');
const file = document.getElementById('images');
const imgs2 = document.getElementById('photo2')
const files2 = document.getElementById('multimages')
const sessionToken = localStorage.getItem("filesharetoken");
let user;

const filechage1 = () => {
    const choosedFile = file.files[0];
    if (choosedFile) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            img.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);
    };
}

file.addEventListener('change', filechage1);

const filechage2 = () => {
    const choosedFile = file.files[0];
    if (choosedFile) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            imgs2.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);
    };
}
files2.addEventListener('change', filechage2);

const manipulateData = () => {
    const glLink = document.getElementById("glLink");
    glLink.href = `/gallery/${user._id}`;
};

const fetchUser = () => {
    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${sessionToken}`
        },
    };
    fetch("/user", options)
        .then(res => {
            return res.json()
        })
        .then(data => {
            if (data.success == "true") {
                user = data.user;
                manipulateData();
            } else {
                console.log(data);
            }
        })
        .catch(err => {
            console.log(err)
        })
};

const checkToken = () => {
    if (!sessionToken) {
        location.href = "/forms";
    } else {
        fetchUser();
    }
};

const logOut = () => {
    localStorage.removeItem("filesharetoken");
    location.href = "/forms";
};

document.addEventListener("DOMContentLoaded", checkToken);

const fileUpload = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("images");
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("myFile", file);
        fetch('/uploadImg', {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${sessionToken}`
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == "true") {
                    location.href = `/gallery/${data.user}`
                } else {
                    alert("An internal server error occured");
                }
            })
            .catch(err => {
                alert("An internal server error occured");
            })
    } else {
        alert("No file selected");
    }
}


document.querySelector('span small').innerHTML = new Date().getFullYear()
