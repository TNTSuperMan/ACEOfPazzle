import { start } from "./runtime/dom";
import credit from "./licenses.json";

const main = () => {
    document.getElementById("start")!
        .addEventListener("click", ()=>{
            document.getElementById("main")?.remove();
            start();
        });
    document.getElementById("credit")!
        .addEventListener("click", ()=>{
            document.getElementById("main")?.remove();
            const ul = document.querySelector("#cbox ul")!;
            const cbox = document.getElementById("cbox")!;
            cbox.style.display = "block";
            Object.entries<string>(credit).forEach(e=>{
                const title = document.createElement("h2");
                title.id = e[0];
                const license = document.createElement("pre");
                license.textContent = e[1];
                cbox.append(title, license);

                const link = document.createElement("a");
                link.href = "#" + e[0];
                link.textContent = e[0];
                const li = document.createElement("li");
                li.append(link);
                ul.append(li);
            })
        });
}
document.readyState == "loading" ?
    window.addEventListener("DOMContentLoaded", main) :
    main();
