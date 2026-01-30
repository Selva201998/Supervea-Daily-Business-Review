# Supervea Daily Briefing App - Documentation

## 1. Project Overview

**Supervea Daily Briefing App** is a full-stack application designed to generate, store, and present daily executive briefings. It leverages a modern web frontend to display structured data served by a robust Python backend.

### Repository Structure

- **`frontend/`**: Contains the Next.js web application.
- **`src/`**: Contains the Python FastAPI backend service.
- **`manifests/`**: (Likely deployment manifests, if present)
- **`pyproject.toml`**: Backend dependency and project configuration.

---

## 2. Architecture

The application follows a standard client-server architecture:

### 2.1 Backend (`src/`)

The backend is built with **FastAPI**, creating a high-performance, asynchronous REST API.

*   **Framework**: FastAPI
*   **Language**: Python 3.11+
*   **ORM**: SQLAlchemy 2.0+
*   **Data Validation**: Pydantic v2
*   **Database**:
    *   **Development**: SQLite (`supervea.db`)
    *   **Production**: PostgreSQL (supported via drivers in `pyproject.toml`)

**Key Files:**
*   `src/main.py`: Application entry point and app initialization.
*   `src/models.py`: SQLAlchemy database models defining the table structures.
*   `src/schemas.py`: Pydantic models for request/response validation and strict typing.
*   `src/database.py`: Database connection handling (session management).
*   `src/config.py`: Environment configuration management.

### 2.2 Frontend (`frontend/`)

The frontend is a **Next.js** application using the App Router for routing and React Server Components.

*   **Framework**: Next.js 16.1.4
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4
*   **State Management/Data Fetching**: React Server Components & standard fetch API.

**Key Directories:**
*   `app/`: Contains the routes and page layouts (App Router).
*   `components/`: Reusable UI components (e.g., `ExecutiveSnapshot`, `KpiPulse`, `Footer`).
*   `services/`: client-side API integration layers (e.g., `api.ts`).
*   `types/`: TypeScript type definitions shared across the frontend.

---

## 3. Data Model

The application revolves around the **Daily Executive Briefing**, which is a complex aggregate of several data points.

### 3.1 Database Schema (`daily_executive_briefings`)

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `briefing_date` | Date | The date of the briefing |
| `prepared_for` | String | Executive name |
| `delivery_time` | Time | Scheduled delivery time |
| `schema_version`| String | Version of the JSON schema (e.g., "v1.0") |
| `briefing_payload` | JSON | **Core Content**. Stores the full structured briefing data. |
| `created_at` | DateTime | Timestamp of creation |
| `updated_at` | DateTime | Timestamp of last update |

### 3.2 Core Data Structures (Pydantic)

The JSON payload in `briefing_payload` adheres to strict Pydantic models defined in `src/schemas.py`.

*   **`DailyExecutiveBriefing`** (Root)
    *   `metadata`: Date, Executive Name, Delivery Time.
    *   `executive_snapshot`: High-level summary string.
    *   `high_impact_workstreams`: List of `Workstream` items (progress, budget, risks).
    *   `key_action_items`: List of `ActionItem`s.
    *   `meetings_and_events`: List of `Meeting`s.
    *   `follow_ups_and_watchpoints`: List of `FollowUp`s.
    *   `kpi_goal_pulse`: List of `KPI`s (Status: On Track, At Risk, etc.).
    *   `supervea_recommendations`: List of strategic recommendations.

---

## 4. Setup & Installation

### 4.1 Prerequisites
*   **Python**: Version 3.11 or higher.
*   **Node.js**: Version 18 or higher (LTS recommended).

### 4.2 Backend Setup

1.  **Navigate to the root directory**:
    ```bash
    cd c:\Vato
    ```

2.  **Install Dependencies**:
    You can install using `pip` directly (assuming a virtual environment is active):
    ```bash
    pip install .
    # OR for development dependencies as well
    pip install .[dev]
    ```

3.  **Run the Server**:
    ```bash
    uvicorn src.main:app --reload
    ```
    The API will be available at `http://localhost:8000`.
    Interactive Documentation: `http://localhost:8000/docs`.

### 4.3 Frontend Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## 5. Development Workflows

*   **Schema Updates**: If you modify `src/schemas.py`, ensure the frontend Types/Interfaces are updated to match the new JSON structure validation.
*   **Database Migrations**: Currently using `Base.metadata.create_all(bind=engine)` in `src/main.py` (or similar init script) for simple synchronization. For production, Alembic is recommended.
