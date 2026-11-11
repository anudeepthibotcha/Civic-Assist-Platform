import { useEffect, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RequestModal from "./components/RequestModal";

import Login from "./pages/Login";
import CitizenDashboard from "./pages/CitizenDashboard";
import Services from "./pages/Services";
import MyRequests from "./pages/MyRequests";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import {
  seedServices,
  seedRequests,
  seedAgents,
  seedCitizens
} from "./data/mockData";

import {
  readStorage,
  writeStorage
} from "./utils/storage";

export default function App() {
  const [user, setUser] = useState(
    () => readStorage("civic-user", null)
  );

  const [services, setServices] = useState(
    () => readStorage("civic-services", seedServices)
  );

  const [requests, setRequests] = useState(
    () => readStorage("civic-requests", seedRequests)
  );

  const [agents, setAgents] = useState(
    () => readStorage("civic-agents", seedAgents)
  );

  const [citizens, setCitizens] = useState(
    () => readStorage("civic-citizens", seedCitizens)
  );

  const [activePage, setActivePage] = useState("dashboard");
  const [selectedService, setSelectedService] = useState(null);
  const [notice, setNotice] = useState("");

  // Save application data in browser storage.

  useEffect(() => {
    writeStorage("civic-user", user);
  }, [user]);

  useEffect(() => {
    writeStorage("civic-services", services);
  }, [services]);

  useEffect(() => {
    writeStorage("civic-requests", requests);
  }, [requests]);

  useEffect(() => {
    writeStorage("civic-agents", agents);
  }, [agents]);

  useEffect(() => {
    writeStorage("civic-citizens", citizens);
  }, [citizens]);

  // Automatically remove notification messages.

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => {
      setNotice("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [notice]);

  // Login and registration-style onboarding.

  function handleLogin(form) {
    const cleanUser = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role,
      phone: form.phone || "",
      area: form.area || ""
    };

    if (cleanUser.role === "agent") {
      const existingAgent = agents.find(
        (agent) => agent.email === cleanUser.email
      );

      if (!existingAgent) {
        const newAgent = {
          id: `AG-${Date.now().toString().slice(-6)}`,
          name: cleanUser.name,
          email: cleanUser.email,
          phone: cleanUser.phone,
          area: cleanUser.area,
          status: "Pending"
        };

        setAgents((previous) => [
          ...previous,
          newAgent
        ]);

        setNotice("Agent registration submitted for verification.");
      }
    }

    if (cleanUser.role === "citizen") {
      setCitizens((previous) => {
        const exists = previous.some(
          (citizen) => citizen.email === cleanUser.email
        );

        if (exists) return previous;

        return [
          ...previous,
          {
            name: cleanUser.name,
            email: cleanUser.email
          }
        ];
      });
    }

    setUser(cleanUser);

    if (cleanUser.role === "citizen") {
      setActivePage("dashboard");
    } else if (cleanUser.role === "agent") {
      setActivePage("agent");
    } else {
      setActivePage("admin");
    }
  }

  // Logout.

  function handleLogout() {
    setUser(null);
    setSelectedService(null);
    setNotice("");
    setActivePage("dashboard");
  }

  // Open the service application modal.

  function handleOpenRequest(service) {
    setSelectedService(service);
  }

  // Submit a new citizen request.

  function handleCreateRequest(formData) {
    if (!user || user.role !== "citizen" || !selectedService) {
      return;
    }

    const newRequest = {
      id: `CS-${Date.now().toString().slice(-6)}`,
      citizen: user.name,
      email: user.email,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      status: "Submitted",
      agent: null,
      location: formData.location,
      preferredDate: formData.preferredDate,
      notes: formData.notes,
      documents: formData.documents,
      assistanceFee: selectedService.fee,
      createdAt: new Date().toLocaleDateString("en-CA")
    };

    setRequests((previous) => [
      newRequest,
      ...previous
    ]);

    setSelectedService(null);
    setNotice(
      `Request ${newRequest.id} submitted successfully!`
    );

    setActivePage("my-requests");
  }

  // Update request status from the agent dashboard.

  function handleUpdateRequest(requestId, newStatus) {
    setRequests((previous) =>
      previous.map((request) => {
        if (request.id !== requestId) return request;

        return {
          ...request,
          status: newStatus,
          agent:
            newStatus === "Assigned"
              ? user.name
              : request.agent,
          updatedAt: new Date().toISOString()
        };
      })
    );

    setNotice(`Request status updated to ${newStatus}.`);
  }

  // Admin approves or rejects agents.

  function handleApproveAgent(agentId, status) {
    setAgents((previous) =>
      previous.map((agent) =>
        agent.id === agentId
          ? { ...agent, status }
          : agent
      )
    );

    setNotice(`Agent status updated to ${status}.`);
  }

  // Admin updates service charges.

  function handleUpdateService(serviceId, fee) {
    setServices((previous) =>
      previous.map((service) =>
        service.id === serviceId
          ? { ...service, fee }
          : service
      )
    );

    setNotice("Service assistance charge updated.");
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Find the current agent's verification record.

  const currentAgent = agents.find(
    (agent) => agent.email === user.email
  );

  // Render different pages depending on user role.

  function renderPage() {
    if (user.role === "citizen") {
      const myRequests = requests.filter(
        (request) => request.email === user.email
      );

      switch (activePage) {
        case "services":
          return (
            <Services
              services={services}
              onRequest={handleOpenRequest}
            />
          );

        case "my-requests":
          return (
            <MyRequests requests={myRequests} />
          );

        default:
          return (
            <CitizenDashboard
              user={user}
              requests={requests}
              services={services}
              onBrowse={() => setActivePage("services")}
              onTrack={() => setActivePage("my-requests")}
            />
          );
      }
    }

    if (user.role === "agent") {
      return (
        <AgentDashboard
          user={user}
          agent={currentAgent}
          requests={requests}
          onUpdate={handleUpdateRequest}
        />
      );
    }

    if (user.role === "admin") {
      return (
        <AdminDashboard
          activePage={activePage}
          requests={requests}
          agents={agents}
          services={services}
          citizens={citizens}
          onApproveAgent={handleApproveAgent}
          onUpdateService={handleUpdateService}
        />
      );
    }

    return <h2>Invalid user role.</h2>;
  }

  return (
    <div className="app-shell">
      <Sidebar
        user={user}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="main-area">
        <Header
          user={user}
          onLogout={handleLogout}
        />

        {notice && (
          <div className="toast-message" role="status">
            <span>✓</span>
            {notice}
            <button
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        )}

        <main>
          {renderPage()}
        </main>

        <footer className="app-footer">
          <span>
            © 2026 CivicAssist
          </span>

          <span>
            Independent service assistance platform
          </span>
        </footer>
      </div>

      {selectedService && (
        <RequestModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSubmit={handleCreateRequest}
        />
      )}
    </div>
  );
}