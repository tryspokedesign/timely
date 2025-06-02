# ⏱️ Timely - Time Tracking App

A lightweight, role-based web application that allows employees to log their time on projects and managers to create projects, assign team members, and review time logs.

## Features

### For Employees
- Submit time logs with date, hours, and notes
- View and edit own time logs
- Simple and intuitive interface

### For Managers
- Create and manage projects
- Assign employees to projects
- View all employee time logs
- Edit own time logs

## Tech Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Mantine
- **Backend & Database**: Supabase
- **State Management**: React Query
- **Routing**: React Router
- **Date Handling**: Day.js

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/timely.git
   cd timely
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
  ├── components/     # React components
  ├── lib/           # Utility functions and configurations
  ├── types/         # TypeScript type definitions
  ├── App.tsx        # Main application component
  └── main.tsx       # Application entry point
```

## Database Schema

### Tables
- **Users**: `id`, `name`, `role` (employee/manager)
- **Projects**: `id`, `name`, `description`, `created_by`
- **Project_Assignments**: `id`, `user_id`, `project_id`
- **Time_Logs**: `id`, `user_id`, `project_id`, `date`, `hours`, `notes`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
