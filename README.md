# workbuddy-ui

This is a React application built with TypeScript. It serves as a template for creating scalable and maintainable web applications.

## Features

- TypeScript for type safety
- React for building user interfaces
- Component-based architecture
- Easy to extend and maintain

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   git clone <repository-url>
   cd workbuddy-ui

2. **Install dependencies:**

   npm install


3. **Run the application:**

   npm start


4. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application in action.

## Project Structure

workbuddy-ui/
├── 📂 public/
│   ├── index.html
│   ├── favicon.ico
│   └── images/                  # Public images (backgrounds, logos, etc.)
│
├── 📂 src/
│   ├── 📂 assets/
│   │   ├── 📂 css/
│   │   │   └── styles.css       # Global styles
│   │   └── 📂 images/           # Imported images for components
│   │
│   ├── 📂 components/
│   │   ├── 📂 form-controls/              # Reusable form controls
│   │   │   ├── TextInput.tsx
│   │   │   ├── TextAreaInput.tsx
│   │   │   ├── SelectInput.tsx
│   │   │   ├── FileInput.tsx
│   │   │   └── FormContainer.tsx
│   │   │
│   │   │
│   │   │
│   │   ├──  📂 pages/                 # Main application pages
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Registration.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── OnboardingWorkBuddy.tsx
│   │   │   ├── OnboardingClient.tsx
│   │   │   └── Approval.tsx
│   │   │
│   │   │ 
│   │   │ 
│   │   │ 
│   │   │ 
│   │   │ 
│   │ 
│   │ 
│   │ 
│   ├── 📂 tests/                 # Component & page test cases
│   │   ├── components/
│   │   │   ├── TextInput.test.tsx
│   │   │   ├── TextAreaInput.test.tsx
│   │   │   ├── SelectInput.test.tsx
│   │   │   ├── FileInput.test.tsx
│   │   │   └── FormContainer.test.tsx
│   │   ├── pages/
│   │   │   ├── Login.test.tsx
│   │   │   ├── Registration.test.tsx
│   │   │   ├── OnboardingClient.test.tsx
│   │   │   └── Approval.test.tsx
│   │
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── routes.tsx               # App routing
│   └── setupTests.ts            # Jest setup (RTL + jest-dom)
│
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.


## Todats discussion
Backend:
Java
SQL DB

API> username,pwd>encrypted>saved in DB


HRMS portal
>> orgs
>>>>roles
>>>>>>employess


login page:
username,pwd

Org Register:
Org Name,
Org email,username>pwd>org>
