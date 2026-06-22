/**
 * =========================================================================
 * 📝 DEMONSTRATION REQUIRED: Attributes vs Properties Explanation
 * =========================================================================
 * * 1. DOM Property (e.g., input.value):
 * - Yeh active browser window ke dynamic data model ka live component hai.
 * - Jab koi user input box me kuch type karta hai, toh input.value instantly 
 * change ho jati hai. Yeh hamesha screen par dikhne wali live value batata hai.
 * * 2. HTML Attribute (e.g., input.getAttribute('value')):
 * - Yeh HTML markup source code ke initial/default tag ka content hoti hai.
 * - Agar user input field me text change kar bhi de, toh getAttribute('value') 
 * wahi return karega jo page loading ke time HTML me static likha tha.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Selecting important nodes
    const taskForm = document.getElementById("task-form");
    const taskListContainer = document.getElementById("task-list-container");
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const rootHtml = document.documentElement;

    let taskIdCounter = Date.now(); // Unique ID generation logic

    // =========================================================================
    // 1️⃣ & 2️⃣ & 3️⃣ Task Creation, Custom Attributes & Dynamic Manipulation
    // =========================================================================
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevents page reload on form submit

        const titleInput = document.getElementById("task-title");
        const categorySelect = document.getElementById("task-category");

        // Fetching input value through Dynamic Property
        const taskTitle = titleInput.value;
        const taskCategory = categorySelect.value;

        if (!taskTitle.trim()) return;

        // Requirement 1: Create card element dynamically -> createElement()
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        // Requirement 2: Setting up custom data attributes -> data-id, data-status, data-category
        taskCard.setAttribute("data-id", taskIdCounter);
        taskCard.setAttribute("data-status", "pending");
        taskCard.setAttribute("data-category", taskCategory);

        // Practice of dataset verification APIs
        taskCard.dataset.customTest = "demo-active";
        if (taskCard.hasAttribute("data-custom-test")) {
            taskCard.removeAttribute("data-custom-test"); // Using hasAttribute and removeAttribute
        }

        // Inside card info container structure
        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        // Requirement 1: Node Text initialization -> createTextNode()
        const h4Title = document.createElement("h4");
        const textNode = document.createTextNode(taskTitle);
        h4Title.appendChild(textNode);

        const metadataSpan = document.createElement("span");
        metadataSpan.classList.add("task-metadata");
        metadataSpan.innerText = `ID: ${taskIdCounter} | Category: ${taskCategory}`;

        // Assembling task info using append()
        taskInfo.append(h4Title, metadataSpan);

        // Requirement 3: Creating Edit, Complete, and Delete buttons
        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-warning edit-btn";
        editBtn.innerText = "Edit";

        const completeBtn = document.createElement("button");
        completeBtn.className = "btn btn-success complete-btn";
        completeBtn.innerText = "Complete";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger delete-btn";
        deleteBtn.innerText = "Delete";

        taskActions.append(editBtn, completeBtn, deleteBtn);

        // Merging into master card node
        taskCard.append(taskInfo, taskActions);

        // Demonstration of prepend() - Adds new tasks on top instantly
        taskListContainer.prepend(taskCard);

        // Reset text field using Property assignment
        titleInput.value = "";
        taskIdCounter++;
    });

    // =========================================================================
    // 5️⃣ & 6️⃣ Event Handling & Event Delegation
    // =========================================================================
    // Instead of adding event listeners to every single button, we listen on the parent container
    taskListContainer.addEventListener("click", (e) => {
        const target = e.target;
        
        // Find closest parent task card node
        const currentCard = target.closest(".task-card");
        if (!currentCard) return;

        // Action A: Delete Operation -> remove()
        if (target.classList.contains("delete-btn")) {
            currentCard.remove();
        }

        // Action B: Complete Operation -> getAttribute() & setAttribute()
        if (target.classList.contains("complete-btn")) {
            const status = currentCard.getAttribute("data-status");
            if (status === "pending") {
                currentCard.setAttribute("data-status", "completed");
                target.innerText = "Undo";
            } else {
                currentCard.setAttribute("data-status", "pending");
                target.innerText = "Complete";
            }
        }

        // Action C: Edit Operation -> replaceWith() demonstration
        if (target.classList.contains("edit-btn")) {
            const headingElement = currentCard.querySelector("h4");
            const oldText = headingElement.innerText;
            const updatedText = prompt("Edit your task description:", oldText);

            if (updatedText && updatedText.trim() !== "") {
                const newHeading = document.createElement("h4");
                newHeading.appendChild(document.createTextNode(updatedText));
                
                // Using modern DOM replacement API
                headingElement.replaceWith(newHeading);
            }
        }
    });

    // =========================================================================
    // 4️⃣ Theme Toggle Module (classList, dataset, setAttribute)
    // =========================================================================
    themeToggleBtn.addEventListener("click", () => {
        const activeTheme = rootHtml.getAttribute("data-theme");
        const nextTheme = activeTheme === "light" ? "dark" : "light";

        // Updating state using required target mechanisms
        rootHtml.setAttribute("data-theme", nextTheme);
        rootHtml.dataset.theme = nextTheme; // Dataset manipulation
        
        // Classlist toggle application
        document.body.classList.toggle("light-theme-active", nextTheme === "light");
    });

    // =========================================================================
    // 7️⃣ Event Propagation Demonstration (Bubbling & Capturing Logs)
    // =========================================================================
    const grandparent = document.getElementById("grandparent");
    const parent = document.getElementById("parent");
    const childBtn = document.getElementById("child-btn");

    // PHASE 1: Event Capturing listeners (Third parameter set to true)
    grandparent.addEventListener("click", () => {
        console.log("Event Capturing Phase ---> Grandparent Element Fired");
    }, true);

    parent.addEventListener("click", () => {
        console.log("Event Capturing Phase ---> Parent Element Fired");
    }, true);

    childBtn.addEventListener("click", () => {
        console.log("Event Capturing Phase ---> Child Button Fired");
    }, true);

    // PHASE 2: Event Bubbling listeners (Third parameter omitted or false)
    grandparent.addEventListener("click", () => {
        console.log("Event Bubbling Phase <--- Grandparent Element Fired");
    }, false);

    parent.addEventListener("click", () => {
        console.log("Event Bubbling Phase <--- Parent Element Fired");
    }, false);

    childBtn.addEventListener("click", () => {
        console.log("Event Bubbling Phase <--- Child Button Fired");
    }, false);
});