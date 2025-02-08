let postContent = document.getElementById("postContent");
let postFile = document.getElementById("postFile");
let postButton = document.getElementById("postBtn");
let post_Name = document.getElementById("postName");
let containerPost = document.getElementById("mypostContainer")

// console.log(containerPost);

async function AddPost() {
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  try {

    // Adding post content in DB
    const { data, error } = await supabase
      .from("posts")
      .insert({ userId: currentUser.userId,content: postContent.value,  postName: post_Name.value })
      .select();

      // console.log(data);
     
    if (error) throw error;

    if (data) {
      console.log(data);
      // Checking if any image is uploaded for that post, so saving image in Storage
      if (postFile.files.length > 0) {
        let currentFile = postFile.files[0];
        
console.log(postFile.files);

        
        
        try {
          const { data: imageStoreData, error: imageStoreError } =
            await supabase.storage
              .from("postimages") // Bucket name
              .upload(
                `data/${data[0].id}`, // File name, post id
                currentFile,currentFile.name,
                {
                  cacheControl: "3600",
                  upsert: false,
                }
              );



          if (imageStoreError) throw imageStoreError;

          if (imageStoreData) {
            console.log(imageStoreData);

            try {
              const { data: publicUrlData } = await supabase.storage
                .from("postimages")
                .getPublicUrl(imageStoreData.path); // Current received path of file from Supabase

              if (publicUrlData) {
                console.log(publicUrlData.publicUrl);

                try {
                  // Update imageURL in the current POST
                  const { data: postUpdateData, error: postUpdateError } =
                    await supabase
                      .from("posts")
                      .update({ imageURL: publicUrlData.publicUrl })
                      .eq("id", data[0].id)
                      .select();

                  if (postUpdateError) throw postUpdateError;

                  if (postUpdateData) {
                    console.log("Post updated with image URL:", postUpdateData);
                  }
                } catch (error) {
                  console.log(error);
                } finally {
                  // postsContainer.innerHTML = "";
                  loadPosts();
                }
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  } catch (error) {
  
    console.log(error.message);
  }
}

async function loadPosts() {
  try {
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select("");

    if (postError) throw postError;

    if (postData) {
      try {
        const { data: usersData, error: usersError } = await supabase
          .from("users")
          .select("");

        if (usersError) throw usersError;

        if (usersData) {
          let usersMap = {};

          // console.log(usersData);
          usersData.forEach((user) => {
            usersMap[user.userId] = user;
          });

          console.log(usersMap);
          var myId = JSON.parse(localStorage.getItem("currentUser"));

          // console.log(myId.userId);
          let myPost = false;

          postData.forEach((post) => {
            let currentUser = usersMap[post.userId];

            // console.log(usersMap[post.userId]);
            // console.log(post.userId);
            // console.log(currentUser);
            if (currentUser.userId === myId.userId) {
              myPost = true;
            }

           
          //   console.log(post.id);
          //  console.log( post.created_at);
          //  console.log(post.userId);
          //  console.log(currentUser.userId);

          if(containerPost){
          containerPost.innerHTML+= `<div>helloworld</div>
                <div class="card w-100 my-2">
                  <div class="card-header d-flex gap-2 align-items-start">
                    <div>
                      <img class="mt-1" src="user.png" width="30" height="30" alt="">
                    </div>
                    <div class="d-flex flex-column">
                      <h5 class="card-title p-0 m-0"></h5>
                      <small>${new Date(post.created_at).toLocaleString()}</small>
                    </div>
                    ${myPost ? `<button onclick="deleteMyPost(${post.id})">Delete</button>` : ""}
                  </div>
                  <div class="card-body">
                    <p class="card-text">${post.content}</p>
                    <img style="width: 100%;" src="${post.imageURL}" alt="">
                  </div>
                </div>
              `;
          }
            
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteMyPost(postId) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .select();

    if (error) throw error;

    if (data) {
      postsContainer.innerHTML = "";
      loadPosts();
    }
  } catch (error) {
    console.log(error);
  }
}

window.deleteMyPost = deleteMyPost;

window.onload = loadPosts;

if(postButton){
postButton.addEventListener("click", AddPost);
}