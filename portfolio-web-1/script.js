document.addEventListener("DOMContentLoaded", () => { 

    // Fetch and display info.
    Promise.all([
        fetch("data/infos.json").then(response => response.json()),
        fetch("data/experience.json").then(response => response.json()),
        fetch("data/projects.json").then(response => response.json())
    ])
    .then(([info, experience, project]) => {
        document.getElementById("loading-screen").style.display = "none";

        // Info.
        document.getElementById("hero-name").textContent = info.name;
            document.getElementById("hero-title").textContent = info.title;
            const mailLink = document.getElementById("hero-mail");
            mailLink.textContent = info.mail;
            mailLink.setAttribute("href", `mailto:${info.mail}`);
            document.getElementById("about-text").textContent = info.about;
            document.getElementById("profile-pic").src = info["profile-pic"];
            document.getElementById("footer-text").textContent = `${info.name} - ${info.title}`;

            const socialLinksContainer = document.getElementById("social-links-list");
            info.social.forEach(link => {
                const anchor = document.createElement("a");
                anchor.classList.add("btn-link")
                anchor.href = link.link;
                anchor.target = "_blank";
                anchor.textContent = link.name;
                socialLinksContainer.appendChild(anchor);
            });

        // Experience
        const experiencesList = document.getElementById("experience-list");
            experience.forEach(data => {
                const experienceDiv = document.createElement("div");
                experienceDiv.classList.add("experience");
                experienceDiv.innerHTML = `
                    <div>
                        <p class="shine-text">${data["start-date"]} - ${data["end-date"]}</p>
                        <h3>${data.role} - ${data.company}</h3>
                        <p>${data.description}</p>
                    </div>
                `;
                experiencesList.appendChild(experienceDiv);
            });

        // Projects
        const projectsList = document.getElementById("projects-list");
            project.forEach(data => {
                const projectDiv = document.createElement("div");
                projectDiv.innerHTML = `
                    <div class="project-card">
                        <h3>${data.name}</h3>
                        <p>${data.description}</p>
                        <div class="tech-used">
                            ${data["tech-used"].map(tech => `<p class="shine-text">${tech}</p>`).join("")}
                        </div>
                        <div id="buttons-project">
                            ${data.buttons.map(button => `
                                <a class="btn-link" target="_blank" href="${button["btn-link"]}">${button["btn-text"]}</a>
                            `).join("")}
                        </div>
                    </div>
                `;
                projectsList.appendChild(projectDiv);
            });
    })
    .catch(err => {
        console.error("Error loading data:", err);
        document.getElementById("loading-screen").textContent = "Failed to load data.";
    });

    // COPYRIGHT NOTICE
    // This project is open-source, and you are free to use, modify, and distribute it. However, the credits must remain intact.
    // Do not remove or alter the attribution in the footer. Acknowledge the original author and repository as outlined below.
    // All rights reserved by the original author.
    document.getElementById("footer-display").appendChild(
        (() => {
            const newParagraph = document.createElement('p');
            newParagraph.classList.add("credits-text");
            newParagraph.innerHTML = `This portfolio is open source. Feel free to use it, but don't forget to leave a ⭐ on the repo. You can find the repository <span><a href="https://github.com/khiancarasicas/simple-static-webs">here</a></span>.`;
            return newParagraph;
        })()
    );

});