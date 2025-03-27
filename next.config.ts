import NextFederationPlugin from "@module-federation/nextjs-mf";
import { FederatedTypesPlugin } from "@module-federation/typescript";

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config: any, options: any) {
    const { isServer } = options;
    const remotes = {
      "auditing-remote": "auditing-remote@https://auditing-remote1.vercel.app//_next/static/chunks/remoteEntry.js",
      "hr-remote": "hr-remote@https://hr-remote1.vercel.app//_next/static/chunks/remoteEntry.js",
      "recruitment-remote": "recruitment-remote@https://recruitment-remotes1.vercel.app//_next/static/chunks/remoteEntry.js",
    };

    const federatedConfig : any = {
      name: "host",
      remotes: remotes,
      filename: "static/chunks/remoteEntry.js", // ✅ Added filename
      shared: {},
    };

    config.plugins.push(
      new NextFederationPlugin(federatedConfig),
      new FederatedTypesPlugin({ federationConfig: federatedConfig })
    );

    return config;
  },
};

export default nextConfig;
