export type Metadata = {
  name: string;
  about: string;
  picture: string;
  nip05: string;
};

declare global {
  interface Window {
    nostr: Record<string, any>;
  }
}

window.nostr = window.nostr || {};
