import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

const App = () => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    if (mermaidRef.current) {
      mermaid.contentLoaded();
    }
  }, []);

  const diagram = `
  graph TD
    classDef green text-color:#16a34a;
    classDef red text-color:#ef4444;
    classDef blue text-color:#1e40af,fill:#dbeafe;
    classDef purple text-color:#6b21a8,fill:#f3e8ff;
    classDef indigo text-color:#3730a3,fill:#e0e7ff;
    classDef teal text-color:#115e59,fill:#ccfbf1;
    classDef cyan text-color:#155e75,fill:#cffafe;
    classDef redbg text-color:#991b1b,fill:#fee2e2;
    classDef gray600 text-color:#4b5563;
    classDef gray800 text-color:#1f2937;
    classDef white text-color:#1f2937,fill:#ffffff;

    A[User Registration/Login]:::blue -->|First-Time User| B[Choose Role: Regular User or Homeowner]:::teal
    A -->|Returning User| C[Login with Credentials]:::green

    B --> BB[Account Creation]:::redbg
    BB --> C
    C --> D[Regular User Dashboard]:::purple
    C --> E[Homeowner Dashboard]:::cyan

    D --> F[Battery Level Sync via API]:::gray600
    D --> G[Nearby Services Map]:::indigo
    D --> H[Value-Added Services]:::blue
    D --> I[Notifications]:::red

    E --> J[Manage Listings]:::indigo
    E --> K[Booking Notifications]:::cyan
    E --> L[Earnings Insights]:::green

    J --> M[Add Parking/Charging Services]:::purple
    M --> N[Admin Verification]:::redbg
    N --> O[Services Go Live]:::teal

    D --> P[Search Nearby Services]:::indigo
    P -->|Apply Filters| Q[Search Results]:::cyan
    Q --> R[Booking Flow]:::blue
    R --> S[Payment Confirmation]:::green

    S --> T[Real-Time Notifications]:::red
    T --> U[Navigation to Location]:::blue

    U --> V[On-Site Interaction]:::purple
    V -->|Regular Users| W[Scan QR for Access]:::cyan
    V -->|Homeowners| X[Manual/Auto Session Approval]:::teal

    W --> Y[Session Monitoring]:::green
    X --> Y

    Y --> Z[Session Completion]:::gray600
    Z --> AA[Feedback and Ratings]:::blue
    Z --> AB[Extend Session Option]:::indigo

    AA --> AC[Regular Users: Review History]:::purple
    AA --> AD[Homeowners: Review Earnings]:::green

    D --> AE[Community Charging Search]:::indigo
    AE --> AF[Book Homeowner Chargers]:::blue
    AE --> AG[Filter by Price and Type]:::cyan

    AG --> AH[Dynamic Slot Management]:::teal

    E --> AI[History and Insights]:::purple
    AI --> AJ[Earnings Reports]:::green
    AI --> AK[Ratings and Feedback]:::blue

    AL[Admin Panel]:::redbg --> AM[Approve Listings]:::teal
    AL --> AN[Manage Disputes and Cancellations]:::purple
    AL --> AO[System Performance Monitoring]:::green
  `;

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.contentLoaded(); // Forces rendering after the component is loaded
    }
  }, [diagram]);

  return (
    <div>
      <h1>User Flow Diagram</h1>
      <div className="mermaid shadow-md" ref={mermaidRef}>
        {diagram}
      </div>
    </div>
  );
};

export default App;