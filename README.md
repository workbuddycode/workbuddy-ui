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
│   ├── 📂 api/
│   │   └── RestApi.ts           # API service layer
│   ├── 📂 assets/
│   │   ├── 📂 css/
│   │   │   └── styles.css       # Global styles
│   │   └── 📂 images/           # Imported images for components
│   ├── 📂 components/
│   │   ├── 📂 form-controls/    # Reusable form controls
│   │   │   ├── Datepicker.tsx
│   │   │   ├── FileInput.tsx
│   │   │   ├── FormContainer.tsx
│   │   │   ├── MultiSelectInput.tsx
│   │   │   ├── SelectInput.tsx
│   │   │   ├── TextAreaInput.tsx
│   │   │   └── TextInput.tsx
│   │   ├── 📂 pages/            # Main application pages
│   │   │   ├── About.tsx
│   │   │   ├── Approval.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Logout.tsx
│   │   │   ├── OnboardingClient.tsx
│   │   │   ├── OnboardingWorkBuddy.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Registration.tsx
│   │   ├── 📂 dashboard/        # Dashboard components
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ClientProfile.tsx
│   │   │   ├── PendingActions.tsx
│   │   │   └── UserTable.tsx
│   │   └── 📂 types/            # Type definitions
│   │       └── Client.ts
│   ├── 📂 HomePage/             # Homepage components
│   │   ├── Home.tsx
│   │   └── 📂 home/
│   │       ├── ConsultationModal.tsx
│   │       ├── DemoRequestModal.tsx
│   │       ├── Footer.tsx
│   │       ├── GradientCTA.tsx
│   │       ├── HeroSection.tsx
│   │       ├── ProductsListing.tsx
│   │       └── StatsSection.tsx
│   ├── 📂 routes/               # Routing components
│   │   ├── PrivateRoutes.tsx
│   │   ├── RoleRoutes.tsx
│   │   ├── Unauthorized.tsx
│   │   └── routes.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── setupTests.ts            # Jest setup (RTL + jest-dom)
│   └── test-utils.tsx           # Test utilities
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
