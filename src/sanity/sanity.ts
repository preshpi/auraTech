import { createClient, type ClientConfig } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const config: ClientConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-03-16",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

type SourceType =
  | string
  | {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };

export const urlFor = (source: SourceType) =>
  builder.image(source).auto("format").url();
