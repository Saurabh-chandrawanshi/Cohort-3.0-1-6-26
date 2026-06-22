/**
 * =========================================================================
 * DEMONSTRATION REQUIRED: Attributes vs Properties
 * =========================================================================
 * Explanation of Difference:
 * 
 * 1. HTML Attribute: input.getAttribute('value')
 *    - Yeh HTML markup code ke andar likhe default ya initial state ki value uthata hai.
 *    - Agar user input field me text badal bhi de, to getAttribute("value") purani static value hi return karega jab tak use setAttribute se sync na kiya jaye.
 * 
 * 2. DOM Property: input.value
 *    - Yeh active browser viewport memory ke objects ka part hai.
 *    - Yeh real-time live current state ko fetch karta hai jo user screen par dekh ya type kar raha hai.
 */

document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskListContainer = document.getElementById("task-list-container");
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const htmlElement = document.documentElement;

    let taskIdCounter = 1;

    // =========================================================================
    // Module 1 & 2 & 3: Task Creation & Manipulation using Pure DOM APIs
    // =========================================================================
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Instant response with no page refresh

        const titleInput = document.getElementById("task-title");
        const categorySelect = document.getElementById("task-category");

        const taskTitleText = titleInput.value; // Fetch via Live Property
        const taskCategoryText = categorySelect.value;

        if (taskTitleText.trim() === "") return;

        // 1. createElement()
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        // 2. Setting up Mandatory Custom Data Attributes (Module 2) via dataset
        taskCard.dataset.id = taskIdCounter++;
        taskCard.dataset.status = "pending";
        taskCard.dataset.category = taskCategoryText;

        // Alternative explicit verification methods required in requirements:
        taskCard.setAttribute("data-custom-check", "active");
        if (taskCard.hasAttribute("data-custom-check")) {
            taskCard.removeAttribute("data-custom-check"); // Demonstrates has & remove attribute
        }

        // 3. createTextNode() & DOM Traversal structures
        const infoWrapper = document.createElement("div");
        const titleHeading = document.createElement("h4");
        const titleTextNode = document.createTextNode(`${taskTitleText}`);
        titleHeading.appendChild(titleTextNode);

        const badgeSpan = document.createElement("span");
        badgeSpan.classList.add("badge");
        badgeSpan.appendChild(document.createTextNode(` [${taskCategoryText}]`));
        
        // append() node assembly
        infoWrapper.append(titleHeading, badgeSpan);

        // Action controls containing Edit, Complete, Delete (Module 3)
        const actionWrapper = document.createElement("div");
        actionWrapper.classList.add("task-actions");

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-warning edit-btn";
        editBtn.appendChild(document.createTextNode("Edit"));

        const completeBtn = document.createElement("button");
        completeBtn.className = "btn btn-success complete-btn";
        completeBtn.appendChild(document.createTextNode("Complete"));

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger delete-btn";
        deleteBtn.appendChild(document.createTextNode("Delete"));

        actionWrapper.append(editBtn, completeBtn, deleteBtn);
        taskCard.append(infoWrapper, actionWrapper);

        // Use of modern positioning insertion APIs (Demonstrating prepend)
        taskListContainer.prepend(taskCard); 

        // Reset text field form state
        titleInput.value = "";
    });

    // =========================================================================
    // Module 5 & 6: Event Handling via Single Parent Event Delegation
    // =========================================================================
    taskListContainer.addEventListener("click", (event) => {
        const target = event.target;
        const taskCard = target.closest(".task-card");

        if (!taskCard) return;

        // Handle Complete Operation
        if (target.classList.contains("complete-btn")) {
            const currentStatus = taskCard.getAttribute("data-status");
            if (currentStatus === "pending") {
                taskCard.setAttribute("data-status", "completed");
                target.innerText = "Undo";
            } else {
                taskCard.setAttribute("data-status", "pending");
                target.innerText = "Complete";
            }
        }

        // Handle Delete Operation (Demonstrating .remove())
        if (target.classList.contains("delete-btn")) {
            taskCard.remove();
        }

        // Handle Edit Operation (Demonstrating .replaceWith(), .before(), .after())
        if (target.classList.contains("edit-btn")) {
            const headingNode = taskCard.querySelector("h4");
            const newTitle = prompt("Update your task name:", headingNode.innerText);
            
            if (newTitle && newTitle.trim() !== "") {
                const updatedHeading = document.createElement("h4");
                updatedHeading.appendChild(document.createTextNode(newTitle));
                headingNode.replaceWith(updatedHeading); // Demonstration of replaceWith API
            }
        }
    });

    // =========================================================================
    // Module 4: Theme Toggle Implementation
    // =========================================================================
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        let targetTheme = "light";

        if (currentTheme === "light") {
            targetTheme = "dark";
        }

        // Assign updates using both setAttribute, dataset and classList wrappers
        htmlElement.setAttribute("data-theme", targetTheme);
        htmlElement.dataset.theme = targetTheme;
        document.body.classList.toggle("dark-mode-active", targetTheme === "dark");
    });

    // =========================================================================
    // Module 7: Event Propagation Demonstration (Bubbling & Capturing)
    // =========================================================================
    const grandparent = document.getElementById("grandparent");
    const parent = document.getElementById("parent");
    const childBtn = document.getElementById("child-btn");

    // Phase A: Event Capturing Listeners (Third argument passed as true)
    grandparent.addEventListener("click", () => {
        console.log("Capturing Phase: Grandparent");
    }, true);

    parent.addEventListener("click", () => {
        console.log("Capturing Phase: Parent");
    }, true);

    childBtn.addEventListener("click", () => {
        console.log("Capturing Phase: Child");
    }, true);

    // Phase B: Event Bubbling Listeners (Third argument omitted or false)
    grandparent.addEventListener("click", () => {
        console.log("Bubbling Phase: Grandparent");
    }, false);

    parent.addEventListener("click", () => {
        console.log("Bubbling Phase: Parent");
    }, false);

    childBtn.addEventListener("click", () => {
        console.log("Bubbling Phase: Child");
    }, false);
});