import cssUrl from "./index.css?url";

function injectBtn() {
  const posts = document.querySelectorAll<HTMLElement>(
    ".feed-shared-update-v2"
  );

  posts.forEach((post) => {
    if (post.querySelector("#my-extension-root")) return;

    const container = document.createElement("div");
    container.id = "my-extension-root";
    const shadow = container.attachShadow({ mode: "open" });


    const postText = post.innerText;
    
   
    const styleEl = document.createElement("link");
    styleEl.rel = "stylesheet";
    styleEl.href = chrome.runtime.getURL(cssUrl); 
    shadow.appendChild(styleEl);

    const btn = document.createElement("button");
    btn.textContent = "Extract";
    btn.className = "px-5 py-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow";

    btn.addEventListener("click", () => {
      chrome.runtime.sendMessage({
        type:"PAGE_TEXT",
        payload: postText
      })
      
    });

    shadow.appendChild(btn);

    const actionBar = post.querySelector(".feed-shared-social-action-bar");
    if (actionBar) {
      actionBar.appendChild(container);
    } else {
      post.appendChild(container);
    }
  });
}

injectBtn();

const observer = new MutationObserver(() => injectBtn());
observer.observe(document.body, { subtree: true, childList: true });
