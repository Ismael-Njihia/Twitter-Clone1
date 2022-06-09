//lets check if a user is logged in
firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        const userId = user.uid;

        //const userEmail = user.email;

        //document.getElementById("test").innerText = userId;


        firebase.firestore().collection("users").doc(userId).get().then((doc) => {

                const username = doc.data().userName;
                const bio = doc.data().bio;
                let profileImage = doc.data().profileURL;
                let coverImage = doc.data().coverURL;

                document.getElementById("test").innerText = username;
                // document.getElementById("thetittle").innerHTML = username;
                document.getElementById("profName").innerText = username;
                document.getElementById("profUserNamed").innerText = "@twitter" + username;
                document.getElementById("bio").innerText = bio;

                //fill the edit account page
                document.getElementById("edtName").value = username;
                document.getElementById("edtBio").value = bio;

                //fill the profile page
                document.getElementById("mainProfImage").style.backgroundImage = "url(" + profileImage + ")";
                //fill the cover image!
                document.getElementById("coverImage").style.backgroundImage = "url(" + coverImage + ")";
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

                    document.getElementById("progressBar").style.width = wholeNumber + "%";

                    if (wholeNumber == 100) {
                        document.getElementById("progress").innerText = "Uploaded";
                    }

                }, (error) => {
                    let errorMessage = error.message;
                    alert(errorMessage);

                }, () => {
                    // on successfull upload we take the Image Url!
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        // on the users collection we update he profile URL

                        firebase.firestore().collection("users").doc(userId).update({
                            profileURL: downloadURL
                        }).then(() => {
                            window.location.reload();
                        })
                    })

                })
            }
            //upload of a cover image
        document.getElementById("uploadCover").onclick = function() {
            let coverImage = document.getElementById("coverImage").files[0];
            let storageRef1 = firebase.storage().ref();

            let coverTask = storageRef1.child("cover/").child(coverImage.name).put(coverImage);

            coverTask.on('state_changed', (snapshot) => {
                let progress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                let wholeNumber1 = Math.round(progress1);
                //console.log(progress);
                document.getElementById("progressCover").innerText = wholeNumber1 + "% Uploading";
                document.getElementById("progressBar1").style.width = wholeNumber + "%";


                if (wholeNumber1 == 100) {
                    document.getElementById("progressCover").innerText = "Uploaded";
                }
            }, (error) => {
                let errorMessage = error.message;
                alert(errorMessage);
            }, () => {
                // on successfull upload we take the Image Url!
                coverTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // on the users collection we update he profile URL

                    firebase.firestore().collection("users").doc(userId).update({
                        coverURL: downloadURL
                    }).then(() => {
                        window.location.reload();
                    })
                })
            })
        }
    } else {
        window.location.href = "index.html";
    }
})