document.getElementById("sendLink").onclick = function() {

    const email = document.getElementById("email").value;

    firebase.auth().sendPasswordResetEmail(email).then(() => {



    }).catch((error) => {

        var errorMessage = error.message;
        alert(errorMessage)

    });
}