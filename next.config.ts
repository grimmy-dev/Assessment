/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/incidents",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/incidents"
            : "/api/incidents",
      },
      {
        source: "/api/hr-metrics",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/hr-metrics"
            : "/api/hr-metrics",
      },
      {
        source: "/api/revenue",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/revenue"
            : "/api/revenue",
      },
      {
        source: "/api/rd-status",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/rd-status"
            : "/api/rd-status",
      },
      {
        source: "/api/production-data",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/production-data"
            : "/api/production-data",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/docs"
            : "/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/openapi.json"
            : "/openapi.json",
      },
    ];
  },
};

module.exports = nextConfig;