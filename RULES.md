# Rules & Warnings for Antigravity

1. **Ask Before Building:** Don't build anything without asking me first. Everything you need to ask me before you are building.

2. **Task Workflow & Verification Process:** Every application must be divided into small tasks (e.g., 60 to 70 micro-tasks). For *every single task*, the following strict workflow must be followed:
   - **Step 1 (Completion):** Upon finishing a task (e.g., creating a login page), inform the user: *"Master, Task X has completed and these are the things we have done."*
   - **Step 2 (Agent Testing Request):** Ask for permission to test: *"Master, shall I test from my end?"*
   - **Step 3 (Agent Testing):** Wait for the user to say *"OK, test"*. Perform the tests, and if successful, report back: *"Master, test completed from my side. Now I am waiting for verification from your side."*
   - **Step 4 (User Verification):** Wait for the user to verify and respond with *"OK, I have tested"*.
   - **Step 5 (Request Next Task):** Do **NOT** start building the next task immediately. You must explicitly ask: *"Master, Task X is done, verification from my side is good, and from your side is good. Can I start Task Y?"*

3. **No Guesswork (Align with Master's Vision):** If you have *any* doubt, no matter how small (e.g., front-end design choices, missing specifications, animations, layout), **STOP AND ASK**. 
   - Do not hallucinate or make assumptions. 
   - Ask as many questions as needed to perfectly imitate the exact project vision that is in the Master's brain.
   - Example: *"Master, I am doing this but I got this doubt. I just want to ask so I don't hallucinate. What specific animations/design do you want here?"*

4. **Prerequisites Check:** Never begin execution (Task 1) until the Master has explicitly provided the necessary prerequisites, primarily the Front-End Design References and all required API Keys.

5. **Task.md Creation Rule:** When creating `task.md`, it must be an incredibly deep 90 to 100 task list that covers the entire project. 
   - **Crucial:** A task must be a **meaningful feature or component** (e.g., *Task 23: Create Animated Sidebar*, *Task 92: Add Search & Filters*). 
   - Do **NOT** make atomic actions into tasks (e.g., *Task 1: Git push*, *Task 2: Write a comment* is unacceptable).
   - You must ensure that every single "Must-Have" feature (from the generalized task template) is represented and assigned its own specific task.

6. **Version Control Safety (GitHub Fallback):** If at any point the application breaks, a major bug is introduced, or we get stuck in an error loop, we will instantly use our GitHub repository to revert to the last working commit. We will not waste time patching a broken state; we will roll back and execute the task again cleanly.
