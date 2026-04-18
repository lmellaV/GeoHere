/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

// Integración con el runtime de Cloudflare Workers durante desarrollo local.
// initOpenNextCloudflareForDev() permite acceder a los bindings de Cloudflare
// (como D1) cuando usas `next dev`, sin necesidad de hacer un build completo.
// En CI (GitHub Actions), se salta para evitar intentos de conexión remota a la API de Cloudflare.
if (!process.env.CI && !process.env.GITHUB_ACTIONS) {
  import("@opennextjs/cloudflare")
    .then(module => module.initOpenNextCloudflareForDev?.())
    .catch(() => {
      // Silently ignore if module not available or init fails
    });
}
