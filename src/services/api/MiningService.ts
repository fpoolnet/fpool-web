import { Filter } from 'nostr-tools';
import { Observable } from 'rxjs';
import { RELAY_URL } from '@constants/config';
import { NostrClient } from '@services/NostrClient';
import { getTimeBeforeDaysInSeconds } from '@utils/Utils';
import { SubscriptionParams } from 'nostr-tools/lib/types/relay';

export class MiningService {
  public nostrClient: NostrClient;
  public pplnsSubscription: any;

  constructor(relayUrl: string, privateKey?: string) {
    this.nostrClient = new NostrClient({ relayUrl, privateKey });
    this.nostrClient.connect();
  }

  subscribePplns(address: string, subscriptionParams: SubscriptionParams) {
    this.stopPplns();

    const filters: Filter[] = [
      {
        kinds: [35505],
        since: getTimeBeforeDaysInSeconds(5),
        [`#a`]: [address]
      },
      {
        kinds: [35505],
        limit: 500,
        [`#a`]: [address]
      }
    ];

    this.pplnsSubscription = this.nostrClient.subscribeEvent(filters, subscriptionParams);
    return this.pplnsSubscription;
  }

  async stopPplns() {
    if (this.pplnsSubscription) {
      await this.pplnsSubscription.close();
      this.pplnsSubscription = null;
    }
  }

  async changeRelay(relayUrl: string, privateKey?: string) {
    const currentRelayUrl = this.nostrClient.relay.url.replace(/\/+$/, '').toLowerCase();
    const newRelayUrl = relayUrl.replace(/\/+$/, '').toLowerCase();
    if (currentRelayUrl != newRelayUrl) {
      await this.stopPplns();
      await this.nostrClient.relay.close();
      this.nostrClient = new NostrClient({ relayUrl, privateKey });
      await this.nostrClient.connect();
    }
  }
}

export default new MiningService(RELAY_URL);
