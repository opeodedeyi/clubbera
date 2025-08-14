# Clubbera

Clubbera is a modern community platform built with Next.js, enabling users to discover, join, and manage clubs and events. The project features a responsive UI, authentication, profile management, and seamless integration with cloud storage.

## Features

-   User authentication and profile management
-   Community and event discovery
-   Responsive design for desktop, tablet, and mobile
-   Custom icon and button systems
-   Cloud image storage (AWS S3)
-   Accessibility and keyboard navigation
-   Theming and dark mode support

## Tech Stack

-   [Next.js](https://nextjs.org/)
-   React
-   TypeScript
-   CSS Modules
-   AWS S3 (for image storage)
-   Netlify/Vercel (deployment)

## Getting Started

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/clubbera.git
    cd clubbera
    ```

2. **Install dependencies:**

    ```sh
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables:**

    - Copy `.env.example` to `.env.local` and update values as needed.

4. **Run the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

-   Edit pages in the `app/` directory.
-   UI components are in `components/ui/`.
-   Utility styles are in `styles/utils/`.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
