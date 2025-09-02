import axios from "axios";
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed ✅");
});


let pageData = {}
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type === "PAGE_TEXT"){
           const main = async() =>{
          try {
            const response = await axios.post("http://localhost:3000/analyze", {
              text: message.payload,
              userData: {
                name:"Ishwar Kalmegh",
                mobileNo:"+917218087576",
                tech_skill:["MERN", "Nextjs", "Postgres", "Docker", "Linux", "Python"],
                email:"ishwarkalmegh156@gmail.com",
              }
            })

            pageData = response.data;
            console.log(pageData);
            sendResponse({success:true, pageData})
            chrome.action.openPopup();
          } catch (error) {
            console.error("error occured", error)
            sendResponse({success:false, error})
          }
        }

        main()
        
    }

    if(message.type==="GET_PAGE_TEXT"){sendResponse(pageData)}
    
})