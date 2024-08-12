import { bech32 } from "bech32";
import { Buffer } from "buffer";

export function bech32Decoder(currPrefix: string, data: string) {
  const { prefix, words } = bech32.decode(data);
  if (prefix !== currPrefix) {
    throw Error("Invalid address format");
  }

  return Buffer.from(bech32.fromWords(words));
}
