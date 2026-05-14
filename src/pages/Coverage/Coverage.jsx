import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const centers = useLoaderData();
  const mapRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    const district = centers.find((center) =>
      center.district.toLowerCase().includes(query),
    );
    const coOrdinates = [district.latitude, district.longitude];
    console.log(district);
    if (district) {
      mapRef.current.flyTo(coOrdinates, 14);
    }
  };

  return (
    <section className="py-16 px-4  rounded-3xl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-base-200">
            We are available in all 64 districts
          </h1>

          <p className="text-base-content/70 max-w-2xl mx-auto">
            Fast and reliable delivery coverage across Bangladesh with trusted
            service centers in every district.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-300">
            <h2 className="text-4xl font-black text-primary">64+</h2>
            <p className="mt-2 text-base-content/70">District Coverage</p>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-300">
            <h2 className="text-4xl font-black text-primary">120+</h2>
            <p className="mt-2 text-base-content/70">Delivery Hubs</p>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-300">
            <h2 className="text-4xl font-black text-primary">24/7</h2>
            <p className="mt-2 text-base-content/70">Customer Support</p>
          </div>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center mb-12"
        >
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              name="search"
              type="search"
              className="grow"
              placeholder="Search"
            />
            <button className=" hover:text-gray-500 transition-all duration-300 text-black font-semibold   text-sm shrink-0">
              Search
            </button>
          </label>
        </form>

        {/* Map */}
        <div className="bg-base-100 rounded-3xl p-4 md:p-6 shadow-xl border border-base-300 ">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              We deliver almost all over Bangladesh
            </h2>

            <p className="text-base-content/60 mt-2">
              Explore our nationwide coverage map and service locations.
            </p>
          </div>

          <div className="h-100 rounded-2xl overflow-hidden">
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={false}
              className="h-full w-full z-0"
              ref={mapRef}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {centers.map((center, idx) => (
                <Marker
                  key={idx}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup>
                    <strong>{center.district}</strong> <br /> Service Area:{" "}
                    {center.covered_area.join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
