# Industry-Symbiosis: Frontend Interface

⚠️ **Work in Progress:** *This frontend application is currently under active development and is not yet ready for production use.*

This repository contains the frontend user interface for the **Industry-Symbiosis** platform, a prototype designed to help reduce resource waste by matching material and energy flows between industrial facilities. 

*Note: The backend API and database repository can be found [here](https://github.com/KonstantinBlank/Industry-Symbiosis).*

## Concept Previews

Here is a look at the planned user interface, including the main dashboard and the energy/material flow visualizations:

**Dashboard Concept:**
![Dashboard Concept Screenshot](./screenshots/screenshot_dashboard.png)

**Match overview Concept:**
![Match Overview Screenshot](./screenshots/screenshot_matchoverview.png)

**Match details Concept:**
![Match Details Screenshot](./screenshots/screenshot_match_details.png)

**Map Concept:**
![Map Concept Screenshot](./screenshots/screenshot_map.png)

**Sankey Diagram Concept (Resource Flows):**
![Sankey Diagram Concept Screenshot](./screenshots/screenshot_sankey.png)

**Production Line Setup Concept:**
![Production_Setup Concept Screenshot](./screenshots/screenshot_production_setup.png)


---

## Tech Stack
* **Framework:** Vue.js
* **Package Manager:** Yarn

## Key Views & Components

The application is built with modular Vue components to handle different aspects of the resource trading network:

* **Authentication & Access:** `Login.vue`, `LoginAdmin.vue`
* **Dashboards & Navigation:** `Homepage.vue`, `Dashboard.vue`, `Admin.vue`
* **Data Visualization:** * `SankeyView.vue`: Visualizes complex input/output streams of materials and energy.
  * `MapView.vue`: Geographical overview of the industrial network.
  * `MatchView.vue`: Interface for displaying and managing facility matches.
* **Entity Management:** `AddEnterprise.vue`, `UpdateEnterprise.vue`
* **User Management:** `UserData.vue`, `NewUserData.vue`, `UpdateUserData.vue`

---

## Getting Started

Follow these steps to set up and run the frontend application locally.

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your machine.

### Project Setup
Clone the repository and install the required dependencies:
```bash
yarn install
```

### Compiles and hot-reloads for development
To start the local development server:

```Bash
yarn serve
```

Important: Once the server is running, you can view the application by navigating to the following test route in your browser:
http://localhost:8080/Dashboard/1/Hans
