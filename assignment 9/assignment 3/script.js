

document.addEventListener("DOMContentLoaded", () => {
    
    // Node Selectors
    const taskForm = document.getElementById("task-form");
    const taskListContainer = document.getElementById("task-list-container");
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const rootDoc = document.documentElement;

    let taskIdCounter = 101; // Primary tracker initialization

   
    // MODULE 1, 2 & 3: Task Creation, Custom Attributes, and Native Insertion APIs
  
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevents page reload during form interaction

        const titleInput = document.getElementById("task-title");
        const categorySelect = document.getElementById("task-category");

        // Fetching data cleanly via Live Property assignment
        const taskTitleText = titleInput.value;
        const taskCategoryText = categorySelect.value;

        if (taskTitleText.trim() === "") return;

        // Requirement 1: Constructing root card element node via createElement()
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        // Requirement 2: Binding Custom Metadata parameters onto HTML dataset Attributes
        taskCard.setAttribute("data-id", taskIdCounter);
        taskCard.setAttribute("data-status", "pending");
        taskCard.setAttribute("data-category", taskCategoryText);

        // Explicit validation methods required by screenshots (hasAttribute / removeAttribute)
        taskCard.setAttribute("data-temp-validator", "active");
        if (taskCard.hasAttribute("data-temp-validator")) {
            taskCard.removeAttribute("data-temp-validator");
        }

        // Inner structures building
        const taskInfoWrapper = document.createElement("div");
        taskInfoWrapper.classList.add("task-info");

        // Requirement 1: Creating explicit nodes with createTextNode() & appendChild()
        const h4Title = document.createElement("h4");
        const titleTextNode = document.createTextNode(taskTitleText);
        h4Title.appendChild(titleTextNode);

        const smallMeta = document.createElement("span");
        smallMeta.classList.add("task-meta-info");
        smallMeta.innerText = `Task ID: #${taskIdCounter} | Category: ${taskCategoryText}`;

        taskInfoWrapper.append(h4Title, smallMeta);

        // Requirement 3: DOM Manipulation Controls (Edit, Complete, Delete Buttons)
        const actionsWrapper = document.createElement("div");
        actionsWrapper.classList.add("task-actions");

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-warning edit-btn";
        editBtn.innerText = "Edit";

        const completeBtn = document.createElement("button");
        completeBtn.className = "btn btn-success complete-btn";
        completeBtn.innerText = "Complete";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger delete-btn";
        deleteBtn.innerText = "Delete";

        actionsWrapper.append(editBtn, completeBtn, deleteBtn);
        taskCard.append(taskInfoWrapper, actionsWrapper);

        // Position Insertion: Demonstration of prepend() to add latest tasks first
        taskListContainer.prepend(taskCard);

        // Flushing form field state cleanly using dynamic properties
        titleInput.value = "";
        taskIdCounter++;
    });

    
    // MODULE 5 & 6: Event Handling via Single Parent Element (Event Delegation)
   
    taskListContainer.addEventListener("click", (event) => {
        const clickTarget = event.target;
        
        // Find closest target card parent container node upstream
        const activeCardNode = clickTarget.closest(".task-card");
        if (!activeCardNode) return;

        // Action 1: Delete Operation using native node removal -> remove()
        if (clickTarget.classList.contains("delete-btn")) {
            activeCardNode.remove();
        }

        // Action 2: Toggle Status via Attribute Modification -> getAttribute() & setAttribute()
        if (clickTarget.classList.contains("complete-btn")) {
            const currentStatus = activeCardNode.getAttribute("data-status");
            if (currentStatus === "pending") {
                activeCardNode.setAttribute("data-status", "completed");
                clickTarget.innerText = "Undo";
            } else {
                activeCardNode.setAttribute("data-status", "pending");
                clickTarget.innerText = "Complete";
            }
        }

        // Action 3: Edit Title Operation via Node Swapping -> replaceWith()
        if (clickTarget.classList.contains("edit-btn")) {
            const staticHeading = activeCardNode.querySelector("h4");
            const newDescription = prompt("Edit your task details below:", staticHeading.innerText);

            if (newDescription && newDescription.trim() !== "") {
                const updatedHeadingNode = document.createElement("h4");
                updatedHeadingNode.appendChild(document.createTextNode(newDescription));
                
                // Swapping active structural nodes natively in DOM layout Tree
                staticHeading.replaceWith(updatedHeadingNode);
            }
        }
    });

    // =====================================================================================
    // MODULE 4: Application Theme Toggle (classList, dataset, setAttribute integration)
    // =====================================================================================
    themeToggleBtn.addEventListener("click", () => {
        const activeTheme = rootDoc.getAttribute("data-theme");
        const calculatedTargetTheme = activeTheme === "dark" ? "light" : "dark";

        // Applying changes simultaneously to verify all data parameters match project specifications
        rootDoc.setAttribute("data-theme", calculatedTargetTheme);
        rootDoc.dataset.theme = calculatedTargetTheme;
        
        document.body.classList.toggle("light-mode-active", calculatedTargetTheme === "light");
    });

    // =====================================================================================
    // MODULE 7: Event Propagation Engine (Capturing vs Bubbling Phase Logging)
    // =====================================================================================
    const gpElement = document.getElementById("grandparent");
    const pElement = document.getElementById("parent");
    const cButton = document.getElementById("child-btn");

    // PHASE A: Capturing Listeners (Third argument explicitly configured to true)
    gpElement.addEventListener("click", () => {
        console.log("CAPTURE PHASE ➔ Grandparent Node Intercepted Event");
    }, true);

    pElement.addEventListener("click", () => {
        console.log("CAPTURE PHASE ➔ Parent Node Intercepted Event");
    }, true);

    cButton.addEventListener("click", () => {
        console.log("CAPTURE PHASE ➔ Target Element Child Button Fired");
    }, true);

    // PHASE B: Bubbling Listeners (Third argument configured to false or omitted default)
    gpElement.addEventListener("click", () => {
        console.log("BUBBLING PHASE ➔ Grandparent Node Intercepted Event");
    }, false);

    pElement.addEventListener("click", () => {
        console.log("BUBBLING PHASE ➔ Parent Node Intercepted Event");
    }, false);

    cButton.addEventListener("click", () => {
        console.log("BUBBLING PHASE ➔ Target Element Child Button Fired");
    }, false);
});