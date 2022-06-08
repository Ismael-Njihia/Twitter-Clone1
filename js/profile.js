//lets check if a user is logged in
firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        const userId = user.uid;

        //const userEmail = user.email;

        //document.getElementById("test").innerText = userId;


        firebase.firestore().collection("users").doc(userId).get().then((doc) => {

                const username = doc.data().userName;
                const bio = doc.data().bio;

                document.getElementById("test").innerText = username;
                // document.getElementById("thetittle").innerHTML = username;
                document.getElementById("profName").innerText = username;
                document.getElementById("profUserNamed").innerText = "@twitter" + username;
                document.getElementById("bio").innerText = bio;

                //fill the edit account page
                document.getElementById("edtname").value = username;
                document.getElementById("edtbio").value = bio;
            })
            //update account
        document.getElementById("saveChanges").onclick = function() {

                var edtName = document.getElementById("edtName").value;
                var edtBio = document.getElementById("edtBio").value;

                //summon firebase
                firebase.firestore().collection("users").doc(userId).update({
                    userName: edtName,
                    bio: edtBio
                }).then(() => {
                    window.location.reload();
                })
            }
            //upload of a profile picture!

        document.getElementById("upload").onclick = function() {
            let profileImage = document.getElementById("profileImage").files[0];
            //console.log(profileImage);
            let storageRef = firebase.storage().ref();

            let uploadTask = storageRef.child("profile/").child(profileImage.name).put(profileImage);

            uploadTask.on('state_changed', (snapshot) => {
                //progress function
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                let wholeNumber = Math.round(progress);
                //console.log(progress);
                document.getElementById("progress").innerText = wholeNumber + "% Uploading";

                if (wholeNumber == 97) {
                    document.getElementById("progress").innerText = "Uploaded";
                } else if (wholeNumber == 100) {
                    document.getElementById("progress").style.display = "none";
                }

            }, (error) => {

            }, () => {

            })
        }





    } else {
        window.location.href = "index.html";
    }
})