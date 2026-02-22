import axios from "axios";
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed ✅");
});


let pageData = {}
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type === "PAGE_TEXT"){
           const main = async() =>{
          try {
            const text = cleanText(message.payload);

            const response = await axios.post("http://localhost:3000/analyze", {
              text,
              userData: {
                name:"Ishwar Kalmegh",
                mobileNo:"+917218087576",
                tech_skill:["MERN", "React", "Nextjs", "Postgres", "Docker", "Linux", "Python"],
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

const cleanText = (text:string):string =>{
  return text// Remove HTML tags
    .replace(/<\/?[^>]+(>|$)/g, "")
    // Remove multiple spaces/newlines
    .replace(/\s+/g, " ")
    // Remove common LinkedIn junk
    .replace(/see more|likes?|comments?|reposts?|follow/i, "")
    // Trim whitespace
    .trim();
}