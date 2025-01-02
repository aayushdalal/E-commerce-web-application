//before requriing it u need to install it 
const allLikeButton =document.querySelectorAll('.like-btn')

async function likeButton(productId,btn){
    // now here we will use axios  what is axios
    //Axios is a popular JavaScript library used to make HTTP requests from the browser or Node.js.It simplifies the process of sending asynchronous HTTP requests to REST endpoints and handling responses. Axios is often used in web development to interact with APIs and fetch data from servers.
    //as we want as soon as we like the like button color turns red without the need to refresh the page so we need to send ajax request for this and to send ajax request we use axios we cant send get post and all kinds of request using axios see its 
    try{//read documentaion see headers is the what type of data we have here headers is xmlhttp request by default way
        let response = await axios({
            method: 'post',//here we are sending post request by axios and we dont want our page to refresh
            url: `/product/${productId}/like`,
          });
          
        if(btn.children[0].classList.contains('fas')){
            btn.children[0].classList.remove('fas')// fas means red far means white
            btn.children[0].classList.add('far')
        }
        else{//here children of btn means icon tag only seee indexejs file
            btn.children[0].classList.remove('far')
            btn.children[0].classList.add('fas')
        }
    }
    catch(e){
        console.log(e);
        //so we need to redirect to our login page as only a logged in user can access the functioanlity of like and dislike button
        //now generally we were redirecting using res.redirect ,we were using response object but but now here we arent doing any routing we dont have res object so to redirect in js we use the below syntax very important remember it
        window.location.replace('/login');//this is how we redirect normallyy without routing
        console.log(e.message);
        
    }
}
for(let btn of allLikeButton){    
    btn.addEventListener('click',()=>{
        let productId=btn.getAttribute('productid');
        likeButton(productId,btn)
    })
 }