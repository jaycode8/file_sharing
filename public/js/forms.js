let container = document.getElementById('container')
let signupForm = document.forms["signupForm"];
let signinForm = document.forms["signinForm"];

toggle = () => {
    container.classList.toggle('sign-in')
    container.classList.toggle('sign-up')
}

setTimeout(() => {
    container.classList.add('sign-in')
}, 200)

const handleSignup = (e) => {
    e.preventDefault();
    const data = {
        username: signupForm.elements["username"].value,
        email: signupForm.elements["email"].value,
        password: signupForm.elements["password"].value
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch("/signup", options)
        .then(res => {
            return res.json()
        })
        .then(data => {
            if (data.success == "true") {
                location.reload(true);
            } else {
                alert(data.msg);
            }
        })
        .catch(err => {
            alert("Internal server error. Try again later!")
        })
};

const handleSignin = (e) => {
    e.preventDefault();
    const data = {
        uname: signinForm.elements["uname"].value,
        passw: signinForm.elements["passw"].value
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch("/user", options)
        .then(res => {
            return res.json()
        })
        .then(data => {
            if (data.success == "true") {
                localStorage.setItem("filesharetoken", data.token);
                location.href = "/"
            } else {
                alert(data.msg);
            }
        })
        .catch(err => {
            alert("Internal server error. Try again later!")
        })
};
