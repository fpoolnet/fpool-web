import { Filter, getPublicKey, Relay } from 'nostr-tools';
import { hexStringToUint8Array } from '@utils/Utils';
import { SubscriptionParams } from 'nostr-tools/lib/types/relay';

export class NostrClient {
  public relay: Relay;
  private publicKey: string;

  constructor(options: { relayUrl: string; privateKey: string }) {
    this.relay = new Relay(options.relayUrl);
    this.relay.connect();

    const privateKeyUint8Array = hexStringToUint8Array(options.privateKey);
    this.publicKey = getPublicKey(privateKeyUint8Array);
  }

  subscribeEvent(filters: Filter[], subscriptionParams: SubscriptionParams) {
    const subscription = this.relay.subscribe(filters, subscriptionParams);
    return subscription;
  }
}
