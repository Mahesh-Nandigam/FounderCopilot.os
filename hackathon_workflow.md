# Hackathon Workflow

> [!IMPORTANT]
> **STRICT STEP-BY-STEP APPROVAL RULE:** 
> For every single numbered point in Step 1 and Step 2, the Agent **MUST** explicitly stop and ask for the Master's permission before moving to the next point. 
> *Example:* "Master, I have finished point 1 (API Strategy), are you allowing me to go to point 2 (Supabase)?" The Agent cannot proceed to the next bullet point without explicit human approval.

## Step 0: Pre-Flight Engine Check
1. **Docker Live Requirement:** Before starting anything, the Agent will explicitly ask the Master: *"Master, is Docker Desktop currently open and running? It MUST remain alive for the entire 36-hour hackathon to keep our MCPs connected."*

## Step 1: Ideation & Planning
1. **Master Prompting:** Master gives a prompt.
2. **Initial Brainstorming:** Master shares initial thoughts.
3. **In-Depth World Research:** Agent will conduct deep research across national and international hackathons to extract the best "Wow Factors" and premium features.
4. **Research Presentation:** Agent presents this curated list of elite features AND provides the **Top 5 Professional Project Titles/Names** for the Master to choose from.
8. **Master Approval (TITLE LOCK):** The Agent asks, *"Master, are you satisfied with this research and the title? Shall I generate the implementation_plan.md?"* **CRITICAL:** The title approved here becomes the Universal Name. It will be exactly used for the Google Cloud Project, the Supabase Project, and the GitHub Repository.
9. **Implementation Plan:** Agent generates the comprehensive, in-depth `implementation_plan.md`.
10. **Google Cloud Setup (AUTOMATED BY AGENT - I WILL DO THIS):** *Immediately* after the implementation plan is created, the Agent will use the terminal to run `gcloud projects create` using the exact Universal Name. The Agent will then automatically link this new project to the primary active billing account **(`01039C-9DE8B7-7EB6A2`)**.

## Step 2: Prerequisites & API Discussion (STRICT GATE)
> [!CAUTION]
> **I will absolutely NOT move to Step 3 until every single item in this step is finalized.**

1. **API Strategy & Fallbacks:** We explicitly plan **4 to 5 Backup APIs** (including your Gemini Pro).
2. **Database (Supabase) Setup (AUTOMATED BY AGENT - I WILL DO THIS):** Tomorrow, right after Step 1, the Agent will completely automate the creation of the Supabase project using the connected **Supabase MCP**. The Agent will use the exact Universal Name to create the project, database, and generate the necessary connection keys. **CRITICAL INSTRUCTION FOR AGENT:** Immediately after successful configuration, the Agent MUST output this exact message: *"Master, Supabase has been successfully configured. IMPORTANT: You must now go to the Supabase dashboard -> Authentication -> Providers -> User Signups and manually DISABLE 'Confirm Email' to ensure a frictionless experience for the hackathon judges."*
3. **GitHub Repository Setup (AUTOMATED BY AGENT - I WILL DO THIS):** Tomorrow, right after Supabase, I will create the GitHub Repository. Because you successfully connected the **GitHub MCP**, I have full access to do this automatically. I will use the exact Universal Name, set it to **Public**, and write a **highly meaningful, purely human-typed description**.
4. **Front-End Vision:** Master provides front-end design inspiration via dribbble.com.
5. **Prerequisites Check:** Master provides all the required API Keys.

## Step 3: Task Breakdown (`task.md`)
1. I will refer to the `generalized_task_template.md` (which we keep aside).
2. Using the template and our Step 1/Step 2 discussions, I will create a highly granular `task.md` file.
3. This file will contain 90 to 100 micro-tasks, broken down to the smallest possible specific steps for this exact project.

## Step 4: Execution & Verification
1. We will execute the tasks from `task.md` chronologically.
2. For every single task, we will strictly follow the **Task Workflow & Verification Process** outlined in our `RULES.md` (Build -> Request Test -> Agent Test -> Master Verification -> Next Task).
