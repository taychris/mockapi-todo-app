## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Demo](#demo)

## Project Overview

The project is a simple Todo app. It incorporates the base functionality of Todo apps. Users may create multiple lists of different todos. These lists may contain Todo items, which can be marked as finished or ongoing and any Todo items can be removed from the list by the click of button. Moreover, the Todo items can be filtered by their state (ongoing, finished or all) and by their title through a search box.

## Features

- [x] Add Todo lists
- [x] Remove Todo lists
- [x] Add Todo items to related Todo list
- [x] Remove Todo item from related Todo list
- [x] Mark Todo item as finished or ongoing
- [x] Confirmation dialog when deleting Todo list or Todo item
- [x] Toast messages
- [x] Filtering Todo items based on its state
- [x] Filtering Todo items based on their title through a search box

## Technologies

- React + TypeScript + Vite 
- react-hook-form
- zod
- ReactQuery
- axios
- date-fns
- mockapi.io
- react-helmet
- TailwindCSS
- shadcn-ui
- lucide-icons
- Vercel

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/taychris/mockapi-todo-app.git
```

2. Go to the project directory and install dependencies

```bash
npm install
```

3. Create a `.env` file in both the root directory of the project and add the environment variable `VITE_API_URL`, which should be set to your unique API URL from mockapi.io.

4. To start the dev server, run 

```bash
npm run dev
```

## Demo

You can check the function Todo application at: https://todo-app-101.vercel.app
