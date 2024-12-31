import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import html2canvas from "html2canvas";
import "./App.css";

const App = () => {
  const mermaidRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const diagram = `
  graph LR

    classDef green text-color:#16a34a, font-size:28px, font-weight:bolder;
    classDef red text-color:#ef4444, font-size:28px, font-weight:bolder;
    classDef blue text-color:#1e40af,fill:#dbeafe, font-size:28px, font-weight:bolder;
    classDef purple text-color:#6b21a8,fill:#f3e8ff, font-size:28px, font-weight:bolder;
    classDef indigo text-color:#3728a3,fill:#e0e7ff, font-size:28px, font-weight:bolder;
    classDef teal text-color:#115e59,fill:#ccfbf1, font-size:28px, font-weight:bolder;
    classDef cyan text-color:#155e75,fill:#cffafe, font-size:28px, font-weight:bolder;
    classDef redbg text-color:#991b1b,fill:#fee2e2, font-size:28px, font-weight:bolder;
    classDef gray600 text-color:#4b5563, font-size:28px, font-weight:bolder;
    classDef gray800 text-color:#1f2937, font-size:28px, font-weight:bolder;
    classDef white text-color:#1f2937,fill:#ffffff, font-size:28px, font-weight:bolder;

    A[User Registration/Login]:::blue ==> |First-Time User| B[Choose Role: Regular User or Homeowner]:::teal
    A ==> |Returning User| C[Login with Credentials]:::green

    B ==> BB[Account Creation]:::redbg
    BB ==> C
    C ==> D[Regular User Dashboard]:::purple
    C ==> E[Homeowner Dashboard]:::cyan

    D ==> F[Battery Level Sync via API]:::gray600
    D ==> G[Nearby Services Map]:::indigo
    D ==> H[Value-Added Services]:::blue
    D ==> I[Notifications]:::red

    %% AI Layer for Battery Data Processing
    F ==> FA[AI Layer: Analyze Battery Data]:::blue
    FA ==> FB[Time Remaining Calculation]:::cyan
    FA ==> FC[Distance Can Travel Calculation]:::green
    FA ==> FD[When to Charge Analysis]:::red
    FA ==> FE[Best Charging Stations Recommendations]:::purple

    E ==> J[Manage Listings]:::indigo
    E ==> K[Booking Notifications]:::cyan
    E ==> L[Earnings Insights]:::green

    J ==> M[Add Parking/Charging Services]:::purple
    M ==> N[Admin Verification]:::redbg
    N ==> O[Services Go Live]:::teal

    D ==> P[Search Nearby Services]:::indigo
    P ==> |Apply Filters| Q[Search Results]:::cyan

    %% Decision: Book Parking Slot or Parking with EV Charging
    Q ==> |Book Parking Slot Only| R[Book Parking Slot]:::blue
    Q ==> |Book Parking with EV Charging| S[Book Parking with EV Charging]:::teal

    R ==> T[Parking Slot Booking Confirmation]:::green
    S ==> U[Parking and Charging Confirmation]:::green

    T ==> V[Real-Time Notifications]:::red
    U ==> V

    V ==> W[Navigation to Location]:::blue
  
    W ==> X[On-Site Interaction]:::purple
    X ==> |Regular Users| Y[Scan QR for Access]:::cyan
    X ==> |Homeowners| Z[Manual/Auto Session Approval]:::teal
    Y ==> AA[Session Monitoring]:::green
    Z ==> AA

    AA ==> AB[Session Completion]:::gray600
    AB ==> AC[Feedback and Ratings]:::blue
    AB ==> AD[Extend Session Option]:::indigo
    AC ==> AE[Regular Users: Review History]:::purple
    AC ==> AF[Homeowners: Review Earnings]:::green

    D ==> AG[Community Charging Search]:::indigo
    AG ==> AH[Book Homeowner Chargers]:::blue
    AG ==> AI[Filter by Price and Type]:::cyan

    AI ==> AJ[Dynamic Slot Management]:::teal

    E ==> AK[History and Insights]:::purple
    AK ==> AL[Earnings Reports]:::green
    AK ==> AM[Ratings and Feedback]:::blue

    AN[Admin Panel]:::redbg ==> AO[Approve Listings]:::teal
    AN ==> AP[Manage Disputes and Cancellations]:::purple
    AN ==> AQ[System Performance Monitoring]:::green
`;




  // const diagram = `
  //   graph LR
  //     classDef green text-color:#16a34a;
  //     classDef red text-color:#ef4444;
  //     classDef blue text-color:#1e40af,fill:#dbeafe;
  //     classDef purple text-color:#6b21a8,fill:#f3e8ff;
  //     classDef indigo text-color:#3730a3,fill:#e0e7ff;
  //     classDef teal text-color:#115e59,fill:#ccfbf1;
  //     classDef cyan text-color:#155e75,fill:#cffafe;
  //     classDef redbg text-color:#991b1b,fill:#fee2e2;
  //     classDef gray600 text-color:#4b5563;
  //     classDef gray800 text-color:#1f2937;
  //     classDef white text-color:#1f2937,fill:#ffffff;

  //     A[User Registration/Login]:::blue -->|First-Time User| B[Choose Role: Regular User or Homeowner]:::teal
  //     A -->|Returning User| C[Login with Credentials]:::green

  //     B --> BB[Account Creation]:::redbg
  //     BB --> C
  //     C --> D[Regular User Dashboard]:::purple
  //     C --> E[Homeowner Dashboard]:::cyan

  //     D --> F[Battery Level Sync via API]:::gray600
  //     D --> G[Nearby Services Map]:::indigo
  //     D --> H[Value-Added Services]:::blue
  //     D --> I[Notifications]:::red

  //     %% AI Layer for Battery Data Processing
  //     F --> FA[AI Layer: Analyze Battery Data]:::blue
  //     FA --> FB[Time Remaining Calculation]:::cyan
  //     FA --> FC[Distance Can Travel Calculation]:::green
  //     FA --> FD[When to Charge Analysis]:::red
  //     FA --> FE[Best Charging Stations Recommendations]:::purple

  //     E --> J[Manage Listings]:::indigo
  //     E --> K[Booking Notifications]:::cyan
  //     E --> L[Earnings Insights]:::green

  //     J --> M[Add Parking/Charging Services]:::purple
  //     M --> N[Admin Verification]:::redbg
  //     N --> O[Services Go Live]:::teal

  //     D --> P[Search Nearby Services]:::indigo
  //     P -->|Apply Filters| Q[Search Results]:::cyan

  //     %% Decision: Book Parking Slot or Parking with EV Charging
  //     Q -->|Book Parking Slot Only| R[Book Parking Slot]:::blue
  //     Q -->|Book Parking with EV Charging| S[Book Parking with EV Charging]:::teal

  //     R --> T[Parking Slot Booking Confirmation]:::green
  //     S --> U[Parking and Charging Confirmation]:::green

  //     T --> V[Real-Time Notifications]:::red
  //     U --> V

  //     V --> W[Navigation to Location]:::blue

  //     W --> X[On-Site Interaction]:::purple
  //     X -->|Regular Users| Y[Scan QR for Access]:::cyan
  //     X -->|Homeowners| Z[Manual/Auto Session Approval]:::teal
  //     Y --> AA[Session Monitoring]:::green
  //     Z --> AA

  //     AA --> AB[Session Completion]:::gray600
  //     AB --> AC[Feedback and Ratings]:::blue
  //     AB --> AD[Extend Session Option]:::indigo
  //     AC --> AE[Regular Users: Review History]:::purple
  //     AC --> AF[Homeowners: Review Earnings]:::green

  //     D --> AG[Community Charging Search]:::indigo
  //     AG --> AH[Book Homeowner Chargers]:::blue
  //     AG --> AI[Filter by Price and Type]:::cyan

  //     AI --> AJ[Dynamic Slot Management]:::teal

  //     E --> AK[History and Insights]:::purple
  //     AK --> AL[Earnings Reports]:::green
  //     AK --> AM[Ratings and Feedback]:::blue

  //     AN[Admin Panel]:::redbg --> AO[Approve Listings]:::teal
  //     AN --> AP[Manage Disputes and Cancellations]:::purple
  //     AN --> AQ[System Performance Monitoring]:::green
  // `;

  const downloadPNG = () => {
    setLoading(true);
    if (mermaidRef.current) {
      html2canvas(mermaidRef.current, {
        scale: 3, // Increase the scale factor (higher value = better quality)
        useCORS: true, // To handle cross-origin images if needed
        scrollX: 0,
        scrollY: -window.scrollY, // Ensure it captures the correct position on the page
      }).then((canvas) => {
        const img = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = img;
        link.download = "flowchart.png";
        link.click();
        setLoading(false);
      });
    }
  };
  

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    if (mermaidRef.current) {
      mermaid.contentLoaded();
    }
  }, []);

  return (
    <div>
      <div className="mermaid-container">
        <div className="mermaid shadow-md" ref={mermaidRef}>
          {diagram}
        </div>
      </div>
      <div className="flex justify-center">
      <button className="bg-green-700 p-2 text-white rounded-sm hover:bg-green-600 flex" onClick={downloadPNG} disabled={loading}>
        {loading ? "Generating..." : "Download PNG"}
      </button>
      </div>
    </div>
  );
};

export default App;
