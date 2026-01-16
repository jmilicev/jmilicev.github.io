# My Personal Website

This repository contains the source code for my personal portfolio website, designed and implemented using **React.js** and **Vite**.

**Live Site:** [jovanmilicev.com](https://jovanmilicev.com)

## Project Overview

The website serves as a dynamic professional portfolio, showcasing my expertise in **Data Strategy, Power BI, and Reporting Architectures**. It is built with performance and modern design principles in mind, utilizing glassmorphism effects and a fully responsive layout.

## Tech Stack & Architecture

* **Core Framework**: React 18
* **Build Tool**: [Vite](https://vitejs.dev/) (Migrated from CRA for 10x faster builds)
* **Styling**: Custom CSS3 with CSS Variables & Glassmorphism UI
* **Icons**: `react-icons` (FontAwesome, Simple Icons, etc.)
* **Hosting**: GitHub Pages (Mapped to custom domain `jovanmilicev.com`)
* **DNS & Email**: Cloudflare (DNS Management & Email Forwarding)

## Key Features

The website features the following sections:

* **Hero**: Introduction with a responsive profile layout and "Download Resume" capability.
* **Technical Toolkit**: A dedicated, visual grid of technical skills (Power BI, SQL, Azure, Python) featuring official brand colors and icons.
* **Experience**: A detailed timeline of my professional background in reporting and analytics.
* **Projects**: A showcase of data-driven projects.
* **Contact**: Integrated links to Email and LinkedIn.

## Installation & Usage

To run the website locally, ensure you have **Node.js** installed.

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/jmilicev/jmilicev.github.io.git](https://github.com/jmilicev/jmilicev.github.io.git)
    ```

2.  **Navigate into the directory**
    ```bash
    cd jmilicev.github.io
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Start the Development Server** (Powered by Vite)
    ```bash
    npm start
    ```
    *The site will launch at `http://localhost:5173` (default Vite port) or `3000`.*

## Deployment

This project uses `gh-pages` to deploy the production build to GitHub Pages.

1.  **Build and Deploy**
    ```bash
    npm run deploy
    ```
    *This command runs `vite build` to generate the optimized `dist/` folder and pushes it to the `gh-pages` branch.* 
    
## Contact

If you have any questions about this project, feel free to reach out to me at `contact@jovanmilicev.com`.

---