import { useMemo, useState } from "react";
import ServiceCard from "../components/ServiceCard";

export default function Services({
  services,
  onRequest
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(services.map((service) => service.category))
  ];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || service.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [services, search, category]);

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">SERVICE CATALOGUE</span>
          <h1>Explore Government Services</h1>
          <p>
            Find documentation assistance based on your requirements.
          </p>
        </div>
      </div>

      <div className="service-search">
        <input
          type="search"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="service-grid">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onRequest={onRequest}
          />
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="empty-state">
          <span>🔍</span>
          <h3>No services found</h3>
          <p>Try another search term or category.</p>
        </div>
      )}

      <div className="information-banner">
        <strong>Important information</strong>
        <p>
          Requirements and processing times vary by state, service
          and issuing authority. Check the applicable official
          portal before proceeding. Assistance charges do not
          include government fees.
        </p>
      </div>
    </div>
  );
}